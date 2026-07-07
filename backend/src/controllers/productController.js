import fs from 'fs';
import csvParser from 'csv-parser';
import { supabase, isMockDb } from '../config/supabase.js';
import * as mockDb from '../database/mockDb.js';
import { typesenseService } from '../services/typesenseService.js';
import CustomError from '../utils/CustomError.js';

export const productController = {
  // 1. GET /products (filtered & paginated)
  async getProducts(req, res, next) {
    try {
      const { page = 1, limit = 9, q = '', category, fabric, supplier, buyer, color, season, gsmRange } = req.query;
      const offset = (page - 1) * limit;

      if (isMockDb) {
        // Query mock database
        let results = mockDb.queryProductsMock({ q, category, fabric, supplier, buyer, color, season });

        // GSM filter check
        if (gsmRange) {
          const lower = gsmRange.toLowerCase();
          if (lower.includes('heavy')) results = results.filter(p => p.gsm > 300);
          else if (lower.includes('medium')) results = results.filter(p => p.gsm >= 150 && p.gsm <= 300);
          else if (lower.includes('light')) results = results.filter(p => p.gsm < 150);
        }

        const paginated = results.slice(offset, offset + Number(limit));

        return res.status(200).json({
          success: true,
          data: paginated,
          pagination: {
            totalItems: results.length,
            currentPage: Number(page),
            totalPages: Math.ceil(results.length / limit),
            itemsPerPage: Number(limit)
          }
        });
      }

      // Query live Supabase
      let query = supabase.from('finished_goods').select('*', { count: 'exact' });

      // Apply optional query filters
      if (q) query = query.or(`style_name.ilike.%${q}%,style_number.ilike.%${q}%,fabric.ilike.%${q}%`);
      if (category && category !== 'All') query = query.eq('category', category);
      if (fabric) query = query.ilike('fabric', `%${fabric}%`);
      if (color) query = query.eq('color', color);
      if (season) query = query.eq('season', season);

      // Page pagination boundaries
      query = query.range(offset, offset + Number(limit) - 1);
      const { data, count, error } = await query;

      if (error) throw error;

      res.status(200).json({
        success: true,
        data,
        pagination: {
          totalItems: count || 0,
          currentPage: Number(page),
          totalPages: Math.ceil((count || 0) / limit),
          itemsPerPage: Number(limit)
        }
      });
    } catch (err) {
      next(err);
    }
  },

  // 2. GET /products/:id
  async getProductById(req, res, next) {
    const { id } = req.params;

    try {
      if (isMockDb) {
        const item = mockDb.products.find(p => p.id === id || p.styleNumber === id);
        if (!item) throw new CustomError(`Product not found with ID: ${id}`, 404);
        return res.status(200).json({ success: true, data: item });
      }

      const { data, error } = await supabase
        .from('finished_goods')
        .select('*, suppliers(*)')
        .eq('id', id)
        .single();

      if (error || !data) {
        throw new CustomError(`Product not found with ID: ${id}`, 404);
      }

      res.status(200).json({
        success: true,
        data
      });
    } catch (err) {
      next(err);
    }
  },

  // 3. GET /products/search (Typesense search endpoint)
  async searchProducts(req, res, next) {
    const { q = '', category, fabric, color } = req.query;

    try {
      const results = await typesenseService.searchFinishedGoods(q, { category, fabric, color });
      res.status(200).json({
        success: true,
        data: results
      });
    } catch (err) {
      next(err);
    }
  },

  // 4. POST /products (Create a single product)
  async createProduct(req, res, next) {
    try {
      const {
        styleNumber, styleName, category, fabric, gsm, color, print,
        costPrice, sellingPrice, stockQuantity, season, imageUrl, supplierId
      } = req.body;

      if (isMockDb) {
        const newProduct = {
          id: `p-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          styleNumber,
          styleName,
          category,
          fabric,
          gsm: Number(gsm) || 200,
          color: color || 'Solid Black',
          print: print || 'Solid Color',
          costPrice: Number(costPrice) || 0,
          sellingPrice: Number(sellingPrice) || 0,
          stockQuantity: Number(stockQuantity) || 0,
          season: season || 'Spring 2026',
          imageUrl: imageUrl || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
          supplier: 'Textile Horizon Ltd',
          buyer: '',
          similarityScore: 50.0
        };
        mockDb.products.push(newProduct);
        return res.status(201).json({ success: true, message: 'Product created successfully.', data: newProduct });
      }

      const { data, error } = await supabase
        .from('finished_goods')
        .insert({
          style_number: styleNumber,
          style_name: styleName,
          category,
          fabric,
          gsm: Number(gsm),
          color,
          print,
          cost_price: Number(costPrice),
          selling_price: Number(sellingPrice),
          stock_quantity: Number(stockQuantity),
          season,
          image_url: imageUrl,
          supplier_id: supplierId || null
        })
        .select()
        .single();

      if (error) throw error;

      res.status(201).json({ success: true, message: 'Product created successfully.', data });
    } catch (err) {
      next(err);
    }
  },

  // 5. PATCH /products/:id (Update product)
  async updateProduct(req, res, next) {
    const { id } = req.params;

    try {
      if (isMockDb) {
        const idx = mockDb.products.findIndex(p => p.id === id || p.styleNumber === id);
        if (idx < 0) throw new CustomError(`Product not found with ID: ${id}`, 404);

        // Merge update fields
        const allowed = ['styleName', 'category', 'fabric', 'gsm', 'color', 'print', 'costPrice', 'sellingPrice', 'stockQuantity', 'season', 'imageUrl'];
        for (const key of allowed) {
          if (req.body[key] !== undefined) {
            mockDb.products[idx][key] = req.body[key];
          }
        }

        return res.status(200).json({ success: true, message: 'Product updated successfully.', data: mockDb.products[idx] });
      }

      // Map camelCase body keys to snake_case DB columns
      const updatePayload = {};
      const mapping = {
        styleName: 'style_name', category: 'category', fabric: 'fabric', gsm: 'gsm',
        color: 'color', print: 'print', costPrice: 'cost_price', sellingPrice: 'selling_price',
        stockQuantity: 'stock_quantity', season: 'season', imageUrl: 'image_url', supplierId: 'supplier_id'
      };

      for (const [camel, snake] of Object.entries(mapping)) {
        if (req.body[camel] !== undefined) {
          updatePayload[snake] = req.body[camel];
        }
      }

      if (Object.keys(updatePayload).length === 0) {
        throw new CustomError('No valid fields to update.', 400);
      }

      const { data, error } = await supabase
        .from('finished_goods')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new CustomError(`Product not found with ID: ${id}`, 404);

      res.status(200).json({ success: true, message: 'Product updated successfully.', data });
    } catch (err) {
      next(err);
    }
  },

  // 6. DELETE /products/:id
  async deleteProduct(req, res, next) {
    const { id } = req.params;

    try {
      if (isMockDb) {
        const idx = mockDb.products.findIndex(p => p.id === id || p.styleNumber === id);
        if (idx < 0) throw new CustomError(`Product not found with ID: ${id}`, 404);
        const removed = mockDb.products.splice(idx, 1);
        return res.status(200).json({ success: true, message: 'Product deleted successfully.', data: removed[0] });
      }

      const { data, error } = await supabase
        .from('finished_goods')
        .delete()
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new CustomError(`Product not found with ID: ${id}`, 404);

      res.status(200).json({ success: true, message: 'Product deleted successfully.', data });
    } catch (err) {
      next(err);
    }
  },

  // 7. POST /products/import (CSV Bulking Importer)
  async importProductsCSV(req, res, next) {
    if (!req.file) {
      return next(new CustomError('No CSV file uploaded.', 400));
    }

    const filePath = req.file.path;
    const parsedRows = [];
    const skippedRows = [];
    let processedCount = 0;

    try {
      console.log(`[CSV Importer] Reading temporary file at: ${filePath}`);

      // Step A: Parse CSV via ReadStream pipeline
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data', (row) => {
            processedCount++;
            // Row Validation check
            if (!row.styleNumber || !row.styleName || !row.category || !row.fabric) {
              skippedRows.push({
                index: processedCount,
                styleNumber: row.styleNumber || 'Unknown',
                reason: 'Missing required catalog fields (styleNumber, styleName, category, fabric)'
              });
              return;
            }

            parsedRows.push({
              style_number: row.styleNumber.trim(),
              style_name: row.styleName.trim(),
              category: row.category.trim(),
              fabric: row.fabric.trim(),
              gsm: parseInt(row.gsm || '200', 10),
              color: row.color ? row.color.trim() : 'Solid Black',
              print: row.print ? row.print.trim() : 'Solid Color',
              cost_price: parseFloat(row.costPrice || '0.00'),
              selling_price: parseFloat(row.sellingPrice || '0.00'),
              stock_quantity: parseInt(row.stockQuantity || '0', 10),
              season: row.season ? row.season.trim() : 'Spring 2026',
              image_url: row.imageUrl ? row.imageUrl.trim() : 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80'
            });
          })
          .on('end', resolve)
          .on('error', reject);
      });

      // Cleanup CSV file on disk
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('[CSV Importer] Temp file cleanup error:', err.message);
      }

      // Step B: Bulk upsert rows into database
      if (parsedRows.length > 0) {
        if (isMockDb) {
          // Push items dynamically to mockDb list
          parsedRows.forEach(row => {
            const camelCaseItem = {
              id: `p-csv-${Math.random().toString(36).substr(2, 9)}`,
              styleNumber: row.style_number,
              styleName: row.style_name,
              category: row.category,
              fabric: row.fabric,
              gsm: row.gsm,
              color: row.color,
              print: row.print,
              costPrice: row.cost_price,
              sellingPrice: row.selling_price,
              stockQuantity: row.stock_quantity,
              season: row.season,
              imageUrl: row.image_url,
              supplier: 'Textile Horizon Ltd',
              buyer: 'ASOS Plc',
              similarityScore: 65.0
            };
            // Prevent duplicate styleNumber in-memory
            const idx = mockDb.products.findIndex(p => p.styleNumber === row.style_number);
            if (idx >= 0) {
              mockDb.products[idx] = camelCaseItem;
            } else {
              mockDb.products.push(camelCaseItem);
            }
          });
        } else {
          // Live bulk write on Supabase
          const { error } = await supabase
            .from('finished_goods')
            .upsert(parsedRows, { onConflict: 'style_number' });

          if (error) throw error;
        }
      }

      res.status(200).json({
        success: true,
        message: 'CSV import pipeline executed.',
        data: {
          totalProcessed: processedCount,
          importedCount: parsedRows.length,
          skippedCount: skippedRows.length,
          skippedDetails: skippedRows
        }
      });
    } catch (err) {
      // Remove file on error if it wasn't cleaned
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) {}
      }
      next(err);
    }
  }
};

export default productController;

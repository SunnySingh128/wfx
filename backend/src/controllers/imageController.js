import fs from 'fs';
import { typesenseService } from '../services/typesenseService.js';
import CustomError from '../utils/CustomError.js';

export const imageController = {
  // 1. POST /image/search (Image & Text Multi-Modal Query)
  async handleImageSearch(req, res, next) {
    const { textQuery = '', threshold = 50 } = req.body;
    let imageFile = req.file;

    try {
      console.log('[Image Controller] Received similarity request.');
      if (imageFile) {
        console.log(`[Image Controller] Image file received: ${imageFile.originalname} (${imageFile.size} bytes)`);
        // Clean up temp image file after reading it
        try {
          fs.unlinkSync(imageFile.path);
        } catch (e) {
          console.error('[Image Controller] Error deleting temp image:', e.message);
        }
      }

      // Step A: Generate simulated vector embeddings representation
      // In production, we would invoke a Sentence-Transformer / CLIP model pipeline:
      // const embedding = await embeddingService.getCLIPEmbedding(imageFile.path || textQuery);
      const mockVector = Array.from({ length: 512 }, () => Math.random());

      // Step B: Query Typesense Vector collections
      const results = await typesenseService.searchByVector(mockVector, Number(threshold));

      // Step C: Apply optional textual filters to results
      let filtered = [...results];
      if (textQuery) {
        const query = textQuery.toLowerCase();
        filtered = filtered.filter(p =>
          p.styleName.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.fabric.toLowerCase().includes(query)
        );
      }

      res.status(200).json({
        success: true,
        message: 'Garment visual search executed successfully.',
        data: filtered
      });
    } catch (err) {
      if (imageFile && fs.existsSync(imageFile.path)) {
        try { fs.unlinkSync(imageFile.path); } catch (e) {}
      }
      next(err);
    }
  },

  // 2. POST /image/upload (Upload image file to storage bucket)
  async handleImageUpload(req, res, next) {
    if (!req.file) {
      return next(new CustomError('No image file uploaded.', 400));
    }

    const filePath = req.file.path;

    try {
      // In production, upload the file to Supabase Storage:
      // const { data, error } = await supabase.storage.from('products').upload(`garments/${req.file.filename}`, fileBuffer);
      // const url = supabase.storage.from('products').getPublicUrl(data.path).publicUrl;
      
      // Cleanup local disk temp file after upload simulation
      try {
        fs.unlinkSync(filePath);
      } catch (e) {}

      // Return simulated public URL
      const mockPublicUrl = `https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80`;

      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully to storage.',
        data: {
          imageUrl: mockPublicUrl,
          fileName: req.file.filename,
          mimeType: req.file.mimetype
        }
      });
    } catch (err) {
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) {}
      }
      next(err);
    }
  }
};

export default imageController;

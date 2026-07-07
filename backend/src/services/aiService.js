import axios from 'axios';
import { env } from '../config/env.js';
import * as mockDb from '../database/mockDb.js';

// Prompt contexts detailing target table schemas
const SYSTEM_PROMPT = `
You are a database translation bot. You compile plain English questions into valid PostgreSQL queries for a garment ERP database.

Here is the database schema context:
- Table "suppliers": columns are (id UUID, name VARCHAR, email VARCHAR, phone VARCHAR, address TEXT, supplier_score DECIMAL, on_time_rate DECIMAL, lead_time VARCHAR)
- Table "buyers": columns are (id UUID, name VARCHAR, email VARCHAR, phone VARCHAR, address TEXT)
- Table "finished_goods": columns are (id UUID, style_number VARCHAR, style_name VARCHAR, category VARCHAR, fabric VARCHAR, gsm INTEGER, color VARCHAR, print VARCHAR, supplier_id UUID FK references suppliers, cost_price DECIMAL, selling_price DECIMAL, stock_quantity INTEGER, image_url TEXT, season VARCHAR)
- Table "tech_packs": columns are (id UUID, product_id UUID FK references finished_goods, spec_details TEXT, measurement_chart TEXT)
- Table "sales_orders": columns are (id UUID, order_number VARCHAR, buyer_id UUID FK references buyers, status VARCHAR, total_amount DECIMAL, order_date TIMESTAMP, delivery_date TIMESTAMP)
- Table "sales_order_items": columns are (id UUID, order_id UUID FK references sales_orders, product_id UUID FK references finished_goods, quantity INTEGER, unit_price DECIMAL)
- Table "sales_invoices": columns are (id UUID, invoice_number VARCHAR, order_id UUID FK references sales_orders, invoice_amount DECIMAL, status VARCHAR, invoice_date TIMESTAMP)

Instructions:
1. ONLY return the plain SQL query. Do not wrap it in markdown blocks, backticks, or write explanations.
2. Make sure the query is a SELECT statement. Direct mutations are blocked.
3. Keep the query optimized, using JOINs where appropriate.
4. Try to match the exact wording of column names.
`;

export const aiService = {
  /**
   * Generates a PostgreSQL query from a Natural Language string using OpenRouter.
   */
  async generateSQL(userQuery) {
    if (!env.openrouterApiKey || env.openrouterApiKey.includes('mock-openrouter-key')) {
      return this._generateMockSQL(userQuery);
    }

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: env.openrouterModel,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `Translate this question to SQL: ${userQuery}` }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${env.openrouterApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://wfx-erp.com',
            'X-Title': 'WFX AI ERP'
          },
          timeout: 10000
        }
      );

      let sql = response.data.choices[0].message.content.trim();
      // Clean up markdown wrapping if the LLM ignored instructions
      sql = sql.replace(/```sql|```/gi, '').trim();
      return sql;
    } catch (err) {
      console.warn('[AI Service] OpenRouter request failed, falling back to mock SQL generator:', err.message);
      return this._generateMockSQL(userQuery);
    }
  },

  /**
   * Generates a human-friendly response based on the query, SQL structure, and raw data rows.
   */
  async generateExplanation(userQuery, sql, rows) {
    if (!env.openrouterApiKey || env.openrouterApiKey.includes('mock-openrouter-key')) {
      return `Found ${rows.length} records matching your question: "${userQuery}".`;
    }

    try {
      const prompt = `
      User asked: "${userQuery}"
      Generated SQL was: "${sql}"
      The returned database rows: ${JSON.stringify(rows.slice(0, 5))}

      Write a short, professional, 1-2 sentence response summarizing these results for an ERP dashboard.
      `;

      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: env.openrouterModel,
          messages: [
            { role: 'system', content: 'You are an ERP analyst bot. Summarize raw data query outputs briefly.' },
            { role: 'user', content: prompt }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${env.openrouterApiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 8000
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (err) {
      return `Based on your request, I located ${rows.length} matching entries in your database.`;
    }
  },

  // Mock SQL fallback generator for offline work
  _generateMockSQL(userQuery) {
    const q = userQuery.toLowerCase();
    
    if (q.includes('revenue') && q.includes('supplier')) {
      return 'SELECT s.name, SUM(so.total_amount) AS revenue \nFROM suppliers s \nJOIN finished_goods fg ON fg.supplier_id = s.id \nJOIN sales_order_items soi ON soi.product_id = fg.id \nJOIN sales_orders so ON so.id = soi.order_id \nGROUP BY s.name \nORDER BY revenue DESC;';
    }
    if (q.includes('cotton') && q.includes('under')) {
      return "SELECT style_number, style_name, fabric, selling_price \nFROM finished_goods \nWHERE fabric LIKE '%Cotton%' AND selling_price < 20.00;";
    }
    if (q.includes('buyer') || q.includes('top buyers')) {
      return 'SELECT b.name, SUM(soi.quantity) AS total_quantity \nFROM buyers b \nJOIN sales_orders so ON so.buyer_id = b.id \nJOIN sales_order_items soi ON soi.order_id = so.id \nGROUP BY b.name \nORDER BY total_quantity DESC;';
    }
    if (q.includes('average price') || q.includes('gsm')) {
      return 'SELECT AVG(selling_price) AS average_price \nFROM finished_goods \nWHERE gsm > 300;';
    }

    // Generic fallback
    return `SELECT style_number, style_name, category, fabric, selling_price, stock_quantity \nFROM finished_goods \nWHERE style_name ILIKE '%${userQuery}%' OR fabric ILIKE '%${userQuery}%';`;
  }
};

export default aiService;

import { supabase, isMockDb } from '../config/supabase.js';
import * as mockDb from '../database/mockDb.js';

export const dashboardController = {
  // 1. GET /dashboard/stats
  async getStats(req, res, next) {
    try {
      if (isMockDb) {
        return res.status(200).json({
          success: true,
          message: 'KPI stats retrieved from mock database.',
          data: {
            totalFinishedGoods: mockDb.products.length,
            totalSuppliers: mockDb.suppliers.length,
            totalBuyers: mockDb.buyers.length,
            totalOrders: mockDb.salesOrders.length,
            totalRevenue: mockDb.salesOrders.reduce((sum, o) => sum + o.totalAmount, 0),
            changes: {
              finishedGoods: 8.5,
              suppliers: 0,
              buyers: 12.3,
              orders: 14.8,
              revenue: 19.2
            }
          }
        });
      }

      // Query live Supabase
      const { count: fgCount } = await supabase.from('finished_goods').select('*', { count: 'exact', head: true });
      const { count: supCount } = await supabase.from('suppliers').select('*', { count: 'exact', head: true });
      const { count: buyCount } = await supabase.from('buyers').select('*', { count: 'exact', head: true });
      const { count: orderCount } = await supabase.from('sales_orders').select('*', { count: 'exact', head: true });
      
      const { data: orders } = await supabase.from('sales_orders').select('total_amount');
      const totalRev = orders ? orders.reduce((sum, o) => sum + Number(o.total_amount), 0) : 0;

      res.status(200).json({
        success: true,
        message: 'Dashboard KPI stats retrieved successfully.',
        data: {
          totalFinishedGoods: fgCount || 0,
          totalSuppliers: supCount || 0,
          totalBuyers: buyCount || 0,
          totalOrders: orderCount || 0,
          totalRevenue: totalRev,
          changes: {
            finishedGoods: 8.5,
            suppliers: 0,
            buyers: 12.3,
            orders: 14.8,
            revenue: 19.2
          }
        }
      });
    } catch (err) {
      next(err);
    }
  },

  // 2. GET /dashboard/revenue
  async getRevenue(req, res, next) {
    try {
      // Returns monthly revenue and profit trends
      if (isMockDb) {
        return res.status(200).json({
          success: true,
          data: mockDb.salesOrders.map(o => ({
            month: new Date(o.orderDate).toLocaleString('default', { month: 'short' }),
            Revenue: o.totalAmount,
            Profit: o.totalAmount * 0.35,
            Orders: 1
          }))
        });
      }

      const { data, error } = await supabase
        .from('sales_orders')
        .select('total_amount, order_date')
        .order('order_date', { ascending: true });

      if (error) throw error;

      res.status(200).json({
        success: true,
        data: data.map(o => ({
          month: new Date(o.order_date).toLocaleString('default', { month: 'short' }),
          Revenue: Number(o.total_amount),
          Profit: Number(o.total_amount) * 0.35
        }))
      });
    } catch (err) {
      next(err);
    }
  },

  // 3. GET /dashboard/orders
  async getOrders(req, res, next) {
    try {
      if (isMockDb) {
        return res.status(200).json({
          success: true,
          data: mockDb.salesOrders
        });
      }

      const { data, error } = await supabase
        .from('sales_orders')
        .select('*, buyers(name)')
        .order('order_date', { ascending: false });

      if (error) throw error;

      res.status(200).json({
        success: true,
        data
      });
    } catch (err) {
      next(err);
    }
  },

  // 4. GET /dashboard/suppliers
  async getSuppliers(req, res, next) {
    try {
      if (isMockDb) {
        return res.status(200).json({
          success: true,
          data: mockDb.suppliers
        });
      }

      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('supplier_score', { ascending: false });

      if (error) throw error;

      res.status(200).json({
        success: true,
        data
      });
    } catch (err) {
      next(err);
    }
  }
};

export default dashboardController;

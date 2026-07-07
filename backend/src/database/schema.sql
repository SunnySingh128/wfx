-- ==========================================================
-- WFX AI-Native ERP Database Schema Setup
-- Run this in the Supabase SQL Editor to initialize tables
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Suppliers Table
CREATE TABLE IF NOT EXISTS suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    address TEXT,
    supplier_score DECIMAL(5,2) DEFAULT 0.00 CHECK (supplier_score >= 0.00 AND supplier_score <= 100.00),
    on_time_rate DECIMAL(5,2) DEFAULT 0.00 CHECK (on_time_rate >= 0.00 AND on_time_rate <= 100.00),
    lead_time VARCHAR(50) DEFAULT '14 days',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Buyers Table
CREATE TABLE IF NOT EXISTS buyers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Finished Goods (Products) Table
CREATE TABLE IF NOT EXISTS finished_goods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    style_number VARCHAR(100) UNIQUE NOT NULL,
    style_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    fabric VARCHAR(255) NOT NULL,
    gsm INTEGER NOT NULL,
    color VARCHAR(100) NOT NULL,
    print VARCHAR(100) NOT NULL,
    supplier_id UUID REFERENCES suppliers(id) ON DELETE SET NULL,
    cost_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    selling_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,
    season VARCHAR(100),
    similarity_score DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tech Packs Table
CREATE TABLE IF NOT EXISTS tech_packs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES finished_goods(id) ON DELETE CASCADE UNIQUE,
    spec_details TEXT,
    measurement_chart TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Sales Orders Table
CREATE TABLE IF NOT EXISTS sales_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(100) UNIQUE NOT NULL,
    buyer_id UUID REFERENCES buyers(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    order_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    delivery_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Sales Order Items (Bridge Table for Orders/Products)
CREATE TABLE IF NOT EXISTS sales_order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES sales_orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES finished_goods(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Sales Invoices Table
CREATE TABLE IF NOT EXISTS sales_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(100) UNIQUE NOT NULL,
    order_id UUID REFERENCES sales_orders(id) ON DELETE CASCADE,
    invoice_amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
    invoice_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Query Optimization
CREATE INDEX IF NOT EXISTS idx_fg_style ON finished_goods(style_number);
CREATE INDEX IF NOT EXISTS idx_fg_category_fabric ON finished_goods(category, fabric);
CREATE INDEX IF NOT EXISTS idx_so_order_number ON sales_orders(order_number);
CREATE INDEX IF NOT EXISTS idx_si_invoice_number ON sales_invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_fg_supplier ON finished_goods(supplier_id);
CREATE INDEX IF NOT EXISTS idx_so_buyer ON sales_orders(buyer_id);

import { v4 as uuidv4 } from 'uuid';

export const suppliers = [
  { id: 's1', name: 'Textile Horizon Ltd', email: 'contact@textilehorizon.com', phone: '+91 98765 43210', address: 'Plot 45, Sector 5, IMT Manesar, Gurugram, India', score: 94, onTime: 96, leadTime: '12 days' },
  { id: 's2', name: 'Apex Apparel Source', email: 'sales@apexapparel.com', phone: '+880 2 9876543', address: 'House 12, Road 4, Sector 3, Uttara, Dhaka, Bangladesh', score: 88, onTime: 89, leadTime: '18 days' },
  { id: 's3', name: 'Nippon Denim Mills', email: 'info@nippondenim.co.jp', phone: '+81 3 5555 0199', address: '3-1-2 Kurashiki, Okayama, Japan', score: 97, onTime: 95, leadTime: '22 days' },
  { id: 's4', name: 'EuroKnit Fabrics', email: 'ops@euroknit.it', phone: '+39 0574 123456', address: 'Via delle Pleiadi 15, Prato, Italy', score: 91, onTime: 92, leadTime: '15 days' },
  { id: 's5', name: 'Guangdong Silk Co.', email: 'trade@gd-silk.cn', phone: '+86 20 8333 4455', address: '88 Middle Yanjiang Road, Guangzhou, China', score: 79, onTime: 82, leadTime: '25 days' },
];

export const buyers = [
  { id: 'b1', name: 'Zara (Inditex)', email: 'buying@inditex.com', phone: '+34 981 185 400', address: 'Edificio Inditex, Arteixo, A Coruña, Spain' },
  { id: 'b2', name: 'H&M Group', email: 'sourcing@hm.com', phone: '+46 8 796 55 00', address: 'Mäster Samuelsgatan 46A, Stockholm, Sweden' },
  { id: 'b3', name: 'Nordstrom Inc.', email: 'merch@nordstrom.com', phone: '+1 206 628 2111', address: '1617 6th Ave, Seattle, WA, USA' },
  { id: 'b4', name: 'Uniqlo (Fast Retailing)', email: 'design@uniqlo.co.jp', phone: '+81 3 6865 0050', address: 'Midtown Tower, Akasaka, Minato-ku, Tokyo, Japan' },
  { id: 'b5', name: 'ASOS Plc', email: 'brands@asos.com', phone: '+44 20 7756 1000', address: 'Greater London House, Hampstead Road, London, UK' },
];

export const products = [
  { id: 'p1', styleNumber: 'WFX-2026-JK01', styleName: 'High-Altitude Expedition Parka', category: 'Outerwear', fabric: 'Nylon Taslan Ripstop', gsm: 280, color: 'Amber Orange', print: 'Solid Color', supplier: 'Apex Apparel Source', buyer: 'Nordstrom Inc.', costPrice: 42.50, sellingPrice: 110.00, stockQuantity: 1250, imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80', season: 'Winter 2026', similarityScore: 92.4 },
  { id: 'p2', styleNumber: 'WFX-2026-SH03', styleName: 'Heritage Heavyweight Flannel', category: 'Shirts', fabric: 'Brushed Cotton Flannel', gsm: 220, color: 'Rustic Crimson Plaid', print: 'Plaid Check', supplier: 'Textile Horizon Ltd', buyer: 'H&M Group', costPrice: 12.80, sellingPrice: 34.50, stockQuantity: 4800, imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80', season: 'Autumn 2026', similarityScore: 88.1 },
  { id: 'p3', styleNumber: 'WFX-2026-DM05', styleName: 'Raw Selvedge Denim Jacket', category: 'Outerwear', fabric: '14oz Kurashiki Cotton Denim', gsm: 400, color: 'Indigo Raw', print: 'Solid Color', supplier: 'Nippon Denim Mills', buyer: 'Uniqlo (Fast Retailing)', costPrice: 38.00, sellingPrice: 95.00, stockQuantity: 950, imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80', season: 'Year-Round', similarityScore: 84.6 },
  { id: 'p4', styleNumber: 'WFX-2026-PT08', styleName: 'Tailored Linen Cargo Trouser', category: 'Trousers', fabric: 'Flax Linen Blend', gsm: 180, color: 'Sand Drift', print: 'Solid Color', supplier: 'Guangdong Silk Co.', buyer: 'Zara (Inditex)', costPrice: 15.50, sellingPrice: 42.00, stockQuantity: 3100, imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80', season: 'Summer 2026', similarityScore: 79.8 },
  { id: 'p5', styleNumber: 'WFX-2026-KN12', styleName: 'Merino Wool Mockneck Sweater', category: 'Knitwear', fabric: '100% Merino Wool', gsm: 320, color: 'Heather Charcoal', print: 'Solid Color', supplier: 'EuroKnit Fabrics', buyer: 'Nordstrom Inc.', costPrice: 24.00, sellingPrice: 68.00, stockQuantity: 1600, imageUrl: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=600&auto=format&fit=crop&q=80', season: 'Winter 2026', similarityScore: 76.2 },
  { id: 'p6', styleNumber: 'WFX-2026-TS02', styleName: 'Organic Slub Tee Pack', category: 'Activewear', fabric: 'Supima Cotton Slub', gsm: 145, color: 'Optical White / Black', print: 'Solid Color', supplier: 'Textile Horizon Ltd', buyer: 'ASOS Plc', costPrice: 6.50, sellingPrice: 18.00, stockQuantity: 7200, imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80', season: 'Spring 2026', similarityScore: 71.9 },
  { id: 'p7', styleNumber: 'WFX-2026-DR11', styleName: 'Floral Print Silk Midi Dress', category: 'Dresses', fabric: 'Mulberry Silk Chiffon', gsm: 85, color: 'Midnight Rose Print', print: 'Floral', supplier: 'Guangdong Silk Co.', buyer: 'Zara (Inditex)', costPrice: 32.00, sellingPrice: 89.00, stockQuantity: 1400, imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80', season: 'Summer 2026', similarityScore: 68.5 },
  { id: 'p8', styleNumber: 'WFX-2026-SH15', styleName: 'Chambray Utility Workshirt', category: 'Shirts', fabric: 'Indigo Chambray Cotton', gsm: 160, color: 'Vintage Wash Indigo', print: 'Solid Color', supplier: 'Textile Horizon Ltd', buyer: 'ASOS Plc', costPrice: 11.20, sellingPrice: 28.00, stockQuantity: 3400, imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80', season: 'Spring 2026', similarityScore: 65.0 },
  { id: 'p9', styleNumber: 'WFX-2026-PT20', styleName: 'Everyday Comfort Jogger', category: 'Trousers', fabric: 'French Terry Cotton-Poly', gsm: 290, color: 'Slate Grey', print: 'Solid Color', supplier: 'Apex Apparel Source', buyer: 'H&M Group', costPrice: 10.50, sellingPrice: 26.00, stockQuantity: 5200, imageUrl: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?w=600&auto=format&fit=crop&q=80', season: 'Autumn 2026', similarityScore: 61.2 },
  { id: 'p10', styleNumber: 'WFX-2026-KN05', styleName: 'Cable Knit Wool Cardigan', category: 'Knitwear', fabric: ' Shetland Wool Blend', gsm: 450, color: 'Oatmeal Melange', print: 'Solid Color', supplier: 'EuroKnit Fabrics', buyer: 'Zara (Inditex)', costPrice: 26.50, sellingPrice: 75.00, stockQuantity: 1100, imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80', season: 'Autumn 2026', similarityScore: 57.8 },
  { id: 'p11', styleNumber: 'WFX-2026-JK04', styleName: 'Waterproof Commuter Shell', category: 'Outerwear', fabric: '3-Layer Gore-Tex', gsm: 150, color: 'Obsidian Black', print: 'Solid Color', supplier: 'Apex Apparel Source', buyer: 'Uniqlo (Fast Retailing)', costPrice: 55.00, sellingPrice: 145.00, stockQuantity: 800, imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=80', season: 'Spring 2026', similarityScore: 53.4 },
  { id: 'p12', styleNumber: 'WFX-2026-DR04', styleName: 'Crepe Blazer Dress', category: 'Dresses', fabric: 'Structured Crepe Polyester', gsm: 240, color: 'Pristine Ivory', print: 'Solid Color', supplier: 'Guangdong Silk Co.', buyer: 'ASOS Plc', costPrice: 19.80, sellingPrice: 54.00, stockQuantity: 1500, imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&auto=format&fit=crop&q=80', season: 'Summer 2026', similarityScore: 49.9 },
];

export const salesOrders = [
  { id: 'o1', orderNumber: 'SO-002341', buyer: 'Zara (Inditex)', status: 'processing', totalAmount: 42000, orderDate: '2026-06-15', deliveryDate: '2026-08-01' },
  { id: 'o2', orderNumber: 'SO-002342', buyer: 'H&M Group', status: 'shipped', totalAmount: 78500, orderDate: '2026-06-20', deliveryDate: '2026-07-28' },
  { id: 'o3', orderNumber: 'SO-002343', buyer: 'Nordstrom Inc.', status: 'delivered', totalAmount: 112000, orderDate: '2026-05-10', deliveryDate: '2026-06-30' },
  { id: 'o4', orderNumber: 'SO-002344', buyer: 'ASOS Plc', status: 'pending', totalAmount: 25400, orderDate: '2026-07-01', deliveryDate: '2026-08-15' },
  { id: 'o5', orderNumber: 'SO-002345', buyer: 'Uniqlo (Fast Retailing)', status: 'processing', totalAmount: 95000, orderDate: '2026-06-28', deliveryDate: '2026-08-10' },
];

export const salesInvoices = [
  { id: 'inv1', invoiceNumber: 'INV-2026-010', orderNumber: 'SO-002343', invoiceAmount: 112000, status: 'paid', invoiceDate: '2026-07-02' },
  { id: 'inv2', invoiceNumber: 'INV-2026-011', orderNumber: 'SO-002342', invoiceAmount: 78500, status: 'pending', invoiceDate: '2026-07-05' },
];

export const recentActivity = [
  { id: 'act-1', title: 'New tech pack finalized', detail: 'Style WFX-2026-JK01 spec measurements verified by QA.', time: '2 hours ago', status: 'success' },
  { id: 'act-2', title: 'Sales invoice generated', detail: 'INV-2026-011 issued for H&M Group (SO-002342) worth $78,500.', time: '5 hours ago', status: 'info' },
  { id: 'act-3', title: 'Supplier lead time warning', detail: 'Guangdong Silk Co. lead times delayed by 4 days due to port delays.', time: '1 day ago', status: 'warning' },
  { id: 'act-4', title: 'Bulk order dispatched', detail: '4,800 units of WFX-2026-SH03 shipped out to Stockholm warehouse.', time: '2 days ago', status: 'success' },
  { id: 'act-5', title: 'New design uploaded', detail: 'Designer uploaded tech pack for "Oversized Merino Sweater".', time: '3 days ago', status: 'warning' },
];

// Revenue trend data for dashboard charts (monthly)
export const revenueTrend = [
  { month: 'Jan', Revenue: 185000, Profit: 55000, Orders: 95 },
  { month: 'Feb', Revenue: 210000, Profit: 68000, Orders: 110 },
  { month: 'Mar', Revenue: 245000, Profit: 78000, Orders: 130 },
  { month: 'Apr', Revenue: 220000, Profit: 70000, Orders: 115 },
  { month: 'May', Revenue: 290000, Profit: 95000, Orders: 145 },
  { month: 'Jun', Revenue: 340000, Profit: 112000, Orders: 170 },
  { month: 'Jul', Revenue: 380000, Profit: 128000, Orders: 195 },
  { month: 'Aug', Revenue: 360000, Profit: 118000, Orders: 180 },
  { month: 'Sep', Revenue: 410000, Profit: 139000, Orders: 210 },
  { month: 'Oct', Revenue: 430000, Profit: 146000, Orders: 220 },
  { month: 'Nov', Revenue: 490000, Profit: 168000, Orders: 250 },
  { month: 'Dec', Revenue: 560000, Profit: 198000, Orders: 290 },
];

// Product category distribution for dashboard pie chart
export const productCategories = [
  { name: 'Outerwear', value: 3000, color: '#6366f1' },
  { name: 'Shirts', value: 8200, color: '#3b82f6' },
  { name: 'Dresses', value: 2900, color: '#10b981' },
  { name: 'Trousers', value: 8300, color: '#f59e0b' },
  { name: 'Knitwear', value: 2700, color: '#ec4899' },
  { name: 'Activewear', value: 7200, color: '#8b5cf6' },
];

// NL Query mock responses (for offline AI query simulation)
export const nlQueries = [
  {
    query: 'Show me total revenue by supplier',
    sql: `SELECT s.name, SUM(so.total_amount) AS revenue \nFROM suppliers s \nJOIN finished_goods fg ON fg.supplier_id = s.id \nJOIN sales_order_items soi ON soi.product_id = fg.id \nJOIN sales_orders so ON so.id = soi.order_id \nGROUP BY s.name \nORDER BY revenue DESC;`,
    headers: ['Supplier', 'Total Revenue'],
    rows: [
      ['Apex Apparel Source', '$173,500.00'],
      ['Textile Horizon Ltd', '$120,500.00'],
      ['Nippon Denim Mills', '$95,000.00'],
      ['EuroKnit Fabrics', '$82,500.00'],
      ['Guangdong Silk Co.', '$67,400.00'],
    ],
    aiResponse: 'Apex Apparel Source leads in revenue contribution with $173,500.00 due to premium outerwear, followed closely by Textile Horizon Ltd at $120,500.00.'
  },
  {
    query: 'Find garments with fabric containing Cotton and price under 20',
    sql: `SELECT style_number, style_name, fabric, selling_price \nFROM finished_goods \nWHERE fabric LIKE '%Cotton%' AND selling_price < 20.00;`,
    headers: ['Style No', 'Style Name', 'Fabric', 'Price', 'Stock'],
    rows: [
      ['WFX-2026-TS02', 'Organic Slub Tee Pack', 'Supima Cotton Slub', '$18.00', '7,200'],
    ],
    aiResponse: 'Found 1 cotton-based product priced below $20.00. The "Organic Slub Tee Pack" (WFX-2026-TS02) retails at $18.00 with 7,200 units in stock.'
  },
  {
    query: 'List top buyers by ordered stock',
    sql: `SELECT b.name, SUM(soi.quantity) AS total_quantity \nFROM buyers b \nJOIN sales_orders so ON so.buyer_id = b.id \nJOIN sales_order_items soi ON soi.order_id = so.id \nGROUP BY b.name \nORDER BY total_quantity DESC;`,
    headers: ['Buyer Brand', 'Total Units Allocated'],
    rows: [
      ['Zara (Inditex)', '5,600 units'],
      ['H&M Group', '10,000 units'],
      ['ASOS Plc', '12,100 units'],
      ['Nordstrom Inc.', '2,850 units'],
      ['Uniqlo (Fast Retailing)', '1,750 units'],
    ],
    aiResponse: 'ASOS Plc is the largest partner by volume, with 12,100 units currently allocated across various styles, followed by H&M Group with 10,000 units.'
  },
  {
    query: 'What is the average price of heavy garments (GSM > 300)?',
    sql: `SELECT AVG(selling_price) AS average_price \nFROM finished_goods \nWHERE gsm > 300;`,
    headers: ['Garment Type', 'Avg. Selling Price', 'Count'],
    rows: [
      ['Heavyweight (>300 GSM)', '$87.60', '4 styles'],
    ],
    aiResponse: 'Heavyweight fabrics (GSM > 300) have an average retail price of $87.60 across 4 unique styles, driven by denim, knitwear, and outerwear collections.'
  }
];

// Helper to query products dynamically (offline client search simulation)
export const queryProductsMock = (params) => {
  const { q = '', category, fabric, supplier, buyer, print, color, season, gsmRange } = params;
  let results = [...products];

  if (q) {
    const term = q.toLowerCase();
    results = results.filter(p => 
      p.styleName.toLowerCase().includes(term) ||
      p.styleNumber.toLowerCase().includes(term) ||
      p.fabric.toLowerCase().includes(term) ||
      p.supplier.toLowerCase().includes(term) ||
      p.buyer.toLowerCase().includes(term)
    );
  }

  if (category && category !== 'All') results = results.filter(p => p.category === category);
  if (fabric) results = results.filter(p => p.fabric.toLowerCase().includes(fabric.toLowerCase()));
  if (supplier) results = results.filter(p => p.supplier === supplier);
  if (buyer) results = results.filter(p => p.buyer === buyer);
  if (print) results = results.filter(p => p.print === print);
  if (color) results = results.filter(p => p.color === color);
  if (season) results = results.filter(p => p.season === season);

  return results;
};

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

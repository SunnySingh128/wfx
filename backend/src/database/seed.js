import { supabase } from '../config/supabase.js';

const suppliers = [
  { name: 'Textile Horizon Ltd', email: 'contact@textilehorizon.com', phone: '+91 98765 43210', address: 'Plot 45, Sector 5, IMT Manesar, Gurugram, India', score: 94, onTime: 96, leadTime: '12 days' },
  { name: 'Apex Apparel Source', email: 'sales@apexapparel.com', phone: '+880 2 9876543', address: 'House 12, Road 4, Sector 3, Uttara, Dhaka, Bangladesh', score: 88, onTime: 89, leadTime: '18 days' },
  { name: 'Nippon Denim Mills', email: 'info@nippondenim.co.jp', phone: '+81 3 5555 0199', address: '3-1-2 Kurashiki, Okayama, Japan', score: 97, onTime: 95, leadTime: '22 days' },
  { name: 'EuroKnit Fabrics', email: 'ops@euroknit.it', phone: '+39 0574 123456', address: 'Via delle Pleiadi 15, Prato, Italy', score: 91, onTime: 92, leadTime: '15 days' },
  { name: 'Guangdong Silk Co.', email: 'trade@gd-silk.cn', phone: '+86 20 8333 4455', address: '88 Middle Yanjiang Road, Guangzhou, China', score: 79, onTime: 82, leadTime: '25 days' },
];

const buyers = [
  { name: 'Inditex (Zara)', email: 'buying@inditex.com', phone: '+34 981 185 400', address: 'Edificio Inditex, Arteixo, A Coruña, Spain' },
  { name: 'H&M Group', email: 'sourcing@hm.com', phone: '+46 8 796 55 00', address: 'Mäster Samuelsgatan 46A, Stockholm, Sweden' },
  { name: 'Nordstrom Inc.', email: 'merch@nordstrom.com', phone: '+1 206 628 2111', address: '1617 6th Ave, Seattle, WA, USA' },
  { name: 'Uniqlo (Fast Retailing)', email: 'design@uniqlo.co.jp', phone: '+81 3 6865 0050', address: 'Midtown Tower, Akasaka, Minato-ku, Tokyo, Japan' },
  { name: 'ASOS Plc', email: 'brands@asos.com', phone: '+44 20 7756 1000', address: 'Greater London House, Hampstead Road, London, UK' },
];

const products = [
  { styleNumber: 'WFX-2026-JK01', styleName: 'High-Altitude Expedition Parka', category: 'Outerwear', fabric: 'Nylon Taslan Ripstop', gsm: 280, color: 'Amber Orange', print: 'Solid Color', supplier: 'Apex Apparel Source', costPrice: 42.50, sellingPrice: 110.00, stockQuantity: 1250, imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80', season: 'Winter 2026' },
  { styleNumber: 'WFX-2026-SH03', styleName: 'Heritage Heavyweight Flannel', category: 'Shirts', fabric: 'Brushed Cotton Flannel', gsm: 220, color: 'Rustic Crimson Plaid', print: 'Plaid Check', supplier: 'Textile Horizon Ltd', costPrice: 12.80, sellingPrice: 34.50, stockQuantity: 4800, imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80', season: 'Autumn 2026' },
  { styleNumber: 'WFX-2026-DM05', styleName: 'Raw Selvedge Denim Jacket', category: 'Outerwear', fabric: '14oz Kurashiki Cotton Denim', gsm: 400, color: 'Indigo Raw', print: 'Solid Color', supplier: 'Nippon Denim Mills', costPrice: 38.00, sellingPrice: 95.00, stockQuantity: 950, imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80', season: 'Year-Round' },
  { styleNumber: 'WFX-2026-PT08', styleName: 'Tailored Linen Cargo Trouser', category: 'Trousers', fabric: 'Flax Linen Blend', gsm: 180, color: 'Sand Drift', print: 'Solid Color', supplier: 'Guangdong Silk Co.', costPrice: 15.50, sellingPrice: 42.00, stockQuantity: 3100, imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80', season: 'Summer 2026' },
  { styleNumber: 'WFX-2026-KN12', styleName: 'Merino Wool Mockneck Sweater', category: 'Knitwear', fabric: '100% Merino Wool', gsm: 320, color: 'Heather Charcoal', print: 'Solid Color', supplier: 'EuroKnit Fabrics', costPrice: 24.00, sellingPrice: 68.00, stockQuantity: 1600, imageUrl: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=600&auto=format&fit=crop&q=80', season: 'Winter 2026' },
  { styleNumber: 'WFX-2026-TS02', styleName: 'Organic Slub Tee Pack', category: 'Activewear', fabric: 'Supima Cotton Slub', gsm: 145, color: 'Optical White / Black', print: 'Solid Color', supplier: 'Textile Horizon Ltd', costPrice: 6.50, sellingPrice: 18.00, stockQuantity: 7200, imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80', season: 'Spring 2026' },
  { styleNumber: 'WFX-2026-DR11', styleName: 'Floral Print Silk Midi Dress', category: 'Dresses', fabric: 'Mulberry Silk Chiffon', gsm: 85, color: 'Midnight Rose Print', print: 'Floral', supplier: 'Guangdong Silk Co.', costPrice: 32.00, sellingPrice: 89.00, stockQuantity: 1400, imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80', season: 'Summer 2026' },
  { styleNumber: 'WFX-2026-SH15', styleName: 'Chambray Utility Workshirt', category: 'Shirts', fabric: 'Indigo Chambray Cotton', gsm: 160, color: 'Vintage Wash Indigo', print: 'Solid Color', supplier: 'Textile Horizon Ltd', costPrice: 11.20, sellingPrice: 28.00, stockQuantity: 3400, imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80', season: 'Spring 2026' },
  { styleNumber: 'WFX-2026-PT20', styleName: 'Everyday Comfort Jogger', category: 'Trousers', fabric: 'French Terry Cotton-Poly', gsm: 290, color: 'Slate Grey', print: 'Solid Color', supplier: 'Apex Apparel Source', costPrice: 10.50, sellingPrice: 26.00, stockQuantity: 5200, imageUrl: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?w=600&auto=format&fit=crop&q=80', season: 'Autumn 2026' },
  { styleNumber: 'WFX-2026-KN05', styleName: 'Cable Knit Wool Cardigan', category: 'Knitwear', fabric: 'Shetland Wool Blend', gsm: 450, color: 'Oatmeal Melange', print: 'Solid Color', supplier: 'EuroKnit Fabrics', costPrice: 26.50, sellingPrice: 75.00, stockQuantity: 1100, imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80', season: 'Autumn 2026' },
  { styleNumber: 'WFX-2026-JK04', styleName: 'Waterproof Commuter Shell', category: 'Outerwear', fabric: '3-Layer Gore-Tex', gsm: 150, color: 'Obsidian Black', print: 'Solid Color', supplier: 'Apex Apparel Source', costPrice: 55.00, sellingPrice: 145.00, stockQuantity: 800, imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=80', season: 'Spring 2026' },
  { styleNumber: 'WFX-2026-DR04', styleName: 'Crepe Blazer Dress', category: 'Dresses', fabric: 'Structured Crepe Polyester', gsm: 240, color: 'Pristine Ivory', print: 'Solid Color', supplier: 'Guangdong Silk Co.', costPrice: 19.80, sellingPrice: 54.00, stockQuantity: 1500, imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&auto=format&fit=crop&q=80', season: 'Summer 2026' },
];

const salesOrders = [
  { orderNumber: 'SO-002341', buyer: 'Inditex (Zara)', status: 'processing', totalAmount: 42000, orderDate: '2026-06-15', deliveryDate: '2026-08-01' },
  { orderNumber: 'SO-002342', buyer: 'H&M Group', status: 'shipped', totalAmount: 78500, orderDate: '2026-06-20', deliveryDate: '2026-07-28' },
  { orderNumber: 'SO-002343', buyer: 'Nordstrom Inc.', status: 'delivered', totalAmount: 112000, orderDate: '2026-05-10', deliveryDate: '2026-06-30' },
  { orderNumber: 'SO-002344', buyer: 'ASOS Plc', status: 'pending', totalAmount: 25400, orderDate: '2026-07-01', deliveryDate: '2026-08-15' },
  { orderNumber: 'SO-002345', buyer: 'Uniqlo (Fast Retailing)', status: 'processing', totalAmount: 95000, orderDate: '2026-06-28', deliveryDate: '2026-08-10' },
];

async function seed() {
  console.log('[Seed] Beginning Supabase Database seeding...');

  try {
    // 1. Seed Suppliers
    console.log('Seeding suppliers...');
    const suppliersData = suppliers.map(s => ({
      name: s.name,
      email: s.email,
      phone: s.phone,
      address: s.address,
      supplier_score: s.score,
      on_time_rate: s.onTime,
      lead_time: s.leadTime
    }));

    const { data: sups, error: supErr } = await supabase
      .from('suppliers')
      .upsert(suppliersData, { onConflict: 'email' })
      .select();

    if (supErr) throw supErr;
    console.log(`Successfully seeded ${sups.length} suppliers.`);

    // 2. Seed Buyers
    console.log('Seeding buyers...');
    const buyersData = buyers.map(b => ({
      name: b.name,
      email: b.email,
      phone: b.phone,
      address: b.address
    }));

    const { data: buys, error: buyErr } = await supabase
      .from('buyers')
      .upsert(buyersData, { onConflict: 'email' })
      .select();

    if (buyErr) throw buyErr;
    console.log(`Successfully seeded ${buys.length} buyers.`);

    // 3. Seed Finished Goods (link to seeded suppliers)
    console.log('Seeding finished goods...');
    const fgData = products.map(p => {
      const matchedSup = sups.find(s => s.name === p.supplier);
      return {
        style_number: p.styleNumber,
        style_name: p.styleName,
        category: p.category,
        fabric: p.fabric,
        gsm: p.gsm,
        color: p.color,
        print: p.print,
        supplier_id: matchedSup ? matchedSup.id : null,
        cost_price: p.costPrice,
        selling_price: p.sellingPrice,
        stock_quantity: p.stockQuantity,
        image_url: p.imageUrl,
        season: p.season
      };
    });

    const { data: goods, error: fgErr } = await supabase
      .from('finished_goods')
      .upsert(fgData, { onConflict: 'style_number' })
      .select();

    if (fgErr) throw fgErr;
    console.log(`Successfully seeded ${goods.length} finished goods.`);

    // 4. Seed Sales Orders (link to seeded buyers)
    console.log('Seeding sales orders...');
    const orderData = salesOrders.map(o => {
      const matchedBuyer = buys.find(b => b.name === o.buyer);
      return {
        order_number: o.orderNumber,
        buyer_id: matchedBuyer ? matchedBuyer.id : null,
        status: o.status,
        total_amount: o.totalAmount,
        order_date: new Date(o.orderDate).toISOString(),
        delivery_date: new Date(o.deliveryDate).toISOString()
      };
    });

    const { data: orders, error: orderErr } = await supabase
      .from('sales_orders')
      .upsert(orderData, { onConflict: 'order_number' })
      .select();

    if (orderErr) throw orderErr;
    console.log(`Successfully seeded ${orders.length} sales orders.`);

    // 5. Seed Invoices (link to seeded orders)
    console.log('Seeding invoices...');
    const salesInvoices = [
      { invoiceNumber: 'INV-2026-010', orderNumber: 'SO-002343', invoiceAmount: 112000, status: 'paid', invoiceDate: '2026-07-02' },
      { invoiceNumber: 'INV-2026-011', orderNumber: 'SO-002342', invoiceAmount: 78500, status: 'pending', invoiceDate: '2026-07-05' },
    ];
    const invData = salesInvoices.map(i => {
      const matchedOrder = orders.find(o => o.order_number === i.orderNumber);
      return {
        invoice_number: i.invoiceNumber,
        order_id: matchedOrder ? matchedOrder.id : null,
        invoice_amount: i.invoiceAmount,
        status: i.status,
        invoice_date: new Date(i.invoiceDate).toISOString()
      };
    });

    const { data: invoices, error: invErr } = await supabase
      .from('sales_invoices')
      .upsert(invData, { onConflict: 'invoice_number' })
      .select();

    if (invErr) throw invErr;
    console.log(`Successfully seeded ${invoices.length} invoices.`);

    console.log('[Seed] Seeding completed successfully!');
  } catch (err) {
    console.error('[Seed] Seeding failed:', err.message);
  }
}

seed();

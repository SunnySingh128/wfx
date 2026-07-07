import { supabase, isMockDb } from '../config/supabase.js';
import * as mockDb from './mockDb.js';

async function seed() {
  if (isMockDb) {
    console.log('[Seed] Database is mocked. Programmatic seeding skipped.');
    return;
  }

  console.log('[Seed] Beginning Supabase Database seeding...');

  try {
    // 1. Seed Suppliers
    console.log('Seeding suppliers...');
    const suppliersData = mockDb.suppliers.map(s => ({
      name: s.name,
      company_name: s.name,
      email: s.email,
      phone: s.phone,
      address: s.address,
      country: s.country || 'India',
      contact: s.contact || s.name,
      rating: s.rating || 4.5,
      supplier_score: s.score || 90.00,
      on_time_rate: s.onTime || 95.00,
      lead_time: s.leadTime || '14 days'
    }));

    const { data: sups, error: supErr } = await supabase
      .from('suppliers')
      .upsert(suppliersData, { onConflict: 'email' })
      .select();

    if (supErr) throw supErr;
    console.log(`Successfully seeded ${sups.length} suppliers.`);

    // 2. Seed Buyers
    console.log('Seeding buyers...');
    const buyersData = mockDb.buyers.map(b => ({
      name: b.name,
      company_name: b.name,
      email: b.email,
      phone: b.phone,
      address: b.address || 'Global Offices',
      country: b.country || 'India',
      buyer_category: b.buyerCategory || 'Key Account',
      contact_person: b.contactPerson || b.name
    }));

    const { data: buys, error: buyErr } = await supabase
      .from('buyers')
      .upsert(buyersData, { onConflict: 'email' })
      .select();

    if (buyErr) throw buyErr;
    console.log(`Successfully seeded ${buys.length} buyers.`);

    // 3. Seed Finished Goods (link to seeded suppliers)
    console.log('Seeding finished goods...');
    const fgData = mockDb.products.map(p => {
      // Find matching supplier id
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
        cost: p.costPrice,
        cost_price: p.costPrice,
        selling_price: p.sellingPrice,
        stock_quantity: p.stockQuantity,
        image_url: p.imageUrl,
        season: p.season,
        similarity_score: p.similarityScore || 0.00
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
    const orderData = mockDb.salesOrders.map(o => {
      const matchedBuyer = buys.find(b => b.name === o.buyer);
      const matchedFG = goods && goods.length > 0 ? goods[0] : null;
      return {
        order_number: o.orderNumber,
        buyer_id: matchedBuyer ? matchedBuyer.id : null,
        finished_good_id: matchedFG ? matchedFG.id : null,
        quantity: o.quantity || 100,
        status: o.status,
        total_amount: o.totalAmount,
        order_date: new Date(o.orderDate),
        delivery_date: new Date(o.deliveryDate),
        shipment_date: new Date(o.deliveryDate)
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
    const invData = mockDb.salesInvoices.map(i => {
      const matchedOrder = orders.find(o => o.order_number === i.orderNumber);
      return {
        invoice_number: i.invoiceNumber,
        order_id: matchedOrder ? matchedOrder.id : null,
        sales_order_id: matchedOrder ? matchedOrder.id : null,
        amount: i.invoiceAmount,
        invoice_amount: i.invoiceAmount,
        currency: i.currency || 'USD',
        status: i.status,
        payment_status: i.status,
        invoice_date: new Date(i.invoiceDate)
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

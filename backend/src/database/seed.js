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
    const { data: sups, error: supErr } = await supabase
      .from('suppliers')
      .upsert(mockDb.suppliers.map(s => ({
        name: s.name,
        email: s.email,
        phone: s.phone,
        address: s.address,
        supplier_score: s.score,
        on_time_rate: s.onTime,
        lead_time: s.leadTime
      })), { onConflict: 'email' })
      .select();

    if (supErr) throw supErr;
    console.log(`Successfully seeded ${sups.length} suppliers.`);

    // 2. Seed Buyers
    console.log('Seeding buyers...');
    const { data: buys, error: buyErr } = await supabase
      .from('buyers')
      .upsert(mockDb.buyers.map(b => ({
        name: b.name,
        email: b.email,
        phone: b.phone,
        address: b.address
      })), { onConflict: 'email' })
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
        cost_price: p.costPrice,
        selling_price: p.sellingPrice,
        stock_quantity: p.stockQuantity,
        image_url: p.imageUrl,
        season: p.season,
        similarity_score: p.similarityScore
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
      return {
        order_number: o.orderNumber,
        buyer_id: matchedBuyer ? matchedBuyer.id : null,
        status: o.status,
        total_amount: o.totalAmount,
        order_date: new Date(o.orderDate),
        delivery_date: new Date(o.deliveryDate)
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
        invoice_amount: i.invoiceAmount,
        status: i.status,
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

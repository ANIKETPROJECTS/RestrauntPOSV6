import { mongodb } from '../mongodb';

async function clearKOT() {
  try {
    // Check if MONGODB_URI is available
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not set. Please set it in secrets.');
      process.exit(1);
    }
    const db = mongodb.getDatabase();
    
    console.log('Clearing OrderItems...');
    await db.collection('orderItems').deleteMany({});
    
    console.log('Clearing Orders...');
    await db.collection('orders').deleteMany({});
    
    console.log('Resetting Table statuses...');
    await db.collection('tables').updateMany(
      {},
      { $set: { status: 'free', currentOrderId: null } }
    );
    
    console.log('✅ KOT data cleared successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing KOT:', error);
    process.exit(1);
  }
}

clearKOT();

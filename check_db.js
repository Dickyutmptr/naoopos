const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // Attempt to connect to the database
    await prisma.$connect();
    console.log('✅ Prisma successfully connected to MySQL database!');
    
    // Test a basic query to ensure it can read data
    const userCount = await prisma.user.count();
    console.log(`✅ Successfully queried database. Total Users: ${userCount}`);
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

const sequelize = require('../src/database/connection');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables for tests

// Set JWT_SECRET for testing environment
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret';

beforeAll(async () => {
  // Connect to the test database
  await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
});

afterAll(async () => {
  // Close the database connection after all tests are done
  // await sequelize.close(); // Removed to avoid SQLITE_MISUSE with --forceExit
});

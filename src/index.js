const app = require('./app');
const sequelize = require('./database/connection');

const PORT = process.env.PORT || 3000;

// Sync database and start server
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

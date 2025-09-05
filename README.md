# Express SOLID Boilerplate API

This is a boilerplate for Express.js applications built with SOLID principles and common design patterns.

## Features

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Sequelize**: Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and SQL Server.
- **Passport.js**: Simple, unobtrusive authentication for Node.js.
- **JWT (JSON Web Tokens)**: For stateless authentication.
- **Bcrypt**: For password hashing.
- **Express Validator**: For server-side data validation.
- **Swagger UI Express**: For API documentation.
- **Jest & Supertest**: For testing.
- **dotenv**: For managing environment variables.
- **CORS**: Cross-Origin Resource Sharing enabled.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd boilerplate-express
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file by copying `.env.example` and fill in your environment variables:

    ```bash
    cp .env.example .env
    ```

    Make sure to set `JWT_SECRET` to a strong, random string.

4.  Create the database (if it doesn't exist):

    ```bash
    npx sequelize-cli db:create
    ```

    This command will create the database specified in your `src/config/config.json` for the current environment (development by default).

5.  Run database migrations:
    ```bash
    npx sequelize-cli db:migrate
    ```

### Running the Application

To start the development server:

```bash
npm start
```

The API will be running at `http://localhost:3000` (or your specified PORT).
API documentation will be available at `http://localhost:3000/api-docs`.

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Log in a user and get a JWT token

## Testing

To run tests:

```bash
npm test
```

## Project Structure

```
.env.example
.sequelizerc
package.json
README.md
src/
├── app.js
├── config/
│   └── config.json
├── controllers/
│   └── authController.js
├── database/
│   ├── connection.js
│   └── migrations/
│       └── <timestamp>-create-users-table.js
├── docs/
│   └── swagger.yaml
├── middlewares/
│   ├── auth.js
│   └── validation.js
├── models/
│   ├── index.js
│   └── User.js
├── routes/
│   └── authRoutes.js
├── services/
│   └── authService.js
└── index.js
```

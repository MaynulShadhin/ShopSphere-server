# ShopSphere Backend

## About

This is the backend part of ShopSphere, which manages products and handles user authentication. It uses Node.js and Express.js.

## What You Need

- Node.js (version 16 or later)
- npm (version 7 or later) or yarn

## How to Get Started

1. **Clone the Project**

    ```bash
    git clone https://github.com/yourusername/shop-sphere-backend.git
    cd shop-sphere-backend
    ```

2. **Install Dependencies**

    Using npm:
    ```bash
    npm install
    ```

    Or using yarn:
    ```bash
    yarn install
    ```

3. **Set Up Environment Variables**

    Create a file named `.env` in the project root and add:

    ```env
    MONGO_URI=mongodb://localhost:27017/ShopSphere
    JWT_SECRET=your_jwt_secret
    FIREBASE_CONFIG={"apiKey": "your_api_key", "authDomain": "your_auth_domain", ...}
    ```

4. **Run the Project**

    Start the server:

    Using npm:
    ```bash
    nodemon index.js
    ```
## Database

Make sure MongoDB is running or use your own MongoDB connection string.
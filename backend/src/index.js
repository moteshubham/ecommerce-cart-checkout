/**
 * Main server entry point
 * Sets up Express server with all routes and middleware
 */
import express from 'express';
import cors from 'cors';
import healthRouter from './routes/health.js';
import cartRouter from './routes/cart.js';
import checkoutRouter from './routes/checkout.js';
import adminRouter from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Parse JSON request bodies

// API Routes
app.use('/health', healthRouter); // Health check endpoint
app.use('/cart', cartRouter); // Cart management endpoints
app.use('/checkout', checkoutRouter); // Checkout endpoint
app.use('/admin', adminRouter); // Admin endpoints (coupon generation, reports)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


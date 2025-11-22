import express from 'express';
import cors from 'cors';
import healthRouter from './routes/health.js';
import cartRouter from './routes/cart.js';
import checkoutRouter from './routes/checkout.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/health', healthRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


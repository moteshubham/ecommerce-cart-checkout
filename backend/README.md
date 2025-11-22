# Backend - Ecommerce Cart & Checkout API

Node.js/Express backend server for the ecommerce cart and checkout system.

## Setup

```bash
npm install
npm start
```

The server runs on `http://localhost:3001` by default.

## Environment Variables

- `PORT`: Server port (default: 3001)
- `NTH_ORDER`: Order count threshold for coupon generation (default: 2)

Example:
```bash
PORT=3001 NTH_ORDER=2 npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server status

### Cart Management
- `POST /cart/add` - Add item to cart
- `GET /cart/:userId` - Get user's cart
- `DELETE /cart/:userId/:itemId` - Remove item from cart

### Checkout
- `POST /checkout` - Process checkout (auto-generates coupon if nth order condition met)

### Admin
- `POST /admin/generate-coupon` - Get/retrieve current valid coupon
- `GET /admin/report` - Get analytics report

## Features

- **In-Memory Storage**: All data stored in memory (carts, orders, coupons)
- **Auto Coupon Generation**: Coupons automatically generated after checkout when order count reaches multiples of `NTH_ORDER` (default: 2)
- **Single-Use Coupons**: Each coupon can only be used once
- **10% Discount**: Coupon provides 10% discount on entire order

## Testing

```bash
npm test
```

Runs all unit and integration tests using Jest.

## Project Structure

```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── services/       # Business logic
│   ├── models/         # In-memory data stores
│   ├── routes/         # API route definitions
│   ├── tests/          # Test files
│   ├── utils/          # Utility functions
│   └── index.js        # Server entry point
└── package.json
```

## Data Storage

All data is stored in-memory:
- `carts`: User shopping carts
- `orders`: Order history
- `coupons`: Coupon codes and history
- `usedCoupons`: Set of used coupon codes

**Note:** Data is lost when server restarts.


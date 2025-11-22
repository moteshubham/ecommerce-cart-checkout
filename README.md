# Ecommerce Cart & Checkout

A full-stack ecommerce cart and checkout system built with React frontend and Node.js/Express backend. Features include shopping cart management, checkout with coupon validation, admin coupon generation, and admin reporting.

## Project Overview

This project implements a complete ecommerce shopping experience with:
- **Shopping Cart Management**: Add, view, and remove items from cart
- **Checkout System**: Process orders with optional coupon code validation
- **Coupon System**: Automatic coupon generation every nth order (default: 5th order)
- **Admin Dashboard**: Generate coupons and view analytics reports

### Architecture

- **Backend**: Node.js with Express, in-memory data storage
- **Frontend**: React with Vite, React Router for navigation
- **Testing**: Jest for backend unit and integration tests

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Backend Setup

```bash
cd backend
npm install
npm start
```

The backend server will run on `http://localhost:3001`

**Environment Variables:**
- `PORT`: Server port (default: 3001)
- `NTH_ORDER`: Order count threshold for coupon generation (default: 5)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` (Vite default)

### Running Tests

```bash
# Backend tests
cd backend
npm test
```

## API Documentation

### Base URL
```
http://localhost:3001
```

### Endpoints

#### Health Check
```
GET /health
```
Returns server status.

**Response:**
```json
{
  "status": "ok"
}
```

#### Cart APIs

##### Add Item to Cart
```
POST /cart/add
```

**Request Body:**
```json
{
  "userId": "user1",
  "itemId": "sku123",
  "name": "T-shirt",
  "price": 499.99,
  "qty": 2
}
```

**Response:**
```json
{
  "items": [
    {
      "itemId": "sku123",
      "name": "T-shirt",
      "price": 499.99,
      "qty": 2
    }
  ],
  "total": 999.98
}
```

##### Get User Cart
```
GET /cart/:userId
```

**Response:**
```json
{
  "items": [
    {
      "itemId": "sku123",
      "name": "T-shirt",
      "price": 499.99,
      "qty": 2
    }
  ],
  "total": 999.98
}
```

##### Remove Item from Cart
```
DELETE /cart/:userId/:itemId
```

**Response:**
```json
{
  "items": [],
  "total": 0
}
```

#### Checkout API

##### Process Checkout
```
POST /checkout
```

**Request Body:**
```json
{
  "userId": "user1",
  "couponCode": "ABC123"
}
```

**Response:**
```json
{
  "orderId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "user1",
  "items": [
    {
      "itemId": "sku123",
      "name": "T-shirt",
      "price": 499.99,
      "qty": 2
    }
  ],
  "total": 999.98,
  "discount": 99.998,
  "finalAmount": 899.982,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Note:** `couponCode` is optional. If provided and valid, a 10% discount is applied.

#### Admin APIs

##### Generate Coupon
```
POST /admin/generate-coupon
```

**Response (when coupon generated):**
```json
{
  "coupon": "XYZ12345",
  "generated": true
}
```

**Response (when existing coupon returned):**
```json
{
  "coupon": "XYZ12345",
  "generated": false
}
```

**Response (when no coupon available):**
```json
{
  "error": "No coupon available. Complete more orders to generate a coupon."
}
```

##### Get Admin Report
```
GET /admin/report
```

**Response:**
```json
{
  "totalItemsPurchased": 15,
  "totalPurchaseAmount": 7499.85,
  "coupons": [
    {
      "code": "ABC12345",
      "createdAt": "2024-01-15T10:00:00.000Z"
    }
  ],
  "totalDiscountGiven": 749.985,
  "ordersCount": 5
}
```

## How Coupon Generation Works

The system automatically generates a coupon code when the total order count reaches a multiple of `NTH_ORDER` (default: 5).

### Rules:
1. Every 5th order (configurable via `NTH_ORDER` env var) triggers coupon generation
2. Only one valid coupon exists at a time
3. Coupons are single-use - once used, they cannot be reused
4. After a coupon is used, the system waits for the next nth order to generate a new coupon
5. Coupon discount is 10% of the entire order total

### Example Flow:
1. Orders 1-4: No coupon available
2. Order 5: Coupon "ABC123" generated
3. Order 6-9: Coupon "ABC123" still available (if not used)
4. If "ABC123" is used: System waits for order 10 to generate new coupon
5. Order 10: New coupon "XYZ789" generated

## Sample Requests

### Using cURL

#### Add item to cart
```bash
curl -X POST http://localhost:3001/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user1",
    "itemId": "tshirt-001",
    "name": "T-shirt",
    "price": 499.99,
    "qty": 2
  }'
```

#### Get cart
```bash
curl http://localhost:3001/cart/user1
```

#### Checkout with coupon
```bash
curl -X POST http://localhost:3001/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user1",
    "couponCode": "ABC123"
  }'
```

#### Generate coupon (admin)
```bash
curl -X POST http://localhost:3001/admin/generate-coupon
```

#### Get report (admin)
```bash
curl http://localhost:3001/admin/report
```

## Project Structure

```
ecommerce-cart-checkout/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── models/         # Data stores
│   │   ├── routes/         # API routes
│   │   ├── tests/          # Test files
│   │   ├── utils/          # Utility functions
│   │   └── index.js        # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── services/       # API client
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   └── package.json
└── README.md
```

## Notes and Assumptions

1. **In-Memory Storage**: All data is stored in memory. Restarting the server will clear all data.
2. **No Authentication**: User IDs are simple strings. No authentication/authorization is implemented.
3. **Single Server**: Designed for single-instance deployment. Not suitable for horizontal scaling.
4. **Coupon Validation**: Coupons are validated at checkout time. Invalid or used coupons are rejected.
5. **Order Count**: Order count increments with each successful checkout, regardless of user.

## Development

### Backend Scripts
- `npm start`: Start the server
- `npm test`: Run tests

### Frontend Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## License

ISC

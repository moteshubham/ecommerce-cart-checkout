# API Request Examples

This document provides example requests for all API endpoints.

## Cart Endpoints

### Add Item to Cart

```bash
POST http://localhost:3001/cart/add
Content-Type: application/json

{
  "userId": "user1",
  "itemId": "tshirt-001",
  "name": "T-shirt",
  "price": 499.99,
  "qty": 2
}
```

### Get Cart

```bash
GET http://localhost:3001/cart/user1
```

### Remove Item from Cart

```bash
DELETE http://localhost:3001/cart/user1/tshirt-001
```

## Checkout Endpoint

### Checkout Without Coupon

```bash
POST http://localhost:3001/checkout
Content-Type: application/json

{
  "userId": "user1"
}
```

### Checkout With Coupon

```bash
POST http://localhost:3001/checkout
Content-Type: application/json

{
  "userId": "user1",
  "couponCode": "ABC12345"
}
```

## Admin Endpoints

### Generate Coupon

```bash
POST http://localhost:3001/admin/generate-coupon
```

### Get Report

```bash
GET http://localhost:3001/admin/report
```

## Complete Flow Example

### Step 1: Add Items to Cart
```bash
POST http://localhost:3001/cart/add
{
  "userId": "user1",
  "itemId": "item1",
  "name": "Product 1",
  "price": 100,
  "qty": 2
}

POST http://localhost:3001/cart/add
{
  "userId": "user1",
  "itemId": "item2",
  "name": "Product 2",
  "price": 200,
  "qty": 1
}
```

### Step 2: View Cart
```bash
GET http://localhost:3001/cart/user1
```

### Step 3: Checkout
```bash
POST http://localhost:3001/checkout
{
  "userId": "user1",
  "couponCode": "COUPON123"
}
```

### Step 4: Generate Coupon (after 5 orders)
```bash
POST http://localhost:3001/admin/generate-coupon
```

### Step 5: View Report
```bash
GET http://localhost:3001/admin/report
```


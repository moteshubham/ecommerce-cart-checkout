# Frontend - Ecommerce Cart & Checkout UI

React frontend application built with Vite for the ecommerce cart and checkout system.

## Setup

```bash
npm install
npm run dev
```

The application runs on `http://localhost:5173` by default.

## Features

- **Modern UI**: Professional design with clean color scheme
- **Responsive Design**: Works on desktop and mobile devices
- **Shopping Cart**: Add, view, and remove items
- **Checkout**: Process orders with optional coupon codes
- **Admin Dashboard**: View coupons and analytics
- **Demo Items**: Pre-configured items for quick testing

## Pages

- **Home** (`/`): Browse and add items to cart
- **Cart** (`/cart`): View and manage shopping cart
- **Checkout** (`/checkout`): Complete purchase with optional coupon
- **Admin** (`/admin`): View coupons and analytics reports

## API Configuration

The frontend connects to the backend API. Update the API base URL in `src/services/api.js` if needed:

```javascript
const API_BASE_URL = 'http://localhost:3001';
```

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Project Structure

```
frontend/
├── src/
│   ├── pages/          # Page components (Home, Cart, Checkout, Admin)
│   ├── services/       # API client functions
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Application entry point
└── package.json
```

## UI Theme

The application uses a professional color scheme:
- **Primary Color**: Blue (#2563eb)
- **Background**: Light gray (#f8fafc)
- **Text**: Dark gray (#1e293b)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)

## Dependencies

- React 19+
- React Router DOM - Navigation
- Vite - Build tool

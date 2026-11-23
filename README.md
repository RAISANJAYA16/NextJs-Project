# NextJs-Project

An e-commerce website for browsing and purchasing electronic products.

## Features

- Browse and filter electronic products
- View product details
- Add and remove products from the shopping cart
- User registration and login
- Checkout flow
- Merchant product management
- Responsive interface

## Tech stack

- Next.js
- React
- Tailwind CSS
- Zustand
- React Hook Form

## Getting started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

Create a `.env.local` file in the project root and add the configuration required by your local environment:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/electro_shop
JWT_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_API_BASE_URL=https://mern-20251103-api.vercel.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

Do not commit real credentials or private tokens. The `.env*` files are excluded by `.gitignore`.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

## Local backend and MongoDB

The authentication and order endpoints are implemented as Next.js Route Handlers:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/orders` (the legacy `/api/order` path is also supported)
- `GET /api/orders` (merchant-only all-orders view)
- `GET /api/orders/users`
- `GET /api/orders/:id`
- `PATCH /api/orders/:id` (merchant-only status updates)
- `GET/POST /api/products`
- `GET/PUT/DELETE /api/products/:id` (write operations are merchant-only)

If you do not already have an environment file, copy the example:

```bash
cp .env.example .env.local
```

If `.env.local` already exists, add the missing `MONGODB_URI` and `JWT_SECRET`
values instead of replacing the file.

Start MongoDB locally, or replace `MONGODB_URI` with your MongoDB Atlas URI. In
MongoDB Compass, connect using the same URI. Orders will be stored in the
`electro_shop.orders` collection and users in the `electro_shop.users` collection.

The backend calculates order totals on the server and stores a product snapshot
with each order, so an order remains readable even if the product later changes.

### Merchant account

The merchant account can log in with either its email address or account name.
The current local merchant is `Sanajaya Rai`. To create or change the merchant
account, run the seed command with the desired values:

```bash
MERCHANT_NAME="Sanajaya Rai" \
MERCHANT_EMAIL="sanajaya.rai@electroshop.local" \
MERCHANT_PASSWORD="your-new-password" \
npm run seed:merchant
```

Merchant pages are available at `/private/product-management` and
`/private/orders`. The borrowed external API is only used by the optional
`npm run import:products` migration command; the application now reads and
manages products from the local MongoDB database.

## Available scripts

```bash
npm run dev      # Start the development server
npm run lint     # Run ESLint
npm run build    # Create a production build
npm run start    # Start the production server
```

## Project structure

```text
src/
├── api/          # API and authentication helpers
├── app/          # Next.js App Router pages and components
├── lib/          # Shared utilities
├── stores/       # Client state stores
└── utils/        # General utilities
public/           # Static assets
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

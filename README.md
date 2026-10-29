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
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

Do not commit real credentials or private tokens. The `.env*` files are excluded by `.gitignore`.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

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

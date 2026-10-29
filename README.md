# Next.js
Next.js is a powerful, production-ready framework built on top of the React JavaScript library, developed by Vercel. While React is excellent for rendering user interfaces (the frontend view), Next.js provides the surrounding architecture, configuration, and tooling needed to build complete, full-stack web applications out of the box.

** It is full stack React.js framework for building web apps.
**In addition to building UI components, it also provides for features like routing, styling, data, fetching, rendering, optimization etc.
 ** is uses react server component.
 ** It is opinionated framework(file, folder, convention)

 ##Features

 1. Routing: file based routing
 2. Rendering: Client side rendering(CSR), server side rendering(SSR), static site generation(SSG).
 3. Optimization: images, fonts, scripts
 4. Data fetching: Async data fetching
 5. API Rotes
 6. Styling

 ### Routing
 -file based routing
 -All routes must be inside "src/app" directory
 -Every routes must have "page.js" or "page.tsx"
 -"page.js" or "page.tsx" must have a default export react component.

 1. Simple Routes
 -create a folder inside "arc/app" directory and add "page.js" file
 - src/app/about/page.js
 -src/app/products/page.js

 2. Nested Routes
 - /src/app/courses/backend/nodejs/page.js
 - /src/app/courses/backend/Laravel/page.js
 - /src/app/courses/frontend/react/page.js
 - /src/app/courses/frontend/vue/page.js

3. Dynamic routes
- create a folder enclosed by [].
-src/app/products/[id]page.js

4. Nested Dynamic routes
- /src/app/products/[id]/reviews/[reviewId]page.js

5. Catch all segments

-Create a folder enclosed by []
the name should have rest operator as prefix
-/src/app/blogs/[...slug]/page.js

6. Private folder
-src/app/_foldername

 7. Routes group
 -src/app/(auth)/login
 -src/app/(auth)/register

### layouts
-UI block that is shared among different pages, components.
-"layout.js" or "layout.tsx"

## Special files
-"page.js"
-layout.js"
-loading.js
-"not-found.js"
-"error.js" should always be client component.

### React Server Component
React Server Components are components that render on the server and help reduce the amount of JavaScript sent to the browser. They are ideal for data fetching, backend access, and static content.

### 1. Server component
- Default in Next.js App Router
- Runs on the server
- Can fetch data and access server resources
- Not interactive, so it cannot use browser events or hooks like useState

### 2. Client component
- Must start with `"use client"`
- Runs in the browser
- Supports interactivity, state, and event handlers
- Used for forms, buttons, modals, and other UI that needs user interaction
## Params and Search Params

`params` and `searchParams` both contain URL values, but come from different parts of the URL. For example, `/products/42?limit=10` has a dynamic path segment `id` with value `42`, and a query parameter `limit` with value `10`.

### Server Components

In the App Router, pages receive both values as props. In this Next.js version they are promises, so await them before reading their properties. `params` is available in pages and layouts; `searchParams` is only available in pages.

```js
// src/app/products/[id]/page.js
export default async function ProductPage({ params, searchParams }) {
	const { id } = await params;
	const { limit } = await searchParams;

	return <p>Product {id}; limit: {limit}</p>;
}
```

For `/products/42?limit=10`, `id` is `'42'` and `limit` is `'10'`. Query values are strings; repeated keys can have multiple values.

### Client Components

Use the hooks from `next/navigation` to read the current URL in a Client Component:

```js
'use client';

import { useParams, useSearchParams } from 'next/navigation';

export default function ProductInfo() {
	const { id } = useParams();
	const searchParams = useSearchParams();
	const limit = searchParams.get('limit');

	return <p>Product {id}; limit: {limit}</p>;
}
```

`useSearchParams()` returns a read-only `URLSearchParams` object. Use `.get('limit')` for the first value and `.getAll('limit')` when a query key may appear more than once.

####Flowbite

Flowbite is a UI component library built for Tailwind CSS. It provides ready-made components, such as buttons, forms, and navigation menus, that can be customized with Tailwind utility classes.

### Metadata
-- Metadata api is used to define the metadata of the page.
- Can be only used in `page.js` and `layout.js`
- Useful for search engine optimization (SEO)
- static metadata
-dynamic:  generate metadata
-Note: It can be only used in server component.

## Local configuration

The API URL defaults to the deployed API, but it can be overridden with
`NEXT_PUBLIC_API_BASE_URL`.

Product image uploads require these public Cloudinary settings:

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`


import formatQuery from "@/utils/QueryFormatter";
import { API_BASE_URL } from "./config";
import axios from "axios";
const PRODUCTS_API_URL = `${API_BASE_URL}/api/products`;

export async function getProducts(query = {}) {
  const filter = formatQuery(query?.filter);
  const searchParams = new URLSearchParams({
    limit: String(query.limit ?? 5),
    sort: query.sort ?? JSON.stringify({ createdAt: -1 }),
  });
  if (Object.keys(filter).length > 0) {
    searchParams.set("filter", JSON.stringify(filter));
  }

  const response = await fetch(`${PRODUCTS_API_URL}?${searchParams}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Unable to load products (${response.status})${details ? `: ${details}` : ""}`,
    );
  }

  return response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${PRODUCTS_API_URL}/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Unable to load product (${response.status})${details ? `: ${details}` : ""}`,
    );
  }

  return response.json();
}

export async function addProduct(product, token) {
  if (!token) {
    throw new Error("You must log in with a valid account before adding products.");
  }

  const response = await fetch(PRODUCTS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Unable to add product (${response.status})${details ? `: ${details}` : ""}`,
    );
  }

  const responseBody = await response.text();
  return responseBody ? JSON.parse(responseBody) : null;
}

export async function updateProduct(id, product, token) {
  if (!token) {
    throw new Error("You must log in with a valid account before updating products.");
  }

  const response = await fetch(
    `${PRODUCTS_API_URL}/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(product),
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Unable to update product (${response.status})${details ? `: ${details}` : ""}`,
    );
  }

  const responseBody = await response.text();
  return responseBody ? JSON.parse(responseBody) : null;
}

export async function deleteProduct(id, token) {
  if (!token) {
    throw new Error("You must log in with a valid account before deleting products.");
  }

  const response = await fetch(
    `${PRODUCTS_API_URL}/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Unable to delete product (${response.status})${details ? `: ${details}` : ""}`,
    );
  }
}

export const getCategories = async () => {
  const response = await axios.get(`${PRODUCTS_API_URL}/categories`);
  return response.data;
};

export const getBrands = async () => {
  const response = await axios.get(`${PRODUCTS_API_URL}/brands`);
  return response.data;
};
const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async (limit = 30, skip = 0, options = {}) => {
  const res = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`,
    options
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const fetchProductById = async (id, options = {}) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const fetchProductsByCategory = async (category, options = {}) => {
  const res = await fetch(`${BASE_URL}/products/category/${category}`, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const fetchCategories = async (options = {}) => {
  const res = await fetch(`${BASE_URL}/products/categories`, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const searchProducts = async (query, options = {}) => {
  const res = await fetch(`${BASE_URL}/products/search?q=${query}`, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

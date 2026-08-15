export class ProductService {
  constructor() {
    this.baseURL = "https://nutriplan-api.vercel.app/api";
  }

  async searchProducts(query, page = 1, limit = 24) {
    try {
      const response = await fetch(
        `${this.baseURL}/products/search?q=${encodeURIComponent(
          query,
        )}&page=${page}&limit=${limit}`,
      );

      if (!response.ok) {
        throw new Error("Failed to search products");
      }

      return await response.json();
    } catch (error) {
      if (error.name === "TypeError") {
        throw new Error("Failed to fetch products");
      }

      throw error;
    }
  }

  async getProductByBarcode(barcode) {
    try {
      const response = await fetch(
        `${this.baseURL}/products/barcode/${barcode}`,
      );

      if (!response.ok) {
        throw new Error("Product not found");
      }

      return await response.json();
    } catch (error) {
      if (error.name === "TypeError") {
        throw new Error("Failed to fetch product");
      }

      throw error;
    }
  }
  async getCategories() {
    try {
      const response = await fetch(`${this.baseURL}/products/categories`);

      if (!response.ok) {
        throw new Error("Failed to get categories");
      }

      return await response.json();
    } catch (error) {
      if (error.name === "TypeError") {
        throw new Error("Failed to fetch categories");
      }

      throw error;
    }
  }
  async getProductsByCategory(category) {
    try {
      const response = await fetch(
        `${this.baseURL}/products/category/${encodeURIComponent(category)}`,
      );

      if (!response.ok) {
        throw new Error("Failed to get products by category");
      }

      return await response.json();
    } catch (error) {
      if (error.name === "TypeError") {
        throw new Error("Failed to fetch products");
      }

      throw error;
    }
  }
}

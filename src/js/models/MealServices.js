import { Meal } from "./Meal.js";

export class MealService {
  constructor() {
    this.baseURL = "https://nutriplan-api.vercel.app/api";
  }

  async searchMeals(query, page = 1, limit = 25) {
    try {
      const response = await fetch(
        `${this.baseURL}/meals/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }

      const data = await response.json();
      return data.results.map((meal) => new Meal(meal));
    } catch (error) {
      if (error.name === "TypeError") {
        throw new Error(
          "Unable to connect to the server. Please check your internet connection.",
        );
      }

      throw error;
    }
  }

  async getAreas() {
    try {
      const response = await fetch(`${this.baseURL}/meals/areas`);
      if (!response.ok) throw new Error("Failed to fetch areas");
      const data = await response.json();
      return data.results;
    } catch (error) {
      if (error.name === "TypeError") {
        throw new Error(
          "Unable to connect to the server. Please check your internet connection.",
        );
      }

      throw error;
    }
  }

  async getCategories() {
    try {
      const response = await fetch(`${this.baseURL}/meals/categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      return data.results;
    } catch (error) {
      if (error.name === "TypeError") {
        throw new Error(
          "Unable to connect to the server. Please check your internet connection.",
        );
      }

      throw error;
    }
  }

  async filterMeals({ category, area, ingredient, page = 1, limit = 25 }) {
    try {
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (area) params.append("area", area);
      if (ingredient) params.append("ingredient", ingredient);
      params.append("page", page);
      params.append("limit", limit);

      const response = await fetch(
        `${this.baseURL}/meals/filter?${params.toString()}`,
      );
      if (!response.ok) throw new Error("Failed to filter meals");
      const data = await response.json();
      return data.results.map((meal) => new Meal(meal));
    } catch (error) {
      if (error.name === "TypeError") {
        throw new Error(
          "Unable to connect to the server. Please check your internet connection.",
        );
      }

      throw error;
    }
  }

  async getMealById(id) {
    try {
      const response = await fetch(`${this.baseURL}/meals/${id}`);
      if (!response.ok) throw new Error("Failed to fetch meal details");
      const data = await response.json();
      return new Meal(data.result);
    } catch (error) {
      if (error.name === "TypeError") {
        throw new Error(
          "Unable to connect to the server. Please check your internet connection.",
        );
      }

      throw error;
    }
  }
}

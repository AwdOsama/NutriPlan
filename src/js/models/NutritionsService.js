export class NutritionService {
  constructor() {
    this.baseURL = "https://nutriplan-api.vercel.app/api";
  }

  async analyzeRecipe(recipeName, ingredients) {
    try {
      const response = await fetch(`${this.baseURL}/nutrition/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "ABuaFvFOPIg3ULxrwNUhByrXRyxQvWZaEduiQ6I3",
        },
        body: JSON.stringify({
          recipeName,
          ingredients,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze nutrition");
      }

      return await response.json();
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

export class FoodLogService {
  constructor() {
    this.storageKey = "foodLog";
  }

  saveMeal(meal) {
    const meals = this.getMeals();

    const newMeal = {
      ...meal,
      id: crypto.randomUUID(),
    };

    meals.push(newMeal);

    localStorage.setItem(this.storageKey, JSON.stringify(meals));
  }

  getMeals() {
    const meals = localStorage.getItem(this.storageKey);

    if (!meals) return [];

    const parsedMeals = JSON.parse(meals);

    let changed = false;

    const mealsWithIds = parsedMeals.map((meal) => {
      if (!meal.id) {
        changed = true;

        return {
          ...meal,
          id: crypto.randomUUID(),
        };
      }

      return meal;
    });

    if (changed) {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(mealsWithIds)
      );
    }

    return mealsWithIds;
  }

  getTodayMeals() {
    const today = new Date();

    return this.getMeals().filter((meal) => {
      const mealDate = new Date(meal.loggedAt);

      return (
        mealDate.getFullYear() === today.getFullYear() &&
        mealDate.getMonth() === today.getMonth() &&
        mealDate.getDate() === today.getDate()
      );
    });
  }

  deleteMeal(id) {
    const meals = this.getMeals();

    const updatedMeals = meals.filter(
      (meal) => meal.id !== id
    );

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(updatedMeals)
    );
  }

  clearTodayMeals() {
    const today = new Date();

    const meals = this.getMeals();

    const remainingMeals = meals.filter((meal) => {
      const mealDate = new Date(meal.loggedAt);

      return !(
        mealDate.getFullYear() === today.getFullYear() &&
        mealDate.getMonth() === today.getMonth() &&
        mealDate.getDate() === today.getDate()
      );
    });

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(remainingMeals)
    );
  }

  clearMeals() {
    localStorage.removeItem(this.storageKey);
  }
}
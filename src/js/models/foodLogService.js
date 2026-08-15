export class FoodLogService {
  constructor() {
    this.storageKey = "foodLog";
  }

  saveMeal(meal) {
    const meals = this.getMeals();

    meals.push(meal);

    localStorage.setItem(this.storageKey, JSON.stringify(meals));
  }

  getMeals() {
    const meals = localStorage.getItem(this.storageKey);

    return meals ? JSON.parse(meals) : [];
  }

  deleteMeal(index) {
    const meals = this.getMeals();

    meals.splice(index, 1);

    localStorage.setItem(this.storageKey, JSON.stringify(meals));
  }
  clearMeals() {
    localStorage.removeItem(this.storageKey);
  }
}

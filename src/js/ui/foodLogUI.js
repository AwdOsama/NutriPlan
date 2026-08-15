export class FoodLogUI {
  constructor(foodLogService) {
    this.foodLogService = foodLogService;

    this.foodLogDate = document.getElementById("foodlog-date");
    this.loggedItemsList = document.getElementById("logged-items-list");
    this.clearFoodLogBtn = document.getElementById("clear-foodlog");

    this.caloriesSummary = document.getElementById("calories-summary");
    this.caloriesPercentage = document.getElementById("calories-percentage");
    this.caloriesProgress = document.getElementById("calories-progress");

    this.proteinSummary = document.getElementById("protein-summary");
    this.proteinPercentage = document.getElementById("protein-percentage");
    this.proteinProgress = document.getElementById("protein-progress");

    this.carbsSummary = document.getElementById("carbs-summary");
    this.carbsPercentage = document.getElementById("carbs-percentage");
    this.carbsProgress = document.getElementById("carbs-progress");

    this.fatSummary = document.getElementById("fat-summary");
    this.fatPercentage = document.getElementById("fat-percentage");
    this.fatProgress = document.getElementById("fat-progress");

    this.loggedItemsCount = document.getElementById("logged-items-count");
    this.weeklyOverview = document.getElementById("weekly-overview");
    this.weeklyAverage = document.getElementById("weekly-average");
    this.totalItems = document.getElementById("total-items");
    this.daysOnGoal = document.getElementById("days-on-goal");

    this.onBrowseRecipes = null;
    this.onScanProduct = null;
  }

  btnsCallBack(onBrowseRecipes, onScanProduct) {
    this.onBrowseRecipes = onBrowseRecipes;
    this.onScanProduct = onScanProduct;
  }
  renderLoggedMeals(meals) {
    this.loggedItemsList.innerHTML = "";

    if (meals.length === 0) {
      this.loggedItemsCount.textContent = `Logged Items (0)`;

      this.loggedItemsList.innerHTML = `
    <div class="text-center py-8 text-gray-500">
      <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>

      <p class="font-medium">
        No meals logged today
      </p>

      <p class="text-sm mb-5">
        Add meals from the Meals page or scan products
      </p>

      <div class="flex justify-center gap-3">
        <button
          id="browse-recipes-btn"
          class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
        >
          <i class="fa-solid fa-plus"></i>
          Browse Recipes
        </button>

        <button
          id="scan-product-btn"
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          <i class="fa-solid fa-barcode"></i>
          Scan Product
        </button>
      </div>
    </div>
  `;

      this.clearFoodLogBtn.style.display = "none";

      document
        .getElementById("browse-recipes-btn")
        .addEventListener("click", () => {
          if (this.onBrowseRecipes) {
            this.onBrowseRecipes();
          }
        });

      document
        .getElementById("scan-product-btn")
        .addEventListener("click", () => {
          if (this.onScanProduct) {
            this.onScanProduct();
          }
        });

      return;
    }
    this.loggedItemsCount.textContent = `Logged Items (${meals.length})`;
    this.clearFoodLogBtn.style.display = "block";

    const mealsContainer = document.createElement("div");

    mealsContainer.className = "space-y-3 max-h-96 overflow-y-auto";

    meals.forEach((meal, index) => {
      const mealElement = document.createElement("div");

      mealElement.className =
        "flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all";

      const loggedTime = new Date(meal.loggedAt).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

      mealElement.innerHTML = `
      <div class="flex items-center gap-4">

        <img
          src="${meal.thumbnail}"
          alt="${meal.name}"
          class="w-14 h-14 rounded-xl object-cover"
        />

        <div>
          <p class="font-semibold text-gray-900">
            ${meal.name}
          </p>

          <p class="text-sm text-gray-500">
            ${meal.servings} serving
            <span class="mx-1">•</span>
    <span class="text-emerald-600">
  ${meal.type === "product" ? "Product" : "Recipe"}
</span>
          </p>

          <p class="text-xs text-gray-400 mt-1">
            ${loggedTime}
          </p>
        </div>

      </div>

      <div class="flex items-center gap-4">

        <div class="text-right">
          <p class="text-lg font-bold text-emerald-600">
            ${meal.nutrition.calories}
          </p>

          <p class="text-xs text-gray-500">
            kcal
          </p>
        </div>

        <div class="hidden md:flex gap-2 text-xs text-gray-500">

          <span class="px-2 py-1 bg-blue-50 rounded">
            ${Math.round(meal.nutrition.protein)}g P
          </span>

          <span class="px-2 py-1 bg-amber-50 rounded">
            ${Math.round(meal.nutrition.carbs)}g C
          </span>

          <span class="px-2 py-1 bg-purple-50 rounded">
            ${Math.round(meal.nutrition.fat)}g F
          </span>

        </div>

        <button
          class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2"
          data-index="${index}"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>

      </div>
    `;

      mealsContainer.appendChild(mealElement);
    });

    this.loggedItemsList.appendChild(mealsContainer);
    const deleteButtons = this.loggedItemsList.querySelectorAll(
      ".remove-foodlog-item",
    );

    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.index);

        this.foodLogService.deleteMeal(index);

        this.updateFoodLog();
      });
    });
  }
  updateSummary(meals) {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    meals.forEach((meal) => {
      calories += Number(meal.nutrition.calories);
      protein += Number(meal.nutrition.protein);
      carbs += Number(meal.nutrition.carbs);
      fat += Number(meal.nutrition.fat);
    });

    this.caloriesSummary.textContent = `${calories} kcal`;
    this.proteinSummary.textContent = `${protein.toFixed(1)} g`;
    this.carbsSummary.textContent = `${carbs.toFixed(1)} g`;
    this.fatSummary.textContent = `${fat.toFixed(1)} g`;

    const caloriesPercentage = (calories / 2000) * 100;

    this.caloriesProgress.style.width = `${Math.min(caloriesPercentage, 100)}%`;
    this.caloriesPercentage.textContent = `${Math.round(Math.min(caloriesPercentage, 100))}%`;
    this.updateProgressColor(
      this.caloriesProgress,
      this.caloriesPercentage,
      this.caloriesSummary,
      caloriesPercentage,
    );

    const proteinPercentage = (protein / 50) * 100;

    this.proteinProgress.style.width = `${Math.min(proteinPercentage, 100)}%`;
    this.proteinPercentage.textContent = `${Math.round(Math.min(proteinPercentage, 100))}%`;
    this.updateProgressColor(
      this.proteinProgress,
      this.proteinPercentage,
      this.proteinSummary,
      proteinPercentage,
    );
    const carbsPercentage = (carbs / 250) * 100;

    this.carbsProgress.style.width = `${Math.min(carbsPercentage, 100)}%`;
    this.carbsPercentage.textContent = `${Math.round(Math.min(carbsPercentage, 100))}%`;
    this.updateProgressColor(
      this.carbsProgress,
      this.carbsPercentage,
      this.carbsSummary,
      carbsPercentage,
    );
    const fatPercentage = (fat / 65) * 100;

    this.fatProgress.style.width = `${Math.min(fatPercentage, 100)}%`;
    this.fatPercentage.textContent = `${Math.round(Math.min(fatPercentage, 100))}%`;

    this.updateProgressColor(
      this.fatProgress,
      this.fatPercentage,
      this.fatSummary,
      fatPercentage,
    );
  }

  updateProgressColor(progress, percentageElement, summaryElement, percentage) {
    progress.classList.remove(
      "bg-emerald-500",
      "bg-blue-500",
      "bg-amber-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-red-500",
    );

    percentageElement.classList.remove(
      "text-emerald-500",
      "text-blue-500",
      "text-amber-500",
      "text-purple-500",
      "text-orange-500",
      "text-red-500",
    );

    summaryElement.classList.remove(
      "text-emerald-600",
      "text-blue-600",
      "text-amber-600",
      "text-purple-600",
      "text-orange-600",
      "text-red-600",
    );

    if (percentage <= 50) {
      progress.classList.add("bg-emerald-500");

      percentageElement.classList.add("text-emerald-500");

      summaryElement.classList.add("text-emerald-600");
    } else if (percentage < 80) {
      progress.classList.add("bg-orange-500");

      percentageElement.classList.add("text-orange-500");

      summaryElement.classList.add("text-orange-600");
    } else {
      progress.classList.add("bg-red-500");

      percentageElement.classList.add("text-red-500");

      summaryElement.classList.add("text-red-600");
    }
  }
  ClearAll() {
    this.clearFoodLogBtn.addEventListener("click", () => {
      Swal.fire({
        title: "Clear All Meals?",
        text: "This will remove all your logged meals.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Clear All",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          this.foodLogService.clearMeals();

          this.updateFoodLog();

          Swal.fire({
            icon: "success",
            title: "Cleared!",
            text: "All meals have been cleared.",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    });
  }
  updateFoodLog() {
    const meals = this.foodLogService.getMeals();

    this.renderLoggedMeals(meals);

    this.updateSummary(meals);
    this.renderWeeklyOverview(meals);
    this.updateStatistics(meals);
  }
  getCurrentWeekDays() {
    const today = new Date();
    const day = today.getDay();

    const saturday = new Date(today);
    saturday.setDate(today.getDate() - ((day + 1) % 7));

    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(saturday);
      date.setDate(saturday.getDate() + i);

      days.push(date);
    }

    return days;
  }
  getWeeklyData(meals) {
    const weekDays = this.getCurrentWeekDays();

    return weekDays.map((date) => {
      const dayMeals = meals.filter((meal) => {
        const mealDate = new Date(meal.loggedAt);

        return (
          mealDate.getFullYear() === date.getFullYear() &&
          mealDate.getMonth() === date.getMonth() &&
          mealDate.getDate() === date.getDate()
        );
      });

      const calories = dayMeals.reduce((total, meal) => {
        return total + Number(meal.nutrition.calories);
      }, 0);
      const protein = dayMeals.reduce((total, meal) => {
        return total + Number(meal.nutrition.protein);
      }, 0);

      const carbs = dayMeals.reduce((total, meal) => {
        return total + Number(meal.nutrition.carbs);
      }, 0);

      const fat = dayMeals.reduce((total, meal) => {
        return total + Number(meal.nutrition.fat);
      }, 0);
      return {
        date: date,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat,
        items: dayMeals.length,
      };
    });
  }
  renderWeeklyOverview(meals) {
    const weeklyData = this.getWeeklyData(meals);

    this.weeklyOverview.innerHTML = "";

    const today = new Date();

    weeklyData.forEach((day) => {
      const isToday =
        day.date.getFullYear() === today.getFullYear() &&
        day.date.getMonth() === today.getMonth() &&
        day.date.getDate() === today.getDate();

      const dayElement = document.createElement("div");

      dayElement.className = isToday
        ? "text-center bg-indigo-100 rounded-xl"
        : "text-center";

      const dayName = day.date.toLocaleDateString("en-US", {
        weekday: "short",
      });

      const dayNumber = day.date.getDate();

      dayElement.innerHTML = `
      <p class="text-xs text-gray-500 mb-1">${dayName}</p>

      <p class="text-sm font-medium text-gray-900">
        ${dayNumber}
      </p>

      <div class="mt-2 ${day.calories > 0 ? "text-emerald-600" : "text-gray-300"}">
        <p class="text-lg font-bold">
          ${day.calories}
        </p>

        <p class="text-xs">
          kcal
        </p>
      </div>

      ${
        day.items > 0
          ? `<p class="text-xs text-gray-400 mt-1">${day.items} items</p>`
          : ""
      }
    `;

      this.weeklyOverview.appendChild(dayElement);
    });
  }
  updateStatistics(meals) {
    const weeklyData = this.getWeeklyData(meals);

    const totalItems = weeklyData.reduce((total, day) => {
      return total + day.items;
    }, 0);

    this.totalItems.textContent = `${totalItems} items`;

    const totalCalories = weeklyData.reduce((total, day) => {
      return total + day.calories;
    }, 0);

    const weeklyAverage = Math.round(totalCalories / 7);

    this.weeklyAverage.textContent = `${weeklyAverage} kcal`;

    const onGoalDays = weeklyData.filter((day) => {
      return (
        day.calories <= 2000 &&
        day.protein >= 50 &&
        day.carbs >= 250 &&
        day.fat >= 65
      );
    }).length;

    this.daysOnGoal.textContent = `${onGoalDays} / 7`;
  }
}

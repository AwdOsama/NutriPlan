// =========== Loading Spinner Design ============
/*
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
*/

// =========== Empty State Design ============
/*
<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>
*/
export class HomeUI {
  constructor(foodLogService, foodLogUI) {
    this.foodLogService = foodLogService;

    this.foodLogUI = foodLogUI;
    this.foodLogService = foodLogService;
    this.mealsLink = document.getElementById("meals-link");
    this.scannerLink = document.getElementById("scanner-link");
    this.foodLogLink = document.getElementById("foodlog-link");
    this.productsSection = document.getElementById("products-section");
    this.foodLogSection = document.getElementById("foodlog-section");
    this.sidebarOverlay = document.getElementById("sidebar-overlay");
    this.sidebar = document.getElementById("sidebar");
    // this.headerMenuBtn = document.getElementById("header-menu-btn");
    // this.sidebarCloseBtn = document.getElementById("sidebar-close-btn");
    // للسايد بار في الموبيل بس مش شغال خالص
    this.mainContent = document.getElementById("main-content");
    this.appLoadingOverlay = document.getElementById("app-loading-overlay");
    this.recipesGrid = document.getElementById("recipes-grid");
    this.recipesCount = document.getElementById("recipes-count");
    this.searchInput = document.getElementById("search-input");
    this.categoriesGrid = document.getElementById("categories-grid");
    this.areasContainer = document.getElementById("areasContainer");
    this.gridViewBtn = document.getElementById("grid-view-btn");
    this.listViewBtn = document.getElementById("list-view-btn");
    this.currentView = "grid";
    this.currentMeals = [];
    this.mealDetails = document.getElementById("meal-details");
    this.mealDetails.classList.add("hidden");
    this.onMealClick = null;
    this.ingredientsContainer = document.getElementById(
      "ingredients-container",
    );
    this.mealImage = document.getElementById("meal-image");
    this.mealBadges = document.getElementById("meal-badges");
    this.mealTitle = document.getElementById("meal-title");

    this.heroServings = document.getElementById("hero-servings");
    this.heroCalories = document.getElementById("hero-calories");

    this.nutritionCalories = document.getElementById("nutrition-calories");
    this.nutritionProtein = document.getElementById("nutrition-protein");
    this.nutritionCarbs = document.getElementById("nutrition-carbs");
    this.nutritionFat = document.getElementById("nutrition-fat");
    this.nutritionFiber = document.getElementById("nutrition-fiber");
    this.nutritionSugar = document.getElementById("nutrition-sugar");

    this.nutritionTotalCalories = document.getElementById(
      "nutrition-total-calories",
    );

    this.nutritionLoading = document.getElementById("nutrition-loading");

    this.nutritionProteinBar = document.getElementById("nutrition-protein-bar");
    this.nutritionCarbsBar = document.getElementById("nutrition-carbs-bar");

    this.nutritionFatBar = document.getElementById("nutrition-fat-bar");

    this.nutritionFiberBar = document.getElementById("nutrition-fiber-bar");

    this.nutritionSugarBar = document.getElementById("nutrition-sugar-bar");
    this.nutritionSaturatedFatBar = document.getElementById(
      "nutrition-saturated-fat-bar",
    );

    this.ingredientsCount = document.getElementById("ingredients-count");
    this.nutritionSodium = document.getElementById("nutrition-sodium");

    this.nutritionCholesterol = document.getElementById(
      "nutrition-cholesterol",
    );

    this.nutritionSaturatedFat = document.getElementById(
      "nutrition-saturated-fat",
    );

    this.instructionsContainer = document.getElementById(
      "instructions-container",
    );

    this.mealVideo = document.getElementById("meal-video");
    this.searchFiltersSection = document.getElementById(
      "search-filters-section",
    );
    this.videoContainer = document.getElementById("video-container");

    this.mealCategoriesSection = document.getElementById(
      "meal-categories-section",
    );

    this.allRecipesSection = document.getElementById("all-recipes-section");

    this.backToMealsBtn = document.getElementById("back-to-meals-btn");
    this.pageTitle = document.getElementById("page-title");
    this.pageDescription = document.getElementById("page-description");
    this.currentMeal = null;
    this.currentNutrition = null;
    this.logMealBtn = document.getElementById("log-meal-btn");
  }
  // setupSidebar() {
  //   this.headerMenuBtn.addEventListener("click", () => {

  //     this.sidebar.classList.remove("hidden");
  //     this.sidebarOverlay.classList.remove("hidden");

  //   });

  //   this.sidebarCloseBtn.addEventListener("click", () => {
  //     this.sidebar.classList.add("hidden");
  //     this.sidebarOverlay.classList.add("hidden");
  //   });

  //   this.sidebarOverlay.addEventListener("click", () => {
  //     this.sidebar.classList.add("hidden");
  //     this.sidebarOverlay.classList.add("hidden");
  //   });
  // }
  // للسايد بار في الموبيل بس مش شغال خالص
  resetNavLinks() {
    const links = [this.mealsLink, this.scannerLink, this.foodLogLink];

    links.forEach((link) => {
      link.classList.remove("bg-emerald-50", "text-emerald-700");

      link.classList.add("text-gray-600");
    });
  }
  setActiveLink(activeLink) {
    this.resetNavLinks();

    activeLink.classList.remove("text-gray-600");

    activeLink.classList.add("bg-emerald-50", "text-emerald-700");
  }
  showMealsPage() {
    this.pageTitle.textContent = "Meals & Recipes";
    this.pageDescription.textContent =
      "Discover delicious and nutritious recipes tailored for you";
    this.mealDetails.classList.add("hidden");
    sessionStorage.setItem("activePage", "meals");

    this.searchFiltersSection.classList.remove("hidden");
    this.mealCategoriesSection.classList.remove("hidden");
    this.allRecipesSection.classList.remove("hidden");

    this.foodLogSection.classList.add("hidden");
    this.productsSection.classList.add("hidden");

    this.setActiveLink(this.mealsLink);
  }
  setupNavigation() {
    this.mealsLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.showMealsPage();
    });

    this.scannerLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.showProductsPage();
    });

    this.foodLogLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.showFoodLogPage();
    });
  }

  showProductsPage() {
    sessionStorage.setItem("activePage", "products");
    this.pageTitle.textContent = "Product Scanner";
    this.pageDescription.textContent =
      "Search packaged foods by name or barcode";

    this.mealDetails.classList.add("hidden");
    this.searchFiltersSection.classList.add("hidden");
    this.mealCategoriesSection.classList.add("hidden");
    this.allRecipesSection.classList.add("hidden");

    this.foodLogSection.classList.add("hidden");
    this.productsSection.classList.remove("hidden");

    this.setActiveLink(this.scannerLink);
  }

  showFoodLogPage() {
    sessionStorage.setItem("activePage", "foodlog");
    this.pageTitle.textContent = "Food Log";
    this.pageDescription.textContent =
      "Track your daily nutrition and food intake";

    this.mealDetails.classList.add("hidden");

    this.searchFiltersSection.classList.add("hidden");
    this.mealCategoriesSection.classList.add("hidden");
    this.allRecipesSection.classList.add("hidden");

    this.foodLogSection.classList.remove("hidden");
    this.productsSection.classList.add("hidden");

    this.setActiveLink(this.foodLogLink);
  }

  hideAppLoading() {
    setTimeout(() => {
      this.appLoadingOverlay.classList.add("hidden");

      this.sidebarOverlay.classList.remove("hidden");
      this.sidebar.classList.remove("hidden");
      this.mainContent.classList.remove("hidden");
    }, 500);
  }

  renderRecipes(meals, onMealClick, title = "") {
    this.currentMeals = meals;
    this.currentTitle = title;
    this.onMealClick = onMealClick;

    this.renderRecipeCards();
  }

  renderRecipeCards() {
    this.recipesGrid.innerHTML = "";

    const filterLabel = this.currentTitle ? `"${this.currentTitle}" ` : "";
    this.recipesCount.textContent = `Showing ${this.currentMeals.length} ${filterLabel}recipes`;

    if (this.currentMeals.length === 0) {
      this.recipesGrid.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-12 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
        </div>

        <p class="text-gray-500 text-lg">
          No recipes found
        </p>

        <p class="text-gray-400 text-sm mt-2">
          Try searching for something else
        </p>
      </div>
    `;

      return;
    }

    this.currentMeals.forEach((meal) => {
      const card = this.createRecipeCard(meal);
      this.recipesGrid.appendChild(card);
    });
  }

  renderCurrentRecipes() {
    this.renderRecipeCards();
  }

  createRecipeCard(meal) {
    if (this.currentView === "list") {
      return this.createListRecipeCard(meal);
    }

    return this.createGridRecipeCard(meal);
  }

  createGridRecipeCard(meal) {
    const card = document.createElement("div");

    card.className =
      "recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group";

    card.dataset.mealId = meal.id;

    card.innerHTML = `
    <div class="relative h-48 overflow-hidden">
      <img
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        src="${meal.thumbnail}"
        alt="${meal.name}"
        loading="lazy"
      />

      <div class="absolute bottom-3 left-3 flex gap-2">
        <span
          class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
        >
          ${meal.category || "Unknown"}
        </span>

        <span
          class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
        >
          ${meal.area || "Unknown"}
        </span>
      </div>
    </div>

    <div class="p-4">
      <h3
        class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
      >
        ${meal.name}
      </h3>

      <p class="text-xs text-gray-600 mb-3 line-clamp-2">
        Delicious recipe to try!
      </p>

      <div class="flex items-center justify-between text-xs">
        <span class="font-semibold text-gray-900">
          <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
          ${meal.category || "Unknown"}
        </span>

        <span class="font-semibold text-gray-500">
          <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
          ${meal.area || "Unknown"}
        </span>
      </div>
    </div>
  `;
    card.addEventListener("click", () => {
      this.onMealClick(meal.id);
    });
    return card;
  }

  createListRecipeCard(meal) {
    const card = document.createElement("div");

    card.className =
      "recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-row h-40";

    card.dataset.mealId = meal.id;

    card.innerHTML = `
    <div class="relative overflow-hidden w-48 h-full">
      <img
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        src="${meal.thumbnail}"
        alt="${meal.name}"
        loading="lazy"
      />
    </div>

    <div class="p-4 flex-1 min-w-0">
      <h3
        class="text-base font-bold text-gray-900 mb-1
        group-hover:text-emerald-600 transition-colors line-clamp-1"
      >
        ${meal.name}
      </h3>

      <p class="text-xs text-gray-600 mb-3 line-clamp-2">
        ${meal.instructions || "No description available."}
      </p>

      <div class="flex items-center justify-between text-xs">
        <span class="font-semibold text-gray-900">
          <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
          ${meal.category || "Unknown"}
        </span>

        <span class="font-semibold text-gray-500">
          <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
          ${meal.area || "Unknown"}
        </span>
      </div>
    </div>
  `;

    card.addEventListener("click", () => {
      this.onMealClick(meal.id);
    });
    return card;
  }

  setView(view) {
    this.currentView = view;

    this.gridViewBtn.classList.remove("bg-white", "rounded-md", "shadow-sm");

    this.listViewBtn.classList.remove("bg-white", "rounded-md", "shadow-sm");

    if (view === "grid") {
      this.recipesGrid.classList.remove("grid-cols-2");
      this.recipesGrid.classList.add("grid-cols-4");

      this.gridViewBtn.classList.add("bg-white", "rounded-md", "shadow-sm");
    } else {
      this.recipesGrid.classList.remove("grid-cols-4");
      this.recipesGrid.classList.add("grid-cols-2");

      this.listViewBtn.classList.add("bg-white", "rounded-md", "shadow-sm");
    }
  }

  setupViewToggle() {
    this.gridViewBtn.addEventListener("click", () => {
      this.setView("grid");
      this.renderCurrentRecipes();
    });

    this.listViewBtn.addEventListener("click", () => {
      this.setView("list");
      this.renderCurrentRecipes();
    });
  }

  getSearchInput() {
    return this.searchInput;
  }

  renderAreas(areas, onAreaClick) {
    this.areasContainer.innerHTML = "";

    const allButton = document.createElement("button");

    allButton.className =
      "px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all";

    allButton.textContent = "All Recipes";

    allButton.addEventListener("click", () => {
      this.setActiveAreaButton(allButton);
      onAreaClick("");
    });

    this.areasContainer.appendChild(allButton);

    areas.slice(0, 12).forEach((area) => {
      const button = document.createElement("button");

      button.className =
        "px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all";

      button.textContent = area.name;

      button.addEventListener("click", () => {
        this.setActiveAreaButton(button);
        onAreaClick(area.name);
      });

      this.areasContainer.appendChild(button);
    });
  }

  renderCategories(categories, onCategoryClick) {
    const categoryStyles = {
      Beef: {
        icon: "fa-drumstick-bite",
        color: "from-red-400 to-red-500",
      },

      Chicken: {
        icon: "fa-drumstick-bite",
        color: "from-orange-400 to-orange-500",
      },

      Dessert: {
        icon: "fa-cake-candles",
        color: "from-pink-400 to-pink-500",
      },

      Lamb: {
        icon: "fa-drumstick-bite",
        color: "from-orange-400 to-yellow-500",
      },

      Miscellaneous: {
        icon: "fa-utensils",
        color: "from-green-400 to-green-500",
      },

      Pasta: {
        icon: "fa-bowl-food",
        color: "from-yellow-400 to-yellow-500",
      },

      Pork: {
        icon: "fa-drumstick-bite",
        color: "from-red-400 to-red-500",
      },

      Seafood: {
        icon: "fa-fish",
        color: "from-blue-400 to-blue-500",
      },

      Side: {
        icon: "fa-bowl-food",
        color: "from-green-400 to-green-500",
      },

      Starter: {
        icon: "fa-utensils",
        color: "from-cyan-400 to-cyan-500",
      },

      Vegan: {
        icon: "fa-leaf",
        color: "from-green-400 to-green-500",
      },

      Vegetarian: {
        icon: "fa-seedling",
        color: "from-lime-400 to-green-500",
      },

      Breakfast: {
        icon: "fa-egg",
        color: "from-yellow-400 to-orange-500",
      },

      Goat: {
        icon: "fa-drumstick-bite",
        color: "from-red-400 to-red-500",
      },
    };
    this.categoriesGrid.innerHTML = "";

    categories.forEach((category) => {
      const card = document.createElement("div");

      const style = categoryStyles[category.name] || {
        icon: "fa-utensils",
        color: "from-emerald-400 to-green-500",
      };

      card.className =
        "category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group";

      card.dataset.category = category.name;

      card.innerHTML = `
    <div class="flex items-center gap-2.5">

      <div
        class="text-white w-9 h-9
        bg-gradient-to-br ${style.color}
        rounded-lg flex items-center justify-center
        group-hover:scale-110 transition-transform shadow-sm"
      >
        <i class="fa-solid ${style.icon}"></i>
      </div>

      <div>
        <h3 class="text-sm font-bold text-gray-900">
          ${category.name}
        </h3>
      </div>

    </div>
  `;
      card.addEventListener("click", () => {
        onCategoryClick(category.name);
      });
      this.categoriesGrid.appendChild(card);
    });
  }

  setActiveAreaButton(activeButton) {
    const buttons = this.areasContainer.querySelectorAll("button");

    buttons.forEach((button) => {
      button.classList.remove("bg-emerald-600", "text-white");

      button.classList.add("bg-gray-100", "text-gray-700");
    });

    activeButton.classList.remove("bg-gray-100", "text-gray-700");

    activeButton.classList.add("bg-emerald-600", "text-white");
  }
  renderMealDetails(meal) {
    this.currentMeal = meal;
    this.showMealDetails();
    if (this.logMealBtn) {
      this.logMealBtn.disabled = true;
      this.logMealBtn.classList.add("opacity-70", "cursor-not-allowed");

      this.logMealBtn.innerHTML = `
    <span class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
    <span>Calculating...</span>
  `;
    }
    this.nutritionLoading.style.display = "flex";
    ////////////////////////////culc
    this.nutritionCalories.textContent = "Calculating...";
    this.nutritionProtein.textContent = "Calculating...";
    this.nutritionCarbs.textContent = "Calculating...";
    this.nutritionFat.textContent = "Calculating...";
    this.nutritionFiber.textContent = "Calculating...";
    this.nutritionSugar.textContent = "Calculating...";
    this.nutritionTotalCalories.textContent = "Calculating...";
    this.heroCalories.textContent = "Calculating...";

    ////////////////////////

    // Hero
    this.mealImage.src = meal.thumbnail;
    this.mealImage.alt = meal.name;
    this.mealTitle.textContent = meal.name;

    // Badges
    this.mealBadges.innerHTML = `
    <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">
      ${meal.category || ""}
    </span>

    <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
      ${meal.area || ""}
    </span>

    ${
      meal.tags?.length
        ? `
          <span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">
            ${meal.tags[0]}
          </span>
        `
        : ""
    }
  `;

    // Ingredients
    this.ingredientsCount.textContent = `${meal.ingredients.length} items`;

    this.ingredientsContainer.innerHTML = meal.ingredients
      .map(
        (item) => `
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
          <input
            type="checkbox"
            class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
          />

          <span class="text-gray-700">
            <span class="font-medium text-gray-900">
              ${item.measure || ""}
            </span>
            ${item.ingredient || ""}
          </span>
        </div>
      `,
      )
      .join("");
    /////////////////////
    this.instructionsContainer.innerHTML = meal.instructions
      .map(
        (instruction, index) => `
      <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
        <div
          class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
        >
          ${index + 1}
        </div>

        <p class="text-gray-700 leading-relaxed pt-2">
          ${instruction}
        </p>
      </div>
    `,
      )
      .join("");
    ////////////////////
    if (meal.youtube) {
      const videoId = new URL(meal.youtube).searchParams.get("v");

      this.mealVideo.src = `https://www.youtube.com/embed/${videoId}`;

      this.videoContainer.classList.remove("hidden");
    } else {
      this.mealVideo.src = "";

      this.videoContainer.classList.add("hidden");
    }
  }
  updateNutrition(nutrition) {
    this.currentNutrition = nutrition;

    if (this.logMealBtn) {
      this.logMealBtn.disabled = false;
      this.logMealBtn.classList.remove("opacity-70", "cursor-not-allowed");

      this.logMealBtn.innerHTML = `
    <i class="fa-solid fa-clipboard-list"></i>
    <span>Log This Meal</span>
  `;
    }

    this.nutritionLoading.style.display = "none";

    const perServing = nutrition.data.perServing;

    this.heroServings.textContent = `${nutrition.data.servings} servings`;
    this.heroCalories.textContent = `${perServing.calories} cal/serving`;

    this.nutritionCalories.textContent = perServing.calories;
    this.nutritionProtein.textContent = `${perServing.protein}g`;
    const proteinPercentage = Math.min((perServing.protein / 50) * 100, 100);
    const carbsPercentage = Math.min((perServing.carbs / 300) * 100, 100);

    const fatPercentage = Math.min((perServing.fat / 70) * 100, 100);

    const fiberPercentage = Math.min((perServing.fiber / 30) * 100, 100);

    const sugarPercentage = Math.min((perServing.sugar / 50) * 100, 100);
    const saturatedFatPercentage = Math.min(
      (perServing.saturatedFat / 70) * 100,
      100,
    );

    this.nutritionCarbsBar.style.width = `${carbsPercentage}%`;
    this.nutritionFatBar.style.width = `${fatPercentage}%`;
    this.nutritionFiberBar.style.width = `${fiberPercentage}%`;
    this.nutritionSugarBar.style.width = `${sugarPercentage}%`;

    this.nutritionProteinBar.style.width = `${proteinPercentage}%`;
    this.nutritionCarbs.textContent = `${perServing.carbs}g`;
    this.nutritionFat.textContent = `${perServing.fat}g`;
    this.nutritionFiber.textContent = `${perServing.fiber}g`;
    this.nutritionSugar.textContent = `${perServing.sugar}g`;
    this.nutritionSodium.textContent = `${perServing.sodium}mg`;

    this.nutritionCholesterol.textContent = `${perServing.cholesterol}mg`;

    this.nutritionSaturatedFat.textContent = `${perServing.saturatedFat}g`;
    this.nutritionTotalCalories.textContent = `Total: ${nutrition.data.totals.calories} cal`;
  }
  showMealDetails() {
    this.searchFiltersSection.classList.add("hidden");
    this.mealCategoriesSection.classList.add("hidden");
    this.allRecipesSection.classList.add("hidden");
    this.mealDetails.classList.remove("hidden");

    this.pageTitle.textContent = "Recipe Details";
    this.pageDescription.textContent =
      "View full recipe information and nutrition facts";
  }

  setupMealDetails() {
    this.backToMealsBtn.addEventListener("click", () => {
      this.showMealsPage();
    });

    const logMealBtn = document.getElementById("log-meal-btn");

    if (logMealBtn) {
      logMealBtn.addEventListener("click", () => {
        this.openLogMealModal();
      });
    }
  }
  ///////////////////////
  openLogMealModal() {
    if (!this.currentMeal || !this.currentNutrition) {
      return;
    }

    const meal = this.currentMeal;
    const perServing = this.currentNutrition.data.perServing;

    const oldModal = document.getElementById("log-meal-modal");

    if (oldModal) {
      oldModal.remove();
    }

    const modal = document.createElement("div");

    modal.id = "log-meal-modal";

    modal.className =
      "fixed inset-0 bg-black/50 flex items-center justify-center z-50";

    modal.innerHTML = `
    <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">

      <div class="flex items-center gap-4 mb-6">
        <img
          src="${meal.thumbnail}"
          alt="${meal.name}"
          class="w-16 h-16 rounded-xl object-cover"
        />

        <div>
          <h3 class="text-xl font-bold text-gray-900">
            Log This Meal
          </h3>

          <p class="text-gray-500 text-sm">
            ${meal.name}
          </p>
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Number of Servings
        </label>

        <div class="flex items-center gap-3">

          <button
            id="decrease-servings"
            class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <i class="fa-solid fa-minus text-gray-600"></i>
          </button>

          <input
            type="number"
            id="meal-servings"
            value="1"
            min="0.5"
            max="10"
            step="0.5"
            class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2"
          />

          <button
            id="increase-servings"
            class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <i class="fa-solid fa-plus text-gray-600"></i>
          </button>

        </div>
      </div>

      <div class="bg-emerald-50 rounded-xl p-4 mb-6">

        <p class="text-sm text-gray-600 mb-2">
          Estimated nutrition per serving:
        </p>

        <div class="grid grid-cols-4 gap-2 text-center">

          <div>
            <p
              class="text-lg font-bold text-emerald-600"
              id="modal-calories"
            >
              ${perServing.calories}
            </p>
            <p class="text-xs text-gray-500">
              Calories
            </p>
          </div>

          <div>
            <p
              class="text-lg font-bold text-blue-600"
              id="modal-protein"
            >
              ${perServing.protein}g
            </p>
            <p class="text-xs text-gray-500">
              Protein
            </p>
          </div>

          <div>
            <p
              class="text-lg font-bold text-amber-600"
              id="modal-carbs"
            >
              ${perServing.carbs}g
            </p>
            <p class="text-xs text-gray-500">
              Carbs
            </p>
          </div>

          <div>
            <p
              class="text-lg font-bold text-purple-600"
              id="modal-fat"
            >
              ${perServing.fat}g
            </p>
            <p class="text-xs text-gray-500">
              Fat
            </p>
          </div>

        </div>
      </div>

      <div class="flex gap-3">

        <button
          id="cancel-log-meal"
          class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
        >
          Cancel
        </button>

        <button
          id="confirm-log-meal"
          class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
        >
          <i class="fa-solid fa-clipboard-list mr-2"></i>
          Log Meal
        </button>

      </div>

    </div>
  `;

    document.body.appendChild(modal);

    const servingsInput = document.getElementById("meal-servings");
    const decreaseBtn = document.getElementById("decrease-servings");
    const increaseBtn = document.getElementById("increase-servings");

    const modalCalories = document.getElementById("modal-calories");
    const modalProtein = document.getElementById("modal-protein");
    const modalCarbs = document.getElementById("modal-carbs");
    const modalFat = document.getElementById("modal-fat");

    const updateModalNutrition = () => {
      let servings = Number(servingsInput.value);

      if (servings < 0.5) {
        servings = 0.5;
      }

      if (servings > 10) {
        servings = 10;
      }

      servingsInput.value = servings;

      modalCalories.textContent = Math.round(
        Number(perServing.calories) * servings,
      );

      modalProtein.textContent = `${(Number(perServing.protein) * servings).toFixed(1)}g`;

      modalCarbs.textContent = `${(Number(perServing.carbs) * servings).toFixed(1)}g`;

      modalFat.textContent = `${(Number(perServing.fat) * servings).toFixed(1)}g`;
    };

    decreaseBtn.addEventListener("click", () => {
      const current = Number(servingsInput.value);

      if (current > 0.5) {
        servingsInput.value = current - 0.5;
        updateModalNutrition();
      }
    });

    increaseBtn.addEventListener("click", () => {
      const current = Number(servingsInput.value);

      if (current < 10) {
        servingsInput.value = current + 0.5;
        updateModalNutrition();
      }
    });

    servingsInput.addEventListener("input", updateModalNutrition);

    document.getElementById("cancel-log-meal").addEventListener("click", () => {
      modal.remove();
    });
    document
      .getElementById("confirm-log-meal")
      .addEventListener("click", () => {
        const servings = Number(servingsInput.value);

        const loggedMeal = {
          id: meal.id,
          name: meal.name,
          thumbnail: meal.thumbnail,
          servings: servings,

          nutrition: {
            calories: Math.round(Number(perServing.calories) * servings),
            protein: Number(perServing.protein) * servings,
            carbs: Number(perServing.carbs) * servings,
            fat: Number(perServing.fat) * servings,
          },

          loggedAt: new Date().toISOString(),
        };

        this.foodLogService.saveMeal(loggedMeal);
        const meals = this.foodLogService.getMeals();
        this.foodLogUI.renderLoggedMeals(meals);
        this.foodLogUI.updateSummary(meals);
        this.foodLogUI.updateFoodLog();

        modal.remove();

        Swal.fire({
          icon: "success",
          title: "Meal Logged!",
          html: `
    <div>
      <p>
        ${meal.name} (${servings} serving)
        has been added to your daily log.
      </p>

      <p style="
        color: #059669;
        font-weight: bold;
        font-size: 18px;
        margin-top: 8px;
      ">
        +${loggedMeal.nutrition.calories} calories
      </p>
    </div>
  `,

          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        modal.remove();
      });
  }
}

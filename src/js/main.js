import { MealService } from "./models/MealServices.js";
import { HomeUI } from "./ui/components.js";
import { NutritionService } from "./models/NutritionsService.js";
import { FoodLogService } from "./models/foodLogService.js";
import { FoodLogUI } from "./ui/foodLogUI.js";
import { ProductService } from "./models/productServies.js";
import { ProductUI } from "./ui/productUi.js";

const mealService = new MealService();
const foodLogService = new FoodLogService();
const foodLogUI = new FoodLogUI(foodLogService);

const nutritionService = new NutritionService();

const productService = new ProductService();
const productUI = new ProductUI();

const homeUI = new HomeUI(foodLogService, foodLogUI);

// Food Log

foodLogUI.btnsCallBack(
  () => homeUI.showMealsPage(),
  () => homeUI.showProductsPage(),
);

foodLogUI.ClearAll();

const loggedMeals = foodLogService.getMeals();

foodLogUI.renderLoggedMeals(loggedMeals);
foodLogUI.updateSummary(loggedMeals);
foodLogUI.renderWeeklyOverview(loggedMeals);
foodLogUI.updateStatistics(loggedMeals);

// Product Search

productUI.searchButton.addEventListener("click", async () => {
const searchProducts = async () => {
  const query = productUI.searchInput.value.trim();

  if (!query) return;

  try {
    productUI.searchButton.disabled = true;
    productUI.searchButton.textContent = "Searching...";

    const data = await productService.searchProducts(query);

    productUI.renderProducts(data.results);
  } catch (error) {
    console.error(error);
  } finally {
    productUI.searchButton.disabled = false;
    productUI.searchButton.innerHTML = `
      <i class="fa-solid fa-magnifying-glass mr-2"></i>
      Search
    `;
  }
};

productUI.searchButton.addEventListener("click", searchProducts);

productUI.searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchProducts();
  }
});
});

// Product Barcode

productUI.barcodeButton.addEventListener("click", async () => {
  const barcode = productUI.barcodeInput.value.trim();

  if (!barcode) return;

  try {
    const data = await productService.getProductByBarcode(barcode);

    // console.log( data);

    productUI.renderProducts([data.result]);
  } catch (error) {
    productUI.productsGrid.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-500">
        <i class="fa-solid fa-box-open text-4xl mb-3"></i>
        <p>No products to display</p>
        <p class="text-sm mt-2">
          Search for a product or browse by category
        </p>
      </div>
    `;

    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "error",
      title: "Product not found in database",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
});
// Product Categories
try {
  const categoriesData = await productService.getCategories();

  // console.log( categoriesData);

  productUI.renderCategories(categoriesData.results);

  document
    .querySelector("#containerBtns")
    .addEventListener("click", async (e) => {
      const button = e.target.closest(".product-category-btn");

      if (!button) return;

      const category = button.dataset.category;

      // console.log( category);

      try {
        const data = await productService.getProductsByCategory(category);

        // console.log( data);

        productUI.renderProducts(data.results);
      } catch (error) {
        console.error(error);
      }
    });
} catch (error) {
  console.error("Categories Error:", error);
}
// product grad
document.addEventListener("click", (e) => {
  const button = e.target.closest(".nutri-score-filter");

  if (!button) return;

  const grade = button.dataset.grade;

  productUI.filterProductsByNutriScore(grade);

  document.querySelectorAll(".nutri-score-filter").forEach((btn) => {
    btn.classList.remove("ring-2", "ring-gray-900");
  });

  button.classList.add("ring-2", "ring-gray-900");
});
// modal-product
productUI.productsGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");

  if (!card) return;

  const index = Number(card.dataset.productIndex);

  const product = productUI.currentProducts[index];

  if (!product) return;

  // console.log(product);

  productUI.renderProductModal(product);
  productUI.showProductModal();
});


productUI.productModal.addEventListener("click", (e) => {
  // Close Modal
  if (e.target.closest(".close-product-modal")) {
    productUI.closeProductModal();
    return;
  }

  // Log Product
  const button = e.target.closest(".add-product-to-log");

  if (!button) return;

  const barcode = button.dataset.barcode;

  if (!barcode) {
    return;
  }

  const product = productUI.currentProducts.find(
    (product) => String(product.barcode) === String(barcode),
  );

  if (!product) {
    return;
  }

  // console.log( product);

  const meal = {
    type: "product",
    name: product.name || "Unknown Product",
    thumbnail: product.image || "./images/placeholder.png",
    servings: 1,
    loggedAt: new Date().toISOString(),

    nutrition: {
      calories: Number(product.nutrients?.calories || 0),
      protein: Number(product.nutrients?.protein || 0),
      carbs: Number(product.nutrients?.carbs || 0),
      fat: Number(product.nutrients?.fat || 0),
    },
  };

  foodLogService.saveMeal(meal);

  foodLogUI.updateFoodLog();

  productUI.closeProductModal();

  Swal.fire({
    toast: true,
    position: "bottom-end",
    icon: "success",
    title: `${product.name} logged to your daily intake!`,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
});
// Home UI

homeUI.setupViewToggle();
homeUI.setupMealDetails();
homeUI.setupNavigation();
// homeUI.setupSidebar();
// للسايد بار في الموبيل بس مش شغال خالص

const activePage = sessionStorage.getItem("activePage");

if (activePage === "foodlog") {
  homeUI.showFoodLogPage();
} else if (activePage === "products") {
  homeUI.showProductsPage();
} else {
  homeUI.showMealsPage();
}

// Meals

const handleMealClick = async (mealId) => {
  try {
    const meal = await mealService.getMealById(mealId);

    homeUI.renderMealDetails(meal);

    const ingredients = meal.ingredients.map((item) => {
      return `${item.measure} ${item.ingredient}`;
    });

    const nutrition = await nutritionService.analyzeRecipe(
      meal.name,
      ingredients,
    );

    homeUI.updateNutrition(nutrition);
  } catch (error) {
    console.error(error);
  }
};

// Meals API

try {
  const defaultMeals = await mealService.searchMeals("chicken");

  homeUI.renderRecipes(defaultMeals, handleMealClick, "chicken");

  const searchInput = homeUI.getSearchInput();

  if (searchInput) {
    searchInput.addEventListener("input", async (event) => {
      const query = event.target.value.trim();

      if (!query) return;

      const meals = await mealService.searchMeals(query);

      homeUI.renderRecipes(meals, handleMealClick, query);
    });
  }

  const categories = await mealService.getCategories();

  homeUI.renderCategories(categories, async (category) => {
    const meals = await mealService.filterMeals({ category });

    homeUI.renderRecipes(meals, handleMealClick, category);
  });

  const areas = await mealService.getAreas();

  homeUI.renderAreas(areas, async (area) => {
    if (!area) {
      homeUI.renderRecipes(defaultMeals, handleMealClick, "chicken");
      return;
    }

    const meals = await mealService.filterMeals({ area });

    homeUI.renderRecipes(meals, handleMealClick, area);
  });
} catch (error) {
  document.body.innerHTML = `
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
      "
    >
      <div>
        <h1>Oops! Something went wrong.</h1>
        <p>${error.message}</p>
      </div>
    </div>
  `;
} finally {
  homeUI.hideAppLoading();
}

export class ProductUI {
  constructor() {
    this.searchInput = document.querySelector("#product-search-input");
    this.searchButton = document.querySelector("#search-product-btn");

    this.barcodeInput = document.querySelector("#barcode-input");
    this.barcodeButton = document.querySelector("#lookup-barcode-btn");

    this.productsGrid = document.querySelector("#products-grid");
    this.productsCount = document.querySelector("#products-count");

    this.currentProducts = [];
    this.productModal = document.querySelector("#product-modal");
    this.modalNutriScore = document.querySelector("#modal-nutri-score");
    this.modalNova = document.querySelector("#modal-nova");
    this.modalProductImage = document.querySelector("#modal-product-image");
    this.modalProductBrand = document.querySelector("#modal-product-brand");
    this.modalProductName = document.querySelector("#modal-product-name");
    this.modalProductQuantity = document.querySelector(
      "#modal-product-quantity",
    );

    this.modalNutriScoreValue = document.querySelector(
      "#modal-nutri-score-value",
    );

    this.modalNutriScoreText = document.querySelector(
      "#modal-nutri-score-text",
    );

    this.modalNovaValue = document.querySelector("#modal-nova-value");

    this.modalNovaTitle = document.querySelector("#modal-nova-title");

    this.modalNovaText = document.querySelector("#modal-nova-text");
    this.productCalories = document.querySelector("#productCalories");

    this.productProtein = document.querySelector("#productProtein");

    this.productCarbs = document.querySelector("#productCarbs");

    this.productFat = document.querySelector("#productFat");

    this.productSugar = document.querySelector("#productSugar");

    this.productSaturatedFat = document.querySelector("#productSaturatedFat");

    this.productFiber = document.querySelector("#productFiber");

    this.productSalt = document.querySelector("#productSalt");
    this.productProteinBar = document.querySelector("#productProteinBar");

    this.productCarbsBar = document.querySelector("#productCarbsBar");

    this.productFatBar = document.querySelector("#productFatBar");

    this.productSugarBar = document.querySelector("#productSugarBar");
    this.productIngredients = document.querySelector("#productIngredients");
    this.productAllergens = document.querySelector("#productAllergens");
    this.addProductToLogButton = document.querySelector(".add-product-to-log");
  }
  renderProducts(products) {
    this.currentProducts = products || [];

    this.productsGrid.innerHTML = "";

    if (!products || products.length === 0) {
      this.productsGrid.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-500">
        <i class="fa-solid fa-box-open text-4xl mb-3"></i>
        <p>No products found</p>
      </div>
    `;

      this.productsCount.textContent = "No products found";
      return;
    }

    this.productsCount.textContent = `${products.length} products found`;

    products.forEach((product, index) => {
      this.productsGrid.insertAdjacentHTML(
        "beforeend",
        this.createProductCard(product, index),
      );
    });
  }
  createProductCard(product, index) {
    const {
      barcode,
      name,
      brand,
      image,
      nutritionGrade,
      novaGroup,
      nutrients,
    } = product;

    const {
      calories = 0,
      protein = 0,
      carbs = 0,
      fat = 0,
      sugar = 0,
    } = nutrients || {};

    const nutriScoreColors = {
      A: "#16a34a",
      B: "#4ade80",
      C: "#fb923c",
      D: "#ea580c",
      E: "#dc2626",
    };

    const grade = nutritionGrade?.toUpperCase();
    const nutriScoreColor = nutriScoreColors[grade] || "#9ca3af";

    return `
    <div
      class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
      data-product-index="${index}"
    >
      <div
        class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
      >
        <img
          class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          src="${image || "./images/placeholder.png"}"
          alt="${name || "Product"}"
          loading="lazy"
        />

<div
  class="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded uppercase"
  style="background-color: ${nutriScoreColor};"
>
  Nutri-Score ${grade || "N/A"}
</div>

        ${
          novaGroup
            ? `
          <div
            class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
            title="NOVA ${novaGroup}"
          >
            ${novaGroup}
          </div>
        `
            : ""
        }
      </div>

      <div class="p-4">
        <p
          class="text-xs text-emerald-600 font-semibold mb-1 truncate"
        >
          ${brand || "Unknown Brand"}
        </p>

        <h3
          class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
        >
          ${name || "Unknown Product"}
        </h3>

        <div
          class="flex items-center gap-3 text-xs text-gray-500 mb-3"
        >
          <span>
            <i class="fa-solid fa-barcode mr-1"></i>
            ${barcode || "N/A"}
          </span>

          <span>
            <i class="fa-solid fa-fire mr-1"></i>
            ${Number(calories).toFixed(0)} kcal/100g
          </span>
        </div>

        <div class="grid grid-cols-4 gap-1 text-center">
          <div class="bg-emerald-50 rounded p-1.5">
            <p class="text-xs font-bold text-emerald-700">
              ${Number(protein).toFixed(1)}g
            </p>
            <p class="text-[10px] text-gray-500">Protein</p>
          </div>

          <div class="bg-blue-50 rounded p-1.5">
            <p class="text-xs font-bold text-blue-700">
              ${Number(carbs).toFixed(1)}g
            </p>
            <p class="text-[10px] text-gray-500">Carbs</p>
          </div>

          <div class="bg-purple-50 rounded p-1.5">
            <p class="text-xs font-bold text-purple-700">
              ${Number(fat).toFixed(1)}g
            </p>
            <p class="text-[10px] text-gray-500">Fat</p>
          </div>

          <div class="bg-orange-50 rounded p-1.5">
            <p class="text-xs font-bold text-orange-700">
              ${Number(sugar).toFixed(1)}g
            </p>
            <p class="text-[10px] text-gray-500">Sugar</p>
          </div>
        </div>
      </div>
    </div>
  `;
  }
  renderCategories(categories) {
    const container = document.querySelector("#containerBtns");

    const colors = [
      "from-amber-500 to-orange-500",
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-sky-400 to-blue-500",
      "from-red-500 to-rose-500",
      "from-green-500 to-emerald-500",
      "from-amber-600 to-yellow-500",
      "from-red-600 to-rose-600",
      "from-cyan-500 to-blue-600",
      "from-orange-500 to-red-500",
    ];

    const selectedCategories = categories.slice(0, 16);
    let i = 0;

    container.innerHTML = selectedCategories
      .map((category) => {
        if (i < colors.length - 1) {
          i++;
        } else {
          i = 0;
        }
        const randomColor = colors[i];

        return `
        <button
          class="product-category-btn flex-shrink-0 px-5 py-3
          bg-gradient-to-r ${randomColor}
          text-white rounded-xl font-semibold
          hover:shadow-lg transition-all"
          data-category="${category.id}"
        >
          ${category.name}
        </button>
      `;
      })
      .join("");
  }
  filterProductsByNutriScore(grade) {
    if (!grade) {
      this.renderFilteredProducts(this.currentProducts);
      return;
    }

    const filteredProducts = this.currentProducts.filter(
      (product) =>
        product.nutritionGrade?.toLowerCase() === grade.toLowerCase(),
    );

    this.renderFilteredProducts(filteredProducts);
  }

  renderFilteredProducts(products) {

    this.productsGrid.innerHTML = "";

    if (!products || products.length === 0) {
      this.productsGrid.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-500">
        <i class="fa-solid fa-box-open text-4xl mb-3"></i>
        <p>No products found</p>
      </div>
    `;

      this.productsCount.textContent = "No products found";
      return;
    }

    this.productsCount.textContent = `${products.length} products found`;

    products.forEach((product, index) => {
      this.productsGrid.insertAdjacentHTML(
        "beforeend",
        this.createProductCard(product, index),
      );
    });
  }
  showProductModal() {
    this.productModal.classList.remove("hidden");
  }
  closeProductModal() {
    this.productModal.classList.add("hidden");
  }
  renderProductModal(product) {
    const nutrients = product.nutrients || {};

    const {
      calories = 0,
      protein = 0,
      carbs = 0,
      fat = 0,
      sugar = 0,
      saturatedFat = 0,
      fiber = 0,
      salt = 0,
    } = nutrients;

    this.modalProductImage.src = product.image || "./images/placeholder.png";

    this.modalProductImage.alt = product.name || "Product";

    this.modalProductBrand.textContent = product.brand || "Unknown Brand";

    this.modalProductName.textContent = product.name || "Unknown Product";

    this.modalProductQuantity.textContent = product.quantity || "";
    if (this.addProductToLogButton) {
      this.addProductToLogButton.dataset.barcode = product.barcode || "";
    }

    if (product.nutritionGrade) {
      const grade = product.nutritionGrade.toUpperCase();

      const nutriScoreColors = {
        A: {
          background: "#dcfce7",
          color: "#16a34a",
        },
        B: {
          background: "#ecfccb",
          color: "#65a30d",
        },
        C: {
          background: "#fef3c7",
          color: "#eab308",
        },
        D: {
          background: "#ffedd5",
          color: "#ea580c",
        },
        E: {
          background: "#fee2e2",
          color: "#dc2626",
        },
      };

      const colors = nutriScoreColors[grade] || {
        background: "#f3f4f6",
        color: "#6b7280",
      };

      const gradeDescriptions = {
        A: "Excellent",
        B: "Good",
        C: "Average",
        D: "Poor",
        E: "Very Poor",
      };
      this.productCalories.textContent = Number(calories).toFixed(0);

      this.productProtein.textContent = `${Number(protein).toFixed(1)}g`;

      this.productCarbs.textContent = `${Number(carbs).toFixed(1)}g`;

      this.productFat.textContent = `${Number(fat).toFixed(1)}g`;

      this.productSugar.textContent = `${Number(sugar).toFixed(1)}g`;

      this.productSaturatedFat.textContent = `${Number(saturatedFat).toFixed(1)}g`;

      this.productFiber.textContent = `${Number(fiber).toFixed(1)}g`;

      this.productSalt.textContent = `${Number(salt).toFixed(2)}g`;
      this.productProteinBar.style.width = `${Math.min(Number(protein), 100)}%`;

      this.productCarbsBar.style.width = `${Math.min(Number(carbs), 100)}%`;

      this.productFatBar.style.width = `${Math.min(Number(fat), 100)}%`;

      this.productSugarBar.style.width = `${Math.min(Number(sugar), 100)}%`;
      this.modalNutriScore.classList.remove("hidden");

      this.modalNutriScore.style.backgroundColor = colors.background;

      this.modalNutriScoreValue.textContent = grade;
      this.modalNutriScoreValue.style.backgroundColor = colors.color;
      this.modalNutriScoreValue.style.color = "#ffffff";

      this.modalNutriScoreText.textContent =
        gradeDescriptions[grade] || "Unknown";
    } else {
      this.modalNutriScore.classList.add("hidden");
    }

    if (product.novaGroup) {
      const nova = Number(product.novaGroup);

      const novaStyles = {
        1: {
          background: "#dcfce7",
          color: "#16a34a",
          text: "Unprocessed",
        },

        2: {
          background: "#ecfccb",
          color: "#65a30d",
          text: "Processed culinary ingredient",
        },

        3: {
          background: "#ffedd5",
          color: "#ea580c",
          text: "Processed",
        },

        4: {
          background: "#fee2e2",
          color: "#dc2626",
          text: "Ultra-processed",
        },
      };

      const style = novaStyles[nova] || {
        background: "#f3f4f6",
        color: "#6b7280",
        text: "Unknown",
      };

      this.modalNova.classList.remove("hidden");

      this.modalNova.style.backgroundColor = style.background;

      this.modalNovaValue.textContent = nova;
      this.modalNovaValue.style.backgroundColor = style.color;

      this.modalNovaTitle.style.color = style.color;

      this.modalNovaText.textContent = style.text;
    } else {
      this.modalNova.classList.add("hidden");
    }
    const ingredients = product.ingredients;
    const allergens = product.allergens;

    this.productIngredients.textContent =
      ingredients || "Ingredients information not available.";

    this.productAllergens.textContent =
      allergens || "Allergens information not available.";
  }
}

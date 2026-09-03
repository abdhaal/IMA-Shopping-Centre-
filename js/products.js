/* =====================================================
   IMA SHOPPING CENTRE
   PRODUCTS.JS
   Product Data + Cards + Search + Cart
===================================================== */


/* =====================================================
   PRODUCT DATA
===================================================== */

const products = [

    {
        id: 1,
        name: "Smart LED Bulb",
        category: "electronics",
        price: 299,
        oldPrice: 499,
        discount: "40%",
        rating: 4.6,
        reviews: 128,
        trustScore: 94,
        seller: "IMA Verified Store",
        verifiedSeller: true,
        realVideo: true,
        fastDelivery: true,
        image: "assets/images/bulb.jpg"
    },

    {
        id: 2,
        name: "Portable Mini Fan",
        category: "electronics",
        price: 399,
        oldPrice: 699,
        discount: "43%",
        rating: 4.5,
        reviews: 87,
        trustScore: 91,
        seller: "Smart Deals",
        verifiedSeller: true,
        realVideo: true,
        fastDelivery: true,
        image: "assets/images/fan.jpg"
    },

    {
        id: 3,
        name: "Kitchen Storage Box",
        category: "kitchen",
        price: 249,
        oldPrice: 399,
        discount: "38%",
        rating: 4.4,
        reviews: 64,
        trustScore: 89,
        seller: "Home Store",
        verifiedSeller: true,
        realVideo: false,
        fastDelivery: true,
        image: "assets/images/storage.jpg"
    },

    {
        id: 4,
        name: "Motion Sensor Light",
        category: "home",
        price: 449,
        oldPrice: 799,
        discount: "44%",
        rating: 4.7,
        reviews: 156,
        trustScore: 96,
        seller: "IMA Home",
        verifiedSeller: true,
        realVideo: true,
        fastDelivery: true,
        image: "assets/images/light.jpg"
    }

];


/* =====================================================
   CREATE PRODUCT CARD
===================================================== */

function productCard(product) {

    return `

        <div class="product-card">


            <!-- PRODUCT IMAGE -->

            <a
                href="product.html?id=${product.id}"
                class="product-image-link"
            >

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="
                        this.onerror=null;
                        this.src='https://placehold.co/500x500?text=IMA+Product';
                    "
                >

            </a>


            <!-- PRODUCT INFO -->

            <div class="product-info">


                <!-- NAME -->

                <h3 class="product-name">

                    ${product.name}

                </h3>


                <!-- PRICE -->

                <div class="product-price-row">

                    <span class="price">

                        ₹${product.price}

                    </span>


                    <span class="old-price">

                        ₹${product.oldPrice}

                    </span>


                    <span class="discount">

                        ${product.discount} OFF

                    </span>

                </div>


                <!-- RATING -->

                <div class="rating">

                    <strong>
                        ⭐ ${product.rating}
                    </strong>

                    <span>
                        (${product.reviews})
                    </span>

                    <span>
                        verified reviews
                    </span>

                </div>


                <!-- TRUST SCORE -->

                <div class="trust">

                    🛡️ Trust Score:

                    <strong>
                        ${product.trustScore}/100
                    </strong>

                </div>


                <!-- SELLER -->

                <div class="seller-info">

                    ${
                        product.verifiedSeller
                        ?
                        `
                        <span class="verified-seller">
                            ✓ Verified Seller
                        </span>
                        `
                        :
                        ""
                    }

                    <span class="seller-name">
                        ${product.seller}
                    </span>

                </div>


                <!-- PRODUCT FEATURES -->

                <div class="product-features">


                    ${
                        product.realVideo
                        ?
                        `
                        <span>
                            🎥 Real Video
                        </span>
                        `
                        :
                        ""
                    }


                    ${
                        product.fastDelivery
                        ?
                        `
                        <span>
                            🚚 Fast Delivery
                        </span>
                        `
                        :
                        ""
                    }

                </div>


                <!-- ACTION BUTTONS -->

                <div class="product-actions">


                    <button
                        type="button"
                        class="add-cart"
                        onclick="event.preventDefault(); event.stopPropagation(); addToCart(${product.id})"
                    >

                        🛒 Add to Cart

                    </button>


                    <button
                        type="button"
                        class="buy-now"
                        onclick="event.preventDefault(); event.stopPropagation(); buyProduct(${product.id})"
                    >

                        Buy Now

                    </button>

                </div>


            </div>

        </div>

    `;
}


/* =====================================================
   DISPLAY PRODUCTS
===================================================== */

function displayProducts(list = products) {

    const container =
        document.getElementById("productsGrid");


    /*
     * If this page doesn't contain
     * productsGrid, stop safely.
     */

    if (!container) {

        return;

    }


    /*
     * Empty result
     */

    if (!list || list.length === 0) {

        container.innerHTML = "";


        const noProducts =
            document.getElementById(
                "noProducts"
            );


        if (noProducts) {

            noProducts.style.display =
                "block";

        }


        updateProductResultCount(0);

        return;

    }


    /*
     * Hide empty message
     */

    const noProducts =
        document.getElementById(
            "noProducts"
        );


    if (noProducts) {

        noProducts.style.display =
            "none";

    }


    /*
     * Render products
     */

    container.innerHTML =
        list.map(
            productCard
        ).join("");


    /*
     * Update count
     */

    updateProductResultCount(
        list.length
    );

}


/* =====================================================
   PRODUCT RESULT COUNT
===================================================== */

function updateProductResultCount(count) {

    const resultText =
        document.getElementById(
            "productResultText"
        );


    if (!resultText) {

        return;

    }


    if (count === products.length) {

        resultText.textContent =
            `Explore ${count} trusted products at great prices`;

    }

    else {

        resultText.textContent =
            `${count} products found`;

    }

}


/* =====================================================
   DISPLAY DEALS
===================================================== */

function displayDeals() {

    const container =
        document.getElementById(
            "dealProducts"
        );


    /*
     * Home page may not have
     * this element.
     */

    if (!container) {

        return;

    }


    const deals =
        products.filter(
            product =>
                product.discount
        );


    container.innerHTML =
        deals
            .map(productCard)
            .join("");

}


/* =====================================================
   SEARCH PRODUCTS
===================================================== */

function searchProducts() {

    const input =
        document.getElementById(
            "searchInput"
        );


    if (!input) {

        return;

    }


    const keyword =
        input.value
            .toLowerCase()
            .trim();


    const categoryElement =
        document.getElementById(
            "categorySelect"
        );


    const category =
        categoryElement
            ? categoryElement.value
            : "all";


    /*
     * Search by:
     * Product name
     * Seller
     * Category
     */

    const result =
        products.filter(
            product => {

                const productName =
                    product.name
                        .toLowerCase();


                const sellerName =
                    product.seller
                        .toLowerCase();


                const productCategory =
                    product.category
                        .toLowerCase();


                const keywordMatch =
                    keyword === "" ||
                    productName.includes(keyword) ||
                    sellerName.includes(keyword) ||
                    productCategory.includes(keyword);


                const categoryMatch =
                    category === "all" ||
                    product.category === category;


                return (
                    keywordMatch &&
                    categoryMatch
                );

            }
        );


    displayProducts(result);

}


/* =====================================================
   SEARCH WITH ENTER KEY
===================================================== */

function setupProductSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );


    if (!input) {

        return;

    }


    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchProducts();

            }

        }
    );

}


/* =====================================================
   CATEGORY SEARCH
===================================================== */

function setupCategorySearch() {

    const category =
        document.getElementById(
            "categorySelect"
        );


    if (!category) {

        return;

    }


    category.addEventListener(
        "change",
        function () {

            searchProducts();

        }
    );

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id) {

    /*
     * Get existing cart
     */

    let cart =
        JSON.parse(
            localStorage.getItem(
                "ima_cart"
            )
        ) || [];


    /*
     * Find product
     */

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) {

        console.error(
            "Product not found:",
            id
        );

        return;

    }


    /*
     * Check existing product
     */

    const existing =
        cart.find(
            item =>
                item.id === id
        );


    if (existing) {

        existing.quantity =
            Number(
                existing.quantity || 0
            ) + 1;

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            oldPrice: product.oldPrice,

            image: product.image,

            quantity: 1

        });

    }


    /*
     * Save cart
     */

    localStorage.setItem(
        "ima_cart",
        JSON.stringify(cart)
    );


    /*
     * Update cart count
     */

    updateCartCount();


    /*
     * Notification
     */

    if (
        typeof showNotification ===
        "function"
    ) {

        showNotification(
            `${product.name} added to cart`
        );

    }

    else {

        alert(
            `${product.name} added to cart`
        );

    }

}


/* =====================================================
   BUY NOW
===================================================== */

function buyProduct(id) {

    /*
     * Add product
     */

    addToCart(id);


    /*
     * Go to cart
     */

    setTimeout(
        function () {

            window.location.href =
                "cart.html";

        },
        100
    );

}


/* =====================================================
   UPDATE CART COUNT
===================================================== */

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                "ima_cart"
            )
        ) || [];


    const count =
        cart.reduce(
            function (
                total,
                item
            ) {

                return (
                    total +
                    Number(
                        item.quantity || 0
                    )
                );

            },
            0
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            count;

    }

}


/* =====================================================
   GET PRODUCT BY ID
===================================================== */

function getProductById(id) {

    return products.find(
        product =>
            product.id ===
            Number(id)
    );

}


/* =====================================================
   OPEN PRODUCT
===================================================== */

function openProduct(id) {

    window.location.href =
        `product.html?id=${id}`;

}


/* =====================================================
   INITIALIZE PRODUCTS PAGE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
         * Display products
         */

        displayProducts();


        /*
         * Display deals
         */

        displayDeals();


        /*
         * Cart count
         */

        updateCartCount();


        /*
         * Search
         */

        setupProductSearch();


        /*
         * Category
         */

        setupCategorySearch();

    }
);

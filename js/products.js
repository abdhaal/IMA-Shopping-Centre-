/* =====================================================
   IMA SHOPPING CENTRE
   PRODUCTS DATA + FUNCTIONS
===================================================== */


/* ================= PRODUCT DATA ================= */

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
   PRODUCT CARD
===================================================== */

function productCard(product) {

    return `

        <div class="product-card">

            <!-- Product Image -->

            <a
                href="product.html?id=${product.id}"
                class="product-image-link"
            >

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="
                        this.onerror=null;
                        this.src='https://placehold.co/500x500?text=IMA+Product';
                    "
                >

            </a>


            <!-- Product Information -->

            <div class="product-info">

                <h3 class="product-name">
                    ${product.name}
                </h3>


                <!-- Price -->

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


                <!-- Rating -->

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


                <!-- Trust -->

                <div class="trust">

                    🛡️ Trust Score:
                    <strong>
                        ${product.trustScore}/100
                    </strong>

                </div>


                <!-- Seller -->

                <div class="seller-info">

                    ${
                        product.verifiedSeller
                        ? `<span class="verified-seller">
                            ✓ Verified Seller
                           </span>`
                        : ""
                    }

                    <span>
                        ${product.seller}
                    </span>

                </div>


                <!-- Extra Trust Features -->

                <div class="product-features">

                    ${
                        product.realVideo
                        ? `<span>🎥 Real Video</span>`
                        : ""
                    }

                    ${
                        product.fastDelivery
                        ? `<span>🚚 Fast Delivery</span>`
                        : ""
                    }

                </div>


                <!-- Buttons -->

                <div class="product-actions">

                    <button
                        type="button"
                        class="add-cart"
                        onclick="event.preventDefault(); addToCart(${product.id})"
                    >
                        🛒 Add to Cart
                    </button>


                    <button
                        type="button"
                        class="buy-now"
                        onclick="event.preventDefault(); buyProduct(${product.id})"
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

    /*
     * IMPORTANT:
     * products.html uses productsGrid
     */

    const container =
        document.getElementById("productsGrid");


    if (!container) {
        return;
    }


    /*
     * No products
     */

    if (!list || list.length === 0) {

        container.innerHTML = "";

        const noProducts =
            document.getElementById("noProducts");

        if (noProducts) {
            noProducts.style.display = "block";
        }

        return;
    }


    /*
     * Hide empty message
     */

    const noProducts =
        document.getElementById("noProducts");

    if (noProducts) {
        noProducts.style.display = "none";
    }


    /*
     * Render products
     */

    container.innerHTML =
        list.map(productCard).join("");


    /*
     * Update result count
     */

    const resultText =
        document.getElementById(
            "productResultText"
        );


    if (resultText) {

        resultText.textContent =
            `${list.length} products found`;

    }

}


/* =====================================================
   DISPLAY DEALS
===================================================== */

function displayDeals() {

    const container =
        document.getElementById("dealProducts");


    if (!container) {
        return;
    }


    const deals =
        products.filter(
            product =>
                product.discount
        );


    container.innerHTML =
        deals.map(productCard).join("");

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


    const result =
        products.filter(
            product => {

                const name =
                    product.name
                        .toLowerCase();


                const seller =
                    product.seller
                        .toLowerCase();


                const matchKeyword =
                    keyword === "" ||
                    name.includes(keyword) ||
                    seller.includes(keyword);


                const matchCategory =
                    category === "all" ||
                    product.category === category;


                return (
                    matchKeyword &&
                    matchCategory
                );

            }
        );


    displayProducts(result);

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id) {

    let cart =
        JSON.parse(
            localStorage.getItem(
                "ima_cart"
            )
        ) || [];


    const product =
        products.find(
            p => p.id === id
        );


    if (!product) {
        return;
    }


    const existing =
        cart.find(
            item =>
                item.id === id
        );


    if (existing) {

        existing.quantity += 1;

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    localStorage.setItem(
        "ima_cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    /*
     * Use main.js notification
     * if available
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

    addToCart(id);

    window.location.href =
        "cart.html";

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
            (total, item) =>
                total +
                Number(
                    item.quantity || 0
                ),
            0
        );


    const element =
        document.getElementById(
            "cartCount"
        );


    if (element) {

        element.textContent =
            count;

    }

}


/* =====================================================
   PAGE INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
         * Products page
         */

        displayProducts();


        /*
         * Home page deals
         */

        displayDeals();


        /*
         * Cart count
         */

        updateCartCount();

    }
);

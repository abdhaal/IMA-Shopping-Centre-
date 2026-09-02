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
        image: "assets/images/light.jpg"
    }

];


function productCard(product) {

    return `

        <div class="product-card">

            <a href="product.html?id=${product.id}">

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="
                    this.src='https://placehold.co/500x500?text=IMA+Product'
                    "
                >

            </a>


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>


                <div>

                    <span class="price">
                        ₹${product.price}
                    </span>

                    <span class="old-price">
                        ₹${product.oldPrice}
                    </span>

                </div>


                <div class="rating">

                    ⭐ ${product.rating}

                    · ${product.reviews}
                    verified reviews

                    · ${product.discount} OFF

                </div>


                <div class="trust">

                    🛡️ Trust Score:
                    ${product.trustScore}/100

                    ${
                        product.verifiedSeller
                        ? " · ✓ Verified Seller"
                        : ""
                    }

                </div>


                <div class="product-actions">

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})">

                        🛒 Add

                    </button>


                    <button
                        class="buy-now"
                        onclick="buyProduct(${product.id})">

                        Buy Now

                    </button>

                </div>

            </div>

        </div>

    `;
}


function displayProducts(list = products) {

    const container =
        document.getElementById("productContainer");

    if (!container) return;

    container.innerHTML =
        list.map(productCard).join("");

}


function displayDeals() {

    const container =
        document.getElementById("dealProducts");

    if (!container) return;

    const deals =
        products.filter(
            product => product.discount
        );

    container.innerHTML =
        deals.map(productCard).join("");

}


function searchProducts() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;

    const keyword =
        input.value.toLowerCase().trim();


    const category =
        document.getElementById("categorySelect")
        ?.value || "all";


    let result = products.filter(product => {

        const matchName =
            product.name
                .toLowerCase()
                .includes(keyword);

        const matchCategory =
            category === "all" ||
            product.category === category;

        return matchName && matchCategory;

    });


    displayProducts(result);

}


function addToCart(id) {

    let cart =
        JSON.parse(
            localStorage.getItem("ima_cart")
        ) || [];


    const product =
        products.find(p => p.id === id);

    if (!product) return;


    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity += 1;

    } else {

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

    alert("Product added to cart!");
}


function buyProduct(id) {

    addToCart(id);

    window.location.href =
        "cart.html";

}


function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("ima_cart")
        ) || [];


    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const element =
        document.getElementById("cartCount");

    if (element) {
        element.textContent = count;
    }

}


displayProducts();
displayDeals();
updateCartCount();

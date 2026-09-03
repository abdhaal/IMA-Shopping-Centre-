/* =====================================================
   IMA SHOPPING CENTRE
   PRODUCT DETAILS JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    loadProductDetails();
});


/* =====================================================
   GET PRODUCT ID
===================================================== */

function getProductIdFromURL() {

    const params = new URLSearchParams(window.location.search);

    return params.get("id");
}


/* =====================================================
   LOAD PRODUCT
===================================================== */

function loadProductDetails() {

    const productId = getProductIdFromURL();
    const container = document.getElementById("productDetails");

    if (!container) return;

    if (!productId) {
        showProductError("Product not found.");
        return;
    }

    if (typeof products === "undefined" || !Array.isArray(products)) {

        showProductError(
            "Products are currently unavailable. Please try again."
        );

        return;
    }

    const product = products.find(
        item => String(item.id) === String(productId)
    );

    if (!product) {
        showProductError("This product could not be found.");
        return;
    }

    renderProduct(product);

    updatePageMeta(product);
}


/* =====================================================
   RENDER PRODUCT
===================================================== */

function renderProduct(product) {

    const container = document.getElementById("productDetails");

    const price = Number(product.price) || 0;
    const oldPrice = Number(product.oldPrice) || 0;

    let discount = 0;

    if (oldPrice > price) {
        discount = Math.round(
            ((oldPrice - price) / oldPrice) * 100
        );
    }

    const rating = product.rating || 4.5;
    const reviews = product.reviews || 0;
    const trustScore = product.trustScore || 90;

    const seller = product.seller || "IMA Verified Seller";

    const image =
        product.image ||
        "assets/images/product-placeholder.jpg";

    const verifiedSeller =
        product.verifiedSeller !== false;

    const realVideo =
        product.realVideo === true;

    const fastDelivery =
        product.fastDelivery === true;


    container.innerHTML = `

        <div class="product-details-wrapper">

            <div class="product-main-grid">

                <!-- ================= IMAGE ================= -->

                <div class="product-gallery">

                    ${
                        realVideo
                        ? `
                            <div class="product-video-badge">
                                🎥 Real Product Video
                            </div>
                        `
                        : ""
                    }

                    <div class="product-main-image-box">

                        <img
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(product.name)}"
                            class="product-main-image"
                            onerror="this.src='assets/images/product-placeholder.jpg'"
                        >

                    </div>

                </div>


                <!-- ================= INFO ================= -->

                <div class="product-info-section">

                    <div class="product-category-label">
                        ${escapeHTML(product.category || "Product")}
                    </div>

                    <h1 class="product-title">
                        ${escapeHTML(product.name)}
                    </h1>


                    <!-- Rating -->

                    <div class="product-rating-row">

                        <span class="rating-box">
                            ⭐ ${rating}
                        </span>

                        <a href="#reviews" class="review-link">
                            ${reviews} Ratings & Reviews
                        </a>

                    </div>


                    <!-- Price -->

                    <div class="product-price-box">

                        <span class="current-price">
                            ₹${price.toLocaleString("en-IN")}
                        </span>

                        ${
                            oldPrice > price
                            ? `
                                <span class="original-price">
                                    ₹${oldPrice.toLocaleString("en-IN")}
                                </span>

                                <span class="discount-price">
                                    ${discount}% OFF
                                </span>
                            `
                            : ""
                        }

                    </div>


                    <!-- Trust Score -->

                    <div class="trust-score-box">

                        <div class="trust-score-header">

                            <span class="trust-score-title">
                                🛡️ Product Trust Score
                            </span>

                            <span class="trust-score-number">
                                ${trustScore}/100
                            </span>

                        </div>

                        <div class="trust-progress">

                            <div
                                class="trust-progress-bar"
                                style="width:${Math.min(trustScore, 100)}%"
                            ></div>

                        </div>

                    </div>


                    <!-- Features -->

                    <div class="product-feature-list">

                        <h3>Product Highlights</h3>

                        <div class="feature-items">

                            ${
                                getFeatures(product)
                            }

                        </div>

                    </div>


                    <!-- Seller -->

                    <div class="seller-box">

                        <div class="seller-header">

                            <div>

                                <div class="seller-name">
                                    ${escapeHTML(seller)}
                                </div>

                                ${
                                    verifiedSeller
                                    ? `
                                        <span class="verified-badge">
                                            ✓ Verified Seller
                                        </span>
                                    `
                                    : ""
                                }

                            </div>

                            <strong>
                                ⭐ ${product.sellerRating || "4.5"}
                            </strong>

                        </div>

                        <div class="seller-trust">
                            Seller Trust Score:
                            <strong>
                                ${product.sellerTrustScore || 90}/100
                            </strong>
                        </div>

                    </div>


                    <!-- Delivery -->

                    <div class="delivery-box">

                        <div class="delivery-item">
                            🚚
                            ${
                                fastDelivery
                                ? "<strong>Fast Delivery Available</strong>"
                                : "<strong>Standard Delivery Available</strong>"
                            }
                        </div>

                        <div class="delivery-item">
                            🔄 Easy Returns available on eligible products
                        </div>

                        <div class="delivery-item">
                            🔒 Secure Checkout
                        </div>

                    </div>


                    <!-- Actions -->

                    <div class="product-action-buttons">

                        <button
                            class="product-add-cart"
                            onclick="addProductToCart('${escapeJS(product.id)}')"
                        >
                            🛒 Add to Cart
                        </button>

                        <button
                            class="product-buy-now"
                            onclick="buyProductNow('${escapeJS(product.id)}')"
                        >
                            ⚡ Buy Now
                        </button>

                        <button
                            class="product-wishlist"
                            onclick="toggleProductWishlist('${escapeJS(product.id)}')"
                            title="Wishlist"
                        >
                            ❤️
                        </button>

                    </div>


                    <button
                        class="share-button"
                        onclick="shareProductDetails('${escapeJS(product.id)}', '${escapeJS(product.name)}')"
                    >
                        📤 Share this product
                    </button>

                </div>

            </div>

        </div>


        ${
            realVideo
            ? renderVideoSection(product)
            : ""
        }


        <!-- Description -->

        <section class="product-description-section">

            <h2>Product Description</h2>

            <div class="product-description">

                ${
                    product.description
                    ? escapeHTML(product.description)
                    : "Detailed product information will be available soon."
                }

            </div>

        </section>


        <!-- Reviews -->

        <section
            class="product-reviews-section"
            id="reviews"
        >

            <h2>Customer Reviews</h2>

            <div class="review-summary">

                <div class="review-average">

                    <div class="review-average-number">
                        ${rating}
                    </div>

                    <div class="review-stars">
                        ${getStars(rating)}
                    </div>

                    <small>
                        ${reviews} reviews
                    </small>

                </div>

                <div>

                    <strong>
                        Genuine Buyer Reviews
                    </strong>

                    <p>
                        Reviews from customers help other shoppers
                        make better buying decisions.
                    </p>

                </div>

            </div>

            ${renderReviews(product)}

        </section>

    `;


    document.getElementById("breadcrumbProduct").textContent =
        product.name;
}


/* =====================================================
   FEATURES
===================================================== */

function getFeatures(product) {

    let features = [];

    if (Array.isArray(product.features)) {
        features = product.features;
    }

    if (features.length === 0) {

        features = [
            "Quality checked product",
            "Transparent pricing",
            "Verified seller",
            "Customer support"
        ];

        if (product.realVideo === true) {
            features.push("Real product video");
        }

        if (product.fastDelivery === true) {
            features.push("Fast delivery");
        }
    }

    return features
        .slice(0, 6)
        .map(feature => `
            <div class="feature-item">
                ✓ ${escapeHTML(feature)}
            </div>
        `)
        .join("");
}


/* =====================================================
   VIDEO
===================================================== */

function renderVideoSection(product) {

    if (!product.video) {
        return `
            <section class="product-video-section">

                <h2>🎥 Real Product Video</h2>

                <p>
                    Real product video will be available soon.
                </p>

            </section>
        `;
    }

    return `
        <section class="product-video-section">

            <h2>🎥 Real Product Video</h2>

            <video
                class="product-video"
                controls
                playsinline
                preload="metadata"
            >
                <source
                    src="${escapeHTML(product.video)}"
                    type="video/mp4"
                >

                Your browser does not support video playback.
            </video>

        </section>
    `;
}


/* =====================================================
   REVIEWS
===================================================== */

function renderReviews(product) {

    let reviews = product.reviewList;

    if (!Array.isArray(reviews) || reviews.length === 0) {

        reviews = [
            {
                name: "Verified Buyer",
                rating: product.rating || 5,
                text: "Good product and satisfied with the purchase."
            },
            {
                name: "Verified Buyer",
                rating: product.rating || 4,
                text: "Product received as shown. Delivery was good."
            }
        ];
    }

    return reviews
        .slice(0, 5)
        .map(review => `

            <div class="review-card">

                <div class="review-user">

                    ${escapeHTML(review.name || "Verified Buyer")}

                    <span class="review-verified">
                        ✓ Verified Purchase
                    </span>

                </div>

                <div class="review-stars">
                    ${getStars(review.rating || 5)}
                </div>

                <div class="review-text">
                    ${escapeHTML(review.text || "")}
                </div>

            </div>

        `)
        .join("");
}


/* =====================================================
   STARS
===================================================== */

function getStars(rating) {

    const rounded = Math.round(Number(rating) || 0);

    return "★".repeat(rounded) +
           "☆".repeat(Math.max(0, 5 - rounded));
}


/* =====================================================
   ADD TO CART
===================================================== */

function addProductToCart(productId) {

    const product = findProduct(productId);

    if (!product) return;

    let cart = JSON.parse(
        localStorage.getItem("ima_cart") || "[]"
    );

    const existing = cart.find(
        item => String(item.id) === String(productId)
    );

    if (existing) {

        existing.quantity =
            (existing.quantity || 1) + 1;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price) || 0,
            image: product.image || "",
            quantity: 1
        });

    }

    localStorage.setItem(
        "ima_cart",
        JSON.stringify(cart)
    );


    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    showProductNotification(
        "Product added to cart successfully!"
    );
}


/* =====================================================
   BUY NOW
===================================================== */

function buyProductNow(productId) {

    const product = findProduct(productId);

    if (!product) return;

    let cart = JSON.parse(
        localStorage.getItem("ima_cart") || "[]"
    );

    const existing = cart.find(
        item => String(item.id) === String(productId)
    );

    if (!existing) {

        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price) || 0,
            image: product.image || "",
            quantity: 1
        });

    } else {

        existing.quantity = 1;
    }

    localStorage.setItem(
        "ima_cart",
        JSON.stringify(cart)
    );

    window.location.href =
        "login.html?redirect=checkout";
}


/* =====================================================
   WISHLIST
===================================================== */

function toggleProductWishlist(productId) {

    let wishlist = JSON.parse(
        localStorage.getItem("ima_wishlist") || "[]"
    );

    const exists = wishlist.some(
        id => String(id) === String(productId)
    );

    if (exists) {

        wishlist = wishlist.filter(
            id => String(id) !== String(productId)
        );

        showProductNotification(
            "Removed from wishlist."
        );

    } else {

        wishlist.push(productId);

        showProductNotification(
            "Added to wishlist ❤️"
        );
    }

    localStorage.setItem(
        "ima_wishlist",
        JSON.stringify(wishlist)
    );


    if (typeof updateWishlistCount === "function") {
        updateWishlistCount();
    }
}


/* =====================================================
   SHARE
===================================================== */

function shareProductDetails(productId, productName) {

    const url =
        window.location.origin +
        window.location.pathname +
        "?id=" +
        encodeURIComponent(productId);

    if (navigator.share) {

        navigator.share({
            title: productName,
            text: "Check out this product on IMA Shopping Centre",
            url: url
        }).catch(() => {});

    } else {

        navigator.clipboard.writeText(url)
            .then(() => {
                showProductNotification(
                    "Product link copied!"
                );
            })
            .catch(() => {
                showProductNotification(
                    "Unable to copy link."
                );
            });
    }
}


/* =====================================================
   FIND PRODUCT
===================================================== */

function findProduct(productId) {

    if (
        typeof products === "undefined" ||
        !Array.isArray(products)
    ) {
        return null;
    }

    return products.find(
        item => String(item.id) === String(productId)
    );
}


/* =====================================================
   PAGE META
===================================================== */

function updatePageMeta(product) {

    document.title =
        `${product.name} | IMA Shopping Centre`;

    const description =
        document.querySelector('meta[name="description"]');

    if (description && product.description) {

        description.setAttribute(
            "content",
            product.description.substring(0, 155)
        );
    }
}


/* =====================================================
   ERROR
===================================================== */

function showProductError(message) {

    const container =
        document.getElementById("productDetails");

    if (!container) return;

    container.innerHTML = `

        <div class="product-error">

            <h2>😕 Product Not Found</h2>

            <p>
                ${escapeHTML(message)}
            </p>

            <a
                href="products.html"
                class="primary-btn"
            >
                Browse Products
            </a>

        </div>
    `;
}


/* =====================================================
   NOTIFICATION
===================================================== */

function showProductNotification(message) {

    if (
        typeof showNotification === "function"
    ) {

        showNotification(message);
        return;
    }

    const notification =
        document.createElement("div");

    notification.textContent = message;

    notification.style.position = "fixed";
    notification.style.bottom = "25px";
    notification.style.right = "25px";
    notification.style.background = "#0866ff";
    notification.style.color = "#fff";
    notification.style.padding = "14px 20px";
    notification.style.borderRadius = "8px";
    notification.style.zIndex = "9999";
    notification.style.fontWeight = "600";

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2500);
}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =====================================================
   ESCAPE JS
===================================================== */

function escapeJS(value) {

    return String(value ?? "")
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");
}

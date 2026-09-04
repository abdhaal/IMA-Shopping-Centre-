/* =====================================================
   IMA SHOPPING CENTRE
   WISHLIST PAGE JS

   Current:
   localStorage based wishlist.

   Future:
   Supabase wishlist table.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeWishlist();

});


/* =====================================================
   INITIALIZE
===================================================== */

function initializeWishlist() {

    renderWishlist();

    updateWishlistCounts();

    setupWishlistSearch();

}


/* =====================================================
   GET WISHLIST
===================================================== */

function getWishlist() {

    try {

        const data = JSON.parse(
            localStorage.getItem("ima_wishlist") || "[]"
        );

        return Array.isArray(data)
            ? data
            : [];

    } catch (error) {

        console.error(
            "Wishlist loading error:",
            error
        );

        return [];

    }

}


/* =====================================================
   SAVE WISHLIST
===================================================== */

function saveWishlist(wishlist) {

    localStorage.setItem(
        "ima_wishlist",
        JSON.stringify(wishlist)
    );

}


/* =====================================================
   RENDER
===================================================== */

function renderWishlist() {

    const grid =
        document.getElementById("wishlistGrid");

    const empty =
        document.getElementById("emptyWishlist");

    const subtitle =
        document.getElementById("wishlistSubtitle");

    if (!grid) {
        return;
    }


    const wishlist = getWishlist();


    grid.innerHTML = "";


    if (!wishlist.length) {

        grid.style.display = "none";

        if (empty) {
            empty.style.display = "block";
        }

        if (subtitle) {
            subtitle.textContent =
                "No saved products yet";
        }

        return;

    }


    grid.style.display = "grid";

    if (empty) {
        empty.style.display = "none";
    }


    if (subtitle) {

        subtitle.textContent =
            wishlist.length +
            (
                wishlist.length === 1
                    ? " product saved"
                    : " products saved"
            );

    }


    wishlist.forEach(item => {

        grid.appendChild(
            createWishlistCard(item)
        );

    });

}


/* =====================================================
   CREATE CARD
===================================================== */

function createWishlistCard(product) {

    const card =
        document.createElement("article");

    card.className =
        "wishlist-card";


    const price =
        Number(product.price || 0);

    const oldPrice =
        Number(product.oldPrice || 0);

    let discount = "";

    if (oldPrice > price && price > 0) {

        discount =
            Math.round(
                ((oldPrice - price) / oldPrice) * 100
            );

    }


    const rating =
        Number(product.rating || 0);

    const reviews =
        Number(product.reviews || 0);


    const stars =
        createStars(rating);


    const image =
        product.image ||
        "assets/images/placeholder.jpg";


    card.innerHTML = `

        <button
            class="remove-wishlist"
            type="button"
            title="Remove from wishlist"
            data-id="${escapeHTML(product.id)}"
        >
            ×
        </button>


        <div
            class="wishlist-image-box"
            data-product="${escapeHTML(product.id)}"
        >

            <img
                class="wishlist-image"
                src="${escapeHTML(image)}"
                alt="${escapeHTML(
                    product.name || "Product"
                )}"
                loading="lazy"
                onerror="this.src='assets/images/placeholder.jpg'"
            >

        </div>


        <div class="wishlist-info">

            <h3 class="wishlist-product-name">
                ${escapeHTML(
                    product.name ||
                    "Product"
                )}
            </h3>


            <div class="wishlist-rating">

                <span class="stars">
                    ${stars}
                </span>

                <span>
                    ${rating.toFixed(1)}
                </span>

                <span class="reviews">
                    (${reviews})
                </span>

            </div>


            <div class="wishlist-price-row">

                <span class="wishlist-price">
                    ₹${formatPrice(price)}
                </span>

                ${
                    oldPrice > price
                    ? `
                        <span class="wishlist-old-price">
                            ₹${formatPrice(oldPrice)}
                        </span>
                    `
                    : ""
                }

                ${
                    discount
                    ? `
                        <span class="wishlist-discount">
                            ${discount}% OFF
                        </span>
                    `
                    : ""
                }

            </div>


            <div class="wishlist-product-trust">

                ${
                    product.verifiedSeller
                    ? `
                        <span class="wishlist-trust-badge">
                            ✓ Verified Seller
                        </span>
                    `
                    : ""
                }

                ${
                    product.realVideo
                    ? `
                        <span class="wishlist-trust-badge">
                            ▶ Real Video
                        </span>
                    `
                    : ""
                }

                ${
                    product.fastDelivery
                    ? `
                        <span class="wishlist-trust-badge">
                            ⚡ Fast Delivery
                        </span>
                    `
                    : ""
                }

            </div>


            <div class="wishlist-seller">

                Seller:
                ${escapeHTML(
                    product.seller || "IMA Seller"
                )}

            </div>


            <div class="wishlist-actions">

                <button
                    class="wishlist-add-cart"
                    type="button"
                    data-action="cart"
                    data-id="${escapeHTML(product.id)}"
                >
                    🛒 Add to Cart
                </button>

                <button
                    class="wishlist-buy"
                    type="button"
                    data-action="buy"
                    data-id="${escapeHTML(product.id)}"
                >
                    Buy Now
                </button>

            </div>

        </div>

    `;


    setupWishlistCardEvents(card);


    return card;

}


/* =====================================================
   CARD EVENTS
===================================================== */

function setupWishlistCardEvents(card) {

    const removeButton =
        card.querySelector(
            ".remove-wishlist"
        );

    if (removeButton) {

        removeButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                removeFromWishlist(
                    removeButton.dataset.id
                );

            }
        );

    }


    const image =
        card.querySelector(
            ".wishlist-image-box"
        );

    if (image) {

        image.addEventListener(
            "click",
            () => {

                const id =
                    image.dataset.product;

                window.location.href =
                    "product.html?id=" +
                    encodeURIComponent(id);

            }
        );

    }


    const actionButtons =
        card.querySelectorAll(
            "[data-action]"
        );


    actionButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const action =
                    button.dataset.action;

                const id =
                    button.dataset.id;


                if (action === "cart") {

                    addWishlistProductToCart(id);

                }


                if (action === "buy") {

                    buyWishlistProduct(id);

                }

            }
        );

    });

}


/* =====================================================
   REMOVE
===================================================== */

function removeFromWishlist(id) {

    let wishlist =
        getWishlist();

    wishlist =
        wishlist.filter(
            item =>
                String(item.id) !== String(id)
        );


    saveWishlist(wishlist);

    renderWishlist();

    updateWishlistCounts();

    showWishlistMessage(
        "Removed from wishlist."
    );

}


/* =====================================================
   ADD TO CART
===================================================== */

function addWishlistProductToCart(id) {

    const wishlist =
        getWishlist();

    const product =
        wishlist.find(
            item =>
                String(item.id) === String(id)
        );


    if (!product) {

        showWishlistMessage(
            "Product not found."
        );

        return;

    }


    let cart = [];

    try {

        cart = JSON.parse(
            localStorage.getItem(
                "ima_cart"
            ) || "[]"
        );

        if (!Array.isArray(cart)) {
            cart = [];
        }

    } catch (error) {

        cart = [];

    }


    const existing =
        cart.find(
            item =>
                String(item.id) ===
                String(product.id)
        );


    if (existing) {

        existing.quantity =
            Number(existing.quantity || 1) + 1;

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


    updateWishlistCounts();


    showWishlistMessage(
        "Product added to cart."
    );

}


/* =====================================================
   BUY NOW
===================================================== */

function buyWishlistProduct(id) {

    addWishlistProductToCart(id);

    setTimeout(() => {

        window.location.href =
            "login.html?redirect=checkout";

    }, 500);

}


/* =====================================================
   COUNTS
===================================================== */

function updateWishlistCounts() {

    const wishlistBadge =
        document.getElementById(
            "wishlistCount"
        );

    const cartBadge =
        document.getElementById(
            "cartCount"
        );


    const wishlist =
        getWishlist();


    if (wishlistBadge) {

        wishlistBadge.textContent =
            wishlist.length;

    }


    try {

        const cart =
            JSON.parse(
                localStorage.getItem(
                    "ima_cart"
                ) || "[]"
            );


        const cartCount =
            cart.reduce(
                (total, item) =>
                    total +
                    Number(item.quantity || 1),
                0
            );


        if (cartBadge) {
            cartBadge.textContent =
                cartCount;
        }

    } catch (error) {

        if (cartBadge) {
            cartBadge.textContent = "0";
        }

    }

}


/* =====================================================
   SEARCH
===================================================== */

function setupWishlistSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );

    const button =
        document.getElementById(
            "searchButton"
        );


    if (!input) {
        return;
    }


    function performSearch() {

        const query =
            input.value.trim();


        if (!query) {

            window.location.href =
                "products.html";

            return;

        }


        window.location.href =
            "products.html?search=" +
            encodeURIComponent(query);

    }


    if (button) {

        button.addEventListener(
            "click",
            performSearch
        );

    }


    input.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                performSearch();
            }

        }
    );

}


/* =====================================================
   STARS
===================================================== */

function createStars(rating) {

    let result = "";

    const rounded =
        Math.round(rating);


    for (let i = 1; i <= 5; i++) {

        result +=
            i <= rounded
                ? "★"
                : "☆";

    }


    return result;

}


/* =====================================================
   PRICE
===================================================== */

function formatPrice(price) {

    return Number(price || 0)
        .toLocaleString("en-IN");

}


/* =====================================================
   ESCAPE
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   NOTIFICATION
===================================================== */

function showWishlistMessage(message) {

    const old =
        document.querySelector(
            ".wishlist-notification"
        );


    if (old) {
        old.remove();
    }


    const notification =
        document.createElement("div");


    notification.className =
        "wishlist-notification";


    notification.textContent =
        message;


    notification.style.position =
        "fixed";

    notification.style.bottom =
        "25px";

    notification.style.right =
        "25px";

    notification.style.background =
        "#10213f";

    notification.style.color =
        "#fff";

    notification.style.padding =
        "13px 18px";

    notification.style.borderRadius =
        "9px";

    notification.style.zIndex =
        "10000";

    notification.style.fontSize =
        "14px";

    notification.style.boxShadow =
        "0 10px 25px rgba(0,0,0,.18)";


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.remove();

    }, 2500);

}

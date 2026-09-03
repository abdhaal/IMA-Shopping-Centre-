/* =====================================================
   IMA SHOPPING CENTRE
   CART PAGE JAVASCRIPT
===================================================== */


/* =====================================================
   GET CART
===================================================== */

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem("ima_cart")
        ) || [];

    } catch (error) {

        console.error(
            "Unable to read cart:",
            error
        );

        return [];

    }

}


/* =====================================================
   SAVE CART
===================================================== */

function saveCart(cart) {

    localStorage.setItem(
        "ima_cart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   FORMAT PRICE
===================================================== */

function formatPrice(price) {

    return Number(price || 0)
        .toLocaleString("en-IN");

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value || "")

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =====================================================
   UPDATE CART COUNT
===================================================== */

function updateCartPageCount() {

    const cart = getCart();

    const count = cart.reduce(
        function(total, item) {

            return total +
                (Number(item.quantity) || 1);

        },
        0
    );


    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        cartCount.textContent = count;

    }

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

    const container =
        document.getElementById(
            "cartContent"
        );


    if (!container) return;


    const cart = getCart();


    /* -------------------------------------------------
       EMPTY CART
    ------------------------------------------------- */

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    You haven't added any products
                    to your cart yet.
                </p>

                <a
                    href="products.html"
                    class="primary-btn">

                    Start Shopping →

                </a>

            </div>

        `;


        updateCartPageCount();

        return;

    }


    /* -------------------------------------------------
       CALCULATE TOTALS
    ------------------------------------------------- */

    let subtotal = 0;

    let totalItems = 0;


    cart.forEach(function(item) {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;


        subtotal +=
            price * quantity;


        totalItems +=
            quantity;

    });


    /*
     * Demo delivery rule:
     * ₹499 or above = Free delivery
     * Below ₹499 = ₹40
     *
     * Later this can come from Supabase.
     */

    const delivery =
        subtotal >= 499
            ? 0
            : 40;


    const total =
        subtotal + delivery;


    /* -------------------------------------------------
       FREE DELIVERY MESSAGE
    ------------------------------------------------- */

    let deliveryMessage = "";


    if (delivery === 0) {

        deliveryMessage = `

            <div class="free-delivery-message">

                ✓ You qualify for FREE delivery!

            </div>

        `;

    } else {

        const remaining =
            499 - subtotal;


        deliveryMessage = `

            <div class="free-delivery-message">

                Add ₹${formatPrice(remaining)}
                more to get FREE delivery.

            </div>

        `;

    }


    /* -------------------------------------------------
       CREATE CART HTML
    ------------------------------------------------- */

    const itemsHTML = cart.map(
        function(item, index) {

            const quantity =
                Number(item.quantity) || 1;

            const price =
                Number(item.price) || 0;

            const itemTotal =
                price * quantity;


            const productName =
                escapeHTML(
                    item.name || "IMA Product"
                );


            const image =
                item.image ||
                "https://placehold.co/300x300?text=IMA+Product";


            return `

                <div class="cart-item">


                    <!-- Product Image -->

                    <img
                        class="cart-product-image"
                        src="${escapeHTML(image)}"
                        alt="${productName}"
                        onerror="
                            this.src='https://placehold.co/300x300?text=IMA+Product'
                        "
                    >


                    <!-- Product Info -->

                    <div class="cart-product-info">

                        <h3>

                            <a
                                href="product.html?id=${encodeURIComponent(item.id)}">

                                ${productName}

                            </a>

                        </h3>


                        <div class="cart-price">

                            ₹${formatPrice(price)}

                        </div>


                        <div class="cart-unit-price">

                            Price per item

                        </div>


                        <div class="quantity-box">

                            <button
                                type="button"
                                class="quantity-minus"
                                data-index="${index}">

                                −

                            </button>


                            <span>

                                ${quantity}

                            </span>


                            <button
                                type="button"
                                class="quantity-plus"
                                data-index="${index}">

                                +

                            </button>

                        </div>

                    </div>


                    <!-- Item Total -->

                    <div class="cart-item-right">

                        <div class="item-total">

                            ₹${formatPrice(itemTotal)}

                        </div>


                        <button
                            type="button"
                            class="remove-item"
                            data-index="${index}">

                            🗑 Remove

                        </button>

                    </div>

                </div>

            `;

        }
    ).join("");


    /* -------------------------------------------------
       COMPLETE PAGE
    ------------------------------------------------- */

    container.innerHTML = `

        <div class="cart-layout">


            <!-- =========================================
                 CART ITEMS
            ========================================== -->

            <section class="cart-items">

                <div class="cart-header">

                    <h2>

                        Your Items
                        (${totalItems})

                    </h2>


                    <button
                        type="button"
                        id="clearCartButton"
                        class="clear-cart-btn">

                        Clear Cart

                    </button>

                </div>


                ${itemsHTML}

            </section>


            <!-- =========================================
                 ORDER SUMMARY
            ========================================== -->

            <aside class="cart-summary">

                <h2>
                    Order Summary
                </h2>


                ${deliveryMessage}


                <div class="summary-row">

                    <span>
                        Items
                    </span>

                    <strong>
                        ${totalItems}
                    </strong>

                </div>


                <div class="summary-row">

                    <span>
                        Subtotal
                    </span>

                    <strong>
                        ₹${formatPrice(subtotal)}
                    </strong>

                </div>


                <div class="summary-row">

                    <span>
                        Delivery
                    </span>

                    <strong>

                        ${
                            delivery === 0
                                ? "FREE"
                                : "₹" + formatPrice(delivery)
                        }

                    </strong>

                </div>


                <div class="summary-total">

                    <span>
                        Total
                    </span>

                    <span>
                        ₹${formatPrice(total)}
                    </span>

                </div>


                <button
                    type="button"
                    id="checkoutButton"
                    class="checkout-btn">

                    Proceed to Checkout →

                </button>


                <a
                    href="products.html"
                    class="continue-btn">

                    ← Continue Shopping

                </a>


                <div class="cart-trust">

                    <strong>
                        🛡️ Shop with Trust
                    </strong>

                    <p>
                        ✓ Verified sellers
                    </p>

                    <p>
                        ✓ Genuine buyer reviews
                    </p>

                    <p>
                        ✓ Transparent pricing
                    </p>

                    <p>
                        ✓ Secure checkout
                    </p>

                </div>

            </aside>

        </div>

    `;


    attachCartEvents();

    updateCartPageCount();

}


/* =====================================================
   ATTACH EVENTS
===================================================== */

function attachCartEvents() {


    /* -------------------------------------------------
       PLUS BUTTON
    ------------------------------------------------- */

    document
        .querySelectorAll(".quantity-plus")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(
                            this.dataset.index
                        );

                    changeQuantity(
                        index,
                        1
                    );

                }
            );

        });


    /* -------------------------------------------------
       MINUS BUTTON
    ------------------------------------------------- */

    document
        .querySelectorAll(".quantity-minus")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(
                            this.dataset.index
                        );

                    changeQuantity(
                        index,
                        -1
                    );

                }
            );

        });


    /* -------------------------------------------------
       REMOVE
    ------------------------------------------------- */

    document
        .querySelectorAll(".remove-item")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(
                            this.dataset.index
                        );

                    removeCartItem(index);

                }
            );

        });


    /* -------------------------------------------------
       CLEAR CART
    ------------------------------------------------- */

    const clearButton =
        document.getElementById(
            "clearCartButton"
        );


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            clearCart
        );

    }


    /* -------------------------------------------------
       CHECKOUT
    ------------------------------------------------- */

    const checkoutButton =
        document.getElementById(
            "checkoutButton"
        );


    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            checkout
        );

    }

}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(index, change) {

    const cart = getCart();


    if (!cart[index]) return;


    let quantity =
        Number(cart[index].quantity) || 1;


    quantity += change;


    if (quantity <= 0) {

        cart.splice(index, 1);

    } else {

        cart[index].quantity =
            quantity;

    }


    saveCart(cart);

    renderCart();

}


/* =====================================================
   REMOVE CART ITEM
===================================================== */

function removeCartItem(index) {

    const cart = getCart();


    if (!cart[index]) return;


    const productName =
        cart[index].name ||
        "this product";


    const confirmed =
        confirm(
            `Remove "${productName}" from your cart?`
        );


    if (!confirmed) return;


    cart.splice(index, 1);

    saveCart(cart);

    renderCart();

}


/* =====================================================
   CLEAR CART
===================================================== */

function clearCart() {

    const cart = getCart();


    if (cart.length === 0) return;


    const confirmed =
        confirm(
            "Are you sure you want to clear your cart?"
        );


    if (!confirmed) return;


    localStorage.removeItem(
        "ima_cart"
    );


    renderCart();

}


/* =====================================================
   CHECKOUT
===================================================== */

function checkout() {

    const cart = getCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    /*
     * Current frontend flow:
     *
     * Cart
     *   ↓
     * Login
     *   ↓
     * Address
     *   ↓
     * Order
     *   ↓
     * Payment
     *
     * Supabase integration will be added later.
     */


    window.location.href =
        "login.html?redirect=checkout";

}


/* =====================================================
   SEARCH
===================================================== */

function cartSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );


    const category =
        document.getElementById(
            "categorySelect"
        );


    const keyword =
        input
            ? input.value.trim()
            : "";


    const categoryValue =
        category
            ? category.value
            : "all";


    const params =
        new URLSearchParams();


    if (keyword) {

        params.set(
            "search",
            keyword
        );

    }


    if (
        categoryValue &&
        categoryValue !== "all"
    ) {

        params.set(
            "category",
            categoryValue
        );

    }


    let url =
        "products.html";


    const query =
        params.toString();


    if (query) {

        url += "?" + query;

    }


    window.location.href = url;

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderCart();

        updateCartPageCount();


        /* Search button */

        const searchButton =
            document.getElementById(
                "searchButton"
            );


        if (searchButton) {

            searchButton.addEventListener(
                "click",
                cartSearch
            );

        }


        /* Search Enter */

        const searchInput =
            document.getElementById(
                "searchInput"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "keydown",
                function(event) {

                    if (
                        event.key === "Enter"
                    ) {

                        cartSearch();

                    }

                }
            );

        }

    }
);

/* =====================================================
   IMA SHOPPING CENTRE
   ORDERS PAGE JS

   Current:
   Demo orders using localStorage.

   Future:
   Supabase orders table + order_items + tracking.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeOrders();

});


/* =====================================================
   DEMO ORDERS
===================================================== */

const demoOrders = [
    {
        id: "IMA10001",
        date: "02 Sep 2026",
        status: "delivered",
        product: {
            name: "Premium Wireless Bluetooth Speaker",
            image: "assets/images/product-1.jpg",
            quantity: 1,
            price: 799
        },
        payment: "Online Payment"
    },
    {
        id: "IMA10002",
        date: "03 Sep 2026",
        status: "shipped",
        product: {
            name: "Smart LED Motion Sensor Light",
            image: "assets/images/product-2.jpg",
            quantity: 2,
            price: 399
        },
        payment: "Cash on Delivery"
    },
    {
        id: "IMA10003",
        date: "04 Sep 2026",
        status: "processing",
        product: {
            name: "Multi Purpose Kitchen Storage Box",
            image: "assets/images/product-3.jpg",
            quantity: 1,
            price: 499
        },
        payment: "Online Payment"
    }
];


/* =====================================================
   INITIALIZE
===================================================== */

function initializeOrders() {

    loadOrders();

    setupOrderTabs();

    setupSearch();

    updateCounts();

    applyURLFilter();

}


/* =====================================================
   LOAD ORDERS
===================================================== */

function getOrders() {

    try {

        const savedOrders =
            localStorage.getItem("ima_orders");

        if (savedOrders) {

            const parsed = JSON.parse(savedOrders);

            if (Array.isArray(parsed)) {
                return parsed;
            }

        }

    } catch (error) {

        console.error(
            "Unable to load orders:",
            error
        );

    }

    return demoOrders;

}


/* =====================================================
   RENDER
===================================================== */

function loadOrders(filter = "all") {

    const ordersList =
        document.getElementById("ordersList");

    const emptyOrders =
        document.getElementById("emptyOrders");

    if (!ordersList) {
        return;
    }

    const orders = getOrders();

    let filteredOrders = orders;

    if (filter === "returns") {

        filteredOrders = orders.filter(
            order =>
                order.status === "return" ||
                order.status === "returned"
        );

    } else if (filter !== "all") {

        filteredOrders = orders.filter(
            order =>
                order.status === filter
        );

    }


    ordersList.innerHTML = "";


    if (!filteredOrders.length) {

        ordersList.style.display = "none";

        if (emptyOrders) {
            emptyOrders.style.display = "block";
        }

        return;
    }


    ordersList.style.display = "flex";

    if (emptyOrders) {
        emptyOrders.style.display = "none";
    }


    filteredOrders.forEach(order => {

        ordersList.appendChild(
            createOrderCard(order)
        );

    });

}


/* =====================================================
   ORDER CARD
===================================================== */

function createOrderCard(order) {

    const card =
        document.createElement("article");

    card.className = "order-card";

    const status =
        order.status || "processing";

    const statusText =
        getStatusText(status);

    const product =
        order.product || {};

    const quantity =
        Number(product.quantity || 1);

    const price =
        Number(product.price || 0);

    const total =
        price * quantity;


    card.innerHTML = `

        <div class="order-top">

            <div>
                <div class="order-number">
                    Order #${escapeHTML(order.id)}
                </div>

                <div class="order-date">
                    Ordered on ${escapeHTML(order.date)}
                </div>
            </div>

            <span class="order-status ${getStatusClass(status)}">
                ${statusText}
            </span>

        </div>


        <div class="order-body">

            <div class="order-product">

                <img
                    src="${escapeHTML(
                        product.image ||
                        "assets/images/placeholder.jpg"
                    )}"
                    alt="${escapeHTML(
                        product.name ||
                        "Product"
                    )}"
                    class="order-product-image"
                    onerror="this.src='assets/images/placeholder.jpg'"
                >

                <div class="order-product-info">

                    <h3 class="order-product-name">
                        ${escapeHTML(
                            product.name ||
                            "Product"
                        )}
                    </h3>

                    <div class="order-product-meta">

                        <span>
                            Qty: ${quantity}
                        </span>

                        <span>
                            ₹${formatPrice(price)}
                        </span>

                    </div>

                </div>

                <div class="order-price">
                    ₹${formatPrice(total)}
                </div>

            </div>


            ${createProgress(status)}

        </div>


        <div class="order-bottom">

            <div class="payment-info">
                ${escapeHTML(
                    order.payment ||
                    "Payment"
                )}
            </div>

            <div class="order-actions">

                <button
                    class="order-action primary"
                    data-action="view"
                    data-order="${escapeHTML(order.id)}"
                >
                    View Details
                </button>

                ${getActionButton(status, order.id)}

            </div>

        </div>

    `;


    attachOrderCardEvents(card);

    return card;

}


/* =====================================================
   PROGRESS
===================================================== */

function createProgress(status) {

    const steps = [
        "Ordered",
        "Processing",
        "Shipped",
        "Delivered"
    ];

    let currentStep = 0;

    if (status === "processing") {
        currentStep = 1;
    }

    if (status === "shipped") {
        currentStep = 2;
    }

    if (status === "delivered") {
        currentStep = 3;
    }

    if (
        status === "cancelled" ||
        status === "return" ||
        status === "returned"
    ) {
        return "";
    }


    let fillWidth = 0;

    if (currentStep === 1) {
        fillWidth = 29;
    }

    if (currentStep === 2) {
        fillWidth = 59;
    }

    if (currentStep === 3) {
        fillWidth = 76;
    }


    return `

        <div class="order-progress">

            <div class="progress-line"></div>

            <div
                class="progress-fill"
                style="width:${fillWidth}%"
            ></div>

            ${steps.map((step, index) => `

                <div class="progress-step
                    ${index <= currentStep ? "completed" : ""}
                    ${index === currentStep ? "active" : ""}
                ">

                    <div class="progress-dot">
                        ${index <= currentStep ? "✓" : ""}
                    </div>

                    <span>${step}</span>

                </div>

            `).join("")}

        </div>

    `;

}


/* =====================================================
   ACTION BUTTON
===================================================== */

function getActionButton(status, orderId) {

    if (status === "delivered") {

        return `
            <button
                class="order-action"
                data-action="return"
                data-order="${escapeHTML(orderId)}"
            >
                Return / Refund
            </button>
        `;

    }

    if (status === "shipped") {

        return `
            <button
                class="order-action"
                data-action="track"
                data-order="${escapeHTML(orderId)}"
            >
                Track Order
            </button>
        `;

    }

    if (status === "processing") {

        return `
            <button
                class="order-action"
                data-action="cancel"
                data-order="${escapeHTML(orderId)}"
            >
                Cancel Order
            </button>
        `;

    }

    return "";

}


/* =====================================================
   EVENTS
===================================================== */

function attachOrderCardEvents(card) {

    const buttons =
        card.querySelectorAll(
            ".order-action"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const action =
                    button.dataset.action;

                const orderId =
                    button.dataset.order;

                handleOrderAction(
                    action,
                    orderId
                );

            }
        );

    });

}


/* =====================================================
   HANDLE ACTION
===================================================== */

function handleOrderAction(
    action,
    orderId
) {

    if (action === "view") {

        showOrderMessage(
            "Order details for #" +
            orderId +
            " will open here."
        );

        return;
    }


    if (action === "track") {

        showOrderMessage(
            "Live order tracking will be connected with the delivery system."
        );

        return;
    }


    if (action === "cancel") {

        const confirmCancel =
            confirm(
                "Are you sure you want to cancel this order?"
            );

        if (!confirmCancel) {
            return;
        }

        cancelOrder(orderId);

        return;
    }


    if (action === "return") {

        const confirmReturn =
            confirm(
                "Do you want to start a return/refund request?"
            );

        if (!confirmReturn) {
            return;
        }

        showOrderMessage(
            "Return/refund request will be connected to the support system."
        );

    }

}


/* =====================================================
   CANCEL ORDER
===================================================== */

function cancelOrder(orderId) {

    const orders = getOrders();

    const order =
        orders.find(
            item => item.id === orderId
        );

    if (!order) {
        return;
    }

    order.status = "cancelled";

    localStorage.setItem(
        "ima_orders",
        JSON.stringify(orders)
    );

    loadOrders(
        getCurrentFilter()
    );

    showOrderMessage(
        "Order cancelled successfully."
    );

}


/* =====================================================
   TABS
===================================================== */

function setupOrderTabs() {

    const tabs =
        document.querySelectorAll(
            ".order-tab"
        );

    tabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                tabs.forEach(item =>
                    item.classList.remove("active")
                );

                tab.classList.add("active");

                const filter =
                    tab.dataset.filter;

                loadOrders(filter);

            }
        );

    });

}


/* =====================================================
   CURRENT FILTER
===================================================== */

function getCurrentFilter() {

    const active =
        document.querySelector(
            ".order-tab.active"
        );

    return active
        ? active.dataset.filter
        : "all";

}


/* =====================================================
   URL FILTER
===================================================== */

function applyURLFilter() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const filter =
        params.get("filter");

    if (!filter) {
        return;
    }

    const tab =
        document.querySelector(
            `.order-tab[data-filter="${filter}"]`
        );

    if (!tab) {
        return;
    }

    document
        .querySelectorAll(".order-tab")
        .forEach(item =>
            item.classList.remove("active")
        );

    tab.classList.add("active");

    loadOrders(filter);

}


/* =====================================================
   SEARCH
===================================================== */

function setupSearch() {

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

    function search() {

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
            search
        );
    }


    input.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                search();
            }

        }
    );

}


/* =====================================================
   CART / WISHLIST COUNT
===================================================== */

function updateCounts() {

    const cartBadge =
        document.getElementById(
            "cartCount"
        );

    const wishlistBadge =
        document.getElementById(
            "wishlistCount"
        );


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
                    Number(
                        item.quantity || 1
                    ),
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


    try {

        const wishlist =
            JSON.parse(
                localStorage.getItem(
                    "ima_wishlist"
                ) || "[]"
            );

        if (wishlistBadge) {
            wishlistBadge.textContent =
                wishlist.length;
        }

    } catch (error) {

        if (wishlistBadge) {
            wishlistBadge.textContent = "0";
        }

    }

}


/* =====================================================
   STATUS
===================================================== */

function getStatusText(status) {

    const statuses = {
        processing: "Processing",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled",
        return: "Return Requested",
        returned: "Returned"
    };

    return statuses[status] || "Processing";

}


function getStatusClass(status) {

    const classes = {
        processing: "status-processing",
        shipped: "status-shipped",
        delivered: "status-delivered",
        cancelled: "status-cancelled",
        return: "status-return",
        returned: "status-return"
    };

    return classes[status] ||
        "status-processing";

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

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   MESSAGE
===================================================== */

function showOrderMessage(message) {

    const old =
        document.querySelector(
            ".order-notification"
        );

    if (old) {
        old.remove();
    }


    const notification =
        document.createElement("div");

    notification.className =
        "order-notification";

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

    }, 3000);

}

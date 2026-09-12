/* =====================================================
   IMA SHOPPING CENTRE
   ADMIN ORDERS JAVASCRIPT
   ===================================================== */


/* =====================================================
   DEMO ORDERS
   ===================================================== */

let orders = [

    {
        id: "IMA10001",

        customer: {
            name: "Mohamed",
            phone: "9876543210",
            email: "customer@example.com"
        },

        address:
            "Erode, Tamil Nadu, India",

        products: [

            {
                name: "Smart LED Bulb",
                price: 299,
                quantity: 2,
                image: "../assets/images/bulb.jpg"
            }

        ],

        total: 598,

        payment: "cod",

        paymentStatus: "pending",

        status: "pending",

        date: "2026-09-12"

    },


    {
        id: "IMA10002",

        customer: {
            name: "Arun Kumar",
            phone: "9123456780",
            email: "arun@example.com"
        },

        address:
            "Coimbatore, Tamil Nadu, India",

        products: [

            {
                name: "Portable Mini Fan",
                price: 399,
                quantity: 1,
                image: "../assets/images/fan.jpg"
            },

            {
                name: "Smart LED Bulb",
                price: 299,
                quantity: 1,
                image: "../assets/images/bulb.jpg"
            }

        ],

        total: 698,

        payment: "online",

        paymentStatus: "paid",

        status: "shipped",

        date: "2026-09-11"

    },


    {
        id: "IMA10003",

        customer: {
            name: "Sathish",
            phone: "9988776655",
            email: "sathish@example.com"
        },

        address:
            "Salem, Tamil Nadu, India",

        products: [

            {
                name: "Kitchen Storage Box",
                price: 249,
                quantity: 2,
                image: "../assets/images/storage.jpg"
            }

        ],

        total: 498,

        payment: "cod",

        paymentStatus: "pending",

        status: "confirmed",

        date: "2026-09-10"

    },


    {
        id: "IMA10004",

        customer: {
            name: "Rahul",
            phone: "9876501234",
            email: "rahul@example.com"
        },

        address:
            "Chennai, Tamil Nadu, India",

        products: [

            {
                name: "Motion Sensor Light",
                price: 449,
                quantity: 1,
                image: "../assets/images/light.jpg"
            }

        ],

        total: 449,

        payment: "online",

        paymentStatus: "paid",

        status: "delivered",

        date: "2026-09-08"

    },


    {
        id: "IMA10005",

        customer: {
            name: "Vignesh",
            phone: "9000011111",
            email: "vignesh@example.com"
        },

        address:
            "Tiruppur, Tamil Nadu, India",

        products: [

            {
                name: "Portable Mini Fan",
                price: 399,
                quantity: 1,
                image: "../assets/images/fan.jpg"
            }

        ],

        total: 399,

        payment: "cod",

        paymentStatus: "pending",

        status: "cancelled",

        date: "2026-09-07"

    }

];


/* =====================================================
   CURRENT ORDER
   ===================================================== */

let currentOrderId = null;


/* =====================================================
   DOM READY
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderOrders();

        updateStatistics();

        setupSearch();

    }
);


/* =====================================================
   RENDER ORDERS
   ===================================================== */

function renderOrders(list = orders) {

    const table =
        document.getElementById(
            "adminOrdersTable"
        );

    if (!table) return;


    if (!list.length) {

        table.innerHTML = `

            <tr>

                <td colspan="8">

                    <div class="empty-orders">

                        <div class="empty-orders-icon">
                            📦
                        </div>

                        <h3>
                            No orders found
                        </h3>

                        <p>
                            Try changing your search or filters.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        updateResultText(0);

        return;

    }


    table.innerHTML =
        list.map(
            createOrderRow
        ).join("");


    updateResultText(
        list.length
    );

}


/* =====================================================
   CREATE ORDER ROW
   ===================================================== */

function createOrderRow(order) {

    const firstProduct =
        order.products[0];


    const totalItems =
        order.products.reduce(
            (total, product) =>
                total + product.quantity,
            0
        );


    const paymentText =
        getPaymentText(order);


    return `

        <tr>

            <!-- ORDER -->

            <td>

                <span class="order-id">
                    #${order.id}
                </span>

                <span class="order-items-count">
                    ${totalItems} item(s)
                </span>

            </td>


            <!-- CUSTOMER -->

            <td>

                <span class="customer-name">
                    ${escapeHTML(
                        order.customer.name
                    )}
                </span>

                <span class="customer-phone">
                    ${escapeHTML(
                        order.customer.phone
                    )}
                </span>

            </td>


            <!-- PRODUCT -->

            <td>

                <div class="product-mini">

                    <img
                        src="${firstProduct.image}"
                        alt="${escapeHTML(
                            firstProduct.name
                        )}"
                        onerror="
                        this.src='https://placehold.co/100x100?text=IMA'
                        "
                    >

                    <div class="product-mini-info">

                        <strong>
                            ${escapeHTML(
                                firstProduct.name
                            )}
                        </strong>

                        <span>

                            ${
                                order.products.length > 1
                                ? `+ ${
                                    order.products.length - 1
                                  } more`
                                : `${firstProduct.quantity} item(s)`
                            }

                        </span>

                    </div>

                </div>

            </td>


            <!-- AMOUNT -->

            <td>

                <span class="order-amount">
                    ₹${formatPrice(order.total)}
                </span>

            </td>


            <!-- PAYMENT -->

            <td>

                <span class="
                    payment-badge
                    ${getPaymentClass(order)}
                ">

                    ${paymentText}

                </span>

            </td>


            <!-- STATUS -->

            <td>

                <span class="
                    status-badge
                    status-${order.status}
                ">

                    ${getStatusText(
                        order.status
                    )}

                </span>

            </td>


            <!-- DATE -->

            <td>

                ${formatDate(order.date)}

            </td>


            <!-- ACTIONS -->

            <td>

                <div class="order-actions">

                    <button
                        class="action-btn"
                        title="View Order"
                        onclick="
                            openOrderModal('${order.id}')
                        "
                    >
                        👁️
                    </button>


                    <button
                        class="action-btn"
                        title="Update Status"
                        onclick="
                            openOrderModal('${order.id}')
                        "
                    >
                        ✏️
                    </button>


                    <button
                        class="
                            action-btn
                            action-delete
                        "
                        title="Delete Order"
                        onclick="
                            deleteOrder('${order.id}')
                        "
                    >
                        🗑️
                    </button>

                </div>

            </td>

        </tr>

    `;

}


/* =====================================================
   STATUS TEXT
   ===================================================== */

function getStatusText(status) {

    const statusMap = {

        pending: "⏳ Pending",

        confirmed: "✓ Confirmed",

        packed: "📦 Packed",

        shipped: "🚚 Shipped",

        delivered: "✓ Delivered",

        cancelled: "✕ Cancelled"

    };


    return (
        statusMap[status] ||
        status
    );

}


/* =====================================================
   PAYMENT TEXT
   ===================================================== */

function getPaymentText(order) {

    if (order.payment === "cod") {

        return "💵 COD";

    }


    if (
        order.payment === "online" &&
        order.paymentStatus === "paid"
    ) {

        return "✓ Paid";

    }


    return "Payment Pending";

}


/* =====================================================
   PAYMENT CLASS
   ===================================================== */

function getPaymentClass(order) {

    if (order.payment === "cod") {

        return "payment-cod";

    }


    if (
        order.paymentStatus === "paid"
    ) {

        return "payment-paid";

    }


    return "payment-pending";

}


/* =====================================================
   SEARCH
   ===================================================== */

function setupSearch() {

    const input =
        document.getElementById(
            "orderSearch"
        );

    if (!input) return;


    input.addEventListener(
        "input",
        function () {

            filterOrders();

        }
    );

}


/* =====================================================
   SEARCH BUTTON
   ===================================================== */

function searchOrders() {

    filterOrders();

}


/* =====================================================
   FILTER ORDERS
   ===================================================== */

function filterOrders() {

    const searchInput =
        document.getElementById(
            "orderSearch"
        );


    const statusFilter =
        document.getElementById(
            "orderStatusFilter"
        );


    const paymentFilter =
        document.getElementById(
            "paymentFilter"
        );


    const dateFilter =
        document.getElementById(
            "dateFilter"
        );


    const keyword =
        searchInput
        ? searchInput.value
            .toLowerCase()
            .trim()
        : "";


    const selectedStatus =
        statusFilter
        ? statusFilter.value
        : "all";


    const selectedPayment =
        paymentFilter
        ? paymentFilter.value
        : "all";


    const selectedDate =
        dateFilter
        ? dateFilter.value
        : "all";


    let filtered =
        orders.filter(
            function (order) {


                /* SEARCH */

                const searchableText =
                    `

                    ${order.id}

                    ${order.customer.name}

                    ${order.customer.phone}

                    ${order.customer.email}

                    ${order.products
                        .map(p => p.name)
                        .join(" ")}

                    `.toLowerCase();


                const matchesSearch =
                    !keyword ||
                    searchableText.includes(
                        keyword
                    );


                /* STATUS */

                const matchesStatus =
                    selectedStatus === "all" ||
                    order.status ===
                        selectedStatus;


                /* PAYMENT */

                let matchesPayment = true;


                if (
                    selectedPayment === "cod"
                ) {

                    matchesPayment =
                        order.payment === "cod";

                }

                else if (
                    selectedPayment === "online"
                ) {

                    matchesPayment =
                        order.payment === "online";

                }

                else if (
                    selectedPayment === "paid"
                ) {

                    matchesPayment =
                        order.paymentStatus ===
                        "paid";

                }

                else if (
                    selectedPayment === "pending"
                ) {

                    matchesPayment =
                        order.paymentStatus !==
                        "paid";

                }


                /* DATE */

                const matchesDate =
                    checkDateFilter(
                        order.date,
                        selectedDate
                    );


                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesPayment &&
                    matchesDate
                );

            }
        );


    renderOrders(filtered);

}


/* =====================================================
   DATE FILTER
   ===================================================== */

function checkDateFilter(
    orderDate,
    filter
) {

    if (filter === "all") {

        return true;

    }


    const today =
        new Date();


    const date =
        new Date(orderDate);


    const difference =
        today - date;


    const days =
        difference /
        (1000 * 60 * 60 * 24);


    if (filter === "today") {

        return (
            date.toDateString() ===
            today.toDateString()
        );

    }


    if (filter === "7days") {

        return days >= 0 &&
               days <= 7;

    }


    if (filter === "30days") {

        return days >= 0 &&
               days <= 30;

    }


    return true;

}


/* =====================================================
   UPDATE STATISTICS
   ===================================================== */

function updateStatistics() {

    const total =
        orders.length;


    const pending =
        orders.filter(
            o => o.status === "pending"
        ).length;


    const shipped =
        orders.filter(
            o => o.status === "shipped"
        ).length;


    const delivered =
        orders.filter(
            o => o.status === "delivered"
        ).length;


    const cancelled =
        orders.filter(
            o => o.status === "cancelled"
        ).length;


    setText(
        "totalOrders",
        total
    );


    setText(
        "pendingOrders",
        pending
    );


    setText(
        "shippedOrders",
        shipped
    );


    setText(
        "deliveredOrders",
        delivered
    );


    setText(
        "cancelledOrders",
        cancelled
    );

}


/* =====================================================
   OPEN ORDER MODAL
   ===================================================== */

function openOrderModal(id) {

    const order =
        orders.find(
            o => o.id === id
        );


    if (!order) return;


    currentOrderId =
        id;


    setText(
        "modalOrderId",
        `#${order.id}`
    );


    setText(
        "modalCustomerName",
        order.customer.name
    );


    setText(
        "modalCustomerPhone",
        order.customer.phone
    );


    setText(
        "modalCustomerEmail",
        order.customer.email
    );


    setText(
        "modalPayment",
        getPaymentText(order)
    );


    setText(
        "modalAddress",
        order.address
    );


    setText(
        "modalTotal",
        `₹${formatPrice(order.total)}`
    );


    const productsContainer =
        document.getElementById(
            "modalProducts"
        );


    if (productsContainer) {

        productsContainer.innerHTML =
            order.products
                .map(
                    function (product) {

                        return `

                            <div class="modal-product">

                                <img
                                    src="${product.image}"
                                    alt="${escapeHTML(
                                        product.name
                                    )}"
                                    onerror="
                                    this.src='https://placehold.co/100x100?text=IMA'
                                    "
                                >

                                <div class="modal-product-info">

                                    <strong>
                                        ${escapeHTML(
                                            product.name
                                        )}
                                    </strong>

                                    <span>
                                        ₹${formatPrice(
                                            product.price
                                        )}
                                        ×
                                        ${product.quantity}
                                    </span>

                                </div>

                            </div>

                        `;

                    }
                )
                .join("");

    }


    const status =
        document.getElementById(
            "modalStatus"
        );


    if (status) {

        status.value =
            order.status;

    }


    const modal =
        document.getElementById(
            "orderModal"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

    }

}


/* =====================================================
   CLOSE MODAL
   ===================================================== */

function closeOrderModal() {

    const modal =
        document.getElementById(
            "orderModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    currentOrderId = null;

}


/* =====================================================
   SAVE STATUS
   ===================================================== */

function saveOrderStatus() {

    if (!currentOrderId) {

        return;

    }


    const order =
        orders.find(
            o => o.id === currentOrderId
        );


    if (!order) return;


    const status =
        document.getElementById(
            "modalStatus"
        );


    if (!status) return;


    order.status =
        status.value;


    saveOrdersToLocalStorage();


    renderOrders();

    updateStatistics();

    closeOrderModal();


    alert(
        "Order status updated successfully!"
    );

}


/* =====================================================
   DELETE ORDER
   ===================================================== */

function deleteOrder(id) {

    const order =
        orders.find(
            o => o.id === id
        );


    if (!order) return;


    const confirmed =
        confirm(
            `Delete order #${id}?`
        );


    if (!confirmed) {

        return;

    }


    orders =
        orders.filter(
            o => o.id !== id
        );


    saveOrdersToLocalStorage();

    renderOrders();

    updateStatistics();


    alert(
        "Order deleted successfully."
    );

}


/* =====================================================
   REFRESH
   ===================================================== */

function refreshOrders() {

    renderOrders();

    updateStatistics();


    alert(
        "Orders refreshed."
    );

}


/* =====================================================
   LOCAL STORAGE
   ===================================================== */

function saveOrdersToLocalStorage() {

    localStorage.setItem(
        "ima_admin_orders",
        JSON.stringify(orders)
    );

}


/* =====================================================
   LOAD LOCAL STORAGE
   ===================================================== */

function loadOrdersFromLocalStorage() {

    const saved =
        localStorage.getItem(
            "ima_admin_orders"
        );


    if (!saved) {

        return;

    }


    try {

        const parsed =
            JSON.parse(saved);


        if (Array.isArray(parsed)) {

            orders = parsed;

        }

    }

    catch (error) {

        console.error(
            "Unable to load orders:",
            error
        );

    }

}


/* =====================================================
   FORMAT PRICE
   ===================================================== */

function formatPrice(price) {

    return Number(price)
        .toLocaleString("en-IN");

}


/* =====================================================
   FORMAT DATE
   ===================================================== */

function formatDate(date) {

    const d =
        new Date(date);


    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =====================================================
   SET TEXT
   ===================================================== */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


/* =====================================================
   RESULT TEXT
   ===================================================== */

function updateResultText(count) {

    const element =
        document.getElementById(
            "orderResultText"
        );


    if (!element) return;


    element.textContent =
        `Showing ${count} order${
            count === 1
                ? ""
                : "s"
        }`;

}


/* =====================================================
   ESCAPE HTML
   ===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   ADMIN LOGOUT
   ===================================================== */

function adminLogout() {

    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) {

        return;

    }


    localStorage.removeItem(
        "ima_admin_logged_in"
    );


    window.location.href =
        "../login.html";

}


/* =====================================================
   MODAL OUTSIDE CLICK
   ===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "orderModal"
            );


        if (
            modal &&
            event.target === modal
        ) {

            closeOrderModal();

        }

    }
);


/* =====================================================
   ESC KEY
   ===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeOrderModal();

        }

    }
);


/* =====================================================
   LOAD SAVED ORDERS
   ===================================================== */

loadOrdersFromLocalStorage();

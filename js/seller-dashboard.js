/* =================================
   IMA SELLER DASHBOARD JS
================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================
       SELLER USER
    ================================= */

    let user = null;

    try {

        user = JSON.parse(
            localStorage.getItem("ima_user")
        );

    } catch (error) {

        user = null;

    }


    if (!user) {

        user = {
            id: "seller-demo",
            name: "Seller",
            email: "seller@example.com",
            role: "seller"
        };

    }


    const sellerName =
        user.name || "Seller";


    document.getElementById(
        "sellerName"
    ).textContent = sellerName;


    document.getElementById(
        "welcomeSeller"
    ).textContent = sellerName;


    document.getElementById(
        "sellerAvatar"
    ).textContent =
        sellerName.charAt(0).toUpperCase();


    /* =================================
       DEMO ORDERS
    ================================= */

    const orders = [

        {
            id: "IMA-S10021",
            product: "Premium Bluetooth Speaker",
            customer: "Arun Kumar",
            amount: 799,
            date: "04 Sep 2026",
            status: "New"
        },

        {
            id: "IMA-S10020",
            product: "Smart Motion Sensor Light",
            customer: "Rahul",
            amount: 798,
            date: "04 Sep 2026",
            status: "Processing"
        },

        {
            id: "IMA-S10019",
            product: "Kitchen Storage Box",
            customer: "Priya",
            amount: 499,
            date: "03 Sep 2026",
            status: "Shipped"
        },

        {
            id: "IMA-S10018",
            product: "Portable Mini Cooler",
            customer: "Mohamed",
            amount: 999,
            date: "03 Sep 2026",
            status: "Delivered"
        },

        {
            id: "IMA-S10017",
            product: "LED Emergency Light",
            customer: "Sanjay",
            amount: 399,
            date: "02 Sep 2026",
            status: "Delivered"
        }

    ];


    /* =================================
       RENDER ORDERS
    ================================= */

    function renderOrders() {

        const table =
            document.getElementById(
                "ordersTable"
            );

        if (!table) return;

        table.innerHTML = "";


        orders.forEach(function (order) {

            const row =
                document.createElement("tr");


            let statusClass =
                order.status.toLowerCase();


            row.innerHTML = `

                <td>
                    <span class="order-id">
                        ${escapeHTML(order.id)}
                    </span>
                </td>

                <td>
                    <span class="order-product">
                        ${escapeHTML(order.product)}
                    </span>
                </td>

                <td>
                    ${escapeHTML(order.customer)}
                </td>

                <td>
                    <strong>
                        ₹${order.amount.toLocaleString()}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(order.date)}
                </td>

                <td>
                    <span class="status-badge ${statusClass}">
                        ${escapeHTML(order.status)}
                    </span>
                </td>

                <td>
                    <button
                        class="view-order"
                        data-order="${order.id}"
                    >
                        View
                    </button>
                </td>

            `;


            table.appendChild(row);

        });


        document
            .querySelectorAll(".view-order")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        showNotification(
                            "Opening order " +
                            button.dataset.order
                        );

                    }
                );

            });

    }


    renderOrders();


    /* =================================
       PRODUCTS
    ================================= */

    const products = [

        {
            id: 1,
            name: "Premium Bluetooth Speaker",
            price: 799,
            stock: 46,
            image: "../assets/images/product-1.jpg"
        },

        {
            id: 2,
            name: "Smart Motion Sensor Light",
            price: 399,
            stock: 18,
            image: "../assets/images/product-2.jpg"
        },

        {
            id: 3,
            name: "Kitchen Storage Box",
            price: 499,
            stock: 7,
            image: "../assets/images/product-3.jpg"
        }

    ];


    /* =================================
       RENDER PRODUCTS
    ================================= */

    function renderProducts() {

        const container =
            document.getElementById(
                "sellerProducts"
            );

        if (!container) return;

        container.innerHTML = "";


        products.forEach(function (product) {

            const card =
                document.createElement("div");

            card.className =
                "seller-product";


            card.innerHTML = `

                <div class="seller-product-image">

                    <img
                        src="${product.image}"
                        alt="${escapeHTML(product.name)}"
                        onerror="this.src='../assets/images/placeholder.jpg'"
                    >

                </div>


                <div class="seller-product-info">

                    <h3>
                        ${escapeHTML(product.name)}
                    </h3>

                    <div class="seller-product-price">
                        ₹${product.price.toLocaleString()}
                    </div>

                    <div class="product-stock">
                        Stock: ${product.stock}
                    </div>

                    <button
                        class="edit-product"
                        data-product="${product.id}"
                    >
                        Edit Product
                    </button>

                </div>

            `;


            container.appendChild(card);

        });


        document
            .querySelectorAll(".edit-product")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        showNotification(
                            "Product editing will be connected to Supabase."
                        );

                    }
                );

            });

    }


    renderProducts();


    /* =================================
       LOW STOCK
    ================================= */

    const lowStockProducts = [

        {
            name: "Kitchen Storage Box",
            stock: 7
        },

        {
            name: "LED Emergency Light",
            stock: 5
        },

        {
            name: "Portable Mini Cooler",
            stock: 4
        },

        {
            name: "Wireless Earbuds",
            stock: 3
        },

        {
            name: "USB Rechargeable Fan",
            stock: 2
        }

    ];


    function renderStock() {

        const container =
            document.getElementById(
                "stockList"
            );

        if (!container) return;

        container.innerHTML = "";


        lowStockProducts.forEach(function (product) {

            const item =
                document.createElement("div");

            item.className =
                "stock-item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${escapeHTML(product.name)}
                    </strong>

                    <small>
                        Only ${product.stock} units remaining
                    </small>

                </div>

                <span class="stock-warning">
                    Low Stock
                </span>

            `;


            container.appendChild(item);

        });

    }


    renderStock();


    /* =================================
       PRODUCT MODAL
    ================================= */

    const modal =
        document.getElementById(
            "productModal"
        );


    function openProductModal() {

        modal.classList.add("active");

    }


    function closeProductModal() {

        modal.classList.remove("active");

    }


    document
        .getElementById("addProductBtn")
        .addEventListener(
            "click",
            openProductModal
        );


    document
        .getElementById("quickAddProduct")
        .addEventListener(
            "click",
            openProductModal
        );


    document
        .getElementById("closeProductModal")
        .addEventListener(
            "click",
            closeProductModal
        );


    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                closeProductModal();

            }

        }
    );


    /* =================================
       ADD PRODUCT
    ================================= */

    document
        .getElementById("productForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "productName"
                    ).value.trim();


                const category =
                    document.getElementById(
                        "productCategory"
                    ).value;


                const price =
                    document.getElementById(
                        "productPrice"
                    ).value;


                const stock =
                    document.getElementById(
                        "productStock"
                    ).value;


                const image =
                    document.getElementById(
                        "productImage"
                    ).value;


                if (!name || !category || !price) {

                    showProductMessage(
                        "Please fill all required fields.",
                        "error"
                    );

                    return;

                }


                showProductMessage(
                    "Product added successfully! Supabase integration will save it permanently.",
                    "success"
                );


                showNotification(
                    "Product created successfully!"
                );


                setTimeout(function () {

                    closeProductModal();

                    document
                        .getElementById("productForm")
                        .reset();

                }, 1000);

            }
        );


    /* =================================
       MANAGE PRODUCTS
    ================================= */

    document
        .getElementById("manageProducts")
        .addEventListener(
            "click",
            function () {

                showNotification(
                    "Product management page will open here."
                );

            }
        );


    document
        .getElementById("viewAllProducts")
        .addEventListener(
            "click",
            function () {

                showNotification(
                    "Opening product management..."
                );

            }
        );


    /* =================================
       MANAGE ORDERS
    ================================= */

    document
        .getElementById("manageOrders")
        .addEventListener(
            "click",
            function () {

                showNotification(
                    "Opening seller orders..."
                );

            }
        );


    document
        .getElementById("viewAllOrders")
        .addEventListener(
            "click",
            function () {

                showNotification(
                    "Opening all orders..."
                );

            }
        );


    /* =================================
       PAYMENTS
    ================================= */

    document
        .getElementById("sellerPayments")
        .addEventListener(
            "click",
            function () {

                showNotification(
                    "Seller payment centre will open here."
                );

            }
        );


    /* =================================
       NOTIFICATION
    ================================= */

    document
        .getElementById("notificationBtn")
        .addEventListener(
            "click",
            function () {

                showNotification(
                    "You have 4 new seller notifications."
                );

            }
        );


    /* =================================
       SALES PERIOD
    ================================= */

    document
        .getElementById("salesPeriod")
        .addEventListener(
            "change",
            function () {

                showNotification(
                    "Sales period updated."
                );

            }
        );


    /* =================================
       NOTIFICATION
    ================================= */

    function showNotification(message) {

        const notification =
            document.getElementById(
                "sellerNotification"
            );


        notification.textContent =
            message;


        notification.classList.add(
            "show"
        );


        setTimeout(function () {

            notification.classList.remove(
                "show"
            );

        }, 2500);

    }


    /* =================================
       PRODUCT MESSAGE
    ================================= */

    function showProductMessage(
        message,
        type
    ) {

        const element =
            document.getElementById(
                "productMessage"
            );


        element.textContent =
            message;


        if (type === "success") {

            element.style.color =
                "#039855";

        } else {

            element.style.color =
                "#d92d20";

        }

    }


    /* =================================
       ESCAPE HTML
    ================================= */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});

/* =================================
   IMA CREATOR DASHBOARD JS
================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ================================
       DEMO CREATOR
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
            name: "Creator",
            email: "creator@example.com",
            role: "creator"
        };

    }


    const creatorName =
        user.name || "Creator";


    document.getElementById("creatorName").textContent =
        creatorName;

    document.getElementById("welcomeName").textContent =
        creatorName;

    document.getElementById("creatorAvatar").textContent =
        creatorName.charAt(0).toUpperCase();


    /* ================================
       AFFILIATE DATA
    ================================= */

    const affiliateLinks = [

        {
            id: "IMA-AF-1001",
            product: "Premium Bluetooth Speaker",
            clicks: 4820,
            orders: 86,
            commission: 5240,
            status: "Active"
        },

        {
            id: "IMA-AF-1002",
            product: "Smart Motion Sensor Light",
            clicks: 3250,
            orders: 72,
            commission: 3820,
            status: "Active"
        },

        {
            id: "IMA-AF-1003",
            product: "Kitchen Storage Box",
            clicks: 2140,
            orders: 54,
            commission: 2910,
            status: "Active"
        },

        {
            id: "IMA-AF-1004",
            product: "Portable Mini Cooler",
            clicks: 1270,
            orders: 31,
            commission: 1810,
            status: "Active"
        }

    ];


    /* ================================
       RENDER LINKS
    ================================= */

    function renderAffiliateLinks() {

        const table =
            document.getElementById(
                "affiliateLinksTable"
            );

        if (!table) return;

        table.innerHTML = "";


        affiliateLinks.forEach(function (link) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    <div class="product-table-name">
                        ${escapeHTML(link.product)}
                    </div>
                    <small style="color:#98a2b3">
                        ${link.id}
                    </small>
                </td>

                <td>
                    ${link.clicks.toLocaleString()}
                </td>

                <td>
                    ${link.orders}
                </td>

                <td>
                    <strong>
                        ₹${link.commission.toLocaleString()}
                    </strong>
                </td>

                <td>
                    <span class="status active">
                        ${link.status}
                    </span>
                </td>

                <td>
                    <button
                        class="copy-btn"
                        data-link="${link.id}"
                    >
                        Copy Link
                    </button>
                </td>

            `;


            table.appendChild(row);

        });


        document
            .querySelectorAll(".copy-btn")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        copyAffiliateLink(
                            button.dataset.link
                        );

                    }
                );

            });

    }


    renderAffiliateLinks();


    /* ================================
       TOP PRODUCTS
    ================================= */

    const topProducts = [

        {
            name: "Premium Bluetooth Speaker",
            image: "../assets/images/product-1.jpg",
            price: 799,
            orders: 86,
            commission: 5240
        },

        {
            name: "Smart Motion Sensor Light",
            image: "../assets/images/product-2.jpg",
            price: 399,
            orders: 72,
            commission: 3820
        },

        {
            name: "Kitchen Storage Box",
            image: "../assets/images/product-3.jpg",
            price: 499,
            orders: 54,
            commission: 2910
        }

    ];


    function renderTopProducts() {

        const container =
            document.getElementById("topProducts");

        if (!container) return;

        container.innerHTML = "";


        topProducts.forEach(function (product) {

            const card =
                document.createElement("div");

            card.className =
                "top-product";


            card.innerHTML = `

                <img
                    src="${product.image}"
                    alt="${escapeHTML(product.name)}"
                    onerror="this.src='../assets/images/placeholder.jpg'"
                >

                <div>

                    <h3>
                        ${escapeHTML(product.name)}
                    </h3>

                    <p>
                        ₹${product.price}
                    </p>

                    <small>
                        ${product.orders} orders
                        · ₹${product.commission.toLocaleString()}
                        commission
                    </small>

                </div>

            `;


            container.appendChild(card);

        });

    }


    renderTopProducts();


    /* ================================
       CREATE LINK MODAL
    ================================= */

    const modal =
        document.getElementById("linkModal");

    const createLinkBtn =
        document.getElementById("createLinkBtn");

    const quickCreateLink =
        document.getElementById("quickCreateLink");

    const closeLinkModal =
        document.getElementById("closeLinkModal");


    function openLinkModal() {

        modal.classList.add("active");

    }


    function closeModal() {

        modal.classList.remove("active");

    }


    createLinkBtn.addEventListener(
        "click",
        openLinkModal
    );

    quickCreateLink.addEventListener(
        "click",
        openLinkModal
    );

    closeLinkModal.addEventListener(
        "click",
        closeModal
    );


    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                closeModal();

            }

        }
    );


    /* ================================
       GENERATE LINK
    ================================= */

    const generateLink =
        document.getElementById("generateLink");


    generateLink.addEventListener(
        "click",
        function () {

            const product =
                document.getElementById(
                    "productSelect"
                ).value;

            const campaign =
                document.getElementById(
                    "campaignName"
                ).value.trim();


            if (!product) {

                showNotification(
                    "Please select a product."
                );

                return;

            }


            const creatorId =
                user.id || "creator-demo";


            const affiliateCode =
                "IMA-" +
                creatorId.toString()
                    .slice(-6)
                    .toUpperCase() +
                "-" +
                Math.random()
                    .toString(36)
                    .substring(2, 7)
                    .toUpperCase();


            const affiliateURL =
                window.location.origin +
                "/best-selling-product/product.html?id=" +
                encodeURIComponent(product) +
                "&ref=" +
                affiliateCode;


            const output =
                document.getElementById(
                    "generatedLink"
                );


            output.style.display = "block";

            output.innerHTML = `

                <strong>
                    Your Affiliate Link
                </strong>

                <br><br>

                <span>
                    ${escapeHTML(affiliateURL)}
                </span>

                <br><br>

                <button
                    id="copyGeneratedLink"
                    class="copy-btn"
                >
                    Copy Link
                </button>

            `;


            document
                .getElementById("copyGeneratedLink")
                .addEventListener(
                    "click",
                    function () {

                        copyText(affiliateURL);

                    }
                );


            showNotification(
                "Affiliate link generated successfully!"
            );

        }
    );


    /* ================================
       FIND PRODUCTS
    ================================= */

    document
        .getElementById("viewProducts")
        .addEventListener(
            "click",
            function () {

                window.location.href =
                    "../products.html";

            }
        );


    /* ================================
       ORDERS
    ================================= */

    document
        .getElementById("viewOrders")
        .addEventListener(
            "click",
            function () {

                showNotification(
                    "Affiliate orders section will open here."
                );

            }
        );


    /* ================================
       PAYMENT SETTINGS
    ================================= */

    document
        .getElementById("paymentSettings")
        .addEventListener(
            "click",
            function () {

                showNotification(
                    "Payment settings will be connected to your creator profile."
                );

            }
        );


    /* ================================
       WITHDRAW
    ================================= */

    document
        .getElementById("withdrawBtn")
        .addEventListener(
            "click",
            function () {

                showNotification(
                    "Withdrawal request feature will be connected to the payment system."
                );

            }
        );


    /* ================================
       VIEW ALL LINKS
    ================================= */

    document
        .getElementById("viewAllLinks")
        .addEventListener(
            "click",
            function () {

                showNotification(
                    "Showing all affiliate links."
                );

            }
        );


    /* ================================
       NOTIFICATION
    ================================= */

    document
        .getElementById("notificationBtn")
        .addEventListener(
            "click",
            function () {

                showNotification(
                    "You have 3 new creator notifications."
                );

            }
        );


    /* ================================
       EARNINGS PERIOD
    ================================= */

    document
        .getElementById("earningsPeriod")
        .addEventListener(
            "change",
            function () {

                showNotification(
                    "Earnings period updated."
                );

            }
        );


    /* ================================
       COPY FUNCTIONS
    ================================= */

    function copyAffiliateLink(code) {

        const link =
            window.location.origin +
            "/best-selling-product/product.html?ref=" +
            code;


        copyText(link);

    }


    function copyText(text) {

        if (
            navigator.clipboard &&
            navigator.clipboard.writeText
        ) {

            navigator.clipboard
                .writeText(text)
                .then(function () {

                    showNotification(
                        "Affiliate link copied!"
                    );

                });

        } else {

            const textarea =
                document.createElement("textarea");

            textarea.value = text;

            document.body.appendChild(textarea);

            textarea.select();

            document.execCommand("copy");

            textarea.remove();

            showNotification(
                "Affiliate link copied!"
            );

        }

    }


    /* ================================
       NOTIFICATION
    ================================= */

    function showNotification(message) {

        const notification =
            document.getElementById(
                "creatorNotification"
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


    /* ================================
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

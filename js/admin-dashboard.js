/* =========================================================
   IMA SHOPPING CENTRE
   ADMIN DASHBOARD JAVASCRIPT
   ========================================================= */


/* =========================================================
   ADMIN ACCESS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeAdminDashboard();

});


function initializeAdminDashboard() {

    setupSidebar();

    setupMenuNavigation();

    setupNotificationButton();

    setupAdminProfile();

    setupOrderSearch();

    setupProductSearch();

    setupFilters();

    setupSalesPeriod();

    updateNotificationCount();

}


/* =========================================================
   SIDEBAR
   ========================================================= */

function setupSidebar() {

    const toggle = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("adminSidebar");

    if (!toggle || !sidebar) return;

    toggle.addEventListener("click", function () {

        sidebar.classList.toggle("open");

    });


    document.addEventListener("click", function (event) {

        if (window.innerWidth > 1000) return;

        if (
            sidebar.classList.contains("open") &&
            !sidebar.contains(event.target) &&
            !toggle.contains(event.target)
        ) {

            sidebar.classList.remove("open");

        }

    });

}


/* =========================================================
   MENU NAVIGATION
   ========================================================= */

function setupMenuNavigation() {

    const menuItems =
        document.querySelectorAll(".admin-menu-item");

    menuItems.forEach(function (item) {

        item.addEventListener("click", function () {

            menuItems.forEach(function (menu) {

                menu.classList.remove("active");

            });

            item.classList.add("active");


            if (window.innerWidth <= 1000) {

                const sidebar =
                    document.getElementById("adminSidebar");

                if (sidebar) {

                    sidebar.classList.remove("open");

                }

            }

        });

    });

}


/* =========================================================
   NOTIFICATION
   ========================================================= */

function setupNotificationButton() {

    const button =
        document.getElementById("notificationBtn");

    if (!button) return;

    button.addEventListener("click", function () {

        showAdminNotification(
            "Notifications",
            "You have 5 pending admin actions."
        );

    });

}


function updateNotificationCount() {

    const count =
        document.querySelector(".notification-count");

    if (!count) return;

    count.textContent = "5";

}


function showAdminNotification(title, message) {

    const popup =
        document.getElementById("adminNotification");

    const titleElement =
        document.getElementById("notificationTitle");

    const messageElement =
        document.getElementById("notificationMessage");

    if (!popup) return;

    if (titleElement) {

        titleElement.textContent = title;

    }

    if (messageElement) {

        messageElement.textContent = message;

    }

    popup.classList.add("show");


    clearTimeout(window.adminNotificationTimer);

    window.adminNotificationTimer =
        setTimeout(function () {

            closeNotification();

        }, 3500);

}


function closeNotification() {

    const popup =
        document.getElementById("adminNotification");

    if (!popup) return;

    popup.classList.remove("show");

}


/* =========================================================
   ADMIN PROFILE
   ========================================================= */

function setupAdminProfile() {

    const profile =
        document.getElementById("adminProfile");

    if (!profile) return;

    profile.addEventListener("click", function () {

        showAdminNotification(
            "Admin Account",
            "You are logged in as Administrator."
        );

    });

}


/* =========================================================
   ORDER SEARCH
   ========================================================= */

function setupOrderSearch() {

    const input =
        document.getElementById("orderSearch");

    if (!input) return;

    input.addEventListener("input", function () {

        filterTable(
            "adminOrdersTable",
            input.value
        );

    });

}


function searchOrders() {

    const input =
        document.getElementById("orderSearch");

    if (!input) return;

    filterTable(
        "adminOrdersTable",
        input.value
    );

}


function filterTable(tableId, searchValue) {

    const table =
        document.getElementById(tableId);

    if (!table) return;

    const rows =
        table.querySelectorAll("tr");

    const value =
        searchValue.toLowerCase().trim();


    rows.forEach(function (row) {

        const text =
            row.textContent.toLowerCase();

        if (text.includes(value)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}


/* =========================================================
   ORDER STATUS FILTER
   ========================================================= */

function setupFilters() {

    const orderFilter =
        document.getElementById("orderStatusFilter");

    if (orderFilter) {

        orderFilter.addEventListener("change", function () {

            filterOrdersByStatus(
                orderFilter.value
            );

        });

    }


    const productFilter =
        document.getElementById("productStatusFilter");

    if (productFilter) {

        productFilter.addEventListener("change", function () {

            filterProductsByStatus(
                productFilter.value
            );

        });

    }

}


function filterOrdersByStatus(status) {

    const table =
        document.getElementById("adminOrdersTable");

    if (!table) return;

    const rows =
        table.querySelectorAll("tr");


    rows.forEach(function (row) {

        if (status === "all") {

            row.style.display = "";

            return;

        }


        const text =
            row.textContent.toLowerCase();

        row.style.display =
            text.includes(status)
                ? ""
                : "none";

    });

}


/* =========================================================
   PRODUCT SEARCH
   ========================================================= */

function setupProductSearch() {

    const input =
        document.getElementById("productSearch");

    if (!input) return;

    input.addEventListener("input", function () {

        const value =
            input.value.toLowerCase().trim();

        const cards =
            document.querySelectorAll(
                ".admin-product-card"
            );


        cards.forEach(function (card) {

            const text =
                card.textContent.toLowerCase();

            card.style.display =
                text.includes(value)
                    ? ""
                    : "none";

        });

    });

}


function searchProducts() {

    const input =
        document.getElementById("productSearch");

    if (!input) return;

    input.dispatchEvent(
        new Event("input")
    );

}


function filterProductsByStatus(status) {

    const cards =
        document.querySelectorAll(
            ".admin-product-card"
        );


    cards.forEach(function (card) {

        if (status === "all") {

            card.style.display = "";

            return;

        }


        const statusElement =
            card.querySelector(".product-status");

        if (!statusElement) return;

        const cardStatus =
            statusElement.textContent
                .trim()
                .toLowerCase();


        card.style.display =
            cardStatus === status
                ? ""
                : "none";

    });

}


/* =========================================================
   SALES PERIOD
   ========================================================= */

function setupSalesPeriod() {

    const select =
        document.getElementById("salesPeriod");

    if (!select) return;

    select.addEventListener("change", function () {

        const value = select.value;

        let message = "";

        if (value === "7") {

            message =
                "Showing sales data for the last 7 days.";

        } else if (value === "30") {

            message =
                "Showing sales data for the last 30 days.";

        } else if (value === "90") {

            message =
                "Showing sales data for the last 3 months.";

        } else {

            message =
                "Showing sales data for this year.";

        }


        showAdminNotification(
            "Sales Overview",
            message
        );

    });

}


/* =========================================================
   VIEW ORDER
   ========================================================= */

function viewOrder(orderId) {

    showAdminNotification(
        "Order Details",
        "Opening order " + orderId
    );


    /*
       Future Supabase implementation:

       Fetch order from:
       orders
       order_items
       profiles
       sellers

       Then display complete order details.
    */

}


/* =========================================================
   EXPORT ORDERS
   ========================================================= */

function exportOrders() {

    const rows = [

        [
            "Order ID",
            "Customer",
            "Seller",
            "Amount",
            "Status"
        ],

        [
            "IMA10045",
            "Mohamed",
            "IMA Store",
            "799",
            "Delivered"
        ],

        [
            "IMA10044",
            "Arjun",
            "Smart Home Store",
            "399",
            "Shipped"
        ],

        [
            "IMA10043",
            "Rahul",
            "IMA Store",
            "499",
            "Processing"
        ]

    ];


    downloadCSV(
        rows,
        "ima-orders.csv"
    );


    showAdminNotification(
        "Export Complete",
        "Orders CSV file has been generated."
    );

}


/* =========================================================
   PRODUCT MANAGEMENT
   ========================================================= */

function openAddProduct() {

    showAdminNotification(
        "Add Product",
        "Product form can be connected to Supabase."
    );

}


function approveProduct(productId) {

    showAdminNotification(
        "Product Approved",
        "Product " + productId + " has been approved."
    );


    /*
       Future Supabase:

       UPDATE products
       SET status = 'approved'
       WHERE id = productId
    */

}


function rejectProduct(productId) {

    const confirmReject =
        confirm(
            "Are you sure you want to reject this product?"
        );


    if (!confirmReject) return;


    showAdminNotification(
        "Product Rejected",
        "Product " + productId + " has been rejected."
    );

}


function editProduct(productId) {

    showAdminNotification(
        "Edit Product",
        "Opening product " + productId
    );

}


function deleteProduct(productId) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this product?"
        );


    if (!confirmed) return;


    showAdminNotification(
        "Product Deleted",
        "Product " + productId + " was deleted."
    );

}


/* =========================================================
   SELLER MANAGEMENT
   ========================================================= */

function verifySeller(sellerId) {

    const confirmed =
        confirm(
            "Verify this seller?"
        );


    if (!confirmed) return;


    showAdminNotification(
        "Seller Verified",
        "Seller " + sellerId + " has been verified."
    );


    /*
       Future Supabase:

       UPDATE profiles
       SET seller_verified = true
       WHERE id = sellerId
    */

}


function rejectSeller(sellerId) {

    const confirmed =
        confirm(
            "Reject this seller verification request?"
        );


    if (!confirmed) return;


    showAdminNotification(
        "Seller Rejected",
        "Seller verification was rejected."
    );

}


function exportSellers() {

    const rows = [

        [
            "Seller ID",
            "Store",
            "Owner",
            "Status"
        ],

        [
            "S001",
            "Smart Home Store",
            "Suresh Kumar",
            "Pending"
        ],

        [
            "S002",
            "Modern Kitchen Store",
            "Mani",
            "Pending"
        ]

    ];


    downloadCSV(
        rows,
        "ima-sellers.csv"
    );


    showAdminNotification(
        "Export Complete",
        "Seller data has been exported."
    );

}


/* =========================================================
   CREATOR AFFILIATE SYSTEM
   ========================================================= */

function exportCreatorData() {

    const rows = [

        [
            "Creator",
            "Clicks",
            "Orders",
            "Sales",
            "Commission"
        ],

        [
            "Creator 01",
            "248000",
            "1284",
            "842650",
            "84265"
        ],

        [
            "Creator 02",
            "184000",
            "986",
            "642400",
            "64240"
        ]

    ];


    downloadCSV(
        rows,
        "ima-creator-affiliate-report.csv"
    );


    showAdminNotification(
        "Export Complete",
        "Creator affiliate report generated."
    );

}


/* =========================================================
   PAYMENTS
   ========================================================= */

function viewPayment(transactionId) {

    showAdminNotification(
        "Payment",
        "Opening transaction " + transactionId
    );

}


/* =========================================================
   RETURNS
   ========================================================= */

function reviewReturn(returnId) {

    showAdminNotification(
        "Return Request",
        "Opening return request " + returnId
    );


    /*
       Future:

       Fetch return request from Supabase
       and allow:

       Approve
       Reject
       Refund
       Request Evidence
    */

}


/* =========================================================
   REVIEWS
   ========================================================= */

function keepReview(reviewId) {

    showAdminNotification(
        "Review Kept",
        "Review " + reviewId + " remains published."
    );

}


function removeReview(reviewId) {

    const confirmed =
        confirm(
            "Remove this review?"
        );


    if (!confirmed) return;


    showAdminNotification(
        "Review Removed",
        "Reported review has been removed."
    );

}


/* =========================================================
   REPORTS
   ========================================================= */

function generateReport(type) {

    let reportName = "";


    switch (type) {

        case "sales":
            reportName = "Sales Report";
            break;

        case "products":
            reportName = "Product Report";
            break;

        case "seller":
            reportName = "Seller Report";
            break;

        case "creator":
            reportName = "Creator Affiliate Report";
            break;

        default:
            reportName = "Platform Report";

    }


    showAdminNotification(
        reportName,
        "Report generation started."
    );


    /*
       Future Supabase implementation:

       Generate real report using:
       orders
       order_items
       products
       sellers
       creators
       affiliate_clicks
       commissions
    */

}


/* =========================================================
   CATEGORIES
   ========================================================= */

function addCategory() {

    const category =
        prompt(
            "Enter new category name:"
        );


    if (!category) return;


    showAdminNotification(
        "Category Added",
        category + " category created."
    );

}


function editCategory(category) {

    const newName =
        prompt(
            "Edit category name:",
            category
        );


    if (!newName) return;


    showAdminNotification(
        "Category Updated",
        "Category updated to " + newName
    );

}


/* =========================================================
   SETTINGS
   ========================================================= */

function saveSettings() {

    const platformName =
        document.getElementById("platformName");

    const creatorCommission =
        document.getElementById("creatorCommission");

    const sellerVerification =
        document.getElementById("sellerVerification");

    const productApproval =
        document.getElementById("productApproval");

    const reviewProtection =
        document.getElementById("reviewProtection");


    const settings = {

        platformName:
            platformName
                ? platformName.value
                : "IMA Shopping Centre",

        creatorCommission:
            creatorCommission
                ? Number(creatorCommission.value)
                : 10,

        sellerVerification:
            sellerVerification
                ? sellerVerification.checked
                : true,

        productApproval:
            productApproval
                ? productApproval.checked
                : true,

        reviewProtection:
            reviewProtection
                ? reviewProtection.checked
                : true

    };


    localStorage.setItem(
        "ima_admin_settings",
        JSON.stringify(settings)
    );


    showAdminNotification(
        "Settings Saved",
        "Platform settings have been saved."
    );

}


/* =========================================================
   LOAD SETTINGS
   ========================================================= */

function loadSettings() {

    const saved =
        localStorage.getItem(
            "ima_admin_settings"
        );


    if (!saved) return;


    try {

        const settings =
            JSON.parse(saved);


        const platformName =
            document.getElementById("platformName");

        const creatorCommission =
            document.getElementById("creatorCommission");

        const sellerVerification =
            document.getElementById("sellerVerification");

        const productApproval =
            document.getElementById("productApproval");

        const reviewProtection =
            document.getElementById("reviewProtection");


        if (platformName && settings.platformName) {

            platformName.value =
                settings.platformName;

        }


        if (
            creatorCommission &&
            settings.creatorCommission !== undefined
        ) {

            creatorCommission.value =
                settings.creatorCommission;

        }


        if (
            sellerVerification &&
            settings.sellerVerification !== undefined
        ) {

            sellerVerification.checked =
                settings.sellerVerification;

        }


        if (
            productApproval &&
            settings.productApproval !== undefined
        ) {

            productApproval.checked =
                settings.productApproval;

        }


        if (
            reviewProtection &&
            settings.reviewProtection !== undefined
        ) {

            reviewProtection.checked =
                settings.reviewProtection;

        }

    } catch (error) {

        console.error(
            "Could not load admin settings:",
            error
        );

    }

}


/* =========================================================
   LOGOUT
   ========================================================= */

function setupLogout() {

    const logout =
        document.getElementById("logoutBtn");

    if (!logout) return;


    logout.addEventListener("click", function () {

        const confirmed =
            confirm(
                "Are you sure you want to logout?"
            );


        if (!confirmed) return;


        /*
           Demo logout.
           Later replace with:

           supabase.auth.signOut()
        */

        localStorage.removeItem("ima_user");

        localStorage.removeItem(
            "ima_user_role"
        );


        window.location.href =
            "../login.html";

    });

}


/* =========================================================
   CSV DOWNLOAD
   ========================================================= */

function downloadCSV(rows, filename) {

    const csv =
        rows.map(function (row) {

            return row.map(function (cell) {

                const value =
                    String(cell)
                        .replace(/"/g, '""');

                return '"' + value + '"';

            }).join(",");

        }).join("\n");


    const blob =
        new Blob(
            [csv],
            {
                type: "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);

}


/* =========================================================
   AUTO LOAD SETTINGS + LOGOUT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadSettings();

    setupLogout();

});


/* =========================================================
   CLOSE NOTIFICATION ON ESCAPE
   ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeNotification();

    }

});

/* =====================================================
   IMA SHOPPING CENTRE
   ADMIN SELLERS JAVASCRIPT
   ===================================================== */


/* =====================================================
   SELLER DATA
   ===================================================== */

let sellers = [

    {
        id: "SEL1001",
        name: "Rahul Kumar",
        store: "Smart Deals",
        category: "Electronics",
        email: "rahul@smartdeals.com",
        phone: "+91 98765 12345",
        products: 24,
        sales: 125000,
        rating: 4.6,
        reviews: 182,
        status: "active",
        joined: "2026-06-10",
        address: "Coimbatore, Tamil Nadu, India"
    },

    {
        id: "SEL1002",
        name: "Arun Stores",
        store: "IMA Home",
        category: "Home & Kitchen",
        email: "contact@imahome.com",
        phone: "+91 91234 56789",
        products: 18,
        sales: 89400,
        rating: 4.5,
        reviews: 126,
        status: "active",
        joined: "2026-07-02",
        address: "Erode, Tamil Nadu, India"
    },

    {
        id: "SEL1003",
        name: "Priya Fashion",
        store: "Priya Fashion Hub",
        category: "Fashion",
        email: "priya@fashionhub.com",
        phone: "+91 90000 11223",
        products: 42,
        sales: 214500,
        rating: 4.8,
        reviews: 351,
        status: "active",
        joined: "2026-05-18",
        address: "Tiruppur, Tamil Nadu, India"
    },

    {
        id: "SEL1004",
        name: "Tech World",
        store: "Tech World India",
        category: "Electronics",
        email: "techworld@example.com",
        phone: "+91 98888 76543",
        products: 0,
        sales: 0,
        rating: 0,
        reviews: 0,
        status: "pending",
        joined: "2026-09-08",
        address: "Chennai, Tamil Nadu, India"
    },

    {
        id: "SEL1005",
        name: "Home Needs",
        store: "Home Needs Store",
        category: "Home",
        email: "homeneeds@example.com",
        phone: "+91 95555 66777",
        products: 12,
        sales: 45600,
        rating: 4.2,
        reviews: 67,
        status: "blocked",
        joined: "2026-06-25",
        address: "Salem, Tamil Nadu, India"
    },

    {
        id: "SEL1006",
        name: "Beauty World",
        store: "Beauty World India",
        category: "Beauty",
        email: "beauty@example.com",
        phone: "+91 97777 88899",
        products: 31,
        sales: 167800,
        rating: 4.7,
        reviews: 245,
        status: "active",
        joined: "2026-07-21",
        address: "Madurai, Tamil Nadu, India"
    }

];


/* =====================================================
   SELECTED SELLER
   ===================================================== */

let selectedSellerId = null;


/* =====================================================
   PAGE LOAD
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderSellers(sellers);

        updateSellerStatistics();

        setupSellerSearch();

    }
);


/* =====================================================
   RENDER SELLERS
   ===================================================== */

function renderSellers(list) {

    const table =
        document.getElementById(
            "adminSellersTable"
        );

    if (!table) return;


    table.innerHTML = "";


    if (!list.length) {

        table.innerHTML = `

            <tr>

                <td colspan="9">

                    <div class="empty-sellers">

                        <div class="empty-sellers-icon">
                            🏪
                        </div>

                        <h3>
                            No sellers found
                        </h3>

                        <p>
                            Try changing your search
                            or filters.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        updateResultText(0);

        return;

    }


    list.forEach(
        function (seller) {

            const row =
                document.createElement("tr");


            const initials =
                getInitials(seller.name);


            let statusClass =
                "status-" + seller.status;


            let statusIcon = "🟢";


            if (seller.status === "pending") {
                statusIcon = "⏳";
            }

            if (seller.status === "blocked") {
                statusIcon = "🚫";
            }


            row.innerHTML = `

                <!-- SELLER -->

                <td>

                    <div class="seller-table-profile">

                        <div class="seller-table-avatar">
                            ${initials}
                        </div>

                        <div>

                            <span class="seller-table-name">
                                ${escapeHTML(seller.name)}
                            </span>

                            <span class="seller-table-id">
                                ${escapeHTML(seller.id)}
                            </span>

                        </div>

                    </div>

                </td>


                <!-- STORE -->

                <td>

                    <span class="store-name">
                        ${escapeHTML(seller.store)}
                    </span>

                    <span class="store-category">
                        ${escapeHTML(seller.category)}
                    </span>

                </td>


                <!-- CONTACT -->

                <td>

                    <span class="seller-email">
                        ${escapeHTML(seller.email)}
                    </span>

                    <span class="seller-phone">
                        ${escapeHTML(seller.phone)}
                    </span>

                </td>


                <!-- PRODUCTS -->

                <td>

                    <span class="seller-products">
                        ${seller.products}
                    </span>

                </td>


                <!-- SALES -->

                <td>

                    <span class="seller-sales">
                        ₹${formatNumber(seller.sales)}
                    </span>

                </td>


                <!-- RATING -->

                <td>

                    <span class="seller-rating">

                        ${
                            seller.rating > 0
                                ? "⭐ " +
                                  seller.rating.toFixed(1)
                                : "—"
                        }

                    </span>

                </td>


                <!-- STATUS -->

                <td>

                    <span
                        class="seller-status ${statusClass}"
                    >

                        ${statusIcon}

                        ${capitalize(seller.status)}

                    </span>

                </td>


                <!-- JOINED -->

                <td>

                    ${formatDate(seller.joined)}

                </td>


                <!-- ACTIONS -->

                <td>

                    <div class="seller-actions">


                        <!-- VIEW -->

                        <button
                            class="seller-action-btn"
                            title="View Seller"
                            onclick="viewSeller('${seller.id}')"
                        >
                            👁️
                        </button>


                        <!-- APPROVE -->

                        ${
                            seller.status === "pending"

                            ?

                            `
                            <button
                                class="seller-action-btn seller-action-approve"
                                title="Approve Seller"
                                onclick="approveSeller('${seller.id}')"
                            >
                                ✓
                            </button>
                            `

                            :

                            ""
                        }


                        <!-- BLOCK / UNBLOCK -->

                        <button
                            class="seller-action-btn seller-action-block"
                            title="${
                                seller.status === "blocked"
                                    ? "Unblock Seller"
                                    : "Block Seller"
                            }"
                            onclick="toggleSellerStatus('${seller.id}')"
                        >

                            ${
                                seller.status === "blocked"
                                    ? "🟢"
                                    : "🚫"
                            }

                        </button>


                        <!-- DELETE -->

                        <button
                            class="seller-action-btn seller-action-delete"
                            title="Delete Seller"
                            onclick="deleteSeller('${seller.id}')"
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            `;


            table.appendChild(row);

        }
    );


    updateResultText(list.length);

}


/* =====================================================
   STATISTICS
   ===================================================== */

function updateSellerStatistics() {

    const total =
        sellers.length;


    const active =
        sellers.filter(
            seller =>
                seller.status === "active"
        ).length;


    const pending =
        sellers.filter(
            seller =>
                seller.status === "pending"
        ).length;


    const blocked =
        sellers.filter(
            seller =>
                seller.status === "blocked"
        ).length;


    setText(
        "totalSellers",
        total
    );


    setText(
        "activeSellers",
        active
    );


    setText(
        "pendingSellers",
        pending
    );


    setText(
        "blockedSellers",
        blocked
    );

}


/* =====================================================
   SEARCH
   ===================================================== */

function setupSellerSearch() {

    const input =
        document.getElementById(
            "sellerSearch"
        );


    if (!input) return;


    input.addEventListener(
        "input",
        function () {

            filterSellers();

        }
    );

}


function searchSellers() {

    filterSellers();

}


/* =====================================================
   FILTER
   ===================================================== */

function filterSellers() {

    const searchInput =
        document.getElementById(
            "sellerSearch"
        );


    const statusFilter =
        document.getElementById(
            "sellerStatusFilter"
        );


    const keyword =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const status =
        statusFilter
            ? statusFilter.value
            : "all";


    let result =
        sellers.filter(
            function (seller) {

                const matchesSearch =

                    seller.name
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    seller.store
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    seller.email
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    seller.phone
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    seller.id
                        .toLowerCase()
                        .includes(keyword);


                const matchesStatus =
                    status === "all" ||
                    seller.status === status;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    const sort =
        document.getElementById(
            "sellerSort"
        );


    if (sort) {

        result =
            sortSellerList(
                result,
                sort.value
            );

    }


    renderSellers(result);

}


/* =====================================================
   SORT
   ===================================================== */

function sortSellers() {

    filterSellers();

}


function sortSellerList(
    list,
    type
) {

    const sorted =
        [...list];


    if (type === "newest") {

        sorted.sort(
            function (a, b) {

                return new Date(b.joined)
                    - new Date(a.joined);

            }
        );

    }


    else if (type === "oldest") {

        sorted.sort(
            function (a, b) {

                return new Date(a.joined)
                    - new Date(b.joined);

            }
        );

    }


    else if (type === "sales") {

        sorted.sort(
            function (a, b) {

                return b.sales - a.sales;

            }
        );

    }


    else if (type === "rating") {

        sorted.sort(
            function (a, b) {

                return b.rating - a.rating;

            }
        );

    }


    return sorted;

}


/* =====================================================
   VIEW SELLER
   ===================================================== */

function viewSeller(id) {

    const seller =
        sellers.find(
            seller =>
                seller.id === id
        );


    if (!seller) {

        alert("Seller not found.");

        return;

    }


    selectedSellerId =
        seller.id;


    setText(
        "modalSellerId",
        seller.id
    );


    setText(
        "modalSellerName",
        seller.name
    );


    setText(
        "modalStoreName",
        seller.store
    );


    setText(
        "modalSellerEmail",
        seller.email
    );


    setText(
        "modalSellerPhone",
        seller.phone
    );


    setText(
        "modalSellerJoined",
        formatDate(seller.joined)
    );


    setText(
        "modalSellerStatus",
        capitalize(seller.status)
    );


    setText(
        "modalSellerProducts",
        seller.products
    );


    setText(
        "modalSellerSales",
        "₹" + formatNumber(seller.sales)
    );


    setText(
        "modalSellerRating",
        seller.rating > 0
            ? "⭐ " + seller.rating.toFixed(1)
            : "—"
    );


    setText(
        "modalSellerReviews",
        seller.reviews
    );


    setText(
        "modalSellerAddress",
        seller.address
    );


    const avatar =
        document.getElementById(
            "modalSellerAvatar"
        );


    if (avatar) {

        avatar.textContent =
            getInitials(seller.name);

    }


    const statusSelect =
        document.getElementById(
            "modalSellerAccountStatus"
        );


    if (statusSelect) {

        statusSelect.value =
            seller.status;

    }


    const modal =
        document.getElementById(
            "sellerModal"
        );


    if (modal) {

        modal.classList.add("show");

    }

}


/* =====================================================
   CLOSE MODAL
   ===================================================== */

function closeSellerModal() {

    const modal =
        document.getElementById(
            "sellerModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    selectedSellerId =
        null;

}


/* =====================================================
   SAVE SELLER STATUS
   ===================================================== */

function saveSellerStatus() {

    if (!selectedSellerId) {

        return;

    }


    const seller =
        sellers.find(
            seller =>
                seller.id ===
                selectedSellerId
        );


    if (!seller) {

        alert("Seller not found.");

        return;

    }


    const statusSelect =
        document.getElementById(
            "modalSellerAccountStatus"
        );


    if (!statusSelect) return;


    seller.status =
        statusSelect.value;


    alert(
        `Seller status changed to ${capitalize(seller.status)}.`
    );


    closeSellerModal();

    updateSellerStatistics();

    filterSellers();

}


/* =====================================================
   APPROVE SELLER
   ===================================================== */

function approveSeller(id) {

    const seller =
        sellers.find(
            seller =>
                seller.id === id
        );


    if (!seller) {

        return;

    }


    const confirmation =
        confirm(
            `Approve ${seller.store}?`
        );


    if (!confirmation) {

        return;

    }


    seller.status =
        "active";


    updateSellerStatistics();

    filterSellers();


    alert(
        "Seller approved successfully."
    );

}


/* =====================================================
   BLOCK / UNBLOCK
   ===================================================== */

function toggleSellerStatus(id) {

    const seller =
        sellers.find(
            seller =>
                seller.id === id
        );


    if (!seller) {

        return;

    }


    if (seller.status === "blocked") {

        const confirmation =
            confirm(
                `Unblock ${seller.store}?`
            );


        if (!confirmation) {

            return;

        }


        seller.status =
            "active";

    }

    else {

        const confirmation =
            confirm(
                `Block ${seller.store}?`
            );


        if (!confirmation) {

            return;

        }


        seller.status =
            "blocked";

    }


    updateSellerStatistics();

    filterSellers();

}


/* =====================================================
   DELETE SELLER
   ===================================================== */

function deleteSeller(id) {

    const seller =
        sellers.find(
            seller =>
                seller.id === id
        );


    if (!seller) {

        return;

    }


    const confirmation =
        confirm(
            `Delete seller "${seller.store}" permanently?`
        );


    if (!confirmation) {

        return;

    }


    sellers =
        sellers.filter(
            seller =>
                seller.id !== id
        );


    updateSellerStatistics();

    filterSellers();


    alert(
        "Seller deleted successfully."
    );

}


/* =====================================================
   CLEAR FILTERS
   ===================================================== */

function clearSellerFilters() {

    const search =
        document.getElementById(
            "sellerSearch"
        );


    const status =
        document.getElementById(
            "sellerStatusFilter"
        );


    const sort =
        document.getElementById(
            "sellerSort"
        );


    if (search) {

        search.value = "";

    }


    if (status) {

        status.value = "all";

    }


    if (sort) {

        sort.value = "newest";

    }


    renderSellers(
        sortSellerList(
            sellers,
            "newest"
        )
    );

}


/* =====================================================
   REFRESH
   ===================================================== */

function refreshSellers() {

    /*
     * Later this will fetch
     * seller data from Supabase.
     */

    updateSellerStatistics();

    filterSellers();


    alert(
        "Sellers refreshed successfully."
    );

}


/* =====================================================
   LOGOUT
   ===================================================== */

function adminLogout() {

    const confirmation =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmation) {

        return;

    }


    /*
     * Supabase Auth logout
     * will be connected later.
     */

    window.location.href =
        "../login.html";

}


/* =====================================================
   CLOSE MODAL OUTSIDE CLICK
   ===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "sellerModal"
            );


        if (
            modal &&
            event.target === modal
        ) {

            closeSellerModal();

        }

    }
);


/* =====================================================
   ESC KEY
   ===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeSellerModal();

        }

    }
);


/* =====================================================
   HELPERS
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


function capitalize(text) {

    if (!text) return "";

    return (
        text.charAt(0).toUpperCase() +
        text.slice(1)
    );

}


function getInitials(name) {

    if (!name) return "S";


    const parts =
        name
            .trim()
            .split(/\s+/);


    if (parts.length === 1) {

        return parts[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();

}


function formatNumber(number) {

    return Number(number)
        .toLocaleString("en-IN");

}


function formatDate(dateString) {

    if (!dateString) {

        return "-";

    }


    const date =
        new Date(dateString);


    if (isNaN(date.getTime())) {

        return dateString;

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

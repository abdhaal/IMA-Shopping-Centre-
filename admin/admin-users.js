/* =====================================================
   IMA SHOPPING CENTRE
   ADMIN USERS JAVASCRIPT
   ===================================================== */


/* =====================================================
   SAMPLE USERS
   ===================================================== */

let users = [

    {
        id: "USR1001",
        name: "Arun Kumar",
        email: "arun@example.com",
        phone: "+91 98765 43210",
        type: "customer",
        orders: 8,
        spent: 4299,
        wishlist: 4,
        status: "active",
        joined: "2026-08-02",
        lastOrder: "2026-09-05",
        address: "Erode, Tamil Nadu, India"
    },

    {
        id: "USR1002",
        name: "Mohamed Ali",
        email: "mohamed@example.com",
        phone: "+91 98765 12345",
        type: "creator",
        orders: 15,
        spent: 8299,
        wishlist: 8,
        status: "active",
        joined: "2026-07-18",
        lastOrder: "2026-09-08",
        address: "Coimbatore, Tamil Nadu, India"
    },

    {
        id: "USR1003",
        name: "Priya S",
        email: "priya@example.com",
        phone: "+91 91234 56789",
        type: "customer",
        orders: 4,
        spent: 1899,
        wishlist: 6,
        status: "active",
        joined: "2026-08-15",
        lastOrder: "2026-09-02",
        address: "Salem, Tamil Nadu, India"
    },

    {
        id: "USR1004",
        name: "Rahul M",
        email: "rahul@example.com",
        phone: "+91 90000 12345",
        type: "seller",
        orders: 21,
        spent: 15299,
        wishlist: 3,
        status: "active",
        joined: "2026-06-12",
        lastOrder: "2026-09-09",
        address: "Chennai, Tamil Nadu, India"
    },

    {
        id: "USR1005",
        name: "Fathima N",
        email: "fathima@example.com",
        phone: "+91 98888 76543",
        type: "customer",
        orders: 2,
        spent: 799,
        wishlist: 2,
        status: "blocked",
        joined: "2026-07-25",
        lastOrder: "2026-08-19",
        address: "Tiruppur, Tamil Nadu, India"
    },

    {
        id: "USR1006",
        name: "Karthik R",
        email: "karthik@example.com",
        phone: "+91 95555 12345",
        type: "creator",
        orders: 11,
        spent: 6299,
        wishlist: 12,
        status: "active",
        joined: "2026-08-27",
        lastOrder: "2026-09-07",
        address: "Bengaluru, Karnataka, India"
    }

];


/* =====================================================
   CURRENT USER
   ===================================================== */

let selectedUserId = null;


/* =====================================================
   PAGE LOAD
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderUsers(users);

        updateUserStatistics();

        setupSearch();

    }
);


/* =====================================================
   RENDER USERS
   ===================================================== */

function renderUsers(list) {

    const table =
        document.getElementById(
            "adminUsersTable"
        );

    if (!table) return;


    table.innerHTML = "";


    if (!list.length) {

        table.innerHTML = `

            <tr>

                <td colspan="8">

                    <div class="empty-users">

                        <div class="empty-users-icon">
                            👥
                        </div>

                        <h3>
                            No users found
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
        function (user) {

            const row =
                document.createElement("tr");


            const initials =
                getInitials(user.name);


            const typeName =
                capitalize(user.type);


            const statusClass =
                user.status === "active"
                    ? "user-status-active"
                    : "user-status-blocked";


            const statusIcon =
                user.status === "active"
                    ? "🟢"
                    : "🚫";


            const typeClass =
                "type-" + user.type;


            row.innerHTML = `

                <!-- USER -->

                <td>

                    <div class="user-table-profile">

                        <div class="user-table-avatar">
                            ${initials}
                        </div>

                        <div>

                            <span class="user-table-name">
                                ${escapeHTML(user.name)}
                            </span>

                            <span class="user-table-id">
                                ${escapeHTML(user.id)}
                            </span>

                        </div>

                    </div>

                </td>


                <!-- CONTACT -->

                <td>

                    <span class="user-email">
                        ${escapeHTML(user.email)}
                    </span>

                    <span class="user-phone">
                        ${escapeHTML(user.phone)}
                    </span>

                </td>


                <!-- TYPE -->

                <td>

                    <span
                        class="user-type-badge ${typeClass}"
                    >
                        ${typeName}
                    </span>

                </td>


                <!-- ORDERS -->

                <td>

                    <span class="user-orders-count">
                        ${user.orders}
                    </span>

                </td>


                <!-- SPENT -->

                <td>

                    <span class="user-spent">
                        ₹${formatNumber(user.spent)}
                    </span>

                </td>


                <!-- STATUS -->

                <td>

                    <span
                        class="user-status ${statusClass}"
                    >

                        ${statusIcon}

                        ${capitalize(user.status)}

                    </span>

                </td>


                <!-- JOINED -->

                <td>

                    ${formatDate(user.joined)}

                </td>


                <!-- ACTIONS -->

                <td>

                    <div class="user-actions">

                        <button
                            class="user-action-btn"
                            title="View User"
                            onclick="viewUser('${user.id}')"
                        >
                            👁️
                        </button>


                        <button
                            class="user-action-btn user-action-block"
                            title="${
                                user.status === "active"
                                    ? "Block User"
                                    : "Unblock User"
                            }"
                            onclick="toggleUserStatus('${user.id}')"
                        >
                            ${
                                user.status === "active"
                                    ? "🚫"
                                    : "🟢"
                            }
                        </button>


                        <button
                            class="user-action-btn user-action-delete"
                            title="Delete User"
                            onclick="deleteUser('${user.id}')"
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

function updateUserStatistics() {

    const total =
        users.length;


    const active =
        users.filter(
            user =>
                user.status === "active"
        ).length;


    const blocked =
        users.filter(
            user =>
                user.status === "blocked"
        ).length;


    /*
     * Users joined in last 30 days
     */

    const today =
        new Date();


    const thirtyDaysAgo =
        new Date();


    thirtyDaysAgo.setDate(
        today.getDate() - 30
    );


    const newUsers =
        users.filter(
            user =>
                new Date(user.joined) >=
                thirtyDaysAgo
        ).length;


    setText(
        "totalUsers",
        total
    );


    setText(
        "activeUsers",
        active
    );


    setText(
        "blockedUsers",
        blocked
    );


    setText(
        "newUsers",
        newUsers
    );

}


/* =====================================================
   SEARCH
   ===================================================== */

function setupSearch() {

    const input =
        document.getElementById(
            "userSearch"
        );


    if (!input) return;


    input.addEventListener(
        "input",
        function () {

            filterUsers();

        }
    );

}


function searchUsers() {

    filterUsers();

}


/* =====================================================
   FILTER USERS
   ===================================================== */

function filterUsers() {

    const searchInput =
        document.getElementById(
            "userSearch"
        );


    const statusSelect =
        document.getElementById(
            "userStatusFilter"
        );


    const typeSelect =
        document.getElementById(
            "userTypeFilter"
        );


    const keyword =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const status =
        statusSelect
            ? statusSelect.value
            : "all";


    const type =
        typeSelect
            ? typeSelect.value
            : "all";


    let result =
        users.filter(
            function (user) {

                const matchesSearch =

                    user.name
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    user.email
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    user.phone
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    user.id
                        .toLowerCase()
                        .includes(keyword);


                const matchesStatus =
                    status === "all" ||
                    user.status === status;


                const matchesType =
                    type === "all" ||
                    user.type === type;


                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesType
                );

            }
        );


    /*
     * Apply current sorting
     */

    const sortSelect =
        document.getElementById(
            "userSort"
        );


    if (sortSelect) {

        result =
            sortUserList(
                result,
                sortSelect.value
            );

    }


    renderUsers(result);

}


/* =====================================================
   SORT USERS
   ===================================================== */

function sortUsers() {

    filterUsers();

}


function sortUserList(
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


    else if (type === "name") {

        sorted.sort(
            function (a, b) {

                return a.name.localeCompare(
                    b.name
                );

            }
        );

    }


    else if (type === "orders") {

        sorted.sort(
            function (a, b) {

                return b.orders - a.orders;

            }
        );

    }


    else if (type === "spent") {

        sorted.sort(
            function (a, b) {

                return b.spent - a.spent;

            }
        );

    }


    return sorted;

}


/* =====================================================
   VIEW USER
   ===================================================== */

function viewUser(id) {

    const user =
        users.find(
            user =>
                user.id === id
        );


    if (!user) {

        alert("User not found.");

        return;

    }


    selectedUserId =
        user.id;


    setText(
        "modalUserId",
        user.id
    );


    setText(
        "modalUserName",
        user.name
    );


    setText(
        "modalUserType",
        capitalize(user.type)
    );


    setText(
        "modalUserEmail",
        user.email
    );


    setText(
        "modalUserPhone",
        user.phone
    );


    setText(
        "modalUserJoined",
        formatDate(user.joined)
    );


    setText(
        "modalUserStatus",
        capitalize(user.status)
    );


    setText(
        "modalUserOrders",
        user.orders
    );


    setText(
        "modalUserSpent",
        "₹" + formatNumber(user.spent)
    );


    setText(
        "modalUserWishlist",
        user.wishlist
    );


    setText(
        "modalUserLastOrder",
        formatDate(user.lastOrder)
    );


    setText(
        "modalUserAddress",
        user.address
    );


    const avatar =
        document.getElementById(
            "modalUserAvatar"
        );


    if (avatar) {

        avatar.textContent =
            getInitials(user.name);

    }


    const statusSelect =
        document.getElementById(
            "modalAccountStatus"
        );


    if (statusSelect) {

        statusSelect.value =
            user.status;

    }


    const modal =
        document.getElementById(
            "userModal"
        );


    if (modal) {

        modal.classList.add("show");

    }

}


/* =====================================================
   CLOSE MODAL
   ===================================================== */

function closeUserModal() {

    const modal =
        document.getElementById(
            "userModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    selectedUserId =
        null;

}


/* =====================================================
   SAVE USER STATUS
   ===================================================== */

function saveUserStatus() {

    if (!selectedUserId) {

        return;

    }


    const user =
        users.find(
            user =>
                user.id ===
                selectedUserId
        );


    if (!user) {

        alert("User not found.");

        return;

    }


    const statusSelect =
        document.getElementById(
            "modalAccountStatus"
        );


    if (!statusSelect) return;


    user.status =
        statusSelect.value;


    /*
     * In real Supabase version:
     * update user status here.
     */


    alert(
        `User status changed to ${capitalize(user.status)}.`
    );


    closeUserModal();

    updateUserStatistics();

    filterUsers();

}


/* =====================================================
   BLOCK / UNBLOCK USER
   ===================================================== */

function toggleUserStatus(id) {

    const user =
        users.find(
            user =>
                user.id === id
        );


    if (!user) {

        alert("User not found.");

        return;

    }


    if (user.status === "active") {

        const confirmBlock =
            confirm(
                `Are you sure you want to block ${user.name}?`
            );


        if (!confirmBlock) {

            return;

        }


        user.status =
            "blocked";

    }

    else {

        const confirmUnblock =
            confirm(
                `Unblock ${user.name}?`
            );


        if (!confirmUnblock) {

            return;

        }


        user.status =
            "active";

    }


    updateUserStatistics();

    filterUsers();

}


/* =====================================================
   DELETE USER
   ===================================================== */

function deleteUser(id) {

    const user =
        users.find(
            user =>
                user.id === id
        );


    if (!user) {

        alert("User not found.");

        return;

    }


    const confirmation =
        confirm(
            `Delete user "${user.name}" permanently?`
        );


    if (!confirmation) {

        return;

    }


    users =
        users.filter(
            user =>
                user.id !== id
        );


    updateUserStatistics();

    filterUsers();


    alert(
        "User deleted successfully."
    );

}


/* =====================================================
   CLEAR FILTERS
   ===================================================== */

function clearUserFilters() {

    const search =
        document.getElementById(
            "userSearch"
        );


    const status =
        document.getElementById(
            "userStatusFilter"
        );


    const type =
        document.getElementById(
            "userTypeFilter"
        );


    const sort =
        document.getElementById(
            "userSort"
        );


    if (search) {

        search.value = "";

    }


    if (status) {

        status.value = "all";

    }


    if (type) {

        type.value = "all";

    }


    if (sort) {

        sort.value = "newest";

    }


    renderUsers(
        sortUserList(
            users,
            "newest"
        )
    );

}


/* =====================================================
   REFRESH USERS
   ===================================================== */

function refreshUsers() {

    /*
     * Later this function will fetch
     * latest users from Supabase.
     */

    updateUserStatistics();

    filterUsers();


    alert(
        "Users refreshed successfully."
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
     * Later Supabase Auth logout:
     *
     * supabase.auth.signOut()
     */


    window.location.href =
        "../login.html";

}


/* =====================================================
   CLOSE MODAL WHEN CLICK OUTSIDE
   ===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "userModal"
            );


        if (
            modal &&
            event.target === modal
        ) {

            closeUserModal();

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

            closeUserModal();

        }

    }
);


/* =====================================================
   HELPER FUNCTIONS
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

    if (!name) return "U";


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


/* =====================================================
   BASIC HTML SAFETY
   ===================================================== */

function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

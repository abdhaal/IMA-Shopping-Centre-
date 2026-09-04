/* =====================================================
   IMA SHOPPING CENTRE
   ACCOUNT PAGE JS

   Current version:
   Frontend demo using localStorage.

   Later:
   Replace demo user data with Supabase Auth + Profiles.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadAccount();

    setupAccountActions();

    setupLogout();

    updateAccountCounts();

});


/* =====================================================
   USER DATA
===================================================== */

function getAccountUser() {

    try {

        const user = localStorage.getItem("ima_user");

        if (!user) {
            return {
                name: "Guest User",
                email: "guest@example.com",
                phone: ""
            };
        }

        if (typeof user === "string") {

            try {
                return JSON.parse(user);
            } catch (error) {

                return {
                    name: user,
                    email: "user@example.com",
                    phone: ""
                };

            }
        }

        return user;

    } catch (error) {

        console.error("Unable to load account user:", error);

        return {
            name: "Guest User",
            email: "guest@example.com",
            phone: ""
        };

    }

}


/* =====================================================
   LOAD ACCOUNT
===================================================== */

function loadAccount() {

    const user = getAccountUser();

    const nameElement = document.getElementById("profileName");
    const emailElement = document.getElementById("profileEmail");
    const avatarElement = document.getElementById("profileAvatar");

    const name = user.name || user.fullName || "Guest User";
    const email = user.email || "guest@example.com";

    if (nameElement) {
        nameElement.textContent = name;
    }

    if (emailElement) {
        emailElement.textContent = email;
    }

    if (avatarElement) {

        const firstLetter = name
            .trim()
            .charAt(0)
            .toUpperCase();

        avatarElement.textContent = firstLetter || "U";
    }

}


/* =====================================================
   ACCOUNT ACTIONS
===================================================== */

function setupAccountActions() {

    const editButton = document.getElementById("editProfileBtn");

    if (editButton) {

        editButton.addEventListener("click", () => {
            openProfileModal();
        });

    }


    const actionButtons = document.querySelectorAll(
        ".account-link[data-action]"
    );

    actionButtons.forEach(button => {

        button.addEventListener("click", () => {

            const action = button.dataset.action;

            handleAccountAction(action);

        });

    });

}


/* =====================================================
   ACCOUNT ACTION HANDLER
===================================================== */

function handleAccountAction(action) {

    switch (action) {

        case "profile":
            openProfileModal();
            break;

        case "reviews":
            showAccountMessage(
                "Your product reviews section will be connected soon."
            );
            break;

        case "addresses":
            showAccountMessage(
                "Address management will be connected with Supabase soon."
            );
            break;

        case "notifications":
            showAccountMessage(
                "Notification settings will be available soon."
            );
            break;

        case "security":
            showAccountMessage(
                "Security settings will be connected with Supabase Auth."
            );
            break;

        default:
            break;

    }

}


/* =====================================================
   PROFILE MODAL
===================================================== */

function openProfileModal() {

    const user = getAccountUser();

    const existingModal = document.querySelector(".account-modal");

    if (existingModal) {
        existingModal.remove();
    }

    const name = user.name || user.fullName || "";
    const email = user.email || "";
    const phone = user.phone || "";

    const modal = document.createElement("div");

    modal.className = "account-modal";

    modal.innerHTML = `
        <div class="modal-box">

            <h2>Edit Profile</h2>

            <label for="editName">
                Full Name
            </label>

            <input
                type="text"
                id="editName"
                value="${escapeHTML(name)}"
                placeholder="Enter your name"
            >

            <label for="editEmail">
                Email
            </label>

            <input
                type="email"
                id="editEmail"
                value="${escapeHTML(email)}"
                placeholder="Enter your email"
            >

            <label for="editPhone">
                Phone Number
            </label>

            <input
                type="tel"
                id="editPhone"
                value="${escapeHTML(phone)}"
                placeholder="Enter phone number"
            >

            <div class="modal-buttons">

                <button
                    type="button"
                    class="cancel-modal"
                    id="cancelProfile"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    class="save-modal"
                    id="saveProfile"
                >
                    Save Changes
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    /* Cancel */

    document
        .getElementById("cancelProfile")
        .addEventListener("click", () => {

            modal.remove();

        });


    /* Save */

    document
        .getElementById("saveProfile")
        .addEventListener("click", () => {

            saveProfile(modal);

        });


    /* Close when clicking outside */

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            modal.remove();
        }

    });

}


/* =====================================================
   SAVE PROFILE
===================================================== */

function saveProfile(modal) {

    const nameInput = document.getElementById("editName");
    const emailInput = document.getElementById("editEmail");
    const phoneInput = document.getElementById("editPhone");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name) {

        showAccountMessage("Please enter your name.");

        return;
    }

    if (!email) {

        showAccountMessage("Please enter your email.");

        return;
    }


    const user = {
        name: name,
        email: email,
        phone: phone
    };


    /* Demo storage */

    localStorage.setItem(
        "ima_user",
        JSON.stringify(user)
    );


    modal.remove();

    loadAccount();

    showAccountMessage(
        "Profile updated successfully."
    );

}


/* =====================================================
   LOGOUT
===================================================== */

function setupLogout() {

    const logoutButton = document.getElementById("logoutBtn");

    if (!logoutButton) {
        return;
    }

    logoutButton.addEventListener("click", () => {

        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) {
            return;
        }


        /*
         * Demo logout.
         *
         * Later this will become:
         * supabase.auth.signOut()
         */

        localStorage.removeItem("ima_user");
        localStorage.removeItem("ima_user_role");

        showAccountMessage(
            "Logged out successfully."
        );


        setTimeout(() => {

            window.location.href = "login.html";

        }, 700);

    });

}


/* =====================================================
   CART + WISHLIST COUNT
===================================================== */

function updateAccountCounts() {

    updateCartCountAccount();

    updateWishlistCountAccount();

}


function updateCartCountAccount() {

    const badge = document.getElementById("cartCount");

    if (!badge) {
        return;
    }

    try {

        const cart = JSON.parse(
            localStorage.getItem("ima_cart") || "[]"
        );

        const count = cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 1),
            0
        );

        badge.textContent = count;

    } catch (error) {

        badge.textContent = "0";

    }

}


function updateWishlistCountAccount() {

    const badge = document.getElementById(
        "wishlistCount"
    );

    if (!badge) {
        return;
    }

    try {

        const wishlist = JSON.parse(
            localStorage.getItem("ima_wishlist") || "[]"
        );

        badge.textContent = wishlist.length;

    } catch (error) {

        badge.textContent = "0";

    }

}


/* =====================================================
   SEARCH
===================================================== */

function setupAccountSearch() {

    const input = document.getElementById("searchInput");
    const button = document.getElementById("searchButton");

    if (!input) {
        return;
    }

    function performSearch() {

        const query = input.value.trim();

        if (!query) {
            window.location.href = "products.html";
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

    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            performSearch();
        }

    });

}


/* =====================================================
   NOTIFICATION
===================================================== */

function showAccountMessage(message) {

    const oldNotification =
        document.querySelector(".account-notification");

    if (oldNotification) {
        oldNotification.remove();
    }


    const notification =
        document.createElement("div");

    notification.className =
        "account-notification";

    notification.textContent = message;

    notification.style.position = "fixed";
    notification.style.bottom = "25px";
    notification.style.right = "25px";
    notification.style.background = "#10213f";
    notification.style.color = "#fff";
    notification.style.padding = "13px 18px";
    notification.style.borderRadius = "9px";
    notification.style.zIndex = "10000";
    notification.style.fontSize = "14px";
    notification.style.boxShadow =
        "0 10px 25px rgba(0,0,0,.18)";

    document.body.appendChild(notification);


    setTimeout(() => {

        notification.remove();

    }, 2500);

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
   INITIAL SEARCH SETUP
===================================================== */

setupAccountSearch();

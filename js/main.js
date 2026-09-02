document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // INITIALIZE
    // ==============================

    updateCartCount();
    updateWishlistCount();
    setupSearch();
    setupCategorySelect();
    setupScrollTop();


    // ==============================
    // SEARCH
    // ==============================

    function setupSearch() {

        const searchInput =
            document.getElementById("searchInput");

        const searchButton =
            document.querySelector(".search-box button");

        if (!searchInput) return;


        searchInput.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {

                searchProducts();

            }

        });


        if (searchButton) {

            searchButton.addEventListener("click", () => {

                searchProducts();

            });

        }

    }


    // ==============================
    // CATEGORY SELECT
    // ==============================

    function setupCategorySelect() {

        const categorySelect =
            document.getElementById("categorySelect");

        if (!categorySelect) return;


        categorySelect.addEventListener("change", () => {

            searchProducts();

        });

    }


    // ==============================
    // CART COUNT
    // ==============================

    window.updateCartCount = function () {

        const cart =
            JSON.parse(
                localStorage.getItem("ima_cart")
            ) || [];


        const count =
            cart.reduce(
                (total, item) =>
                    total + Number(item.quantity || 1),
                0
            );


        const cartCount =
            document.getElementById("cartCount");


        if (cartCount) {

            cartCount.textContent = count;

        }

    };


    // ==============================
    // WISHLIST
    // ==============================

    window.addToWishlist = function (productId) {

        let wishlist =
            JSON.parse(
                localStorage.getItem("ima_wishlist")
            ) || [];


        if (!wishlist.includes(productId)) {

            wishlist.push(productId);

            localStorage.setItem(
                "ima_wishlist",
                JSON.stringify(wishlist)
            );


            updateWishlistCount();

            showNotification(
                "❤️ Added to Wishlist"
            );

        } else {

            showNotification(
                "Product already in Wishlist"
            );

        }

    };


    window.removeFromWishlist = function (productId) {

        let wishlist =
            JSON.parse(
                localStorage.getItem("ima_wishlist")
            ) || [];


        wishlist =
            wishlist.filter(
                id => id !== productId
            );


        localStorage.setItem(
            "ima_wishlist",
            JSON.stringify(wishlist)
        );


        updateWishlistCount();

    };


    window.updateWishlistCount = function () {

        const wishlist =
            JSON.parse(
                localStorage.getItem("ima_wishlist")
            ) || [];


        const element =
            document.getElementById(
                "wishlistCount"
            );


        if (element) {

            element.textContent =
                wishlist.length;

        }

    };


    // ==============================
    // REMOVE CART ITEM
    // ==============================

    window.removeFromCart = function (productId) {

        let cart =
            JSON.parse(
                localStorage.getItem("ima_cart")
            ) || [];


        cart =
            cart.filter(
                item => item.id !== productId
            );


        localStorage.setItem(
            "ima_cart",
            JSON.stringify(cart)
        );


        updateCartCount();


        if (typeof displayCart === "function") {

            displayCart();

        }


        showNotification(
            "Product removed from cart"
        );

    };


    // ==============================
    // CLEAR CART
    // ==============================

    window.clearCart = function () {

        localStorage.removeItem(
            "ima_cart"
        );


        updateCartCount();


        if (typeof displayCart === "function") {

            displayCart();

        }


        showNotification(
            "Cart cleared"
        );

    };


    // ==============================
    // NOTIFICATION
    // ==============================

    window.showNotification = function (message) {

        let notification =
            document.getElementById(
                "imaNotification"
            );


        if (!notification) {

            notification =
                document.createElement("div");

            notification.id =
                "imaNotification";


            notification.style.position =
                "fixed";

            notification.style.bottom =
                "85px";

            notification.style.right =
                "20px";

            notification.style.zIndex =
                "10000";

            notification.style.background =
                "#0866ff";

            notification.style.color =
                "#ffffff";

            notification.style.padding =
                "12px 18px";

            notification.style.borderRadius =
                "8px";

            notification.style.fontSize =
                "14px";

            notification.style.fontWeight =
                "600";

            notification.style.boxShadow =
                "0 8px 25px rgba(0,0,0,.15)";


            document.body.appendChild(
                notification
            );

        }


        notification.textContent =
            message;


        notification.style.display =
            "block";


        clearTimeout(
            window.imaNotificationTimer
        );


        window.imaNotificationTimer =
            setTimeout(() => {

                notification.style.display =
                    "none";

            }, 2500);

    };


    // ==============================
    // SCROLL TO TOP
    // ==============================

    function setupScrollTop() {

        const button =
            document.createElement("button");


        button.id =
            "scrollTopButton";


        button.innerHTML =
            "↑";


        button.style.position =
            "fixed";

        button.style.right =
            "20px";

        button.style.bottom =
            "25px";

        button.style.width =
            "42px";

        button.style.height =
            "42px";

        button.style.borderRadius =
            "50%";

        button.style.border =
            "none";

        button.style.background =
            "#0866ff";

        button.style.color =
            "white";

        button.style.fontSize =
            "20px";

        button.style.cursor =
            "pointer";

        button.style.display =
            "none";

        button.style.zIndex =
            "9998";


        document.body.appendChild(
            button
        );


        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 400) {

                    button.style.display =
                        "block";

                } else {

                    button.style.display =
                        "none";

                }

            }
        );


        button.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    // ==============================
    // PRODUCT QUICK VIEW
    // ==============================

    window.quickView = function (productId) {

        window.location.href =
            `product.html?id=${productId}`;

    };


    // ==============================
    // SHARE PRODUCT
    // ==============================

    window.shareProduct = async function (
        productId,
        productName
    ) {

        const shareUrl =
            `${window.location.origin}${window.location.pathname
            .replace(/[^/]*$/, "")}product.html?id=${productId}`;


        if (
            navigator.share
        ) {

            try {

                await navigator.share({

                    title:
                        productName ||
                        "IMA Shopping Centre",

                    text:
                        `Check this product on IMA Shopping Centre: ${productName}`,

                    url:
                        shareUrl

                });

            } catch (error) {

                console.log(
                    "Share cancelled"
                );

            }

        } else {

            try {

                await navigator.clipboard.writeText(
                    shareUrl
                );


                showNotification(
                    "🔗 Product link copied!"
                );

            } catch (error) {

                showNotification(
                    "Unable to copy link"
                );

            }

        }

    };


    // ==============================
    // LOGIN STATUS - FRONTEND DEMO
    // ==============================

    window.checkLogin = function () {

        const user =
            localStorage.getItem(
                "ima_user"
            );


        if (!user) {

            showNotification(
                "Please login to continue"
            );

            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 800);


            return false;

        }


        return true;

    };


    // ==============================
    // LOGOUT - FRONTEND DEMO
    // ==============================

    window.logoutUser = function () {

        localStorage.removeItem(
            "ima_user"
        );


        localStorage.removeItem(
            "ima_user_role"
        );


        showNotification(
            "Logged out successfully"
        );


        setTimeout(() => {

            window.location.href =
                "index.html";

        }, 800);

    };


    // ==============================
    // GET CURRENT USER
    // ==============================

    window.getCurrentUser = function () {

        const user =
            localStorage.getItem(
                "ima_user"
            );


        if (!user) return null;


        try {

            return JSON.parse(user);

        } catch {

            return null;

        }

    };


    // ==============================
    // ROLE
    // ==============================

    window.getUserRole = function () {

        return localStorage.getItem(
            "ima_user_role"
        );

    };


    // ==============================
    // PREVENT DEMO FORM SUBMISSION
    // ==============================

    document
        .querySelectorAll("form[data-demo]")
        .forEach(form => {

            form.addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    showNotification(
                        "This feature will be connected to Supabase."
                    );

                }
            );

        });

});

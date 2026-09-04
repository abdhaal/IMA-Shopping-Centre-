/* =================================
   IMA SHOPPING CENTRE - LOGIN JS
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const loginBtn = document.getElementById("loginBtn");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const togglePassword =
        document.getElementById("togglePassword");

    const forgotPassword =
        document.getElementById("forgotPassword");

    const googleLogin =
        document.getElementById("googleLogin");

    const createAccount =
        document.getElementById("createAccount");

    const registerModal =
        document.getElementById("registerModal");

    const closeRegister =
        document.getElementById("closeRegister");

    const registerForm =
        document.getElementById("registerForm");

    const sellerLogin =
        document.getElementById("sellerLogin");

    const creatorLogin =
        document.getElementById("creatorLogin");


    /* ================================
       GET REDIRECT URL
    ================================= */

    const urlParams =
        new URLSearchParams(window.location.search);

    const redirect =
        urlParams.get("redirect") || "account.html";


    /* ================================
       TOGGLE PASSWORD
    ================================= */

    if (togglePassword) {

        togglePassword.addEventListener("click", function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                togglePassword.textContent = "🙈";

            } else {

                passwordInput.type = "password";

                togglePassword.textContent = "👁";

            }

        });

    }


    /* ================================
       LOGIN
    ================================= */

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            clearErrors();

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value.trim();

            if (!email) {

                showError(
                    "emailError",
                    "Please enter your email address."
                );

                return;
            }


            if (!isValidEmail(email)) {

                showError(
                    "emailError",
                    "Please enter a valid email address."
                );

                return;
            }


            if (!password) {

                showError(
                    "passwordError",
                    "Please enter your password."
                );

                return;
            }


            if (password.length < 6) {

                showError(
                    "passwordError",
                    "Password must contain at least 6 characters."
                );

                return;
            }


            /* Demo login */

            loginBtn.disabled = true;
            loginBtn.textContent = "Logging in...";


            setTimeout(function () {

                const user = {

                    id: "demo-user-" + Date.now(),

                    name: email
                        .split("@")[0]
                        .replace(/[._-]/g, " "),

                    email: email,

                    role: "customer"

                };


                localStorage.setItem(
                    "ima_user",
                    JSON.stringify(user)
                );

                localStorage.setItem(
                    "ima_user_role",
                    "customer"
                );


                showMessage(
                    "Login successful! Redirecting...",
                    "success"
                );


                setTimeout(function () {

                    window.location.href = redirect;

                }, 700);

            }, 700);

        });

    }


    /* ================================
       FORGOT PASSWORD
    ================================= */

    if (forgotPassword) {

        forgotPassword.addEventListener("click", function (event) {

            event.preventDefault();

            const email =
                emailInput.value.trim();

            if (!email) {

                showMessage(
                    "Enter your email address first to reset your password.",
                    "error"
                );

                emailInput.focus();

                return;
            }


            if (!isValidEmail(email)) {

                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            showMessage(
                "Password reset feature will be connected to Supabase Auth.",
                "success"
            );

        });

    }


    /* ================================
       GOOGLE LOGIN
    ================================= */

    if (googleLogin) {

        googleLogin.addEventListener("click", function () {

            showMessage(
                "Google login will be connected with Supabase Auth.",
                "success"
            );

        });

    }


    /* ================================
       CREATE ACCOUNT
    ================================= */

    if (createAccount) {

        createAccount.addEventListener("click", function (event) {

            event.preventDefault();

            registerModal.classList.add("active");

        });

    }


    /* ================================
       CLOSE REGISTER
    ================================= */

    if (closeRegister) {

        closeRegister.addEventListener("click", function () {

            registerModal.classList.remove("active");

        });

    }


    /* Close modal outside */

    if (registerModal) {

        registerModal.addEventListener("click", function (event) {

            if (event.target === registerModal) {

                registerModal.classList.remove("active");

            }

        });

    }


    /* ================================
       REGISTER
    ================================= */

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("registerName")
                    .value.trim();

            const email =
                document.getElementById("registerEmail")
                    .value.trim();

            const password =
                document.getElementById("registerPassword")
                    .value.trim();

            const role =
                document.getElementById("registerRole")
                    .value;


            if (!name || !email || !password) {

                showRegisterMessage(
                    "Please fill all required fields.",
                    "error"
                );

                return;
            }


            if (!isValidEmail(email)) {

                showRegisterMessage(
                    "Please enter a valid email.",
                    "error"
                );

                return;
            }


            if (password.length < 6) {

                showRegisterMessage(
                    "Password must contain at least 6 characters.",
                    "error"
                );

                return;
            }


            /* Demo registration */

            const user = {

                id: "demo-user-" + Date.now(),

                name: name,

                email: email,

                role: role

            };


            localStorage.setItem(
                "ima_user",
                JSON.stringify(user)
            );

            localStorage.setItem(
                "ima_user_role",
                role
            );


            showRegisterMessage(
                "Account created successfully!",
                "success"
            );


            setTimeout(function () {

                if (role === "seller") {

                    window.location.href =
                        "seller/dashboard.html";

                } else if (role === "creator") {

                    window.location.href =
                        "creator/dashboard.html";

                } else {

                    window.location.href =
                        redirect;

                }

            }, 800);

        });

    }


    /* ================================
       SELLER LOGIN
    ================================= */

    if (sellerLogin) {

        sellerLogin.addEventListener("click", function (event) {

            event.preventDefault();

            document.getElementById("registerRole").value =
                "seller";

            registerModal.classList.add("active");

        });

    }


    /* ================================
       CREATOR LOGIN
    ================================= */

    if (creatorLogin) {

        creatorLogin.addEventListener("click", function (event) {

            event.preventDefault();

            document.getElementById("registerRole").value =
                "creator";

            registerModal.classList.add("active");

        });

    }


    /* ================================
       ESCAPE KEY
    ================================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            registerModal.classList.remove("active");

        }

    });


    /* ================================
       FUNCTIONS
    ================================= */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    function showError(id, message) {

        const element =
            document.getElementById(id);

        if (element) {

            element.textContent = message;

        }

    }


    function clearErrors() {

        const errors =
            document.querySelectorAll(".error-message");

        errors.forEach(function (error) {

            error.textContent = "";

        });

    }


    function showMessage(message, type) {

        const element =
            document.getElementById("loginMessage");

        if (!element) return;

        element.textContent = message;

        if (type === "success") {

            element.style.color = "#039855";

        } else {

            element.style.color = "#d92d20";

        }

    }


    function showRegisterMessage(message, type) {

        const element =
            document.getElementById("registerMessage");

        if (!element) return;

        element.textContent = message;

        if (type === "success") {

            element.style.color = "#039855";

        } else {

            element.style.color = "#d92d20";

        }

    }

});

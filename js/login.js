/* =====================================================
   IMA SHOPPING CENTRE
   LOGIN / SIGNUP JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    setupFormSwitching();
    setupPasswordToggles();
    setupLogin();
    setupSignup();
    setupForgotPassword();
    setupGoogleLogin();

});


/* =====================================================
   FORM SWITCHING
===================================================== */

function setupFormSwitching() {

    const loginSection =
        document.getElementById("loginFormSection");

    const signupSection =
        document.getElementById("signupFormSection");

    const forgotSection =
        document.getElementById("forgotFormSection");


    document.getElementById("showSignupButton")
        ?.addEventListener("click", function () {

            loginSection.classList.add("hidden");
            signupSection.classList.remove("hidden");
            forgotSection.classList.add("hidden");

        });


    document.getElementById("showLoginButton")
        ?.addEventListener("click", function () {

            signupSection.classList.add("hidden");
            forgotSection.classList.add("hidden");
            loginSection.classList.remove("hidden");

        });


    document.getElementById("forgotPasswordButton")
        ?.addEventListener("click", function () {

            loginSection.classList.add("hidden");
            signupSection.classList.add("hidden");
            forgotSection.classList.remove("hidden");

        });


    document.getElementById("backToLoginButton")
        ?.addEventListener("click", function () {

            forgotSection.classList.add("hidden");
            signupSection.classList.add("hidden");
            loginSection.classList.remove("hidden");

        });
}


/* =====================================================
   PASSWORD TOGGLE
===================================================== */

function setupPasswordToggles() {

    setupPasswordToggle(
        "loginPassword",
        "loginPasswordToggle"
    );

    setupPasswordToggle(
        "signupPassword",
        "signupPasswordToggle"
    );
}


function setupPasswordToggle(inputId, buttonId) {

    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);

    if (!input || !button) return;

    button.addEventListener("click", function () {

        if (input.type === "password") {

            input.type = "text";
            button.textContent = "🙈";

        } else {

            input.type = "password";
            button.textContent = "👁️";

        }

    });
}


/* =====================================================
   LOGIN
===================================================== */

function setupLogin() {

    const form =
        document.getElementById("loginForm");

    if (!form) return;


    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail")
                .value
                .trim();

        const password =
            document.getElementById("loginPassword")
                .value;

        const remember =
            document.getElementById("rememberMe")
                .checked;


        if (!email || !password) {

            showMessage(
                "loginMessage",
                "Please enter email and password.",
                "error"
            );

            return;
        }


        /*
         * FRONTEND DEMO
         *
         * Supabase Auth will be connected here.
         */

        const button =
            document.getElementById("loginButton");

        button.disabled = true;
        button.textContent = "Logging in...";


        setTimeout(function () {

            const user = {
                email: email,
                name: email.split("@")[0]
            };

            localStorage.setItem(
                "ima_user",
                JSON.stringify(user)
            );

            localStorage.setItem(
                "ima_user_role",
                "customer"
            );


            if (remember) {

                localStorage.setItem(
                    "ima_remember",
                    "true"
                );

            }


            showMessage(
                "loginMessage",
                "Login successful! Redirecting...",
                "success"
            );


            setTimeout(function () {

                redirectAfterLogin();

            }, 700);


        }, 700);

    });
}


/* =====================================================
   SIGNUP
===================================================== */

function setupSignup() {

    const form =
        document.getElementById("signupForm");

    if (!form) return;


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("signupName")
                .value
                .trim();

        const email =
            document.getElementById("signupEmail")
                .value
                .trim();

        const password =
            document.getElementById("signupPassword")
                .value;

        const confirmPassword =
            document.getElementById("signupConfirmPassword")
                .value;

        const terms =
            document.getElementById("termsCheckbox")
                .checked;


        if (password.length < 6) {

            showMessage(
                "signupMessage",
                "Password must contain at least 6 characters.",
                "error"
            );

            return;
        }


        if (password !== confirmPassword) {

            showMessage(
                "signupMessage",
                "Passwords do not match.",
                "error"
            );

            return;
        }


        if (!terms) {

            showMessage(
                "signupMessage",
                "Please accept the Terms & Conditions.",
                "error"
            );

            return;
        }


        const button =
            document.getElementById("signupButton");

        button.disabled = true;
        button.textContent = "Creating Account...";


        /*
         * FRONTEND DEMO
         *
         * Supabase Auth will replace this section.
         */

        setTimeout(function () {

            const user = {
                name: name,
                email: email
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
                "signupMessage",
                "Account created successfully!",
                "success"
            );


            setTimeout(function () {

                redirectAfterLogin();

            }, 700);


        }, 700);

    });
}


/* =====================================================
   FORGOT PASSWORD
===================================================== */

function setupForgotPassword() {

    const form =
        document.getElementById("forgotForm");

    if (!form) return;


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("forgotEmail")
                .value
                .trim();


        if (!email) {

            showMessage(
                "forgotMessage",
                "Please enter your email.",
                "error"
            );

            return;
        }


        /*
         * Supabase password reset
         * will be connected here.
         */


        showMessage(
            "forgotMessage",
            "Password reset link will be sent to your email.",
            "success"
        );

    });
}


/* =====================================================
   GOOGLE LOGIN
===================================================== */

function setupGoogleLogin() {

    const button =
        document.getElementById("googleLoginButton");

    if (!button) return;


    button.addEventListener("click", function () {

        /*
         * Supabase Google OAuth
         * will be connected here.
         */

        showMessage(
            "loginMessage",
            "Google login will be connected with Supabase.",
            "info"
        );

    });
}


/* =====================================================
   REDIRECT
===================================================== */

function redirectAfterLogin() {

    const params =
        new URLSearchParams(window.location.search);

    const redirect =
        params.get("redirect");


    if (redirect === "checkout") {

        window.location.href = "cart.html";

        return;
    }


    window.location.href = "account.html";
}


/* =====================================================
   MESSAGE
===================================================== */

function showMessage(
    elementId,
    message,
    type
) {

    const element =
        document.getElementById(elementId);

    if (!element) return;

    element.textContent = message;

    element.className =
        "form-message " + type;
                           }

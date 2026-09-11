/* =====================================================
   IMA SHOPPING CENTRE
   ADMIN PRODUCTS JAVASCRIPT
   ===================================================== */


/* =====================================================
   DEMO PRODUCT DATA
   ===================================================== */

let adminProducts = [

    {
        id: 1,
        name: "Smart LED Bulb",
        category: "electronics",
        price: 299,
        stock: 120,
        seller: "IMA Verified Store",
        status: "active",
        image: "../assets/images/bulb.jpg",
        description: "Smart LED bulb for home lighting.",
        verifiedSeller: true
    },


    {
        id: 2,
        name: "Portable Mini Fan",
        category: "electronics",
        price: 399,
        stock: 85,
        seller: "Smart Deals",
        status: "active",
        image: "../assets/images/fan.jpg",
        description: "Portable rechargeable mini fan.",
        verifiedSeller: true
    },


    {
        id: 3,
        name: "Kitchen Storage Box",
        category: "kitchen",
        price: 249,
        stock: 0,
        seller: "Home Store",
        status: "out",
        image: "../assets/images/storage.jpg",
        description: "Useful kitchen storage container.",
        verifiedSeller: true
    },


    {
        id: 4,
        name: "Motion Sensor Light",
        category: "home",
        price: 449,
        stock: 30,
        seller: "IMA Home",
        status: "pending",
        image: "../assets/images/light.jpg",
        description: "Automatic motion sensor light.",
        verifiedSeller: true
    }

];



/* =====================================================
   DISPLAY PRODUCTS
   ===================================================== */

function displayAdminProducts(
    list = adminProducts
) {

    const table =
        document.getElementById(
            "adminProductTable"
        );


    if (!table) {
        return;
    }


    table.innerHTML = "";


    if (list.length === 0) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:50px;
                    "
                >

                    🔍 No products found

                </td>

            </tr>

        `;


        updateProductStats();


        updateResultText(0);


        return;
    }



    list.forEach(product => {


        let statusText;


        if (
            product.status === "active"
        ) {

            statusText = "Active";

        }

        else if (
            product.status === "pending"
        ) {

            statusText = "Pending";

        }

        else {

            statusText = "Out of Stock";

        }



        table.innerHTML += `

            <tr>

                <td>

                    <div class="admin-product-info">

                        <img
                            src="${escapeHTML(product.image)}"
                            alt="${escapeHTML(product.name)}"
                            onerror="
                                this.src='https://placehold.co/60x60?text=IMA'
                            "
                        >

                        <div>

                            <strong>
                                ${escapeHTML(product.name)}
                            </strong>

                            <small>
                                Product #${product.id}
                            </small>

                        </div>

                    </div>

                </td>


                <td>
                    ${formatCategory(product.category)}
                </td>


                <td>
                    ₹${Number(product.price).toLocaleString("en-IN")}
                </td>


                <td>
                    ${product.stock}
                </td>


                <td>

                    ${escapeHTML(product.seller)}

                    ${
                        product.verifiedSeller
                            ? `<small
                                style="
                                    display:block;
                                    color:#16834b;
                                    margin-top:4px;
                                "
                               >
                                ✓ Verified
                               </small>`
                            : ""
                    }

                </td>


                <td>

                    <span
                        class="status-badge ${product.status}"
                    >

                        ${statusText}

                    </span>

                </td>


                <td>

                    <div class="table-actions">

                        <button
                            type="button"
                            onclick="editAdminProduct(${product.id})"
                            title="Edit Product"
                        >
                            ✏️
                        </button>


                        <button
                            type="button"
                            onclick="deleteAdminProduct(${product.id})"
                            title="Delete Product"
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            </tr>

        `;

    });



    updateProductStats();


    updateResultText(
        list.length
    );

}



/* =====================================================
   ESCAPE HTML
   ===================================================== */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}



/* =====================================================
   CATEGORY FORMAT
   ===================================================== */

function formatCategory(category) {

    if (!category) {
        return "-";
    }


    return category
        .charAt(0)
        .toUpperCase() +
        category.slice(1);

}



/* =====================================================
   RESULT TEXT
   ===================================================== */

function updateResultText(count) {

    const resultText =
        document.getElementById(
            "productResultText"
        );


    if (!resultText) {
        return;
    }


    if (
        count === adminProducts.length
    ) {

        resultText.textContent =
            `Showing all ${count} products`;

    }

    else {

        resultText.textContent =
            `${count} products found`;

    }

}



/* =====================================================
   UPDATE STATISTICS
   ===================================================== */

function updateProductStats() {

    const total =
        adminProducts.length;


    const active =
        adminProducts.filter(
            product =>
                product.status === "active"
        ).length;


    const pending =
        adminProducts.filter(
            product =>
                product.status === "pending"
        ).length;


    const out =
        adminProducts.filter(
            product =>
                product.status === "out"
        ).length;



    const totalElement =
        document.getElementById(
            "totalProducts"
        );


    const activeElement =
        document.getElementById(
            "activeProducts"
        );


    const pendingElement =
        document.getElementById(
            "pendingProducts"
        );


    const outElement =
        document.getElementById(
            "outOfStockProducts"
        );



    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (activeElement) {

        activeElement.textContent =
            active;

    }


    if (pendingElement) {

        pendingElement.textContent =
            pending;

    }


    if (outElement) {

        outElement.textContent =
            out;

    }

}



/* =====================================================
   SEARCH
   ===================================================== */

function searchAdminProducts() {

    applyProductFilters();

}



/* =====================================================
   FILTER
   ===================================================== */

function filterAdminProducts() {

    applyProductFilters();

}



/* =====================================================
   APPLY FILTERS
   ===================================================== */

function applyProductFilters() {

    const input =
        document.getElementById(
            "productSearch"
        );


    const categorySelect =
        document.getElementById(
            "adminCategoryFilter"
        );


    const statusSelect =
        document.getElementById(
            "adminStatusFilter"
        );



    const keyword =
        input
            ? input.value
                .toLowerCase()
                .trim()
            : "";


    const category =
        categorySelect
            ? categorySelect.value
            : "all";


    const status =
        statusSelect
            ? statusSelect.value
            : "all";



    const result =
        adminProducts.filter(
            product => {


                const name =
                    product.name
                        .toLowerCase();


                const seller =
                    product.seller
                        .toLowerCase();



                const searchMatch =

                    keyword === ""

                    ||

                    name.includes(keyword)

                    ||

                    seller.includes(keyword);



                const categoryMatch =

                    category === "all"

                    ||

                    product.category === category;



                const statusMatch =

                    status === "all"

                    ||

                    product.status === status;



                return (
                    searchMatch &&
                    categoryMatch &&
                    statusMatch
                );

            }
        );



    displayAdminProducts(
        result
    );

}



/* =====================================================
   ENTER KEY SEARCH
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const searchInput =
            document.getElementById(
                "productSearch"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "keyup",
                function (event) {

                    if (
                        event.key === "Enter"
                    ) {

                        searchAdminProducts();

                    }

                }
            );

        }


    }
);



/* =====================================================
   OPEN ADD PRODUCT
   ===================================================== */

function openAddProduct() {

    const modal =
        document.getElementById(
            "productModal"
        );


    if (!modal) {
        return;
    }


    const form =
        document.getElementById(
            "productForm"
        );


    if (form) {

        form.reset();

    }


    modal.classList.add(
        "show"
    );


    setTimeout(
        function () {

            const nameInput =
                document.getElementById(
                    "adminProductName"
                );


            if (nameInput) {

                nameInput.focus();

            }

        },
        100
    );

}



/* =====================================================
   CLOSE MODAL
   ===================================================== */

function closeProductModal() {

    const modal =
        document.getElementById(
            "productModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );

}



/* =====================================================
   SAVE PRODUCT
   ===================================================== */

function saveAdminProduct(event) {

    event.preventDefault();



    const name =
        document.getElementById(
            "adminProductName"
        )
        .value
        .trim();


    const category =
        document.getElementById(
            "adminProductCategory"
        )
        .value;


    const seller =
        document.getElementById(
            "adminProductSeller"
        )
        .value
        .trim();


    const price =
        Number(
            document.getElementById(
                "adminProductPrice"
            )
            .value
        );


    const stock =
        Number(
            document.getElementById(
                "adminProductStock"
            )
            .value
        );


    const image =
        document.getElementById(
            "adminProductImage"
        )
        .value
        .trim();


    const description =
        document.getElementById(
            "adminProductDescription"
        )
        .value
        .trim();


    const verifiedSeller =
        document.getElementById(
            "adminVerifiedSeller"
        )
        .checked;



    /* VALIDATION */

    if (!name) {

        alert(
            "Please enter product name."
        );

        return;

    }


    if (!category) {

        alert(
            "Please select a category."
        );

        return;

    }


    if (!seller) {

        alert(
            "Please enter seller name."
        );

        return;

    }


    if (
        !Number.isFinite(price) ||
        price <= 0
    ) {

        alert(
            "Please enter a valid price."
        );

        return;

    }


    if (
        !Number.isFinite(stock) ||
        stock < 0
    ) {

        alert(
            "Please enter a valid stock quantity."
        );

        return;

    }



    /* CREATE PRODUCT */

    const newProduct = {

        id:
            Date.now(),

        name:
            name,

        category:
            category,

        price:
            price,

        stock:
            stock,

        seller:
            seller,

        status:
            stock === 0
                ? "out"
                : "active",

        image:
            image ||
            "https://placehold.co/500x500?text=IMA+Product",

        description:
            description,

        verifiedSeller:
            verifiedSeller

    };



    adminProducts.unshift(
        newProduct
    );



    /* UPDATE UI */

    displayAdminProducts();


    closeProductModal();


    alert(
        "Product added successfully!"
    );

}



/* =====================================================
   EDIT PRODUCT
   ===================================================== */

function editAdminProduct(id) {

    const product =
        adminProducts.find(
            item =>
                item.id === id
        );


    if (!product) {

        alert(
            "Product not found."
        );

        return;

    }



    const newName =
        prompt(
            "Product Name:",
            product.name
        );


    if (
        newName === null
    ) {

        return;

    }


    if (
        newName.trim() === ""
    ) {

        alert(
            "Product name cannot be empty."
        );

        return;

    }



    const newPrice =
        prompt(
            "Product Price:",
            product.price
        );


    if (
        newPrice === null
    ) {

        return;

    }


    if (
        !Number.isFinite(
            Number(newPrice)
        ) ||
        Number(newPrice) <= 0
    ) {

        alert(
            "Invalid price."
        );

        return;

    }



    const newStock =
        prompt(
            "Stock Quantity:",
            product.stock
        );


    if (
        newStock === null
    ) {

        return;

    }


    if (
        !Number.isFinite(
            Number(newStock)
        ) ||
        Number(newStock) < 0
    ) {

        alert(
            "Invalid stock."
        );

        return;

    }



    /* UPDATE */

    product.name =
        newName.trim();


    product.price =
        Number(newPrice);


    product.stock =
        Number(newStock);



    if (
        product.stock === 0
    ) {

        product.status =
            "out";

    }

    else {

        product.status =
            "active";

    }



    displayAdminProducts();


    alert(
        "Product updated successfully!"
    );

}



/* =====================================================
   DELETE PRODUCT
   ===================================================== */

function deleteAdminProduct(id) {

    const product =
        adminProducts.find(
            item =>
                item.id === id
        );


    if (!product) {
        return;
    }



    const confirmed =
        confirm(
            `Are you sure you want to delete "${product.name}"?`
        );


    if (!confirmed) {
        return;
    }



    adminProducts =
        adminProducts.filter(
            item =>
                item.id !== id
        );



    displayAdminProducts();


    alert(
        "Product deleted successfully!"
    );

}



/* =====================================================
   REFRESH
   ===================================================== */

function refreshAdminProducts() {

    const searchInput =
        document.getElementById(
            "productSearch"
        );


    const categoryFilter =
        document.getElementById(
            "adminCategoryFilter"
        );


    const statusFilter =
        document.getElementById(
            "adminStatusFilter"
        );


    if (searchInput) {

        searchInput.value = "";

    }


    if (categoryFilter) {

        categoryFilter.value =
            "all";

    }


    if (statusFilter) {

        statusFilter.value =
            "all";

    }


    displayAdminProducts();

}



/* =====================================================
   LOGOUT
   ===================================================== */

function adminLogout() {

    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) {
        return;
    }


    window.location.href =
        "../login.html";

}



/* =====================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "productModal"
            );


        if (!modal) {
            return;
        }


        if (
            event.target === modal
        ) {

            closeProductModal();

        }

    }
);



/* =====================================================
   ESC KEY CLOSE MODAL
   ===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeProductModal();

        }

    }
);



/* =====================================================
   INITIAL LOAD
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayAdminProducts();

    }
);

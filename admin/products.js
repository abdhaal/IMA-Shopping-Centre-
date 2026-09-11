/* =====================================================
   IMA SHOPPING CENTRE
   ADMIN PRODUCTS JAVASCRIPT
   ===================================================== */


/* =====================================================
   PRODUCT DATA
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
        image: "../assets/images/bulb.jpg"
    },

    {
        id: 2,
        name: "Portable Mini Fan",
        category: "electronics",
        price: 399,
        stock: 85,
        seller: "Smart Deals",
        status: "active",
        image: "../assets/images/fan.jpg"
    },

    {
        id: 3,
        name: "Kitchen Storage Box",
        category: "kitchen",
        price: 249,
        stock: 0,
        seller: "Home Store",
        status: "out",
        image: "../assets/images/storage.jpg"
    },

    {
        id: 4,
        name: "Motion Sensor Light",
        category: "home",
        price: 449,
        stock: 30,
        seller: "IMA Home",
        status: "pending",
        image: "../assets/images/light.jpg"
    }

];


/* =====================================================
   DISPLAY PRODUCTS
   ===================================================== */

function displayAdminProducts(list = adminProducts) {

    const table =
        document.getElementById(
            "adminProductTable"
        );

    if (!table) return;


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

        return;
    }


    list.forEach(product => {

        let statusText;

        if (product.status === "active") {

            statusText = "Active";

        } else if (product.status === "pending") {

            statusText = "Pending";

        } else {

            statusText = "Out of Stock";

        }


        table.innerHTML += `

            <tr>

                <td>

                    <div class="admin-product-info">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            onerror="
                            this.src='https://placehold.co/60x60?text=IMA'
                            "
                        >

                        <div>

                            <strong>
                                ${product.name}
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
                    ${product.seller}
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
                            onclick="editAdminProduct(${product.id})"
                            title="Edit Product"
                        >
                            ✏️
                        </button>

                        <button
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
   UPDATE STATS
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

    const input =
        document.getElementById(
            "productSearch"
        );


    if (!input) return;


    const keyword =
        input.value
            .toLowerCase()
            .trim();


    const category =
        document.getElementById(
            "adminCategoryFilter"
        )?.value || "all";


    const status =
        document.getElementById(
            "adminStatusFilter"
        )?.value || "all";


    const result =
        adminProducts.filter(product => {

            const searchMatch =

                product.name
                    .toLowerCase()
                    .includes(keyword)

                ||

                product.seller
                    .toLowerCase()
                    .includes(keyword);


            const categoryMatch =

                category === "all" ||

                product.category === category;


            const statusMatch =

                status === "all" ||

                product.status === status;


            return (
                searchMatch &&
                categoryMatch &&
                statusMatch
            );

        });


    displayAdminProducts(result);

}


/* =====================================================
   FILTER
   ===================================================== */

function filterAdminProducts() {

    const keyword =
        document.getElementById(
            "productSearch"
        )?.value
        .toLowerCase()
        .trim() || "";


    const category =
        document.getElementById(
            "adminCategoryFilter"
        )?.value || "all";


    const status =
        document.getElementById(
            "adminStatusFilter"
        )?.value || "all";


    const result =
        adminProducts.filter(product => {

            const keywordMatch =

                product.name
                    .toLowerCase()
                    .includes(keyword)

                ||

                product.seller
                    .toLowerCase()
                    .includes(keyword);


            const categoryMatch =

                category === "all" ||

                product.category === category;


            const statusMatch =

                status === "all" ||

                product.status === status;


            return (
                keywordMatch &&
                categoryMatch &&
                statusMatch
            );

        });


    displayAdminProducts(result);

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


    if (!modal) return;


    modal.classList.add("show");


    const form =
        document.getElementById(
            "productForm"
        );


    if (form) {

        form.reset();

    }

}


/* =====================================================
   CLOSE MODAL
   ===================================================== */

function closeProductModal() {

    const modal =
        document.getElementById(
            "productModal"
        );


    if (!modal) return;


    modal.classList.remove("show");

}


/* =====================================================
   SAVE PRODUCT
   ===================================================== */

function saveAdminProduct(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "adminProductName"
        ).value.trim();


    const category =
        document.getElementById(
            "adminProductCategory"
        ).value;


    const seller =
        document.getElementById(
            "adminProductSeller"
        ).value.trim();


    const price =
        Number(
            document.getElementById(
                "adminProductPrice"
            ).value
        );


    const stock =
        Number(
            document.getElementById(
                "adminProductStock"
            ).value
        );


    const image =
        document.getElementById(
            "adminProductImage"
        ).value.trim();


    const description =
        document.getElementById(
            "adminProductDescription"
        ).value.trim();


    const verifiedSeller =
        document.getElementById(
            "adminVerifiedSeller"
        ).checked;


    if (!name) {

        alert(
            "Please enter product name."
        );

        return;

    }


    if (!category) {

        alert(
            "Please select category."
        );

        return;

    }


    if (!seller) {

        alert(
            "Please enter seller name."
        );

        return;

    }


    if (price <= 0) {

        alert(
            "Please enter a valid price."
        );

        return;

    }


    if (stock < 0) {

        alert(
            "Stock cannot be negative."
        );

        return;

    }


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
        newName === null ||
        newName.trim() === ""
    ) {

        return;

    }


    const newPrice =
        prompt(
            "Product Price:",
            product.price
        );


    if (
        newPrice === null ||
        Number(newPrice) <= 0
    ) {

        return;

    }


    const newStock =
        prompt(
            "Stock Quantity:",
            product.stock
        );


    if (
        newStock === null ||
        Number(newStock) < 0
    ) {

        return;

    }


    product.name =
        newName.trim();


    product.price =
        Number(newPrice);


    product.stock =
        Number(newStock);


    if (product.stock === 0) {

        product.status =
            "out";

    } else {

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


    if (!product) return;


    const confirmed =
        confirm(
            `Are you sure you want to delete "${product.name}"?`
        );


    if (!confirmed) return;


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


    if (!confirmed) return;


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
                "productModal"
            );


        if (!modal) return;


        if (
            event.target === modal
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

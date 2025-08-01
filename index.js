const addToCartButtons = document.querySelectorAll(".addcart");
const cartIcon = document.getElementById("bag");

var cart = [];
const discountCode = "FRESH10";

function getItemDetails(button) {
    const ingredientDiv = button.closest(".ingredients");
    const name = ingredientDiv.querySelector("h1").innerText;
    const priceText = ingredientDiv.querySelector("#price").innerText;
    const price = parseFloat(priceText.replace("$", ""));
    return { name, price };
}

addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const item = getItemDetails(btn);
        cart.push(item);
    });
});

cartIcon.addEventListener("click", () => {
    const existingPopup = document.getElementById("cart-popup");
    if (existingPopup) {
        existingPopup.remove();
    } else {
        showCartPopup();
    }
});

function showCartPopup() {
    const existing = document.querySelector("#cart-popup");
    if (existing) existing.remove();

    const popup = document.createElement("div");
    popup.id = "cart-popup";
    popup.style.position = "fixed";
    popup.style.top = "80px";
    popup.style.right = "30px";
    popup.style.width = "300px";
    popup.style.backgroundColor = "#fff";
    popup.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)";
    popup.style.padding = "20px";
    popup.style.zIndex = "999";
    popup.style.borderRadius = "12px";
    popup.style.maxHeight = "400px";
    popup.style.overflowY = "auto";


    if ( cart.length == 0) {
        popup.innerHTML = `<p>Your cart is empty.</p>`;
        document.body.appendChild(popup);
        return;
    }


    const list = document.createElement("ul");
    list.style.listStyle = "none";
    list.style.padding = "0";


    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.style.marginBottom = "8px";
        li.style.fontSize = "14px";
        li.innerHTML = `${item.name} - ${item.price.toFixed(2)}
        <button data-index="${index}" style="float:right;color:orange;background:none;border:none;cursor:pointer;">✖</button>`;
        list.appendChild(li);
    });


    var total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalDisplay = document.createElement("p");
    totalDisplay.innerText = `Total: $${total.toFixed(2)}`;
    totalDisplay.style.marginTop = "10px";


    const discountInput = document.createElement("input");
    discountInput.placeholder = "Enter discount code";
    discountInput.style.width = "100%";
    discountInput.style.marginTop = "10px";
    discountInput.style.padding = "6px";
    discountInput.style.borderRadius = "4px";
    discountInput.style.border = "1px solid #ccc";


    const applyBtn = document.createElement("button");
    applyBtn.innerText = "Apply Discount";
    applyBtn.style.marginTop = "80px";
    applyBtn.style.width = "100%";
    applyBtn.style.cursor = "pointer";
    applyBtn.style.backgroundColor = "#efda7c";
    applyBtn.style.border = "none";
    applyBtn.style.padding = "8px";
    applyBtn.style.borderRadius = "6px";

    applyBtn.addEventListener("click", () => {
        const code = discountInput.value.trim().toUpperCase();
        if (code === discountCode) {
            const discountedTotal = (total * 0.9).toFixed(2);
            totalDisplay.innerText = `Total (10% off): $${discountedTotal}`;
        } else {
            alert("Invalid discount code!");
        }
    });

    popup.appendChild(list);
    popup.appendChild(totalDisplay);
    popup.appendChild(discountInput);
    popup.appendChild(applyBtn);
    document.body.appendChild(popup);

    popup.querySelectorAll("button[data-index]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");
            cart.splice(index, 1);
            showCartPopup();
        });
    });
}
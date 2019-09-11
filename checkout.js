const allProducts = {};

getJSON(addProduct, allProductsLoaded);

function addProduct(prod) {
    // anropas för produkt, efteråt kommer allProducts vara ifylld så här:
    // 1: {id: "1", title: "Banana Gum", etc...}
    // 2: {id: "2", title: "blabla", etc...}
    allProducts[prod.id] = prod;
}

function validate() {
    let validated = true;

    if (!getField("Email").value.includes("@")) {
        getField("Email").classList.add("form-control-warning");
        validated = false;
    }
    else {
        getField("Email").classList.add("form-control-ok");
    }

    if (!getField("Name").value.includes(" ")) {
        getField("Name").classList.add("form-control-warning");
        validated = false;
    }
    else {
        getField("Name").classList.add("form-control-ok");
    }

    if (getField("Phone").value.length <10 || getField("Phone").value.length > 10) {
        getField("Phone").classList.add("form-control-warning");
        validated = false;
    }
    else {
        getField("Phone").classList.add("form-control-ok");
    }

    if (getField("Street").value.length < 2){
        getField("Street").classList.add("form-control-warning");
        validated = false;
    }
    else {
        getField("Street").classList.add("form-control-ok");
    }

    if (getField("Zip").value.length < 3){
        getField("Zip").classList.add("form-control-warning");
        validated = false;
    }
    else {
        getField("Zip").classList.add("form-control-ok");
    }

    if (getField("City").value.length < 2){
        getField("City").classList.add("form-control-warning");
        validated = false;
    }
    else {
        getField("City").classList.add("form-control-ok");
    }


    return validated;
}

function getField(field) {
    return document.getElementById(field);
}
//kollar på validate är true eller false
function makeOrder() {
    const isValidOrder = validate();
// true...
    if (isValidOrder) {
        alert("tack för din beställning");
        document.getElementById("order-form").remove();
    }
//false...    
    else {
        alert("uppgifterna du angav stämde inte, försök igen");
    }
}

//Anropas när getJSON laddats klart
function allProductsLoaded() {
    console.log("Got products");

    const orderBtn = document.getElementById("order");
//anropar makeOrder vid beställning
    orderBtn.addEventListener("click", makeOrder);

//hämtar IDs från varukorgen och delar på dem 
    const cart = localStorage.getItem("ShoppingCart");
    const ids = cart.split(" ");

    console.log(ids);

//hämtar en container som är tom där vi skriver ut vad varukorgen innehåller    
    const container = document.getElementById("cart");
    container.insertAdjacentHTML("beforeend", "<b>Din varukorg: </b>");

    ids.forEach(function(id) {
        const product = allProducts[id];

    // skriver ut titeln för produkten
        if (product) {            
            const html = `<div>${product.title}</div>`;
            const container = document.getElementById("cart");
            container.insertAdjacentHTML("beforeend", html);
        }
    })

    container.insertAdjacentHTML("beforeend", "<br>");
}

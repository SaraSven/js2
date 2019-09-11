//anropas i början i programmet, tom sträng = tom varukorg
function clearShoppingCart() {
    localStorage.setItem("ShoppingCart", "");
}
// funktionen anropas med ett event
function buyProduct(evt) {
// hämtar ut elementet som knappen klickades    
    const el = evt.target;
// hämtar ut vilken vara det gäller genom ID    
    const productId = el.dataset.productId;

//hämtar ut det som finns i varukorgen    
    let cart = localStorage.getItem("ShoppingCart");
//vill inte ha null så gör den till tom sträng
    if (!cart) {
        cart = "";
    }
//plusar på nya ID som vi fick ovan
    cart += " " + productId;
//sparar det nya plus det gamla i localstorage
    localStorage.setItem("ShoppingCart", cart);
    alert("Product placed in shopping cart!");
    alert("Your shooping cart contains: " + localStorage.getItem("ShoppingCart"));
}

function renderProduct(product) {
// templatesträng    
    const prodHTML = `
        <div class="col-sm-4" id="product-${product.id}">   
            <h1>${product.title}</h1>
            <p class="price">${product.price}</p>
            <p class="description">${product.description}</p>
            <img src="${product.image}">
            <!--välja antal-->
            <button data-product-id="${product.id}" class="addToCart">Köp</button>
        </div>`;
// hämtar ut en tom div i index och lägger in HTML ovan
    const container = document.getElementById("product-container");
    container.insertAdjacentHTML("beforeend", prodHTML);
// hitta knappen med en CSS selector     
    const btnSelector = `#product-${product.id} > button`;
    const btn = document.querySelector(btnSelector);
//skapar en eventlyssnare     
    btn.addEventListener("click", buyProduct);
    console.log(product);
}


function getJSON(callback, doneCallback) {
    // JSON filen då jag inte kommer åt lokala filer
    const url = "https://api.myjson.com/bins/d3epx";

    //andvänder fetch-api för att hämta JSON filen
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            console.log('Output: ', out);
    // out är JSON filen inläst till ett JS objekt som är en array
            out.forEach(element => {
    // loopa igenom array och anropar funktionen som vi skickade in i vår callback funktion             
                callback(element);
            });
        }).then(() => {
            if (doneCallback) { 
    // när allt är klart anropas en annan funktion som skickades in            
                doneCallback();
            }
        }).catch(err => console.error(err));
}

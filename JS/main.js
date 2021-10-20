
// Affichage des centimes sur les prix

function get_price(price){
    let str = price.toString()
    let centimals = str.slice(-2)
    return str.slice(0, str.length - 2) + "," + centimals
}



// Récupération des données de l'API
let get_products= document.getElementById("produits")
function callApi() {
    fetch('http://localhost:3000/api/teddies')
        .then(response => response.json())
        .then(products => {
            for (let i = 0; i<products.length; i++)
            {
                let div= document.createElement("div")
                div.innerHTML=
                  "<h2 class='article__name'>" + products[i].name + "</h2>"
                + "<p  class='article__description'>" + products[i].description + "</p>"
                + "<div class='article__price'>" + get_price(products[i].price) + "€</div>"
                + "<img class='article__img' src='"+ products[i].imageUrl +"'>"
                + "<a href='product.html?id="+products[i]._id +"'>" 
                + "<div class='article__btn'> Voir le produit </div>"
                + "</a>"

                get_products.appendChild(div)
            }

            //panierInit() // Initialisation du localStorage 
            //displayHtml()
            let loader = document.getElementById("loader");
            loader.classList.add("display-none");
        })
        .catch(err => {
            let errorHtml = document.getElementById("errorGestion");
            let loader = document.getElementById("loader");
            loader.classList.add("display-none");
            errorHtml.classList.remove("display-none");
        });
}
callApi()


function displayCart(){
    let counter = document.getElementById("counter")
    if(!localStorage.counter){
      counter.innerHTML= 0
      return
    }
    counter.innerHTML= localStorage.counter
  }
 displayCart()



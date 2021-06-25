// - DEFINITION DES VARIABLES -
//   ************************

var products = []; // Contient la liste des produits
var panier = []; // Contient le panier + la quantitée


// - DEFINITION DES FONCTIONS -
//   ************************

//main ()

function main() {
    const articles = getArticles()
    displayArticles(articles)
}

function getArticles() {
    fetch()
}

function displayArticles() {
    return ""
}
//

// Récupération des données de l'API

let test= document.getElementById("produits")


function callApi() {
    fetch('http://localhost:3000/api/teddies')
        .then(response => response.json())
        .then(products => {
            for (let i = 0; i<products.length; i++)
            {
                console.log(products[i])
                let div= document.createElement("div")
                div.innerHTML=
                  "<h2 class='article__name'>" + products[i].name + "</h2>"
                + "<p  class='article__description'>" + products[i].description + "</p>"
                + "<div class='article__price'>" + products[i].price + "€</div>"
                + "<img class='article__img' src='"+ products[i].imageUrl +"'>"
                + "<div class='article__btn'>" + "Ajouter" + "</div>"

                test.appendChild(div)
            }

            //panierInit() // Initialisation du localStorage 
            //displayHtml()
            let loader = document.getElementById("loader");
            loader.classList.add("display-none");
        })
        .catch(err => {
            console.log(err);
            let errorHtml = document.getElementById("errorGestion");
            let loader = document.getElementById("loader");
            loader.classList.add("display-none");
            errorHtml.classList.remove("display-none");
        });
}
callApi()






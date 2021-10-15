// - DEFINITION DES VARIABLES -
//   ************************
var product = []; // Contient la liste des produits
var panier = []; // Contient le panier + la quantitée
let form = document.getElementById("form");
let lastName = document.getElementById("lastName");
let firstName = document.getElementById("firstName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

var total = 0;
var contact = {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
    };

let storagePanier = JSON.parse(localStorage.panier);
console.log(storagePanier)


// Affichage du panier par ajout de HTML pour chaque produit
function displayPanier() {
        for (let key in storagePanier) {
            if (storagePanier[key].quantite > 0) {
                let parent = document.getElementById("container");
                parent.innerHTML+=`
                    <div id="container__article">  
                        <div class="panier__ctn__article" id="ctn${storagePanier[key]._id}">
                            <img src="${storagePanier[key].imageUrl}" alt="" width= "100px">
                            <h3 class="panier__ctn__article__nom">${storagePanier[key].nom}</h3>
                            <input type="number" id="${key}" min="0" value="${storagePanier[key].quantite}">
                            <p>${(storagePanier[key].prix * storagePanier[key].quantite / 100).toFixed(2)}€</p>
                            <button onclick="deleteProduct (id)">Supprimer</button>
                        </div>
                    </div>
                    `
            }
        }
        for (let key in storagePanier){
          let product = storagePanier[key];
          var input = document.getElementById(key)
          input.addEventListener("change", function(){
                    console.log(this.value)
                    console.log(product)
                    changePanier(key, product, this.value)
                    let value = parseInt(this.value) * parseInt(product.prix);
                    this.nextElementSibling.innerHTML = (value/100).toFixed(2) +" €"; 
                    displayTotal()
                  })  
        }
        console.log(total)
}
      

// Affichage du total
function displayTotal() {
  total = 0
  storagePanier = JSON.parse(localStorage.panier);
  for (let key in storagePanier) {
    if (storagePanier[key].quantite > 0) {
      total += (storagePanier[key].prix * storagePanier[key].quantite/100);
    }
}
        if (total > 0) {
            let parent = document.getElementById("container");
            let divTotal = document.getElementById("total")
            divTotal.innerHTML= `TOTAL : ${total.toFixed(2)} €`
            
        }
}


// Gestion du changement de quantité produit
// Fonction appelé dans le HTML

function changePanier(key, product, quantite) {
  let panierBefore = JSON.parse(localStorage.panier);
  let panierProduct = panierBefore[key]
    if (!localStorage.counter){
      localStorage.counter = quantite
    }else{
      localStorage.counter = parseInt(localStorage.counter) + parseInt(quantite) - parseInt(panierBefore[key].quantite)
    }
    if (!localStorage.panier){
      localStorage.panier=JSON.stringify({})
    }
      if (panierProduct) {//Mettre a jour le local storage avec les quantités
        panierBefore[key].quantite = quantite 
      }else{//créer l'élément dans le local storage
        let element={
          "nom": product.name, 
          "prix": product.price,
          imageUrl: product.imageUrl,
          quantite: quantite,
        }
        panierBefore[key]= element
      }
      localStorage.panier=JSON.stringify(panierBefore)
  }
  
function sendPanier (){
  const contact = {
    firstName: document.getElementById("firstName").value,
    lastName : document.getElementById("lastName").value,
    email : document.getElementById("email").value,
    city : document.getElementById("city").value,
    address : document.getElementById("address").value,
    zip : document.getElementById("zip").value,
  }
  let products = []
  storagePanier = JSON.parse(localStorage.panier);
  for (let key in storagePanier) {
    products.push(key)
  }
  fetch('http://localhost:3000/api/teddies/order', {
    method : "POST",
    body : JSON.stringify({
      contact : contact,
      products : products,
    }),
      headers : {
        "Content-Type" : "application/json"
      }
  })
  .then(response => response.json())
  .then(order => {
    localStorage.setItem ("idCommande", order.orderId)
    localStorage.setItem ("total", total)
    window.location.href= "confirmation.html"
  })
}

var valider = document.getElementById("btn")
  valider.addEventListener("click", function(e){
    var form = document.getElementById("form")
    if(!form.checkValidity()){
    return
    }else{
    e.preventDefault()
    sendPanier()
    }
  })  

  function displayCart(){
    let counter = document.getElementById("counter")
    if(!localStorage.counter){
      counter.innerHTML= 0
      return
    }
    counter.innerHTML= localStorage.counter
  }
  displayCart()

displayPanier()

displayTotal ()

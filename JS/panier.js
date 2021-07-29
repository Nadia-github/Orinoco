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
                      total += (storagePanier[key].prix * storagePanier[key].quantite/100);
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
                    this.nextElementSibling.innerHTML = value.toFixed(2)/100 + " " +" €";
                  })  
        }
        console.log(total)
}


// Affichage du total
function displayTotal() {
        console.log(total)
        if (total > 0) {
            let parent = document.getElementById("container");
            parent.insertAdjacentHTML('beforeend', `
                        <h2 class="panier__ctn__total" id="total">TOTAL : ${total.toFixed(2)} €</h2> 
                    `);
        }
}

// Gestion du changement de quantité produit
// Fonction appelé dans le HTML

function changePanier(key, product, quantite) {
    console.log(quantite)
    if (!localStorage.counter){
      localStorage.counter = quantite
    }else{
      localStorage.counter = parseInt(localStorage.counter) + quantite
    }
    if (!localStorage.panier){
      localStorage.panier=JSON.stringify({})
    }
    let panierBefore = JSON.parse(localStorage.panier);
    let panierProduct = panierBefore[key]
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
  


/*
function changeAmount(id) {
    let panierBefore = JSON.parse(localStorage.panier);
    for (let element of panierBefore) {
        if (element._id === id) {
            element.quantite = document.getElementById(`${id}`).value;
            document.getElementById(`total${id}`).textContent = `${(element.price * element.quantite / 100).toFixed(2)}€`;

            total = 0;

            for (let element of panierBefore) {
                if (element.quantite > 0) {
                    total += (element.price * element.quantite / 100);
                }
            }

            document.getElementById("totalForm").innerHTML = `TOTAL : ${total.toFixed(2)} €`;
            document.getElementById("total").innerHTML = `TOTAL : ${total.toFixed(2)} €`;

            if (element.quantite == 0) {
                let obj = document.getElementById(`ctn${id}`);
                obj.delete()
            }
        }
    }
    localStorage.setItem("panier", JSON.stringify(panierBefore));
};
*/



displayPanier()

displayTotal ()

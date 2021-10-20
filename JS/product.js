
// Affichage des centimes sur les prix
function get_price(price){
  let str = price.toString()
  let centimals = str.slice(-2)
  return str.slice(0, str.length - 2) + "," + centimals
}


let url = new URL(window.location.href)

let id = url.searchParams.get("id")



fetch("http://localhost:3000/api/teddies/" + id)
.then(response => response.json())
        .then(product => {
                let div= document.createElement("div")
                let get_product= document.getElementById("produit")
                div.innerHTML=
                  "<h2 class='article__name'>" + product.name + "</h2>"
                + "<p  class='article__description article__center'>" + product.description + "</p>"
                + "<div class='article__price'>" + get_price(product.price) + "€</div>"
                + "<img class='article__img' src='"+ product.imageUrl +"' height='300px'>"
                + "<form class='produit__ctn__form' id='form'>"
                +   "<label for='selectColor'>Couleur</label>" 
                +   "<select name='productColor' id='selectColor'></select>"
                +   "<button type='button' id='add'>Ajouter au panier</button>"
                + "</form>"
                get_product.appendChild(div)
                let select = document.getElementById("selectColor")
                addOptions(select, product.colors)
                let button= document.getElementById("add")
                button.addEventListener("click",()=>{
                  addPanier(product)
                })
            })

function addOptions(select, options){
  let content = ""
  for (let i=0; i<options.length; i++){
    content += "<option value="+i+">"+options[i]+"</option>"
  }
  select.innerHTML = content
}


// Ajoute un élément au panier stocké dans le localStorage
function addPanier(product) {
  if (!localStorage.counter){
    localStorage.counter = 1
  }else{
    localStorage.counter = parseInt(localStorage.counter) + 1
  }
  if (!localStorage.panier){
    localStorage.panier=JSON.stringify({})
  }
  let panierBefore = JSON.parse(localStorage.panier);
  let panierProduct = panierBefore[product._id]
    if (panierProduct) {//Mettre a jour le local storage avec les quantités
      panierBefore[product._id].quantite += 1 
    }else{//créer l'élément dans le local storage
      let element={
        "nom": product.name, 
        "prix": product.price,
        imageUrl: product.imageUrl,
        quantite: 1,
      }
      panierBefore[product._id]= element
    }
    localStorage.panier=JSON.stringify(panierBefore)
    displayCart()
}


function displayCart(){
  let counter = document.getElementById("counter")
  if(!localStorage.counter){
    counter.innerHTML= 0
    return
  }
  counter.innerHTML= localStorage.counter
}
displayCart()


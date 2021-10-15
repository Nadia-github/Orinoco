let totalHtml = document.getElementById("total")
let idCommandeHtml = document.getElementById("idCommande")

let total = localStorage.total
let idCommande = localStorage.idCommande

totalHtml.innerHTML = "Le montant de votre commande :" + total + " €"
idCommandeHtml.innerHTML = "Votre numéro de commande :" + " " + idCommande

localStorage.removeItem("panier")
localStorage.removeItem("total")
localStorage.removeItem("idCommande")
localStorage.removeItem("counter")
let elementListaSpesa = document.getElementById("listaSpesa");
let btnAdd = document.getElementById("btnAdd");
let btnTotale = document.getElementById("btnTotale");

function popolaLista(){
    elementListaSpesa.innerHTML = "";
    for (let i = 0; i < aNomeProd.length; i++) {
        elementListaSpesa.innerHTML += "<li>" + aNomeProd[i] + " : " + aPrezzoProd[i] + " Euro</li>";
    }

}

function aggiungiProdotto() {
    let Prodotto = document.getElementById("nomeProd").value;
    let Prezzo = document.getElementById("prezzoProd").value;
    
    if (!Prodotto || !Prezzo) {
        elementListaSpesa.innerHTML = "Compila il campo richiesto";
        return
    }

    if (Prezzo >= 0) {
        console.log("inserisci quantitativo");
    } else {
        elementListaSpesa.innerHTML = "";
    }

    aNomeProd.push(Prodotto);
    aPrezzoProd.push(Prezzo);
    
    popolaLista();
}

function calcolaTotale() {
    const totale = aPrezzoProd.reduce((somma, Prezzo) => somma + Number(Prezzo), 0);

    console.log(totale);
   const btnTotale = document.getElementById("grandTotal");
   btnTotale.innerHTML = "CARRELLO:      " + Math.round(totale) +"   € ";
}

let aNomeProd = [];
let aPrezzoProd = [];

btnAdd.addEventListener("click", aggiungiProdotto);
btnTotale.addEventListener("click", calcolaTotale);
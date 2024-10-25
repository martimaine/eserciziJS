let listaCarrello = document.querySelector("#listaCarrello");

function caricaCarrello(){

    const URLCarrello = "http://localhost:3000/carrello";

    fetch(URLCarrello)
    .then(data =>{ 
        return data.json()
    }).then(response =>{

        response.forEach(prod => {
            listaCarrello.innerHTML += `<li class='list-group-item'>${prod.id} ${prod.nome} ${prod.prezzo}</li>`

        });

    })

}


function totaleCarrello(){

    const URLCarrello = "http://localhost:3000/carrello";

    fetch(URLCarrello)
    .then(data =>{ 
        return data.json()
    }).then(response =>{
        let totaleSpesa=0

        response.forEach(prod => {
            totaleSpesa+=Number(prod.prezzo)
        });


        //  document.getElement by id 
        const element = document.getElementById('totaleSpesa')
        // element.innerHTML = totaleSpesa
        if (element) {
            element.innerText = `€ ${totaleSpesa.toFixed(2)}`
        }
    })
}

document.addEventListener("DOMContentLoaded", caricaCarrello);
document.addEventListener("DOMContentLoaded", totaleCarrello);
function togglePayment() {
    const paymentMethod = document.getElementById('payment-method').value;
    
    document.getElementById('credit-card-field').classList.add('d-none');
    document.getElementById('paypal-field').classList.add('d-none'); 
    document.getElementById('satispay-field').classList.add('d-none');
 
    if (paymentMethod === 'cc') {
        document.getElementById('credit-card-field').classList.remove('d-none');
    } else if (paymentMethod === 'paypal') {
        document.getElementById('paypal-field').classList.remove('d-none');
    } else if (paymentMethod === 'satispay') {
        document.getElementById('satispay-field').classList.remove('d-none');
    }
 }

 function validateForm() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;

    const paymentMethod = document.getElementById('payment-method').value;
    const cookieAccepted = document.querySelector('input[value="cookie2024"]').checked;
    const privacyAccepted = document.querySelector('input[value="privacy2024"]').checked;
    
    if (!name || !surname) {
        alert('Nome e cognome sono obbligatori');
        return false;
    }
    if (!email) {
        alert('email obbligatoria');
        return false;
    }
    if (!paymentMethod) {
        alert('Seleziona un metodo di pagamento');
        return false;
    }
    
    if (paymentMethod === 'cc' && !document.getElementById('credit-card-number').value) {
        alert('Inserisci il numero della carta di credito');
        return false;
    }
    
    if (paymentMethod === 'paypal' && !document.getElementById('paypal-email').value) {
        alert('Inserisci l\'email PayPal');
        return false;
    }
    
    if (paymentMethod === 'satispay' && !document.getElementById('satispay-phonenumber').value) {
        alert('Inserisci il numero di telefono Satispay');
        return false;
    }
    
    if (!cookieAccepted || !privacyAccepted) {
        alert('Devi accettare sia la cookie policy che la privacy policy');
        return false;
    }
    
    return true;
}

 function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
        return;
    }
    const paymentMethod = document.getElementById('payment-method').value;
    const paymentData = {
        nome: document.getElementById('name').value,
        cognome: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        metodoPagamento: paymentMethod,
        accettaCookie: document.querySelector('input[value="cookie2024"]').checked,
        accettaPrivacy: document.querySelector('input[value="privacy2024"]').checked
    };
 
    if (paymentMethod === 'cc') {
        paymentData.numeroCarta = document.getElementById('credit-card-number').value;
    } else if (paymentMethod === 'paypal') {
        paymentData.emailPaypal = document.getElementById('paypal-email').value;
    } else if (paymentMethod === 'satispay') {
        paymentData.telefonoSatispay = document.getElementById('satispay-phonenumber').value;
    }
 
    console.log(paymentData);
    const URLCarrello = "http://localhost:3000/carrello";

    return fetch(URLCarrello)
    .then(data =>{ 
        return data.json()
    }).then(response =>{
        let totaleSpesa=0

        response.forEach(prod => {
            totaleSpesa+=Number(prod.prezzo)
        });
        
        fetch('http://localhost:3000/acquisti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({totaleSpesa, paymentData})
        })
        .then(() => {
            alert('Acquisto completato con successo!');
            window.location.href = 'pages/success.html';
        })
        .catch(error => console.error('Error:', error));
    })
 }
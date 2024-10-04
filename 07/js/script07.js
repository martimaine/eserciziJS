class Todo {
    constructor(info, date) {
        this.info = info;
        this.date = date;
    }

    getInfo() {
        return this.info
    }

    getDate() {
        return moment(this.date).format("DD/MM/yyyy")
    }
}

class TodoList {
    constructor(listOfTodo) {
        this.list = listOfTodo || []
    }

    getList() {
        return this.list;
    }

    includes(todo) {
        return this.list.includes((element) => element.getInfo() === todo.getInfo())
    }

    createToDo(toDo) {
        const data = '<span onclick="barraElemento(event)" style="cursor: pointer;">' + toDo.getDate() + ' - ' + toDo.getInfo() + '</span>'
        const info = '<a class="p-2" href="http://www.google.com/search?q=' + toDo.getInfo()+'" target="blank"><span style="cursor: pointer;"><i class="bi bi-pencil-fill"></i></span></a>'
        const cancella = '<span onclick="eliminaToDo(\'' + toDo.getInfo() + '\')" class="cancella"><i class="bi bi-x-square-fill"></i></span>'

        return '<li class="item">' + data + info+ cancella + '</li>';
    }

    popola() {
        // seleziono il contenitore degli elementi della toDoList(tag ul)
        const toDoListElement = document.getElementById("ToDoList");
        // pulisco contenitore ul(ul padre e li figli)

        toDoListElement.innerHTML = "";
        // facciamo un ciclo for per generare gli elem della toDoList
        for (let toDo of toDoList.getList()) {
            // chiamo funzione che mi ritorna l html per un elemento toDo
            const element = this.createToDo(toDo)
            // devo aggiungere al contenitore l'elemento html appena generato
            toDoListElement.innerHTML += element;
        }

    }
}

const toDoList = new TodoList();

// EVENTS

// la funz add viene chiamata al click del bottone add
const add = function (event) {
    //  questo per evitare la submit del form che ricarica la pagina e mi fa perdere tutti i toDo
    event.preventDefault();
    // seleziono input
    const toDoElement = document.getElementById("toDoElement").value;
    const date = document.getElementById("inputDate").value;

    if (!toDoElement || !date) {
        return;
    }

    // prendo valore del tag input  poi..
    const toDo = new Todo(toDoElement, date);

    if (toDoList.includes(toDo)) {
        return
    }

    // metto il toDo nella toDoList(la mia memoria: che memorizza le cose)
    toDoList.list.push(toDo)
    console.log(toDoList.list);
    // chiamo funzione per aggiornare HTML con la lista dei ToDo che viene visualizzato all'utente
    toDoList.popola();
}

function barraElemento(event) {
    // aggiungo la classe barrato quando clicco e rimuovo se esiste già: metodo toggle
    event.target.classList.toggle("barrato");
}

// quando clicco x elimino l'elemento
function eliminaToDo(toDo) {
    toDoList.list = toDoList.list.filter((element) => element.getInfo() !== toDo);
    toDoList.popola();
}


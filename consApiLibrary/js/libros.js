const api = "http://localhost:8080/libros";
let message = document.getElementById("message");
message.style.visibility = 'hidden'
function getBooks() {
    axios.get(api)
        .then(response => {
            const list = document.getElementById("bookList");
            list.innerHTML = "";
            response.data.forEach(book => {
                // Para prestamos de cada libro
                // let loansHtml = "";
                // if (book.prestamos.length > 0) {
                //     loansHtml = "<div>";
                //     book.prestamos.forEach(prestamo => {
                //         loansHtml += `<p>${prestamo.id} - ${prestamo.fechaprestamo} - ${prestamo.fechadevolucion}</p>`;
                //     });
                //     loansHtml += "</div>";
                // } else {
                //     loansHtml = "<em>Sin préstamos</em>";
                // }
                // Fin para prestamos de cada libros
                list.innerHTML += `
                            <p style='font-weight: bold'>
                                ${book.id} - ${book.nombre} (${book.autor})
                                <button  class="btn btn-danger" onclick="deleteBook(${book.id})">Eliminar</button>
                               
                            </p>
                        `;
            });
        })
        .catch(error => console.error("Error al obtener libros:", error));
}

function createBook() {
    //const idlibro = document.getElementById("idlibro").value;
    const nombre = document.getElementById("nombre").value;
    const autor = document.getElementById("autor").value;

    axios.post(api, { nombre, autor })
        .then(() => {
            message.style.visibility = 'visible'
            message.innerHTML = "Libro Guardado correctamente...";
            message.classList.remove('alert-secondary');
            message.classList.add('alert-success');
            getBooks()
        })
        .catch(error => console.error("Error al agregar libro:", error));
}

function updateBook(id) {
    const nombre = document.getElementById("nombre").value;
    const autor = document.getElementById("autor").value;

    axios.put(`${api}/${id}`, { nombre, autor })
        .then(() => {
            message.style.visibility = 'visible'
            message.innerHTML = "Libro Actaulizado correctamente...";
            message.classList.remove('alert-danger');
            message.classList.add('alert-success');
            getBooks()
        })
        .catch(error => console.error("Error al agregar libro:", error));
}

function deleteBook(id) {
    if (confirm(`¿Estás seguro de que quieres eliminar este libro con id ${id}?`)) {
        axios.delete(`${api}/${id}`)
            .then(() => {
                message.style.visibility = 'visible'
                message.innerHTML = "Libro ELIMINADO correctamente";
                message.classList.remove('alert-secondary');
                message.classList.add('alert-success');
                getBooks()
            })
            .catch(error => {
                console.error("El libro tiene Préstamos. No se puede borrar", error)
                message.style.visibility = 'visible'
                message.innerHTML = "El libro tiene Préstamos. No se puede borrar";
                message.classList.remove('alert-secondary');
                message.classList.add('alert-danger');
            });
    }
}

function searchBook(id) {
    axios.get(`${api}/${id}`)
        .then(response => {
            document.getElementById("nombre").value = response.data.nombre;
            document.getElementById("autor").value = response.data.autor;

        })
        .catch(() => {
            message.style.visibility = 'visible'
            message.innerHTML = "Id del libro no EXISTE. Inténtelo con otro...";
            message.classList.remove('alert-secondary');
            message.classList.add('alert-danger');
        })

}
// Cargar los libros al inicio
getBooks();
//<div style="margin-left:50px">Préstamos: ${loansHtml}</div>
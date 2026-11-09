import './style.css'
import Books from './model/books.class.js'
import Users from './model/users.class.js'
import Modules from './model/modules.class.js'
import logo from './assets/logoBatoi.png'

document.querySelector('#app').innerHTML = `
<div>
<h1>BatoiBooks</h1>
<img src="${logo}" alt="Logo BatoiBooks">
<p>Abre la consola para ver el resultado</p>
<nav>
  <ul>
    <li><a href="#list">Ver Libros</a></li>
    <li><a href="#form">Añadir Libro</a></li>
    <li><a href="#about">Acerca de...</a></li>
  </ul>
</nav>

<div id="messages"></div>
<div id="list"></div>

<div id="remove">
    <label for="id-remove">Id del libro a eliminar:</label>
    <input id="id-remove" name="id-remove">
    <button type="button" id="remove-btn">Eliminar</button>
</div>

<div id="form">
    <form id="bookForm">
        <div>
            <label for="moduleCode">moduleCode:</label>
            <select id="moduleCode" name="moduleCode" required>
                <option value="">-- Selecciona un módulo --</option>
            </select>
        </div>

        <div>
            <label for="publisher">publisher:</label>
            <input id="publisher" name="publisher" required>
        </div>

        <div>
            <label for="price">price:</label>
            <input type="number" id="price" name="price" min="0" step="0.01" required>
        </div>

        <div>
            <label for="pages">pages:</label>
            <input type="number" id="pages" name="pages" min="1" required>
        </div>

        <div>
            <label>status:</label>
            <input type="radio" id="new" name="status" value="new" required>new
            <input type="radio" id="good" name="status" value="good">good
            <input type="radio" id="used" name="status" value="used">used
            <input type="radio" id="bad" name="status" value="bad">bad
            <input type="radio" id="digital" name="status" value="digital">digital
        </div>

        <div>
            <label for="photo">photo:</label>
            <input id="photo" name="photo">
        </div>

        <div>
            <label for="comments">comments:</label>
            <input id="comments" name="comments">
        </div>

        <button type="submit">Guardar</button>
        <button type="reset">Reset</button>
    </form>
</div>

<div id="about">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
</div>

<footer>Batoibooks Daniel Seguí</footer>
</div>
`

const USER_ID = 2

document.addEventListener('DOMContentLoaded', async () => {
    let books
    let modules
    const formulario = document.getElementById('bookForm')
    
    try {
        books = new Books()
        await books.fetchAll()

        modules = new Modules()
        await modules.fetchAll()

        books.data.forEach(book => renderBook(book))

        modules.data.forEach(module => renderOptionsModule(module))

        formulario.addEventListener('submit', addBookForm)
        document.getElementById('remove-btn').addEventListener('click', removeBookForm)
    
    } catch (error) {
        showMessage('Error al cargar los datos del servidor', 'danger')
    }
    

    function renderBook(book) {
        const listaLibros = document.getElementById('list')

        const bookUI = document.createElement('div')
        bookUI.className = 'card'
        bookUI.dataset.id = book.id

        const modulo = modules.data.find(module => module.code === book.moduleCode)

        const nombreModulo = modulo ? modulo.cliteral : book.moduleCode

        let venta = ''

        if (book.soldDate) {
            venta = `Vendido el ${book.soldDate}`
        } else {
            venta = 'En venta'
        }

        bookUI.innerHTML = `
            <img src="${book.photo}" alt="Libro: ${book.id}">
            <div>
                <h3>${nombreModulo} (${book.id})</h3>
                <h4>${book.publisher}</h4>
                <p>${book.pages} páginas</p>
                <p>Estado: ${book.status}</p>
                <p>${venta}</p>
                <p>${book.comments}</p>
                <h4>${book.price} €</h4>
            </div>
        `

        listaLibros.append(bookUI)
    }

    function renderOptionsModule(module) {
        const modulos = document.getElementById('moduleCode')
        const options = document.createElement('option')

        options.value = module.code
        options.textContent = module.cliteral

        modulos.append(options)
    }

    async function addBookForm(event) {
        event.preventDefault()

        try {
            const publisher = document.getElementById('publisher').value
            const price = Number(document.getElementById('price').value)
            const moduleCode = document.getElementById('moduleCode').value
            const pages = Number(document.getElementById('pages').value)
            const photo = document.getElementById('photo').value
            const comments = document.getElementById('comments').value

            const status = document.querySelector('input[name="status"]:checked').value

            const nuevoLibro = await books.addBook({
                publisher,
                price,
                moduleCode,
                pages,
                status,
                photo,
                comments,
                userId: USER_ID,
                soldDate: ''
            })

            renderBook(nuevoLibro)

            showMessage('Libro añadido correctamente', 'info')

            formulario.reset()

        } catch (error) {
            showMessage('Error al añadir el libro', 'danger')
        }
    }

    async function removeBookForm(event){
        event.preventDefault()

        try {
            const idInput = document.getElementById('id-remove').value

            if (idInput.trim() === '') {
                showMessage('Debes indicar el ID del libro', 'danger')
                return
            }

            const id = Number(idInput)

            await books.removeBook(id)
            document.querySelector(`[data-id="${id}"]`).remove()

            showMessage('Libro eliminado correctamente', 'info')

            document.getElementById('id-remove').value = ''
            
        } catch(error){
            showMessage('Error al eliminar el libro', 'danger')
        }
    }

    function showMessage(message, type) {
        const messages = document.getElementById('messages')

        const alert = document.createElement('div')
        alert.className = `alert alert-${type}`
        alert.setAttribute('role', 'alert')

        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" aria-label="Cerrar">x</button>
        `

        messages.append(alert)

        const closeButton = alert.querySelector('.btn-close')

        closeButton.addEventListener('click', () => {
            alert.remove()
        })

        if (type === 'info') {
            setTimeout(() => {
                alert.remove()
            }, 3000)
        }
    }
})


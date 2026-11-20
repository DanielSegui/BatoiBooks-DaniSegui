import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './style.css'
import logo from './assets/logoBatoi.png'
import Controller from './controller/controller.class.js'


document.querySelector('#app').innerHTML = `
<div>
    <header>
        <h1>BatoiBooks</h1>
        <img src="${logo}" alt="Logo BatoiBooks">
        <p>Abre la consola para ver el resultado</p>
        <span id="cart-count">0</span>
    </header>

    <nav>
        <ul>
            <li><a href="#list">Ver Libros</a></li>
            <li><a href="#form" id="addBookLink">Añadir Libro</a></li>
            <li><a href="#about">Acerca de...</a></li>
        </ul>
    </nav>

    <div id="messages"></div>

    <main>
        <div id="list"></div>

        <div id="form" class="hidden">
            <h2>Añadir libro</h2>

            <form id="bookForm" novalidate>
                <div id="book-id-container" class="hidden">
                    <label for="id">ID:</label>
                    <input type="text" id="id" name="id" readonly>
                </div>

                <div>
                    <label for="moduleCode">moduleCode:</label>
                    <select id="moduleCode" name="moduleCode" required>
                        <option value="">-- Selecciona un módulo --</option>
                    </select>
                    <small id="moduleCode-error"></small>
                </div>

                <div>
                    <label for="publisher">publisher:</label>
                    <input id="publisher" name="publisher" required>
                    <br>
                    <small id="publisher-error"></small>
                </div>

                <div>
                    <label for="price">price:</label>
                    <input type="number" id="price" name="price" min="0" step="0.01" required>
                    <br>
                    <small id="price-error"></small>
                </div>

                <div>
                    <label for="pages">pages:</label>
                    <input type="number" id="pages" name="pages" min="1" step="1" required>
                    <br>
                    <small id="pages-error"></small>
                </div>

                <div>
                    <label>status:</label>
                    <input type="radio" id="new" name="status" value="new" required>new
                    <input type="radio" id="good" name="status" value="good">good
                    <input type="radio" id="used" name="status" value="used">used
                    <input type="radio" id="bad" name="status" value="bad">bad
                    <input type="radio" id="digital" name="status" value="digital">digital
                    <br>
                    <small id="status-error"></small>
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

        <div id="about" class="hidden">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </div>

        <div id="not-found" class="hidden">
            <h2>Página no encontrada</h2>
            <p>La página que buscas no existe.</p>
            <a href="#list">Volver a los libros</a>
        </div>
    </main>

    <footer>Batoibooks Daniel Seguí</footer>
</div>
`

document.addEventListener('DOMContentLoaded', async () => {
    const controller = new Controller()
    await controller.init()
})


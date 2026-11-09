import './style.css'
import logo from './assets/logoBatoi.png'
import Controller from './controller/controller.class.js'

document.querySelector('#app').innerHTML = `
<div>
<header>
    <h1>BatoiBooks</h1>
    <img src="${logo}" alt="Logo BatoiBooks">
    <p>Abre la consola para ver el resultado</p>
</header>
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

document.addEventListener('DOMContentLoaded', async () => {
    const controller = new Controller()
    await controller.init()
})


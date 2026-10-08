import './style.css'
import data from '../src/services/datos.js'
import Books from './model/books.class.js'
import Users from './model/users.class.js'
import Modules from './model/modules.class.js'

document.querySelector('#app').innerHTML = `
<div>
<h1>BatoiBooks</h1>
<p>Abre la consola para ver el resultado</p>
</div>
`

const books = new Books()
const users = new Users()
const modules = new Modules()

books.populate(data.books)
users.populate(data.users)
modules.populate(data.modules)

console.log("Libros del módulo 5021:")
console.log(books.booksFromModule("5021"))

console.log("Libros en buen estado:")
console.log(books.booksWithStatus("good"))

console.log("Libros incrementando su precio un 10%")
console.log(books.incrementPriceOfBooks(0.10))
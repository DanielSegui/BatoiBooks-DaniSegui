import './style.css'
import * as functions from './functions.js'
import data from '../src/services/datos.js'
export default data

document.querySelector('#app').innerHTML = `
<div>
<h1>BatoiBooks</h1>
<p>Abre la consola para ver el resultado</p>
</div>
`

//Todas las comprobaciones
console.log(functions.getBookById(data.books, 1))
console.log(functions.getBookIndexById(data.books, 7))
console.log(functions.getUserById(data.users, 3))
console.log(functions.getUserIndexById(data.users, 3))
console.log(functions.getUserByNickName(data.users, "Juan"))
console.log(functions.getModuleByCode(data.modules, "0012"))
console.log(functions.booksFromUser(data.books, 4))
console.log(functions.booksFromModule(data.books, "5025"))
console.log(functions.booksCheeperThan(data.books, 16))
console.log(functions.booksWithStatus(data.books, "new"))
console.log(functions.averagePriceOfBooks(data.books))
console.log(functions.booksOfTypeNotes(data.books))
console.log(functions.bookExists(data.books, 3, "5021"))
console.log(functions.booksNotSold(data.books))
console.log(functions.incrementPriceOfBooks(data.books, 0.10))


//Solo comprobaciones que nos pides en el enunciado
console.log(functions.booksFromUser(data.books, 4))
console.log(functions.booksWithStatus(functions.booksFromModule(data.books, "5021"),"good"))
console.log(functions.incrementPriceOfBooks(data.books, 0.10))

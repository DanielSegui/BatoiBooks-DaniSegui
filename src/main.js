import './style.css'
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

try {
await books.fetchAll()
await users.fetchAll()
await modules.fetchAll()

console.log('Hay ', books.data.length, ' libros')
console.log('Hay ', users.data.length, ' usuarios')
console.log('Hay ', modules.data.length, ' modulos')

const usuario = await users.addUser({
    nick: 'prueba',
    email: 'prueba@example.com',
    password: '1234'
})

console.log(usuario)
console.log('La cantidad de usuarios después de haber añadido uno nuevo es de:', users.data.length)

await users.removeUser(usuario.id)

console.log('Usuarios en memoria:', users.data.length)

} catch(error){
    console.error('Ha ocurrido un error:', error)
}


import Books from '../model/books.class.js'
import Modules from '../model/modules.class.js'
import View from '../view/view.class.js'

const USER_ID = 2

export default class Controller {
    constructor() {
        this.books = new Books()
        this.modules = new Modules()
        this.view = new View()
    }

    async init() {
        try {
            await this.books.fetchAll()
            await this.modules.fetchAll()

            this.books.data.forEach(book => {
                const module = this.modules.data.find(
                    module => module.code === book.moduleCode
                )

                this.view.renderBook(book, module)
            })

            this.modules.data.forEach(module => {
                this.view.renderOptionsModule(module)
            })

            this.view.bindEvents(
                this.addBook.bind(this),
                this.removeBook.bind(this)
            )

        } catch (error) {
            this.view.showMessage(
                'Error al cargar los datos del servidor',
                'danger'
            )
        }
    }

    async addBook(bookData) {
        try {
            const nuevoLibro = await this.books.addBook({
                ...bookData,
                userId: USER_ID,
                soldDate: ''
            })

            const module = this.modules.data.find(
                module => module.code === nuevoLibro.moduleCode
            )

            this.view.renderBook(nuevoLibro, module)
            this.view.showMessage('Libro añadido correctamente', 'info')
            this.view.resetForm()

        } catch (error) {
            this.view.showMessage('Error al añadir el libro', 'danger')
        }
    }

    async removeBook(idInput) {
        try {
            if (idInput.trim() === '') {
                this.view.showMessage(
                    'Debes indicar el ID del libro',
                    'danger'
                )
                return
            }

            const id = Number(idInput)

            await this.books.removeBook(id)

            this.view.removeBookCard(id)
            this.view.showMessage('Libro eliminado correctamente', 'info')
            this.view.clearRemoveInput()

        } catch (error) {
            this.view.showMessage('Error al eliminar el libro', 'danger')
        }
    }
}

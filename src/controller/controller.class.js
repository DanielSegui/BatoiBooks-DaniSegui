
import Books from '../model/books.class.js'
import Modules from '../model/modules.class.js'
import View from '../view/view.class.js'
import Cart from '../model/cart.class.js'

const USER_ID = 2

export default class Controller {
    constructor() {
        this.books = new Books()
        this.modules = new Modules()
        this.view = new View()
        this.cart = new Cart()
    }

    async init() {
        try {
            await this.books.fetchAll()
            await this.modules.fetchAll()

            this.books.data.forEach(book => {
                const module = this.modules.data.find(
                    module => module.code === book.moduleCode
                )

                this.view.renderBook(book, module, USER_ID)
            })

            this.modules.data.forEach(module => {
                this.view.renderOptionsModule(module)
            })
            
            this.view.bindEvents(
                this.saveBook.bind(this),
                this.startEditBook.bind(this),
                this.removeBook.bind(this),
                this.addToCart.bind(this),
                this.checkDuplicateBook.bind(this)
            )

            window.addEventListener('hashchange', () => {
                this.handleNavigation()
            })

            this.handleNavigation()

        } catch (error) {
            console.error(error)
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

            this.view.renderBook(nuevoLibro, module, USER_ID)
            this.view.showMessage('Libro añadido correctamente', 'info')
            this.view.resetForm()
            window.location.hash = '#list'

        } catch (error) {
            this.view.showMessage('Error al añadir el libro', 'danger')
        }
    }

    async removeBook(idInput) {
        try {
            const id = Number(idInput)

            const book = this.books.data.find(book => book.id === id)

            if (!book) {
                this.view.showMessage('No se ha encontrado el libro', 'danger')
                return
            }

            if (book.userId !== USER_ID) {
                this.view.showMessage('No puedes borrar este libro', 'danger')
                return
            }

            const module = this.modules.data.find(
                module => module.code === book.moduleCode
            )

            if (!module) {
                this.view.showMessage('No se ha encontrado el módulo', 'danger')
                return
            }

            const respuesta = confirm(
                `¿Quieres borrar el libro ${id} del módulo ${module.cliteral}?`
            )

            if (respuesta) {
                await this.books.removeBook(id)
                this.view.removeBookCard(id)
                this.view.showMessage('Libro eliminado correctamente', 'info')
            }

        } catch (error) {
            this.view.showMessage('Error al eliminar el libro', 'danger')
        }
    }

    async saveBook(bookData) {
        try {
            if (bookData.id === '') {
                const existe = await this.books.bookExists(USER_ID, bookData.moduleCode)

                if(existe) {
                    this.view.showDuplicateBookError(true)
                    return
                }

                await this.addBook(bookData)

            } else {
                await this.editBook(bookData)
            }
        } catch (error) {
            this.view.showMessage('Error al guardar el libro', 'danger')
        }
    }

    async editBook(bookData) {
        try {
            const id = Number(bookData.id)
            const libroOriginal = this.books.getBookById(id)

            if(String(libroOriginal.moduleCode) !== String(bookData.moduleCode)) {
                const existe = await this.books.bookExists(USER_ID, bookData.moduleCode)
                
                if (existe) {
                    this.view.showDuplicateBookError(true)
                    return
                }
            
            }
            const libroActualizado = {
                ...libroOriginal,
                ...bookData,
                id: id
            }
            const libroEditado = await this.books.changeBook(libroActualizado)
            const module = this.modules.data.find(module => module.code === libroEditado.moduleCode)
            this.view.removeBookCard(id)
            this.view.renderBook(libroEditado, module, USER_ID)
            this.view.showMessage('Libro actualizado correctamente', 'info')
            window.location.hash = '#list'
        } catch (error) {
            this.view.showMessage('Error al editar el libro', 'danger')
        }
    }

    async startEditBook(idInput) {
        const id = Number(idInput)
        const book = this.books.getBookById(id)

        if(book.userId !== USER_ID) {
            this.view.showMessage('No puedes editar este libro', 'danger')
            window.location.hash = '#list'
            this.view.showPage('list')
            return
        }
        
        this.view.fillForm(book)
        this.view.setEditMode()
        this.view.showPage('form')
        this.view.formulario.scrollIntoView?.({
            behavior: 'smooth',
            block: 'start'
        })
        window.location.hash = `#edit/${id}`
    }

    startAddBook() {
        this.view.resetForm()
        this.view.setAddMode()
        this.view.showPage('form')
        this.view.formulario.scrollIntoView?.({
            behavior: 'smooth',
            block: 'start'
        })
    }

    async checkDuplicateBook(moduleCode){
        try {

            const id = this.view.getEditingBookId()

            if(id !== ''){
                const libroOriginal = this.books.getBookById(Number(id))

                if(String(libroOriginal.moduleCode) === String(moduleCode)) {
                    this.view.showDuplicateBookError(false)
                    return
                }
            }

            const existe = await this.books.bookExists(USER_ID, moduleCode)

            this.view.showDuplicateBookError(existe)

        } catch (error){
            console.error('Error al comprobar el libro: ', error)

            this.view.showDuplicateBookError(false)

            this.view.showMessage(
                'No se ha podido comprobar si ya tienes un libro de este módulo',
                'danger'
            )
        }
    }

    handleNavigation(){
        const hash = window.location.hash

        if(hash === '#form') {
            this.startAddBook()
        
        } else if(hash === '#list' || hash === '') {
            this.view.showPage('list')
        
        } else if(hash === '#about') {
            this.view.showPage('about')
            this.view.pages.about.scrollIntoView?.({
                behavior: 'smooth',
                block: 'start'
            })
        
        } else if(hash.startsWith('#edit/')){
            const id = hash.split('/')[1]

            this.startEditBook(id).catch(() => {
                this.view.showPage('notFound')
            })

        } else {
            this.view.showPage('notFound')
        } 
    }

    addToCart(idInput){
        try {
            const id = Number(idInput)
            const book = this.books.getBookById(id)

            this.cart.addBook(book)

            this.view.cartCount.textContent = this.cart.getCount()

            console.log('Carrito:', this.cart.data)

            this.view.showMessage('Libro añadido al carrito', 'info')
        
        } catch (error) {
            this.view.showMessage(error.message, 'danger')
        }
    }
}

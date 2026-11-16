
export default class View {   
    constructor() {
        this.booksList = document.getElementById('list')
        this.moduleSelect = document.getElementById('moduleCode')
        this.formulario = document.getElementById('bookForm')
        this.messages = document.getElementById('messages')

        this.formTitle = document.querySelector('#form h2')
        this.bookIdContainer = document.getElementById('book-id-container')
        this.bookIdInput = document.getElementById('id')

        this.cartCount = document.getElementById('cart-count')

        this.pages = {
            list: document.getElementById('list'),
            form: document.getElementById('form'),
            about: document.getElementById('about'),
            notFound: document.getElementById('not-found')
    }
}

    renderBook(book, module, userId) {
        const card = document.createElement('div')
        card.className = 'card'
        card.dataset.id = book.id
        card.dataset.userId = book.userId
        const nombreModulo = module ? module.cliteral : book.moduleCode

        let venta = 'En venta'

        if (book.soldDate) {
            const [anio, mes, dia] = book.soldDate.split('-')
            venta = `Vendido el ${dia}/${mes}/${anio}`
        }

        const image = document.createElement('img')
        image.src = book.photo
        image.alt = `Libro: ${book.id}`

        const contenido = document.createElement('div')

        const acciones = document.createElement('div')
        acciones.className = 'acciones'

        if(book.userId === userId){
            const editButton = document.createElement('button')
            editButton.type = 'button'
            editButton.setAttribute('aria-label', 'Editar')

            const editIcon = document.createElement('span')
            editIcon.className = 'material-icons'
            editIcon.textContent = 'edit'

            editButton.append(editIcon)
            acciones.append(editButton)


            const deleteButton = document.createElement('button')
            deleteButton.type = 'button'
            deleteButton.setAttribute('aria-label', 'Borrar')

            const deleteIcon = document.createElement('span')
            deleteIcon.className = 'material-icons'
            deleteIcon.textContent = 'delete'

            deleteButton.append(deleteIcon)
            acciones.append(deleteButton)

        } else {
            const cartButton = document.createElement('button')
            cartButton.type = 'button'
            cartButton.setAttribute('aria-label', 'Añadir al carrito')

            const cartIcon = document.createElement('span')
            cartIcon.className = 'material-icons'
            cartIcon.textContent = 'add_shopping_cart'

            cartButton.append(cartIcon)
            acciones.append(cartButton)
        }

        const titulo = document.createElement('h3')
        titulo.textContent = `${nombreModulo} (${book.id})`

        const editorial = document.createElement('h4')
        editorial.textContent = book.publisher

        const paginas = document.createElement('p')
        paginas.textContent = `${book.pages} páginas`

        const estado = document.createElement('p')
        estado.textContent = `Estado: ${book.status}`

        const estadoVenta = document.createElement('p')
        estadoVenta.textContent = venta

        const comentarios = document.createElement('p')
        comentarios.textContent = book.comments

        const precio = document.createElement('h4')
        precio.textContent = `${book.price} €`

        contenido.append(
            titulo,
            editorial,
            paginas,
            estado,
            estadoVenta,
            comentarios,
            precio
        )

        card.append(image, contenido, acciones)

        this.booksList.append(card)
    }

    renderOptionsModule(module) {
        const option = document.createElement('option')

        option.value = module.code
        option.textContent = module.cliteral

        this.moduleSelect.append(option)
    }

    bindEvents(onSaveBook, onEditBook, onRemoveBook, onAddToCart) {

        this.formulario.addEventListener('submit', (event) => {
            event.preventDefault()

            if (!this.formulario.reportValidity()) {
                return
            }

            const bookData = {
                id: this.formulario.elements.id.value,
                publisher: this.formulario.elements.publisher.value,
                price: Number(this.formulario.elements.price.value),
                moduleCode: this.formulario.elements.moduleCode.value,
                pages: Number(this.formulario.elements.pages.value),
                status: this.formulario.elements.status.value,
                photo: this.formulario.elements.photo.value,
                comments: this.formulario.elements.comments.value
            }

            onSaveBook(bookData)
        })

        this.formulario.addEventListener('reset', () => {
            this.setAddMode()
            window.location.hash = '#form'
        })

        this.booksList.addEventListener('click', (event) => {

            const button = event.target.closest('button')

            if (!button) {
                return
            }

            const card = button.closest('.card')

            if (!card) {
                return
            }

            const id = card.dataset.id
            const action = button.getAttribute('aria-label')

            if (action === 'Borrar') {
                onRemoveBook(id)

            } else if (action === 'Editar') {
                onEditBook(id)

            } else if (action === 'Añadir al carrito') {
                onAddToCart(id)
            }
        })
    }

    removeBookCard(id) {
        const card = Array.from(this.booksList.children)
            .find(element => element.dataset.id === String(id))

        if (card) {
            card.remove()
        }
    }

    resetForm() {
        this.formulario.reset()
    }

    clearRemoveInput() {
        this.idRemove.value = ''
    }

    showMessage(message, type) {
        const alert = document.createElement('div')
        alert.className = `alert alert-${type}`
        alert.setAttribute('role', 'alert')

        const text = document.createElement('span')
        text.textContent = message

        const closeButton = document.createElement('button')
        closeButton.type = 'button'
        closeButton.className = 'btn-close'
        closeButton.setAttribute('aria-label', 'Cerrar')
        closeButton.textContent = 'x'

        closeButton.addEventListener('click', () => {
            alert.remove()
        })

        alert.append(text, closeButton)
        this.messages.append(alert)

        if (type === 'info') {
            setTimeout(() => {
                alert.remove()
            }, 3000)
        }
    }

    fillForm(book){
        this.formulario.elements.id.value = book.id
        this.formulario.elements.publisher.value = book.publisher
        this.formulario.elements.price.value = book.price
        this.formulario.elements.moduleCode.value = book.moduleCode
        this.formulario.elements.pages.value = book.pages
        this.formulario.elements.status.value = book.status
        this.formulario.elements.photo.value = book.photo
        this.formulario.elements.comments.value = book.comments
    }

    setEditMode() {
        this.formTitle.textContent = 'Editar libro'
        this.bookIdContainer.classList.remove('hidden')
    }

    showPage(pageName) {
        Object.values(this.pages).forEach(page => {
            page.classList.add('hidden')
        })

        this.pages[pageName].classList.remove('hidden')
    }

    setAddMode(){
        this.formTitle.textContent = 'Añadir libro'
        this.bookIdContainer.classList.add('hidden')
    }
}

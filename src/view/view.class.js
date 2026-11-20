
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

    bindEvents(onSaveBook, onEditBook, onRemoveBook, onAddToCart, onCheckDuplicateBook) {

        this.formulario.addEventListener('submit', (event) => {
            event.preventDefault()

            const publisherValido = this.validatePublisher()
            const priceValido = this.validatePrice()
            const pagesValido = this.validatePages()
            const moduleCodeValido = this.validateModuleCode()
            const statusValidado = this.validateStatus()

            if (!publisherValido || !priceValido || !pagesValido || !moduleCodeValido || !statusValidado) {
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

        const publisher = document.getElementById('publisher')

        publisher.addEventListener('input', () => {
            this.validatePublisher()
        })

        const price = document.getElementById('price')

        price.addEventListener('input', () => {
            this.validatePrice()
        })

        const pages = document.getElementById('pages')

        pages.addEventListener('input', () => {
            this.validatePages()
        })

        const moduleCode = document.getElementById('moduleCode')

        moduleCode.addEventListener('change', () => {
            moduleCode.setCustomValidity('')

            const moduloValido = this.validateModuleCode()

            if (moduloValido) {
                onCheckDuplicateBook(moduleCode.value)
            }
        })

        const statusRadios = document.querySelectorAll('input[name="status"]')

        statusRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.validateStatus()
            })
        })

        const addBookLink = document.getElementById('addBookLink')

        addBookLink.addEventListener('click', () => {
            if (window.location.hash === '#form') {
                this.clearValidationErrors()
            }
        })
    }

    showDuplicateBookError(existe){
        const moduleCode = document.getElementById('moduleCode')
        const moduleCodeError = document.getElementById('moduleCode-error')

        if (existe) {
            moduleCode.setCustomValidity('Ya tienes un libro de este módulo')
            moduleCodeError.textContent = 'Ya tienes un libro de este módulo'
        } else {
            moduleCode.setCustomValidity('')
            moduleCodeError.textContent = ''
        }
    }

    getEditingBookId(){
        return this.formulario.elements.id.value
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

    clearValidationErrors(){
        const errors = document.querySelectorAll(
            '#moduleCode-error, #publisher-error, #price-error, #pages-error, #status-error'
        )

        errors.forEach(error => {
            error.textContent = ''
        })

        const moduleCode = document.getElementById('moduleCode')
        moduleCode.setCustomValidity('')
    }
    setEditMode() {
        this.clearValidationErrors()

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
        this.clearValidationErrors()

        this.formTitle.textContent = 'Añadir libro'
        this.bookIdContainer.classList.add('hidden')
    }

    validatePublisher(){
        const publisher = document.getElementById('publisher')
        const publisherError = document.getElementById('publisher-error')

        if(publisher.validity.valueMissing){
            publisherError.textContent = "La editorial es obligatoria"
            return false
        } else {
            publisherError.textContent = ''
            return true
        }
    }

    validatePrice(){
        const price = document.getElementById('price')
        const priceError = document.getElementById('price-error')

        if(price.validity.valueMissing){
            priceError.textContent = 'El precio es obligatorio'
            return false
        } else if(price.validity.rangeUnderflow) {
            priceError.textContent = 'El precio no puede ser negativo'
            return false
        } else if(price.validity.stepMismatch) {
            priceError.textContent = 'El precio debe tener como máximo dos decimales'
            return false
        }

        priceError.textContent = ''
        return true

    }

    validatePages(){
        const pages = document.getElementById('pages')
        const pagesError = document.getElementById('pages-error')

        if(pages.validity.rangeUnderflow){
            pagesError.textContent = 'El número de páginas no puede ser inferior a 1'
            return false
        } else if(pages.validity.valueMissing){
            pagesError.textContent = 'Este campo es obligatorio'
            return false
        } else if(pages.validity.stepMismatch){
            pagesError.textContent = 'El número de páginas tiene que ser entero'
            return false
        }

        pagesError.textContent = ''
        return true
    }

    validateModuleCode(){
        const moduleCode = document.getElementById('moduleCode')
        const moduleCodeError = document.getElementById('moduleCode-error')

        if(moduleCode.validity.valueMissing){
            moduleCodeError.textContent = 'Selecciona un módulo válido'
            return false
        } else if (moduleCode.validity.customError){
            moduleCodeError.textContent = 'Ya tienes un libro de este módulo'
            return false
        }

        moduleCodeError.textContent = ''
        return true
    }

    validateStatus(){
        const status = document.getElementById('new')
        const statusError = document.getElementById('status-error')

        if(status.validity.valueMissing){
            statusError.textContent = 'Debes seleccionar un estado'
            return false
        }

        statusError.textContent = ''
        return true
    }
}


export default class View {
    constructor() {
        this.booksList = document.getElementById('list')
        this.moduleSelect = document.getElementById('moduleCode')
        this.formulario = document.getElementById('bookForm')
        this.messages = document.getElementById('messages')
        this.removeButton = document.getElementById('remove-btn')
        this.idRemove = document.getElementById('id-remove')
    }

    renderBook(book, module) {
        const card = document.createElement('div')
        card.className = 'card'
        card.dataset.id = book.id

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

        card.append(image, contenido)

        this.booksList.append(card)
    }

    renderOptionsModule(module) {
        const option = document.createElement('option')

        option.value = module.code
        option.textContent = module.cliteral

        this.moduleSelect.append(option)
    }

    bindEvents(onAddBook, onRemoveBook) {
        this.formulario.addEventListener('submit', (event) => {
            event.preventDefault()

            if (!this.formulario.reportValidity()) {
                return
            }

            const bookData = {
                publisher: this.formulario.elements.publisher.value,
                price: Number(this.formulario.elements.price.value),
                moduleCode: this.formulario.elements.moduleCode.value,
                pages: Number(this.formulario.elements.pages.value),
                status: this.formulario.elements.status.value,
                photo: this.formulario.elements.photo.value,
                comments: this.formulario.elements.comments.value
            }

            onAddBook(bookData)
        })

        this.removeButton.addEventListener('click', () => {
            onRemoveBook(this.idRemove.value)
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
}

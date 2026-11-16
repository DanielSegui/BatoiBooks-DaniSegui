export default class Cart {
    constructor() {
        this.data = []
    }

    addBook(book) {
        const libroExiste = this.data.some(item => item.id === book.id)

        if (libroExiste) {
            throw new Error('El libro ya está en el carrito')
        }

        if (book.soldDate) {
            throw new Error('El libro ya está vendido')
        }

        this.data.push({...book})
    }

    removeBook(id){
        this.data = this.data.filter(book => book.id !== id)
    }

    getCount(){
        return this.data.length
    }

    hasBook(id){
        return this.data.some(book => book.id === id)
    }
}
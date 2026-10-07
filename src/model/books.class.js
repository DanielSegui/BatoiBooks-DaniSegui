import Book from './book.class.js'
const APUNTS = "Apunts"

export default class Books {
    constructor(){
        this.data = []
    }

    populate(books){
        this.data = books.map(book => new Book(book)) 
    }

    addBook(bookData){
        const nuevoId = Math.max(...this.data.map(book => book.id)) + 1
        const nuevoLibro = new Book({
            ...bookData,
            id: nuevoId
        })

        this.data.push(nuevoLibro)
        return nuevoLibro
    }

    removeBook(bookId){
        const index = this.data.findIndex(book => book.id === bookId)

        if (index === -1){
            throw new Error()
        } 

        this.data.splice(index, 1)
    }

    changeBook(newData){
        const index = this.data.findIndex(book => book.id === newData.id)

        if(index === -1){
            throw new Error()
        }

        const newBook = new Book(newData)

        this.data[index] = newBook
        return newBook
    }

    toString(){
        return this.data.map(book => book.toString()).join("\n")
    }

    getBookById(bookId){
    const book =  this.data.find(book => book.id === bookId)
    
        if(!book){
            throw new Error();
        } 
            return book;
    }

    getBookIndexById(bookId){
    const index = this.data.findIndex(book => book.id === bookId)

        if(index === -1){
            throw new Error()
        } 
            return index;
    }

    booksFromUser(userId){
        return this.data.filter(book => book.userId === userId)
    }


    booksFromModule(moduleCode){
        return this.data.filter(book => book.moduleCode === moduleCode)
    }

    booksCheeperThan(price){
        return this.data.filter(book => book.price <= price)
    }

    booksWithStatus(status){
        return this.data.filter(book => book.status === status)
    }

    averagePriceOfBooks(){
        const sumaPrecios = this.data.reduce((total, book) => total += book.price, 0)
        const media = sumaPrecios / this.data.length
        return media.toFixed(2) + " €" 
    }

    booksOfTypeNotes(){
        return this.data.filter(book => book.publisher === APUNTS)
    }

    bookExists(userId, moduleCode){
        return this.data.some(book => book.userId === userId && book.moduleCode === moduleCode)
    }

    booksNotSold(){
        return this.data.filter(book => book.soldDate === "")
    }

    incrementPriceOfBooks(porcentaje){

        return this.data.map(book => ({
            ...book,
            price: book.price + (book.price * porcentaje)
        }))

    }

}





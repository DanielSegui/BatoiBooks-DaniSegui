import { getDBBooks, addDBBook, removeDBBook, changeDBBook } from '../services/api.js'
import Book from './book.class.js'
const APUNTS = "Apunts"

export default class Books {
    constructor(){
            this.data = []
    }

    async fetchAll(){
        const libros = await getDBBooks()
        this.data = libros.map(book => new Book(book)) 
    }

    async addBook(bookData){
        const libro = await addDBBook(bookData)
        const nuevoLibro = new Book(libro)

        this.data.push(nuevoLibro)
        return nuevoLibro
    }

    async removeBook(bookId){
        const index = this.data.findIndex(book => book.id === bookId)

        if (index === -1){
            throw new Error()
        } 
        
        await removeDBBook(bookId)
        this.data.splice(index, 1)
    }

    async changeBook(newData){
        const index = this.data.findIndex(book => book.id === newData.id)

        if(index === -1){
            throw new Error()
        }
        
        const libroEditado = await changeDBBook(newData)

        const newBook = new Book(libroEditado)

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

}





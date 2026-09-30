'use strict'

function getBookById(books, bookId){
    const book =  books.find(book => book.id === bookId)
    
    if(!book){
        throw new Error();
    } else {
        return book;
    }
}

function getBookIndexById(books, bookId){
    const index = books.findIndex(book => book.id === bookId)

    if(index === -1){
        throw new Error()
    } else {
        return index;
    }
}

function getUserById(users, userId){
    const user = users.find(user => user.id === userId)

    if(!user){
        throw new Error();
    } else {
        return user;
    }

}

function getUserIndexById(users, userId){
    const index = users.findIndex(user => user.id === userId)

    if(index === -1){
        throw new Error()
    } else {
        return index;
    }
}

function getUserByNickName(users, nickname){
    const user = users.find(user => user.nick === nickname)

    if(!user){
        throw new Error();
    } else {
        return user;
    }
}   

function getModuleByCode(modules, code){
    const module = modules.find(module => module.code === code)

    if(!module){
        throw new Error();
    } else {
        return module;
    }
}

function booksFromUser(books, userId){
    return books.filter(book => book.userId === userId)
}

function booksFromModule(books, moduleCode){
    return books.filter(book => book.moduleCode === moduleCode)
}

function booksCheeperThan(books, price){
    return books.filter(book => book.price <= price)
}

function booksWithStatus(books, status){
    return books.filter(book => book.status === status)
}

function averagePriceOfBooks(books){
    const sumaPrecios = books.reduce((total, book) => total += book.price, 0)
    const media = sumaPrecios / books.length
    return media.toFixed(2) + " €" 
}

function booksOfTypeNotes(books){
    return books.filter(book => book.publisher === "Apunts")
}

function bookExists(books, userId, moduleCode){
    return books.some(book => book.userId === userId && book.moduleCode === moduleCode)
}

function booksNotSold(books){
    return books.filter(book => book.soldDate === "")
}

function incrementPriceOfBooks(books, porcentaje){

    return books.map(book => ({
        ...book,
        price: book.price + (book.price * porcentaje)
    }))

}


export {
    getBookById, 
    getBookIndexById,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNotes,
    bookExists,
    booksNotSold,
    incrementPriceOfBooks
}

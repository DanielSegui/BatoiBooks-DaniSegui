import { describe, it, expect } from 'vitest'
import * as functions from '../src/functions'
import data from '../src/services/datos'

const books = data.books
const users = data.users
const modules = data.modules

describe('function getBookById', () => {
 it('getBookById 1 devuelve el libro con id 1', () => {
   const response = functions.getBookById(books, 1)
   expect(response.id).toBe(1)
 });

 it('getBookById 22 devuelve un error', () => {
   expect(() => functions.getBookById(books, 22)).toThrow()
 });
});

describe('function getBookIndexById', () => {
 it('getBookIndexById 1 devuelve el libro con id 1', () => {
   const response = functions.getBookIndexById(books, 1)
   expect(response).toBe(0)
 });

 it('getBookById 122 devuelve un error', () => {
   expect(() => functions.getBookIndexById(books, 122)).toThrow()
 });
});

describe('function getUserById', () => {

  it('getUserById devuelve el usuario con id 2', () => {
    const user = data.users.find(user => user.id === 2)

    expect(functions.getUserById(data.users, 2)).toEqual(user)
  })

 it('getUserById 122 devuelve un error', () => {
   expect(() => functions.getUserById(users, 122)).toThrow()
 });
});

describe('function getUserIndexById', () => {
 it('getUserIndexById 2 devuelve el libro con id 2', () => {
   const response = functions.getUserIndexById(users, 2)
   expect(response).toBe(0)
 });

 it('getUserIndexById 122 devuelve un error', () => {
   expect(() => functions.getUserIndexById(users, 122)).toThrow()
 });
});

describe('function getUserByNickname', () => {
 it('getUserNickName Juan devuelve el usuario Juan', () => {
   const response = functions.getUserByNickName(users, "Juan")
   const user = users.find(user => user.nick === "Juan")
   expect(response).toEqual(user)
 });

 it('getUserNickName Pepito devuelve un error', () => {
   expect(() => functions.getUserByNickName(users, "Pepito")).toThrow()
 });
});

describe('function getModuleByCode', () => {
 it('getModuleByCode 0012 devuelve el modulo Autonomía personal y salud infantil', () => {
   const response = functions.getModuleByCode(modules, "0012")
   const module = modules.find(module => module.code === "0012")
   expect(response).toEqual(module)
 });

 it('getModuleByCode 0000 devuelve un error', () => {
   expect(() => functions.getModuleByCode(users, "0000")).toThrow()
 });
});

describe('function booksFromUser', () => {
 it('booksFromUser 4 devuelve los libros del usuario 4', () => {
   const response = functions.booksFromUser(books, "4")
   const userBooks = books.filter(book => book.userId === "4")
   expect(response).toEqual(userBooks)
 });

 it('booksFromUser 999 devuelve un array', () => {
  const response = functions.booksFromUser(books, "999")
  expect(response).toEqual([])
 });
});

describe('function booksCheeperThan', () => {
 it('booksCheeperThan 16 devuelve los libros que valgan 16€ o menos', () => {
   const response = functions.booksCheeperThan(books, 16)
   const cheapBooks = books.filter(book => book.price <= 16)
   expect(response).toEqual(cheapBooks)
 });

 it('booksCheeperThan 0 devuelve un array vacío', () => {
  const response = functions.booksCheeperThan(books, 0)
  expect(response).toEqual([])
 });
});

describe('function booksWithStatus', () => {
 it('booksWithStatus bad devuelve los libros que su estado(status) sea bad', () => {
   const response = functions.booksWithStatus(books, "bad")
   const badStatusBooks = books.filter(book => book.status === "bad")
   expect(response).toEqual(badStatusBooks)
 });

 it('booksWithStatus hola devuelve un array vacío', () => {
  const response = functions.booksWithStatus(books, "hola")
  expect(response).toEqual([])
 });
});

describe('function averagePriceOfBooks', () => {
  it('averagePriceOfBooks devuelve la media de precio de los libros', () => {

    const response = functions.averagePriceOfBooks(books)

    const sumaPrecios = books.reduce((total, book) => total + book.price, 0)
        const media = sumaPrecios / books.length
        const expected = media.toFixed(2) + " €"

        expect(response).toBe(expected)
  })
})

describe('function booksOfTypeNotes', () => {
  it('booksOfTypeNotes devuelve los libros que son apuntes', () => {
    const response = functions.booksOfTypeNotes(books)
    const apunts = books.filter(book => book.publisher === "Apunts")
    expect(response).toEqual(apunts)
  })
})

describe('function bookExists', () => {
  it('bookExists 4, "5025" devuelve true', () => {
    const response = functions.bookExists(books, 4, "5025")
    expect(response).toBe(true)
  })

  it('bookExists 7, "9999" devuelve false' , () => {
    const response = functions.bookExists(books, 7, "9999")
    expect(response).toBe(false)
  })
})

describe('function booksNotSold', () => {
 it('booksNotSold devuelve los libros que no tienen fecha de venta', () => {
   const response = functions.booksNotSold(books)
   const apunts = books.filter(book => book.soldDate === "")
   expect(response).toEqual(apunts)
 })
});

describe('function incrementPriceOfBooks', () => {

  it('incrementPriceOfBooks aumenta un 10% el precio de los libros', () => {
    const response = functions.incrementPriceOfBooks(books, 0.10)
    expect(response[0].price).toBe(13.2)
    expect(response[1].price).toBe(82.5)

  })

  it('incrementPriceOfBooks no modifica el array original', () => {
    functions.incrementPriceOfBooks(books, 0.10)
    expect(books[0].price).toBe(12)
    expect(books[1].price).toBe(75)

  })

});
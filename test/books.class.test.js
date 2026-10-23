
 // test/books.class.test.js
//
// Esto es lo que se te entrega como ÚNICO EJEMPLO. El resto de tests los
// escribes tú, siguiendo este mismo patrón.
//
// El arranque/parada del servidor simulado (beforeAll/afterEach/afterAll) ya
// viene hecho, no lo toques.
//
// Fíjate en el test de éxito: crea una instancia de Books y llama a su
// método addBook. No sabe ni le importa cómo hayas repartido el código
// entre la clase y api.js — solo comprueba el resultado.

import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../src/mocks/server'
import Books from '../src/model/books.class'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const API_URL = 'http://localhost:3000'

const nuevoLibro = {
  userId: 2,
  moduleCode: 'ABCD',
  publisher: 'Apunts',
  price: 12,
  pages: 40,
  status: 'good'
}

describe('Books — persistencia', () => {
  it('addBook crea un libro en el servidor y lo añade a this.data', async () => {
    const books = new Books()
    const nuevo = {
      userId: 2,
      moduleCode: 'ABCD',
      publisher: 'Apunts',
      price: 12,
      pages: 40,
      status: 'good'
    }
    const response = await books.addBook(nuevo)

    // El servidor asigna la id, así que no podemos comparar "response" contra
    // "nuevo" directamente con toEqual (nuevo no tiene id). Comprobamos que
    // responde con exactamente los mismos campos que enviamos, más la id
    // que ha asignado el servidor.
    expect(response.id).toBeDefined()
    expect(response).toEqual({ ...nuevo, id: response.id })

    // Y que de verdad se ha añadido a this.data, no solo que se ha devuelto
    expect(books.data).toHaveLength(1)
    expect(books.data[0].id).toBe(response.id)
  })

  // Para simular un error en un test concreto (servidor caído, validación
  // rechazada por el backend...), sobrescribe el handler SOLO para ese test
  // con server.use(). Cada handler de src/mocks/handlers.js intercepta una
  // URL y un método concretos; server.use() añade uno nuevo que sustituye
  // temporalmente al que ya había, solo para este test — se restaura
  // automáticamente después gracias al afterEach de arriba.
  //
  // Ejemplo de la forma (no es un test completo, te falta decidir
  // qué debe hacer tu método ante este caso y comprobarlo):
  //
  // it('addBook ante un error del servidor...', async () => {
  //   const books = new Books()
  //   server.use(
  //     http.post('http://localhost:3000/books', () => {
  //       return new HttpResponse(null, { status: 500 })
  //     })
  //   )
  //   // ¿qué esperas que haga tu método aquí?
  // })

  it('fetchAll carga los libros del servidor', async () => {
    const books = new Books()

    await books.fetchAll()

    expect(books.data.length).toBeGreaterThan(0)
    expect(books.data[0].id).toBeDefined()
  })

  it('fetchAll rechaza con error 500 y mantiene data sin cambios', async () => {
    const books = new Books()
    await books.fetchAll()
    const originalData = [...books.data]

    server.use(
      http.get(`${API_URL}/books`, () =>
        new HttpResponse(null, { status: 500 })
      )
    )

    await expect(books.fetchAll()).rejects.toBeDefined()
    expect(books.data).toEqual(originalData)
  })

  it('fetchAll rechaza con error 404 y mantiene data sin cambios', async () => {
    const books = new Books()
    await books.fetchAll()
    const originalData = [...books.data]

    server.use(
      http.get(`${API_URL}/books`, () =>
        new HttpResponse(null, { status: 404 })
      )
    )

    await expect(books.fetchAll()).rejects.toBeDefined()
    expect(books.data).toEqual(originalData)
  })

  it('addBook rechaza con error 500 y mantiene data sin cambios', async () => {
    const books = new Books()
    await books.fetchAll()
    const originalData = [...books.data]

    server.use(
      http.post(`${API_URL}/books`, () =>
        new HttpResponse(null, { status: 500 })
      )
    )

    await expect(books.addBook(nuevoLibro)).rejects.toBeDefined()
    expect(books.data).toEqual(originalData)
  })

  it('addBook rechaza con error 404 y mantiene data sin cambios', async () => {
    const books = new Books()
    await books.fetchAll()
    const originalData = [...books.data]

    server.use(
      http.post(`${API_URL}/books`, () =>
        new HttpResponse(null, { status: 404 })
      )
    )

    await expect(books.addBook(nuevoLibro)).rejects.toBeDefined()
    expect(books.data).toEqual(originalData)
  })

  it('removeBook elimina un libro existente', async () => {
    const books = new Books()
    await books.fetchAll()

    const libro = books.data[0]
    const cantidadInicial = books.data.length

    await books.removeBook(libro.id)

    expect(books.data).toHaveLength(cantidadInicial - 1)
    expect(books.data.find(book => book.id === libro.id)).toBeUndefined()
  })

  it('removeBook rechaza con error 500 y mantiene data sin cambios', async () => {
    const books = new Books()
    await books.fetchAll()
    const originalData = [...books.data]
    const id = books.data[0].id

    server.use(
      http.delete(`${API_URL}/books/${id}`, () =>
        new HttpResponse(null, { status: 500 })
      )
    )

    await expect(books.removeBook(id)).rejects.toBeDefined()
    expect(books.data).toEqual(originalData)
  })

  it('removeBook rechaza con error 404 y mantiene data sin cambios', async () => {
    const books = new Books()
    await books.fetchAll()
    const originalData = [...books.data]
    const id = books.data[0].id

    server.use(
      http.delete(`${API_URL}/books/${id}`, () =>
        new HttpResponse(null, { status: 404 })
      )
    )

    await expect(books.removeBook(id)).rejects.toBeDefined()
    expect(books.data).toEqual(originalData)
  })

  it('changeBook modifica un libro existente', async () => {
    const books = new Books()
    await books.fetchAll()

    const libro = books.data[0]
    const libroModificado = {
      ...libro,
      publisher: 'Editorial modificada',
      price: 20
    }

    const resultado = await books.changeBook(libroModificado)

    expect(resultado.publisher).toBe('Editorial modificada')
    expect(resultado.price).toBe(20)
    expect(books.data.find(book => book.id === libro.id)).toEqual(resultado)
  })

  it('changeBook rechaza con error 500 y mantiene data sin cambios', async () => {
    const books = new Books()
    await books.fetchAll()
    const originalData = [...books.data]
    const libro = books.data[0]

    server.use(
      http.put(`${API_URL}/books/${libro.id}`, () =>
        new HttpResponse(null, { status: 500 })
      )
    )

    await expect(books.changeBook({
      ...libro,
      price: 99
    })).rejects.toBeDefined()

    expect(books.data).toEqual(originalData)
  })

  it('changeBook rechaza con error 404 y mantiene data sin cambios', async () => {
    const books = new Books()
    await books.fetchAll()
    const originalData = [...books.data]
    const libro = books.data[0]

    server.use(
      http.put(`${API_URL}/books/${libro.id}`, () =>
        new HttpResponse(null, { status: 404 })
      )
    )

    await expect(books.changeBook({
      ...libro,
      price: 99
    })).rejects.toBeDefined()

    expect(books.data).toEqual(originalData)
  })
})

// @vitest-environment jsdom

import { test, expect } from 'vitest'
import { loadApp, card, BOOKS } from './helpers.js'

test('la fecha de venta se muestra correctamente', async () => {
    await loadApp({
        books: [
            {
                ...BOOKS[0],
                soldDate: '2023-02-01'
            }
        ]
    })

    expect(card(1).textContent).toContain('Vendido el 01/02/2023')
})

test('se puede mostrar un libro aunque su módulo no exista', async () => {
    await loadApp({
        books: [BOOKS[0]],
        modules: []
    })

    expect(card(1)).not.toBeNull()
    expect(card(1).textContent).toContain(BOOKS[0].moduleCode)
})

test('los comentarios se muestran como texto y no como HTML', async () => {
    const comentarioMalicioso = '<img src=x onerror="alert(\'XSS\')">'

    await loadApp({
        books: [
            {
                ...BOOKS[0],
                comments: comentarioMalicioso
            }
        ]
    })

    const libro = card(1)

    expect(libro.textContent).toContain(comentarioMalicioso)
    expect(libro.querySelectorAll('img')).toHaveLength(1)
})

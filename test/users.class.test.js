
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../src/mocks/server'
import Users from '../src/model/users.class'

const API_URL = 'http://localhost:3000'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Users — persistencia', () => {

    it('fetchAll carga los usuarios del servidor', async () => {
        const users = new Users()

        await users.fetchAll()

        expect(users.data.length).toBeGreaterThan(0)
        expect(users.data[0].nick).toBeDefined()
    })

    it('fetchAll rechaza con error 500 y mantiene data sin cambios', async () => {
        const users = new Users()
        const originalData = [...users.data]

        server.use(
            http.get(`${API_URL}/users`, () =>
                new HttpResponse(null, { status: 500 })
            )
        )

        await expect(users.fetchAll()).rejects.toThrow()
        expect(users.data).toEqual(originalData)
    })

    it('fetchAll rechaza con error 404 y mantiene data sin cambios', async () => {
        const users = new Users()
        const originalData = [...users.data]

        server.use(
            http.get(`${API_URL}/users`, () =>
                new HttpResponse(null, { status: 404 })
            )
        )

        await expect(users.fetchAll()).rejects.toThrow()
        expect(users.data).toEqual(originalData)
    })

    it('addUser añade un usuario a data', async () => {
        const users = new Users()
        const userData = {
            nick: 'prueba',
            email: 'prueba@example.com',
            password: '1234'
        }

        const usuario = await users.addUser(userData)

        expect(usuario.id).toBeDefined()
        expect(usuario.nick).toBe(userData.nick)
        expect(usuario.email).toBe(userData.email)
        expect(users.data).toHaveLength(1)
        expect(users.data[0]).toEqual(usuario)
    })

    it('addUser rechaza con error 500 y mantiene data sin cambios', async () => {
        const users = new Users()
        await users.fetchAll()
        const originalData = [...users.data]

        server.use(
            http.post(`${API_URL}/users`, () =>
                new HttpResponse(null, { status: 500 })
            )
        )

        await expect(users.addUser({
            nick: 'prueba',
            email: 'prueba@example.com',
            password: '1234'
        })).rejects.toThrow()

        expect(users.data).toEqual(originalData)
    })

    it('addUser rechaza con error 404 y mantiene data sin cambios', async () => {
        const users = new Users()
        await users.fetchAll()
        const originalData = [...users.data]

        server.use(
            http.post(`${API_URL}/users`, () =>
                new HttpResponse(null, { status: 404 })
            )
        )

        await expect(users.addUser({
            nick: 'prueba',
            email: 'prueba@example.com',
            password: '1234'
        })).rejects.toThrow()

        expect(users.data).toEqual(originalData)
    })

    it('removeUser elimina un usuario existente', async () => {
        const users = new Users()
        await users.fetchAll()

        const usuario = users.data[0]
        const cantidadInicial = users.data.length

        await users.removeUser(usuario.id)

        expect(users.data).toHaveLength(cantidadInicial - 1)
        expect(users.data.find(user => user.id === usuario.id)).toBeUndefined()
    })

    it('removeUser rechaza con error 500 y mantiene data sin cambios', async () => {
        const users = new Users()
        await users.fetchAll()
        const originalData = [...users.data]
        const userId = users.data[0].id

        server.use(
            http.delete(`${API_URL}/users/${userId}`, () =>
                new HttpResponse(null, { status: 500 })
            )
        )

        await expect(users.removeUser(userId)).rejects.toThrow()
        expect(users.data).toEqual(originalData)
    })

    it('removeUser rechaza con error 404 y mantiene data sin cambios', async () => {
        const users = new Users()
        await users.fetchAll()
        const originalData = [...users.data]
        const userId = users.data[0].id

        server.use(
            http.delete(`${API_URL}/users/${userId}`, () =>
                new HttpResponse(null, { status: 404 })
            )
        )

        await expect(users.removeUser(userId)).rejects.toThrow()
        expect(users.data).toEqual(originalData)
    })

    it('changeUser modifica un usuario existente', async () => {
        const users = new Users()
        await users.fetchAll()

        const usuario = users.data[0]
        const userData = {
            id: usuario.id,
            nick: 'nickModificado',
            email: 'modificado@example.com',
            password: '5678'
        }

        const usuarioEditado = await users.changeUser(userData)

        expect(usuarioEditado.nick).toBe(userData.nick)
        expect(usuarioEditado.email).toBe(userData.email)
        expect(users.data[0]).toEqual(usuarioEditado)
    })

    it('changeUser rechaza con error 500 y mantiene data sin cambios', async () => {
        const users = new Users()
        await users.fetchAll()
        const originalData = [...users.data]
        const usuario = users.data[0]

        server.use(
            http.put(`${API_URL}/users/${usuario.id}`, () =>
                new HttpResponse(null, { status: 500 })
            )
        )

        await expect(users.changeUser({
            id: usuario.id,
            nick: 'modificado',
            email: 'modificado@example.com',
            password: '5678'
        })).rejects.toThrow()

        expect(users.data).toEqual(originalData)
    })

    it('changeUser rechaza con error 404 y mantiene data sin cambios', async () => {
        const users = new Users()
        await users.fetchAll()
        const originalData = [...users.data]
        const usuario = users.data[0]

        server.use(
            http.put(`${API_URL}/users/${usuario.id}`, () =>
                new HttpResponse(null, { status: 404 })
            )
        )

        await expect(users.changeUser({
            id: usuario.id,
            nick: 'modificado',
            email: 'modificado@example.com',
            password: '5678'
        })).rejects.toThrow()

        expect(users.data).toEqual(originalData)
    })

})

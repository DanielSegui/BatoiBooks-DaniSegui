
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../src/mocks/server'
import Modules from '../src/model/modules.class'

const API_URL = 'http://localhost:3000'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Modules — persistencia', () => {

    it('fetchAll carga los módulos del servidor', async () => {
        const modules = new Modules()

        await modules.fetchAll()

        expect(modules.data.length).toBeGreaterThan(0)
        expect(modules.data[0].code).toBeDefined()
    })

    
it('fetchAll rechaza con error 500 y mantiene data sin cambios', async () => {
    const modules = new Modules()
    await modules.fetchAll()
    const originalData = [...modules.data]

    server.use(
        http.get(`${API_URL}/modules`, () =>
            new HttpResponse(null, { status: 500 })
        )
    )

    await expect(modules.fetchAll()).rejects.toBeDefined()
    expect(modules.data).toEqual(originalData)
})

    it('fetchAll rechaza con error 404 y mantiene data sin cambios', async () => {
        const modules = new Modules()
        await modules.fetchAll()
        const originalData = [...modules.data]

        server.use(
            http.get(`${API_URL}/modules`, () =>
                new HttpResponse(null, { status: 404 })
            )
        )

        await expect(modules.fetchAll()).rejects.toBeDefined()
        expect(modules.data).toEqual(originalData)
    })


    it('toString devuelve los módulos como texto', async () => {
        const modules = new Modules()

        await modules.fetchAll()

        const resultado = modules.toString()

        expect(typeof resultado).toBe('string')
        expect(resultado.length).toBeGreaterThan(0)
    })

    it('getModuleByCode devuelve el módulo correcto', async () => {
        const modules = new Modules()

        await modules.fetchAll()

        const modulo = modules.getModuleByCode(modules.data[0].code)

        expect(modulo).toEqual(modules.data[0])
    })

    it('getModuleByCode lanza un error si el módulo no existe', async () => {
        const modules = new Modules()

        await modules.fetchAll()

        expect(() => modules.getModuleByCode('NO_EXISTE')).toThrow()
    })

})

import { describe, test, expect } from 'vitest'
import Modules from '../src/model/modules.class'
import Module from '../src/model/module.class'

const modulesFixture = [
    {
        code: '0012',
        cliteral: 'DAW',
        vliteral: 'Desenvolupament d\'Aplicacions Web',
        courseId: 1
    },
    {
        code: '0612',
        cliteral: 'DWEC',
        vliteral: 'Desenvolupament Web en Entorn Client',
        courseId: 2
    }
]

describe('Clase Modules', () => {

    test('constructor crea una colección vacía', () => {
        const newModules = new Modules()

        expect(newModules).toBeInstanceOf(Modules)
        expect(newModules.data).toEqual([])
    })

    test('populate crea los módulos', () => {
        const newModules = new Modules()

        newModules.populate(modulesFixture)

        expect(newModules.data).toHaveLength(2)
        expect(newModules.data[0]).toBeInstanceOf(Module)
        expect(newModules.data[1]).toBeInstanceOf(Module)
    })

    test('toString pinta correctamente los módulos', () => {
        const newModules = new Modules()

        newModules.populate(modulesFixture)

        const texto = newModules.toString()

        expect(texto).toContain('0012')
        expect(texto).toContain('DAW')
        expect(texto).toContain('0612')
        expect(texto).toContain('DWEC')
    })

    test('getModuleByCode devuelve el módulo correcto', () => {
        const newModules = new Modules()

        newModules.populate(modulesFixture)

        const response = newModules.getModuleByCode('0012')

        expect(response).toBeInstanceOf(Module)
        expect(response.code).toBe('0012')
        expect(response.cliteral).toBe('DAW')
    })

    test('getModuleByCode lanza un error si el módulo no existe', () => {
        const newModules = new Modules()

        newModules.populate(modulesFixture)

        expect(() => newModules.getModuleByCode('9999')).toThrow()
    })
})
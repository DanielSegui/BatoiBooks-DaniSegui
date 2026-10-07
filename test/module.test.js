import { describe, test, expect } from 'vitest'
import Module from '../src/model/module.class'

const moduleFixture = [
  { code: "1825", cliteral: 'Jardinería', vliteral: 'Jardineria', courseId: "85"},
  { code: "1827", cliteral: 'Carpintería', vliteral: 'Carpintería', courseId: "87"},
]

describe('Clase Module', () => {
  test('constructor crea un módulo', () => {
    const newModule = new Module(
    moduleFixture[0].code,
    moduleFixture[0].cliteral,
    moduleFixture[0].vliteral,
    moduleFixture[0].courseId
)
    expect(newModule).toBeInstanceOf(Module)
    expect(newModule).toEqual(moduleFixture[0])
  });

  test('toString pinta correctamente el modulo', () => {
    const newModule = new Module(
    moduleFixture[0].code,
    moduleFixture[0].cliteral,
    moduleFixture[0].vliteral,
    moduleFixture[0].courseId
)
    const texto = newModule.toString()
    expect(texto).toContain(moduleFixture[0].code);
    expect(texto).toContain(moduleFixture[0].cliteral);
    expect(texto).toContain(moduleFixture[0].vliteral);
  });
})
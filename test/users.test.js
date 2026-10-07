import { describe, test, expect } from 'vitest'
import Users from '../src/model/users.class'
import User from '../src/model/user.class'

const usersFixture = [
  { id: 20, nick: 'Mauro', email: 'mauro@gmail.com', password: "1234" },
  { id: 22, nick: 'Jordi', email: 'jordi@gmail.com', password: "1234" },
]

describe('Clase Users', () => {

  test('constructor crea una colección vacía', () => {
    const newUsers = new Users()

    expect(newUsers).toBeInstanceOf(Users)
    expect(newUsers.data).toEqual([])
  });

  test('populate crea los usuarios', () => {
    const newUsers = new Users()

    newUsers.populate(usersFixture)

    expect(newUsers.data).toHaveLength(2)
    expect(newUsers.data[0]).toBeInstanceOf(User)
    expect(newUsers.data[1]).toBeInstanceOf(User)
  });

  test('addUser añade un usuario', () => {
    const newUsers = new Users()
    newUsers.populate(usersFixture)

    const datosNuevoUsuario = {
      nick: 'Carlos',
      email: 'carlos@gmail.com',
      password: '5678'
    }

    const newUser = newUsers.addUser(datosNuevoUsuario)

    expect(newUser).toBeInstanceOf(User)
    expect(newUsers.data).toHaveLength(3)
    expect(newUser.id).toBe(23)
  });

  test('addUser no repite un id existente', () => {
    const newUsers = new Users()
    newUsers.populate(usersFixture)

    const datosNuevoUsuario = {
      id: 20,
      nick: 'Carlos',
      email: 'carlos@gmail.com',
      password: '5678'
    }

    const newUser = newUsers.addUser(datosNuevoUsuario)

    expect(newUsers.data).toHaveLength(3)
    expect(newUser.id).toBe(23)
  });

  test('removeUser elimina un usuario', () => {
    const newUsers = new Users()
    newUsers.populate(usersFixture)

    newUsers.removeUser(20)

    expect(newUsers.data).toHaveLength(1)
    expect(newUsers.data[0].id).toBe(22)
  });

  test('removeUser lanza un error si el usuario no existe', () => {
    const newUsers = new Users()
    newUsers.populate(usersFixture)

    const cantidadAntes = newUsers.data.length

    expect(() => newUsers.removeUser(999)).toThrow()
    expect(newUsers.data).toHaveLength(cantidadAntes)
  });

  test('changeUser modifica un usuario', () => {
    const newUsers = new Users()
    newUsers.populate(usersFixture)

    const newData = {
      id: 20,
      nick: 'MauroNuevo',
      email: 'mauronuevo@gmail.com',
      password: '5678'
    }

    const response = newUsers.changeUser(newData)

    expect(response).toBeInstanceOf(User)
    expect(response.id).toBe(20)
    expect(response.nick).toBe('MauroNuevo')
    expect(response.email).toBe('mauronuevo@gmail.com')
    expect(newUsers.data[0].nick).toBe('MauroNuevo')
  });

  test('changeUser lanza un error si el usuario no existe', () => {
    const newUsers = new Users()
    newUsers.populate(usersFixture)

    const newData = {
      id: 999,
      nick: 'Nuevo',
      email: 'nuevo@gmail.com',
      password: '5678'
    }

    expect(() => newUsers.changeUser(newData)).toThrow()
  });

  test('toString pinta correctamente los usuarios', () => {
    const newUsers = new Users()
    newUsers.populate(usersFixture)

    const texto = newUsers.toString()

    expect(texto).toContain('20')
    expect(texto).toContain('Mauro')
    expect(texto).toContain('22')
    expect(texto).toContain('Jordi')
  });

    test('getUserById devuelve el usuario con id 20', () => {
    const newUsers = new Users()
    newUsers.populate(usersFixture)

    const response = newUsers.getUserById(20)
    const user = newUsers.data.find(user => user.id === 20)

    expect(response).toEqual(user)
  });

  test('getUserById devuelve un error si el usuario no existe', () => {
    const newUsers = new Users()
    newUsers.populate(usersFixture)

    expect(() => newUsers.getUserById(122)).toThrow()
  });

  test('getUserIndexById devuelve el índice del usuario', () => {
    const newUsers = new Users()
    newUsers.populate(usersFixture)

    const response = newUsers.getUserIndexById(20)

    expect(response).toBe(0)
  });

  test('getUserIndexById devuelve un error si el usuario no existe', () => {
    const newUsers = new Users()
    newUsers.populate(usersFixture)

    expect(() => newUsers.getUserIndexById(122)).toThrow()
  });

  test('getUserByNickName devuelve el usuario con nick Mauro', () => {
    const newUsers = new Users()
    newUsers.populate(usersFixture)

    const response = newUsers.getUserByNickName('Mauro')
    const user = newUsers.data.find(user => user.nick === 'Mauro')

    expect(response).toEqual(user)
  });

  test('getUserByNickName devuelve un error si el nick no existe', () => {
    const newUsers = new Users()
    newUsers.populate(usersFixture)

    expect(() => newUsers.getUserByNickName('Pepito')).toThrow()
  });

})
import { describe, test, expect } from 'vitest'
import User from '../src/model/user.class'

const userFixture = [
  { id: 20, nick: 'Mauro', email: 'mauro@gmail.com', password: "1234"},
  { id: 22, nick: 'Jordi', email: 'jordi@gmail.com', password: "1234"},
]

describe('Clase User', () => {
  test('constructor crea un usuario', () => {
    const newUser = new User(
    userFixture[0].id,
    userFixture[0].nick,
    userFixture[0].email,
    userFixture[0].password
)
    expect(newUser).toBeInstanceOf(User)
    expect(newUser).toEqual(userFixture[0])
  });

  test('toString pinta correctamente el usuario', () => {
    const newUser = new User(
    userFixture[0].id,
    userFixture[0].nick,
    userFixture[0].email,
    userFixture[0].password
)
    const texto = newUser.toString()
    expect(texto).toContain(userFixture[0].id);
    expect(texto).toContain(userFixture[0].email);
    expect(texto).toContain(userFixture[0].password);
  });
})
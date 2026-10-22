import User from './user.class.js'
import { getDBUsers, addDBUser, removeDBUser, changeDBUser } from '../services/api.js'

export default class Users {
    constructor(){
        this.data = []
    }

    async fetchAll(){
        const usuarios = await getDBUsers()
        this.data = usuarios.map(user => new User(
            user.id,
            user.nick,
            user.email,
            user.password
        ))
    }

    async addUser(userData){
        const usuarios = await addDBUser(userData) 
        const nuevoUsuario = new User(
            usuarios.id,
            usuarios.nick,
            usuarios.email,
            usuarios.password
        )

        this.data.push(nuevoUsuario)
        return nuevoUsuario
    }

    async removeUser(userId){
        const index = this.data.findIndex(user => user.id === userId)

        if(index === -1){
            throw new Error()
        }

        await removeDBUser(userId)
        this.data.splice(index, 1)
    }

    async changeUser(userData){
        const index = this.data.findIndex(user => user.id === userData.id)

        if(index === -1){
            throw new Error()
        }

        const usuarioEditado = await changeDBUser(userData)
        const newUser = new User(usuarioEditado.id, usuarioEditado.nick, usuarioEditado.email, usuarioEditado.password)

        this.data[index] = newUser
        return newUser
    }

    toString(){
        return this.data.map(user => user.toString()).join("\n")
    }

    getUserById(userId){
        const user = this.data.find(user => user.id === userId)

        if(!user){
            throw new Error();
        } else {
            return user;
        }

    }

    getUserIndexById(userId){
        const index = this.data.findIndex(user => user.id === userId)

        if(index === -1){
            throw new Error()
        } else {
            return index;
        }
    }

    getUserByNickName(nickname){
        const user = this.data.find(user => user.nick === nickname)

        if(!user){
            throw new Error();
        } else {
            return user;
        }
    }   
}
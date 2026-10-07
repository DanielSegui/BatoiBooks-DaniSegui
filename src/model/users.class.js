import User from './user.class.js'


export default class Users {
    constructor(){
        this.data = []
    }

    populate(users){
        this.data = users.map(user => new User(
            user.id,
            user.nick,
            user.email,
            user.password
        ))
    }

    addUser(userData){
        const nuevoId = Math.max(...this.data.map(user => user.id)) + 1
        const nuevoUsuario = new User(
            nuevoId,
            userData.nick,
            userData.email,
            userData.password
        )

        this.data.push(nuevoUsuario)
        return nuevoUsuario
    }

    removeUser(userId){
        const index = this.data.findIndex(user => user.id === userId)

        if(index === -1){
            throw new Error()
        }

        this.data.splice(index, 1)
    }

    changeUser(userData){
        const index = this.data.findIndex(user => user.id === userData.id)

        if(index === -1){
            throw new Error()
        }

        const newUser = new User(userData.id, userData.nick, userData.email, userData.password)

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
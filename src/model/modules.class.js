import { getDBModules } from '../services/api.js'
import Module from './module.class.js'

export default class Modules {
    constructor(){
        this.data = []
    }

    async fetchAll(){
        const modulos = await getDBModules()
        this.data = modulos.map(module => new Module(
            module.code,
            module.cliteral,
            module.vliteral,
            module.courseId
        ))
    }

    toString(){
        return this.data.map(module => module.toString()).join("\n")
    }

    getModuleByCode(code){
        const module = this.data.find(module => module.code === code)

        if(!module){
            throw new Error()
        }

        return module
    }
}
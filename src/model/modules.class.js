import Module from './module.class.js'

export default class Modules {
    constructor(){
        this.data = []
    }

    populate(modules){
        this.data = modules.map(module => new Module(
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
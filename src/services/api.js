const SERVER = import.meta.env.VITE_API_URL;

async function getDBBooks(){
    const response = await fetch(SERVER + `/books`)

    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
}

async function getDBUsers() {
    const response = await fetch(SERVER + '/users')

    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
}

async function getDBModules(){
    const response = await fetch(SERVER + '/modules')

    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
}

async function addDBBook(book){
    const response = await fetch(SERVER + '/books', {
        method: 'POST',
        body: JSON.stringify(book),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    if(!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
}

async function addDBUser(user) {
    const response = await fetch(SERVER + '/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
            'Content-type': 'application/json'
        }
    })
    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
}

async function removeDBBook(id){
    const response = await fetch(SERVER + '/books/' + id, {
        method: 'DELETE'
    })
    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
}

async function removeDBUser(id) {
    const response = await fetch(SERVER + '/users/' + id, {
        method: 'DELETE'
    })
    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
}

async function changeDBBook(book){
    const response = await fetch(SERVER + '/books/' + book.id, {
        method: 'PUT',
        body: JSON.stringify(book),
        headers:{
            'Content-type' : 'application/json'
        }
    })
    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
}

async function changeDBUser(user){
    const response = await fetch(SERVER + '/users/' + user.id, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers:{
            'Content-type' : 'application/json'
        }
    })
    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
}

async function getDBBookExists(userId, moduleCode) {
    const response = await fetch(
        SERVER + `/books?userId=${userId}&moduleCode=${moduleCode}`
    )

    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }

    const data = await response.json()
    return data.length > 0
}

export {
    getDBBooks,
    getDBUsers,
    getDBModules,
    addDBBook,
    addDBUser,
    removeDBBook,
    removeDBUser,
    changeDBBook,
    changeDBUser,
    getDBBookExists
}
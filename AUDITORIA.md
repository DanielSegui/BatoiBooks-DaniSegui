# Auditoría BatoiBooks Dani

## Implementación original remove

```javascript

removeBook(bookId) {
  this.data = this.data.filter(b => b.id !== bookId)
}

```

Esta función como nos la ha dado el enunciado cumple su función de eliminar el libros del this.data creando un nuevo array excluyendo los libros que el ID coincide con bookId pero no comprueba si el libro con esa ID existe, si no existe se crea un array exactamente igual que el anterior y no da error.

## Implementación corregida remove

```javascript
removeBook(bookId){
        const index = this.data.findIndex(book => book.id === bookId)

        if (index === -1){
            throw new Error()
        }

        this.data.splice(index, 1)
}
```

Ahora lo que hace la función es primero buscar el libro y comprobar que existe si no existe lanza un error y si existe el splice() lo elimina del this.data

## Implementación original add

```javascript
addBook(bookData) {
  const newBook = new Book({ ...bookData, id: this.data.length + 1 })
  this.data.push(newBook)
  return newBook
}
```

En esta función se utiliza el this.data.length + 1 para generar la id del libro nuevo, el problema es que el número de elementos que hay en el array no tiene porque coincidir con el ID más alto, quiero decir que si tenemos libros con IDs 1, 2 y 5 por ejemplo hay 3 libros pero el de ID más alto es el 5 al hacer this.data.length + 1, como hay 3 elementos más el + 1 la nuevs iD sería 4 cuando lo que queremos es que sea el 6 porque es el último que hemos añadido. Después el push si que está bien hecho.

## Implementación corregida add

```javascript
addBook(bookData){
    const nuevoId = Math.max(...this.data.map(book => book.id)) + 1

    const nuevoLibro = new Book({
        ...bookData,
        id: nuevoId
    })

    this.data.push(nuevoLibro)
    return nuevoLibro
}
```

Aquí de esta manera buscamos el ID más alto que haya en el this.data y le sumamos 1 para que el nuevo libro tenga un ID mayor que todos los demás.

## Implementación original change

```javascript
changeBook(newData) {
  const index = this.data.findIndex(b => b.id === newData.id)
  this.data[index] = newData // newData es un objeto plano, no una instancia de Book
  return newData
}
```

El primer problema que se ve esque no se comprueba si se ha encontrado el libro. Si el libro no existe devuelve un -1 y no lanza ningun error y el segundo es que mete directamente newData dentro de this.data, newData es un objeto normal pero nosotros lo que queremos dentro del this.data es tener instancias de la clase Book por lo que hay que crear un nuevo Book con los datos del newData.

## Implementación corregida change

```javascript
changeBook(newData){
        const index = this.data.findIndex(book => book.id === newData.id)

        if(index === -1){
            throw new Error()
        }

        const newBook = new Book(newData)

        this.data[index] = newBook
        return newBook
}
```
Ahora lo que se ve es que se comprueba si existe la ID y si no existe se lanza un error, si existe se crea una nueva instancia Book con los datos del newData, this.data[index] = newBook con este codigo se sustituye el libro antiguo por el nuevo y luego con el return se devuelve el libro con los nuevos datos.
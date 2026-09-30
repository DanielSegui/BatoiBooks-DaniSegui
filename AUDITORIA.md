# Auditoría BatoiBooks Dani

## booksNotSold

```javascript
function booksNotSold(books) {

 let result = []

 for (let book of books) {

 if (book.soldDate == null) {

 result.push(book)

 }

 }

 return result

}
```

La función esta está mal ya que no usa functional programming utilizando así un bucle 'for of', además comprueba si soldDate == null, pero en el archivo datos.js se puede ver que los libros que aun no se han vendido tienen el soldDate como una cadena vacía  "" en lugar de 'null'.

Versión correcta de booksNotSold

```javascript
    function booksNotSold(books){
        return books.filter(book => book.soldDate === "")
    }
```

## Versión de incrementPriceOfBooks que modifica el array original

```javascript
    function incrementPriceOfBooks(books, porcentaje){
        books.forEach(book => {
            book.price = book.price + (book.price * porcentaje)
        })

        return books
    }
```

La versión que he utilizado en el propio ejercicio usando el 'map()' para crear un array sin modificar el array original es mejor ya que así se evita modificar sin querer los datos originales.


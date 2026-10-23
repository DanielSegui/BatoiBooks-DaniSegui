# Auditoría A: Datos en memoria o consultas al servidor

## 1. Trabajar con los datos en memoria (`this.data`)

Una opción es cargar los datos del servidor y guardarlos en `this.data`. Así podemos trabajar con ellos sin tener que hacer una petición al servidor cada vez que queremos consultar algo.

**Ventajas:**
- Las consultas son más rápidas.
- No tenemos que hacer tantas peticiones al servidor.
- Podemos utilizar los datos que ya tenemos cargados para hacer búsquedas y filtros.

**Desventajas:**
- Si los datos cambian en el servidor, los que tenemos guardados pueden quedarse desactualizados.
- Primero tenemos que cargar los datos con `fetchAll()`.

## 2. Consultar los datos al servidor cada vez

Otra opción es hacer una petición al servidor cada vez que necesitamos consultar algún dato.

**Ventajas:**
- Podemos obtener los datos actualizados del servidor.
- No dependemos de tener una copia de los datos guardada en memoria.

**Desventajas:**
- Las consultas pueden tardar más porque tenemos que hacer peticiones al servidor.
- Hacemos más peticiones.
- Si el servidor falla, podemos tener problemas para obtener los datos.

## 3. Qué he elegido en mi práctica

En mi práctica he elegido trabajar con los datos guardados en `this.data`.

Para hacerlo, he creado el método `fetchAll()` en cada una de las tres clases: `Books`, `Users` y `Modules`. Cada método obtiene los datos que le corresponden del servidor y los guarda en su propia colección.

En mi `main.js` llamo a los tres métodos para cargar los libros, los usuarios y los módulos al principio. Después, los demás métodos trabajan con los datos que ya están guardados en memoria.

- **Books:** utilizo métodos como `booksFromUser()` y `booksFromModule()` para buscar libros según el usuario o el módulo.
- **Users:** utilizo métodos como `getUserById()` y `getUserByNickName()` para buscar usuarios.
- **Modules:** utilizo `getModuleByCode()` para buscar un módulo por su código.

Además, cuando añado, elimino o modifico un libro o un usuario, actualizo también `this.data` si la petición al servidor funciona correctamente.

He elegido esta opción porque me parece más sencilla y así no tengo que hacer una petición al servidor cada vez que quiero consultar algún dato. La desventaja es que, si alguien cambia los datos directamente en el servidor, los que tengo guardados pueden quedarse desactualizados. Para solucionarlo, puedo volver a llamar a `fetchAll()` y cargar los datos otra vez.
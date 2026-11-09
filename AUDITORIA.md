# Auditoría del método renderBook

Después de revisar el código que nos ha proporcionado la IA, he encontrado tres problemas que pueden afectar al funcionamiento de la aplicación.

## 1. La fecha de venta aparece al revés

**Qué falla:**

La condición que comprueba si el libro tiene una fecha de venta está al revés. Cuando el libro tiene una fecha, muestra "En venta", y cuando no tiene ninguna, muestra "Vendido el".

**Cómo reproducirlo:**

Podemos probarlo con dos libros: uno que tenga `soldDate: "2023-02-01"` y otro que tenga `soldDate: ""`.

**Consecuencias:**

La información que ve el usuario es incorrecta, porque puede pensar que un libro está disponible cuando realmente ya se ha vendido, o al contrario.

**Cómo lo he corregido:**

He cambiado la condición para que, si el libro tiene una fecha, aparezca como vendido. Además, muestro la fecha en formato día/mes/año. Si no tiene fecha, aparece "En venta".

## 2. Puede fallar si el módulo del libro no existe

**Qué falla:**

El código utiliza directamente `module.cliteral` sin comprobar antes si existe el módulo. Si no lo encuentra, se produce un error.

**Cómo reproducirlo:**

Podemos cargar un libro cuyo `moduleCode` no coincida con ninguno de los módulos disponibles.

**Consecuencias:**

La aplicación puede dejar de mostrar ese libro y producir un error al intentar acceder a una propiedad de un módulo que no existe.

**Cómo lo he corregido:**

He añadido esta comprobación:

`const nombreModulo = module ? module.cliteral : book.moduleCode`

De esta forma, si encuentra el módulo muestra su nombre y, si no, muestra el código del módulo que tiene guardado el libro.

## 3. Uso de innerHTML con datos del servidor

**Qué falla:**

El código utiliza `innerHTML` para mostrar directamente datos que vienen del servidor, como los comentarios o la editorial. Esto puede ser peligroso porque, si alguno de esos campos contiene código HTML, el navegador lo interpreta.

**Cómo reproducirlo:**

Podemos probarlo poniendo código HTML en el campo de comentarios de un libro. Por ejemplo, una etiqueta que cree una imagen. Al cargar el libro, si se utiliza `innerHTML`, el navegador interpreta ese código en vez de mostrarlo como texto.

**Consecuencias:**

Esto puede ser un problema de seguridad, ya que alguien podría introducir contenido malicioso que se ejecute o modifique la página.

**Cómo lo he corregido:**

He dejado de utilizar `innerHTML` para introducir los datos de los libros. En su lugar, creo los elementos con `document.createElement()` y utilizo `textContent` para mostrar los datos como texto.

He elegido esta solución porque es más segura y evita que el navegador interprete los datos recibidos como código HTML.
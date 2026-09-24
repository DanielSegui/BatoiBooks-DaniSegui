import './style.css'
import './functions.js'

document.querySelector('#app').innerHTML = `
<div>
<h1>BatoiBooks</h1>
<p>Abre la consola para ver el resultado</p>
</div>
`

setupCounter(document.querySelector('#counter'))

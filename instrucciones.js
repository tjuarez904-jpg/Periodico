const palabras = ["TECNOLOGIA", "MUSICA", "ARTE", "VIDEOJUEGOS", "CINE", "FUTURO", "AMIGOS", "FIESTA"];
const filas = 12;
const columnas = 12;

let seleccionadas = [];
let seleccionando = false;

function generarSopa() {
    const container = document.getElementById('sopa-container');
    container.innerHTML = '';
    seleccionadas = [];

    let matriz = Array.from({ length: filas }, () =>
        Array.from({ length: columnas }, () =>
            String.fromCharCode(65 + Math.floor(Math.random() * 26))
        )
    );

    // Colocar palabras horizontal o vertical
    palabras.forEach(palabra => {
        let dir = Math.random() < 0.5 ? 'H' : 'V';
        let x = Math.floor(Math.random() * (dir === 'H' ? columnas - palabra.length : columnas));
        let y = Math.floor(Math.random() * (dir === 'V' ? filas - palabra.length : filas));

        for (let i = 0; i < palabra.length; i++) {
            if (dir === 'H') matriz[y][x + i] = palabra[i];
            else matriz[y + i][x] = palabra[i];
        }
    });

    // Crear elementos HTML
    matriz.forEach((fila, filaIndex) => {
        const filaDiv = document.createElement('div');
        filaDiv.classList.add('fila-sopa');
        fila.forEach((letra, colIndex) => {
            const letraSpan = document.createElement('span');
            letraSpan.classList.add('letra-sopa');
            letraSpan.textContent = letra;
            letraSpan.dataset.fila = filaIndex;
            letraSpan.dataset.col = colIndex;

            letraSpan.addEventListener('mousedown', () => seleccionando = true);
            letraSpan.addEventListener('mouseup', () => {
                seleccionando = false;
                // comprobar palabra
                const palabra
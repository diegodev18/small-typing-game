const words = [
    'javascript', 'python', 'java', 'c', 'c++', 'c#', 'ruby', 'swift', 'kotlin', 'php', 'rust', 'go', 'typescript', 'html', 'css', 'sql',
    'programacion', 'desarrollo', 'software', 'hardware', 'computadora', 'ordenador', 'sistema', 'framework', 'biblioteca', 'api', 'backend', 'frontend', 'fullstack',
    'jugando', 'juego', 'videojuego', 'consola', 'pc', 'gamer', 'desarrollador', 'ingeniero', 'ingenieria', 'tecnologia', 'informatica',
    'saludos', 'this', 'clases', 'objetos', 'variables', 'constantes', 'let', 'var', 'funciones', 'metodos', 'herencia', 'polimorfismo',
    'encapsulamiento', 'abstraccion', 'programador', 'programadora', 'programadores', 'programadoras', 'programa', 'programas', 'programando', 'programados', 'programadas', 'programaran',
    'universal', 'universidad', 'universidades', 'universo', 'universos', 'bits', 'bytes', 'algoritmo', 'estructura', 'datos', 'listas', 'pilas', 'colas', 'arboles',
    'grafo', 'redes', 'seguridad', 'criptografia', 'inteligencia', 'artificial', 'machine', 'learning', 'deep', 'learning', 'big', 'data', 'analisis', 'automatizacion',
    'computacion', 'nube', 'servidor', 'cliente', 'dominio', 'hosting', 'dns', 'http', 'https', 'protocolo', 'enlace', 'request', 'response', 'json', 'xml',
    'frameworks', 'angular', 'react', 'vue', 'nodejs', 'express', 'django', 'flask', 'spring', 'laravel', 'symphony', 'bootstrap', 'tailwind', 'sass', 'less',
    'compilador', 'interpretador', 'debug', 'depuracion', 'errores', 'exception', 'try', 'catch', 'throw', 'testing', 'unit', 'integration', 'deployment',
    'docker', 'kubernetes', 'virtualizacion', 'ubuntu', 'linux', 'windows', 'macos', 'unix', 'bash', 'shell', 'powershell', 'cmd', 'terminal', 'script'
];

const main = document.querySelector('main');
const errorCounter = document.querySelector('#counter');

let position = 0;
let errors = 0;

class Letter {
    constructor(letter, classList = []) {
        this.letter = letter;
        if (letter === '_') {
            this.letter = ' ';
        }
        this.newLetter = document.createElement('p');
        this.newLetter.textContent = letter;
        classList.forEach(className => {
            this.newLetter.classList.add(className);
        })
        main.appendChild(this.newLetter);
    }

    correct() {
        if (this.letter !== ' ') {
            this.newLetter.style.color = '#8aff9e';
        }
    }

    active() {
        if (this.letter !== ' ') {
            this.newLetter.style.color = '#fff';
        }
    }

    error() {
        this.newLetter.style.color = '#ff7272';
    }

    base() {
        if (this.letter !== ' ') {
            this.newLetter.style.color = '#ffffff88';
        } else {
            this.newLetter.style.color = '#282828';
        }
    }

    static gameOver() {

    }
}

const letters = [];
for (let i = 0; i < 100; i++) {
    const word_letters = words[Math.floor(Math.random() * words.length)].split('');
    word_letters.forEach(letter => {
        letters.push(new Letter(letter));
    })
    letters.push(new Letter('_', ['space']));
}
console.log(letters);
letters[0].active();

document.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
        return;
    }

    if (event.key === letters[position].letter) {
        letters[position].correct();

        if (position === document.querySelectorAll('p').length - 1) {
            console.log('You won!');
            return;
        }

        position++;
        letters[position].active();
    }
    else if (event.key === 'Backspace') {
        if (position !== 0) {
            letters[position].base();
            position--;
        }
        letters[position].active();
    }
    else {
        letters[position].error();
        position++;
        letters[position].active();
        errors++;
        errorCounter.textContent = errors;
    }
})

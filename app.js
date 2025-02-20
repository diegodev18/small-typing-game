const wordsList = [
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
const startButton = document.querySelector('#start');
const timeCounter = document.querySelector('#timer');
const wordsCounter = document.querySelector('#words');
const correctWords = document.querySelector('#correct-words');
const lastLetter = document.querySelector('#last-letter');

let position = 0;
let errors = 0;
let words = 0;

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
        } else {
            this.newLetter.style.color = '#282828';
            words++;
            correctWords.textContent = words;
        }
    }

    active() {
        if (this.letter !== ' ') {
            this.newLetter.style.color = '#fff';
        } else {
            this.newLetter.style.color = '#282828';
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

timeCounter.nextElementSibling.textContent = `${timeCounter.value} sec`;
wordsCounter.nextElementSibling.textContent = `${wordsCounter.value < 10 ? `0${wordsCounter.value}` : wordsCounter.value} words`;

const letters = [];
for (let i = 0; i < wordsCounter.value; i++) {
    const word_letters = wordsList[Math.floor(Math.random() * wordsList.length)].split('');
    word_letters.forEach(letter => {
        letters.push(new Letter(letter));
    })
    letters.push(new Letter('_', ['space']));
}
letters[0].active();

startButton.addEventListener('click', () => {
    let time = timeCounter.valueAsNumber;
    console.log(time);
})

timeCounter.addEventListener('input', () => {
    timeCounter.nextElementSibling.textContent = `${timeCounter.value} sec`;
})

wordsCounter.addEventListener('input', () => {
    wordsCounter.nextElementSibling.textContent = `${wordsCounter.value < 10 ? `0${wordsCounter.value}` : wordsCounter.value} words`;
})

window.addEventListener('keydown', (event) => {
    if (event.key === 'Shift' || event.key === 'CapsLock' || event.key === 'Control' || event.key === 'Alt' || event.key === 'Meta') {
        return;
    }

    lastLetter.textContent = event.key !== 'Backspace' ? event.key !== " " ? event.key : "_" : '⌫';

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
        errorCounter.style.color = errors > 10 ? errors > 20 ? '#f13131' : '#ff8278' : '#fff';
    }
})

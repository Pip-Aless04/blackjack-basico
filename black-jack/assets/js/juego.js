const juego = (() => {
    'use strict'; //Usamos la declaracion 'use strict' para que no se permitan declaraciones 'var' o 'let' fuera del escopo del bloque

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];
    
    let puntosJugadores = [0,0];

    //Referencias al html
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevoJuego = document.querySelector('#btnRestart');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas');
    let puntosHtml = document.querySelectorAll('small');
    
    //iniciar juego
    const iniciarJuego = (numJugadores = 2) => {
        console.clear();
        deck = crearDeck();
        puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores[i] = 0;
            puntosHtml[i].innerText = 0;
            divCartasJugadores[i].innerHTML = '';
        }

        btnPedir.disabled = false;
        btnDetener.disabled = false;
        
    }

    // Desordenar el deck usando Fisher-Yates (Knuth shuffle)
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
    
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    const crearDeck = () => {
        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
    
        for (let esp of especiales) {
            for (let tipo of tipos) {
                deck.push(esp + tipo);
            }
        }
        // El resultado será un orden aleatorio diferente en cada ejecución
        return shuffleArray(deck);
    }
    
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'Ya no hay cartas en el deck';
        }
        return deck.pop();
    }
    
    const valorCarta = (carta) => {
    
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 : valor * 1;
    }
    
    //turno de la computadora
    const acumularPuntos = (turno, carta) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divCartasJugadores[turno].append(imgCarta);

        return imgCarta;
    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if(puntosComputadora === puntosMinimos){
                alert('Nadie gana');
            } else if(puntosMinimos > 21){
                alert('Computadora gana');
            } else if(puntosComputadora > 21){
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 100);
    }

    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(puntosJugadores.length - 1, carta);
            crearCarta(carta, puntosJugadores.length - 1);
    
        }while( (puntosComputadora < puntosMinimos) && puntosMinimos <= 21);
        
        determinarGanador();
    };
    
    
    //eventos
    btnPedir.addEventListener('click', () => { 
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(0, carta);

        crearCarta(carta,0);
    
        if(puntosJugador > 21){
            console.warn('Perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }else if(puntosJugador === 21){
            console.warn('Obtuviste 21, excelente');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    
    });
    
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    
    });
    
    btnNuevoJuego.addEventListener('click',()=>{
        iniciarJuego();
    });

    return{
        iniciarJuego
    }

})();


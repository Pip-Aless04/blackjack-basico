(() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugador = 0, puntosComputadora = 0;
    
    //Referencias al html
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevoJuego = document.querySelector('#btnRestart');
    
    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputador = document.querySelector('#compuradora-cartas');
    let puntosHtml = document.querySelectorAll('small');
    
    
    // Desordenar el deck usando Fisher-Yates (Knuth shuffle)
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
    
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    
    const crearDeck = () => {
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
        shuffleArray(deck);
        return deck
        
    }
    // Crear el deck
    crearDeck();
    
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'Ya no hay cartas en el deck';
        }
        const index = Math.floor(Math.random() * deck.length);
        //console.warn(index)
        const carta = deck[index];
        deck = deck.filter((_, i) => i !== index); // Use _ for the unused parameter
        return carta; // Return the picked card instead of the deck
    }
    
    const valorCarta = (carta) => {
    
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 : valor * 1;
    
        /*
        if(isNaN(valor)){
            puntos = (valor === 'A') ? 11 : 10;
        }else{
            //se multiplica por 1 para convertir el string a numero
            puntos = valor * 1;
        }
        console.log(puntos);
        return puntos;
        */
    }
    
    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();
    
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHtml[1].innerText = puntosComputadora;
    
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta')
            divCartasComputador.append(imgCarta);
    
            if(puntosMinimos > 21){
                break;
            }
    
        }while( (puntosComputadora < puntosMinimos) && puntosMinimos <= 21);
    
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
    };
    
    
    //eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHtml[0].innerText = puntosJugador;
        //<img class="carta" src="assets/cartas/10C.png" alt="">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divCartasJugador.append(imgCarta);
    
        if(puntosJugador > 21){
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
        turnoComputadora(puntosJugador);
    
    });
    
    btnNuevoJuego.addEventListener('click',()=>{
        console.clear();
        deck = [];
        deck = crearDeck();
        puntosJugador = 0;
        puntosComputadora = 0;
        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;
        divCartasComputador.innerHTML = '';
        divCartasJugador.innerHTML = '';
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    
    });
})();


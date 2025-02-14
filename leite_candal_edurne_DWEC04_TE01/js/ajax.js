/*
leite_candal_edurneDWEC04_TE01
*/

import { PokemonCard } from './PokemonCard.js';

var datos;
var url = 'https://api.pokemontcg.io/v2/cards';
//PEDIR TODOS LOS DATOS
function pedirDatos() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            success: function(data) {
                resolve(data);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}
//PINTAR TODOS LOS DATOS
function pintar(datos) {
    var container = document.querySelector('#contenedor');
    var i = 0;
    datos.data.forEach(element => {
        i++;
        var card = new PokemonCard(element);
        var nuevaFila = document.createElement('tr');
        nuevaFila.addEventListener('click', function() {
            verCartaPokemon(card);
        });
        // ID
        var celdaId = document.createElement('td');
        celdaId.textContent = i;
        nuevaFila.appendChild(celdaId);
        // Set
        var celdaSet = document.createElement('td');
        celdaSet.innerHTML = `<img style="height:50px;" src="${card.set.images.symbol}">`;
        nuevaFila.appendChild(celdaSet);
        // Imagen
        var celdaImg = document.createElement('td');
        celdaImg.innerHTML = `<img style="height:50px;" src="${card.images.small}">`;
        nuevaFila.appendChild(celdaImg);
        // Nombre
        var celdaNombre = document.createElement('td');
        celdaNombre.textContent = card.name;
        nuevaFila.appendChild(celdaNombre);
        // Tipo
        var celdaTipo = document.createElement('td');
        celdaTipo.textContent = card.types;
        nuevaFila.appendChild(celdaTipo);
        // HP
        var celdaHp = document.createElement('td');
        celdaHp.textContent = card.hp;
        nuevaFila.appendChild(celdaHp);
        // Rareza
        var celdaRareza = document.createElement('td');
        celdaRareza.textContent = card.rarity;
        nuevaFila.appendChild(celdaRareza);
        // Artista
        var celdaArtista = document.createElement('td');
        celdaArtista.textContent = card.artist;
        nuevaFila.appendChild(celdaArtista);
        // Precio
        var celdaPrecio = document.createElement('td');
        celdaPrecio.textContent = card.trendPrice + ' €';
        nuevaFila.appendChild(celdaPrecio);
        // Precio Holo
        var celdaPrecioHolo = document.createElement('td');
        celdaPrecioHolo.textContent = card.reverseHoloTrendPrice + ' €';
        nuevaFila.appendChild(celdaPrecioHolo);

        container.appendChild(nuevaFila);
        document.querySelector('.cargando').style.display = "none";
    });
}

//CARGAR Y MOSTRAR INFO CARTA
function verCartaPokemon(card) {
    localStorage.setItem('pokemonCard', JSON.stringify(card));
    location.href = "pokemon.html";
}
// PINTAR CARTA
export function pintarCarta() {
    var card = JSON.parse(localStorage.getItem('pokemonCard'));
    if (!card) {
        console.log('No se encontraron datos de la carta.');
        return;
    }
    var imgCarta = document.getElementById('fotoCarta');
    var verCarta = document.getElementById('infoCarta');
    imgCarta.innerHTML = `<img src="${card.images.small}">`;
    verCarta.innerHTML = `
        <h1>${card.name}</h1>
        <p>Tipo: ${card.types.join(', ')}</p>
        <p>HP: ${card.hp}</p>
        <p>Rareza: ${card.rarity}</p>
        <p>Artista: ${card.artist}</p>
        <p>Precio: ${card.cardmarket.prices.trendPrice} €</p>
        <p>Precio Holo: ${card.cardmarket.prices.reverseHoloTrend} €</p>
        <p> CardMarket: <a id="enlaceCarta" href="${card.cardmarket.url}" target="_blank"> cardmarket.com/${card.name}</a></p>
    `;
}

//---------------------MAIN-----------------------//

pedirDatos()
    .then(function(data) {
        datos = data;
        pintar(datos);
    })
    .catch(function(err) {
        console.log(err);
    });

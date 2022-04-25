let API = 'https://pokeapi.co/api/v2/pokemon/';

let card = document.getElementById('card');
let form = document.getElementById('form');
let input = document.querySelector('#search')


form.addEventListener("submit",(e)=>{
  e.preventDefault();

  /* REGEX 
  \s: selecciona espacios en blanco, tabulaciones y saltos de linea.
  +: en conjunto con \s sirve para tomar espacios consecutivos.
  g: permite repetir el proceso a lo largo del string o cadena, sino se eliminaría el primer espacio encontrado */

  let nombrePokemon = input.value.replace(/\s+/g, '').toLowerCase();

  obtenerPokemon(nombrePokemon);
  input.value = '';
});

async function obtenerPokemon(nombrePokemon){
  try{
    let respuesta = await fetch(API + nombrePokemon);
    if (!respuesta.ok){
      throw new Error('El pokemon no existe')
    }
    let datos = await respuesta.json();
    mostrarPokemon(datos);
    prueba(datos);
  } catch{
    console.log('error', Error);
    mostrarNoEncontrado();
  }
}

function mostrarNoEncontrado(){
  let texto = "<h2><b>Pokemon no encontrado<b></h2>";
  card.innerHTML = texto;
}

function mostrarPokemon(datos){
  let {
    name,
    id    :   identificador,
    order :   orden,
    weight: peso,
  } = datos;

  let datoPokemon = `
    <h1>${name.toUpperCase()}<h1/>
    <div class="divImg">
      <img class="imgPokemon"src="${datos.sprites.front_default}" alt="${name}">
      <img class="imgPokemon"src="${datos.sprites.back_default}" alt="${name}">
    </div>
    <div class="divP">
      <p>Id: ${identificador}<p/>
      <p>Orden: ${orden}<p/>
      <p>Tipo: ${datos.types[0].type.name}<p/>
      <p>Peso: ${peso}<p/>
    <div/>
  `;

  card.innerHTML = datoPokemon;
}

function prueba(date){
  console.log(JSON.stringify(date.name));
}
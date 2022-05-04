import Head from 'next/head'
import Image from 'next/image'
import HomeCss from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home({NuevoPokemon}) {
  console.log('NuevoPokemon',NuevoPokemon[0].id.abilities.length)
  return (
    <>
    <ul className={HomeCss.columnas}>
    {NuevoPokemon.map((pokemon, index)=>{
      return(
        <li>
          <Link href={{
              pathname: '/pokemon/[name]',
              query: {name: pokemon.name}
          }}>
          <a>
             <div className={`${HomeCss.card} ${pokemon.types[0].type.name}`}>
                <div>
                  <h3>{pokemon.name}</h3>
                  <div className={HomeCss.tipos}>
                    {pokemon.types.map((tipo, index) => {
                      return(
                        <p className={HomeCss.tipo}>{tipo.
                          type.name}</p>
                      )
                    })}
                  </div>
                </div>
                <img src ={pokemon.Image}height="100" width={100} className={HomeCss.Image}/>
                
                
             </div>
          </a>

          </Link>
        </li>
      )
    })}
    </ul>
    </>
  )
}

export async function getServerSideProps() {
const llamarapi= (numero) =>{
  return fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
  .then(response => response.json())
  .then(data => data)
}
let arrayPokemon = []
for (let index =1; index <= 20; index++){
  let data = await llamarapi(index)
  arrayPokemon.push(data)
}


let NuevoPokemon=arrayPokemon.map(pokemon=>{
  return({
    id:pokemon,
    name: pokemon.name,
    Image: pokemon.sprites.other.dream_world.front_default,
    types: pokemon.types

  })
})
  return{
    props: {
      NuevoPokemon
    },
  }
}

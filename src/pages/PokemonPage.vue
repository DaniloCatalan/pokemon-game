<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>¿Quién es este pokemon?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
    <PokemonOptions 
      :pokemons="pokemonArr"
      @selection="checkAnswer($event)"
      />
    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">
        Nuevo juego
      </button>
    </template>
  </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPicture from '@/components/PokemonPicture.vue'
import getPokemonOptions from '@/helpers/getPokemonOptions'


export default {
  components: {
    PokemonPicture,
    PokemonOptions
  },
  data(){
    return{
      pokemonArr:[],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods:{
    async mixPokemonArray(){
      this.pokemonArr = await getPokemonOptions()
      const rndInt = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemonArr[rndInt]
    },
    checkAnswer(selectedId){
      this.showPokemon = true
      this.showAnswer = true
      if (selectedId === this.pokemon.id) {
        this.message =`Correcto, ${this.pokemon.name}`
      }else{
        this.message =`Oops era, ${this.pokemon.name}`
      }
    },
    newGame(){
      this.pokemonArr = []
      this.showPokemon = false
      this.showAnswer = false
      this.pokemon = null
      this.mixPokemonArray()
    }
  },
  mounted(){
    this.mixPokemonArray()
  }
}
</script>

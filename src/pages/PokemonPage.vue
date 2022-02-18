<template>
  <h1>¿Quién es este pokemon?</h1>
  <PokemonPicture/>
  <PokemonOptions/>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPicture from '@/components/PokemonPicture.vue'

export default {
  components: {
    PokemonPicture,
    PokemonOptions
  }
}
</script>

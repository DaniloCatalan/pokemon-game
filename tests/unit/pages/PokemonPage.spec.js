import { shallowMount, mount } from '@vue/test-utils';
import PokemonPage from '@/pages/PokemonPage';

import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonPage Component', () => {
    let wrapper;
    
    beforeEach(() => {
      wrapper = shallowMount(PokemonPage)
    })

    test('Debe de hacer match con el snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    test('Debe de llamar el mixPokemonArray al montar', async () => {
      const mixPokemonArraySpy = await jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
      shallowMount(PokemonPage)
      expect(mixPokemonArraySpy).toHaveBeenCalled()
    })

    test('Debe de hacer match con el snapshot cuando cargan los pokemons', () => {
      const wrapper = shallowMount( PokemonPage, {
        data() {
          return {
            pokemonArr: pokemons,
            pokemon: pokemons[0],
            showPokemon: false,
            showAnswer: false,
            message: ''
          }
        }
      })
      expect( wrapper.html() ).toMatchSnapshot()
    })

    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {
      const wrapper = shallowMount( PokemonPage, {
        data() {
          return {
            pokemonArr: pokemons,
            pokemon: pokemons[0],
            showPokemon: false,
            showAnswer: false,
            message: ''
          }
        }
      })
      const picture = wrapper.find('pokemon-picture-stub');
      const options = wrapper.find('pokemon-options-stub');

      // PokemonPicture debe de existir
      expect(picture.exists()).toBeTruthy()
      // PokemonOptions debe de existir
      expect(options.exists()).toBeTruthy()

      // PokemonPicture attribute (debe ser el primero)
      expect(picture.attributes('pokemonid')).toBe('1')
      // PokemonOptions attribute pokemons tobe true
      expect(options.attributes('pokemons')).toBeTruthy()
    })

    test('pruebas con checkanswer', async() => {
      const wrapper = shallowMount( PokemonPage, {
        data() {
          return {
            pokemonArr: pokemons,
            pokemon: pokemons[0],
            showPokemon: false,
            showAnswer: false,
            message: ''
          }
        }
      })
      await wrapper.vm.checkAnswer(1)

      expect(wrapper.find('h2').exists()).toBeTruthy()
      expect(wrapper.vm.showPokemon).toBe(true)
      expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemons[0].name}`)

      await wrapper.vm.checkAnswer(3)
      expect(wrapper.vm.message).toBe(`Oops era, ${pokemons[0].name}`)


    })

})

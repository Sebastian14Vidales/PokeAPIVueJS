import { defineStore } from 'pinia'
import axios from 'axios'
import type { Characters, MappedCharacter, Pokemon, PokemonAbility } from '../types/pokemon'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    characters: [] as MappedCharacter[],
    selectedPokemon: undefined as (Pokemon | undefined),
    abilitiesPokemon: undefined as (PokemonAbility | undefined),
    showModal: false
  }),

  actions: {
    async getCharacters() {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
      );
      this.characters = data.results.map((character: Characters) => ({
        name: character.name,
        id: character.url.split("/").at(-2)!,
      }));
    },

    async getPokemon(id: Pokemon["id"]) {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      this.selectedPokemon = data;
      this.showModal = true;
      
      if (data.abilities && data.abilities.length > 0) {
        await this.getAbilities(data.abilities[0].ability.url);
      }
    },

    async getAbilities(url: Characters["url"]) {
      const { data } = await axios.get(url);
      this.abilitiesPokemon = data;
    },

    closeModal() {
      this.showModal = false;
    }
  }
})
<script setup lang="ts">

import { onMounted } from "vue";
import { usePokemonStore } from '../stores/pokemon';

const store = usePokemonStore();

onMounted(async () => {
  await store.getCharacters();
});
</script>

<template>
  <div class="container mx-auto">
    <div
      class="grid my-6 grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-5 md:gap-6 rounded-lg shadow-lg p-4 bg-gray-100"
    >
      <div
        v-for="character in store.characters"
        :key="character.id"
        class="border rounded shadow-md"
      >
        <div class="h-[10rem] sm:h-64">
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${character.id}.svg`"
            :alt="character.name"
            class="p-3 w-full h-full hover:scale-125 transition-transform duration-300"
          />
        </div>

        <div class="bg-gray-300 px-6 text-center py-4">
          <p class="text-black uppercase font-bold text-base ">
            {{ character.name }}
          </p>
          <button
            class="bg-indigo-600 rounded w-full uppercase text-white text-sm py-2 font-bold"
            @click="store.getPokemon(character.id)"
          >
            See Pokemon
          </button>
        </div>
      </div>
    </div>
  </div>

  <modalPokemon 
    :show="store.showModal" 
    :pokemon="store.selectedPokemon" 
    @close="store.closeModal" 
    :abilitiesPokemon="store.abilitiesPokemon"/>
</template>

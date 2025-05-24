<script setup lang="ts">

import axios from "axios";
import { onMounted, ref } from "vue";
import type { Characters, MappedCharacter, Pokemon, PokemonAbility } from '../types/pokemon';

// I'm using ref to create a reactive variable
const characters = ref<MappedCharacter[]>([]);
const selectedPokemon = ref<Pokemon>();
const abilitiesPokemon = ref<PokemonAbility>();
const showModal = ref(false);

// I have created a function to get the characters from the API
async function getCharaters() {
  const { data } = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
  );
  characters.value = data.results.map((character: Characters) => ({
    name: character.name,
    id: character.url.split("/").at(-2)!,
  }));
  console.log("Characters:", characters.value);
}

// function to get information of each character
async function getCharacter(id: Pokemon["id"]) {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  selectedPokemon.value = data;
  showModal.value = true;
  
  if (data.abilities && data.abilities.length > 0) {
    console.log(data.abilities[0].ability.url);
    await getAbilities(data.abilities[0].ability.url);
  }
}

async function getAbilities(url: string) {
  
  const { data } = await axios.get(url);
  console.log(data);
  
  abilitiesPokemon.value = data;
}

const closeModal = () => {
  showModal.value = false;
}

onMounted(async () => {
  await getCharaters();
});
</script>

<template>
  <div class="container mx-auto">
    <div
      class="grid my-6 grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-5 md:gap-6 rounded-lg shadow-lg p-4 bg-gray-100"
    >
      <div
        v-for="character in characters"
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
            @click="getCharacter(character.id)"
          >
            See Pokemon
          </button>
        </div>
      </div>
    </div>
  </div>

  <modalPokemon :show="showModal" :pokemon="selectedPokemon" @close="closeModal" :abilitiesPokemon="abilitiesPokemon"/>
</template>

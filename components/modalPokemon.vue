<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg max-w-md w-full relative">
      <button
        class="absolute top-2 right-2 text-gray-600 hover:text-black"
        @click="$emit('close')"
      >
        ✖
      </button>

      <div v-if="pokemon">
        <h2 class="text-2xl font-bold mb-4 font-poiret uppercase text-center">
          {{ pokemon.name }}
        </h2>
        <img
          :src="pokemon.sprites.other['official-artwork'].front_default"
          alt="Pokemon Image"
          class="mx-auto w-40 h-40 object-contain mb-4"
        />
        <div class="flex justify-around">
          <div>
            <p><strong>Height:</strong> {{ pokemon.height }}</p>
            <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
          </div>
          <div>
            <p><strong>Experience:</strong> {{ pokemon.base_experience }}</p>
            <p><strong>Order:</strong> {{ pokemon.order }}</p>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-bold my-2 font-poiret uppercase text-center">
            Description   
          </h3>
          <p class="font-poppins h-16">{{ abilitiesPokemon?.effect_entries.find(entry => entry.language.name === 'en')?.short_effect }}</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pokemon, PokemonAbility } from "../types/pokemon";
defineProps<{
  show: boolean;
  pokemon: Pokemon | undefined;
  abilitiesPokemon: PokemonAbility | undefined;
}>();
defineEmits(["close"]);
</script>

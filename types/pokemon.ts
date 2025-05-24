export type Pokemon = {
    id: string;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    order: number;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    }
};

export type PokemonAbilityEffectEntry = {
    effect: string;
    short_effect: string;
    language: {
      name: string;
      url: string;
    };
  };
  
  export type PokemonAbility = {
    effect_entries: PokemonAbilityEffectEntry[];
  };
  
export type Characters = {
    name: string;
    url: string;
};

export type MappedCharacter = {
    name: string;
    id: string;
};
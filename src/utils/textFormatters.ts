import { PokemonResumo } from "../models/Pokemon";

export function formatarLinhaPokemon(pokemon: PokemonResumo): string {
  const tipos: string = pokemon.tipos.join(", ");
  return `#${pokemon.id} - ${pokemon.nome} | Tipos: ${tipos} | Altura: ${pokemon.altura} | Peso: ${pokemon.peso} | HP: ${pokemon.hp} | ATK: ${pokemon.ataque} | DEF: ${pokemon.defesa}`;
}

export function formatarTitulo(texto: string): string {
  const linha: string = "=".repeat(texto.length + 4);
  return `${linha}\n  ${texto}\n${linha}`;
}

export function capitalizarNome(nome: string): string {
  return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
}

export function calcularPesoMedio(pokemons: PokemonResumo[]): number {
  if (pokemons.length === 0) return 0;
  const total: number = pokemons.reduce((acc, p) => acc + p.peso, 0);
  return Math.round(total / pokemons.length);
}

export function todosTemNome(pokemons: PokemonResumo[]): boolean {
  return pokemons.every((p) => p.nome.trim().length > 0);
}

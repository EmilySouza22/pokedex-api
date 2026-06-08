import { PokemonResumo } from "../models/Pokemon";
import { LocalBoxError } from "../models/CustomErrors";
import { formatarLinhaPokemon, calcularPesoMedio, todosTemNome } from "../utils/textFormatters";

export class BoxService {
  private pokemons: PokemonResumo[] = [];

  adicionar(pokemon: PokemonResumo): void {
    const jaExiste: boolean = this.pokemons.some((p) => p.id === pokemon.id);

    if (jaExiste) {
      console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
      return;
    }

    this.pokemons.push(pokemon);
    console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);
  }

  listar(): void {
    if (this.pokemons.length === 0) {
      console.log("[AVISO] Catálogo vazio.");
      return;
    }

    console.log("\nCatálogo atual:");
    this.pokemons.forEach((pokemon) => {
      console.log(formatarLinhaPokemon(pokemon));
    });

    const pesoMedio: number = calcularPesoMedio(this.pokemons);
    console.log(`\nPeso médio do catálogo: ${pesoMedio}`);

    const todosValidos: boolean = todosTemNome(this.pokemons);
    if (!todosValidos) {
      console.log("[AVISO] Há Pokémon com nome inválido no catálogo.");
    }
  }

  remover(id: number): void {
    const existe: boolean = this.pokemons.some((p) => p.id === id);

    if (!existe) {
      console.log("[AVISO] Nenhum Pokémon encontrado com esse ID.");
      return;
    }

    this.pokemons = this.pokemons.filter((p) => p.id !== id);
    console.log("[OK] Pokémon removido do catálogo.");
  }

  buscarPorTipo(tipo: string): PokemonResumo[] {
    return this.pokemons.filter((p) =>
      p.tipos.some((t) => t.toLowerCase() === tipo.toLowerCase())
    );
  }

  obterTodos(): PokemonResumo[] {
    return this.pokemons;
  }

  validarCatalogo(): void {
    try {
      const validos: boolean = todosTemNome(this.pokemons);
      if (!validos) {
        throw new LocalBoxError("Catálogo contém entradas inválidas.");
      }
    } catch (erro) {
      if (erro instanceof LocalBoxError) {
        console.log(`[ERRO] ${erro.message}`);
      }
    }
  }
}

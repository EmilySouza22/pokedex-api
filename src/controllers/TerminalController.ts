import { PokeApiService } from "../services/PokeApiService";
import { BoxService } from "../services/BoxService";
import { formatarTitulo, capitalizarNome } from "../utils/textFormatters";

export class TerminalController {
  private pokeApiService: PokeApiService;
  private boxService: BoxService;

  constructor(pokeApiService: PokeApiService, boxService: BoxService) {
    this.pokeApiService = pokeApiService;
    this.boxService = boxService;
  }

  exibirCabecalho(): void {
    console.log(formatarTitulo("Pokédex"));
    console.log("Consultando Pokémon na PokeAPI...\n");
  }

  async executarDemonstracaoCompleta(): Promise<void> {
    this.exibirCabecalho();

    // --- Buscas válidas ---
    console.log(">>> Buscando: pikachu");
    const pikachu = await this.pokeApiService.buscarPokemon("pikachu");
    if (pikachu !== null) {
      console.log(`[OK] Pokémon encontrado: ${capitalizarNome(pikachu.nome)}`);
      this.boxService.adicionar(pikachu);
    }

    console.log("\n>>> Buscando: charmander");
    const charmander = await this.pokeApiService.buscarPokemon("charmander");
    if (charmander !== null) {
      console.log(`[OK] Pokémon encontrado: ${capitalizarNome(charmander.nome)}`);
      this.boxService.adicionar(charmander);
    }

    console.log("\n>>> Buscando: bulbasaur");
    const bulbasaur = await this.pokeApiService.buscarPokemon("bulbasaur");
    if (bulbasaur !== null) {
      console.log(`[OK] Pokémon encontrado: ${capitalizarNome(bulbasaur.nome)}`);
      this.boxService.adicionar(bulbasaur);
    }

    console.log("\n>>> Buscando: gengar");
    const gengar = await this.pokeApiService.buscarPokemon("gengar");
    if (gengar !== null) {
      console.log(`[OK] Pokémon encontrado: ${capitalizarNome(gengar.nome)}`);
      this.boxService.adicionar(gengar);
    }

    // --- Teste de duplicidade ---
    console.log("\n>>> Tentando adicionar pikachu novamente (duplicidade):");
    const pikachuDuplicado = await this.pokeApiService.buscarPokemon("pikachu");
    if (pikachuDuplicado !== null) {
      this.boxService.adicionar(pikachuDuplicado);
    }

    // --- Busca inválida ---
    console.log("\n>>> Buscando: pokemon-inexistente");
    await this.pokeApiService.buscarPokemon("pokemon-inexistente");

    // --- Listagem ---
    console.log("\n>>> Listando catálogo completo:");
    this.boxService.listar();

    // --- Busca por tipo ---
    console.log("\n>>> Pokémon do tipo fire no catálogo:");
    const tipoFire = this.boxService.buscarPorTipo("fire");
    if (tipoFire.length > 0) {
      tipoFire.forEach((p) => console.log(`  - ${p.nome}`));
    } else {
      console.log("  Nenhum Pokémon do tipo fire encontrado.");
    }

    // --- Remoção ---
    console.log("\n>>> Removendo pikachu (ID 25):");
    this.boxService.remover(25);

    // --- Remoção de ID inexistente ---
    console.log("\n>>> Tentando remover ID 999 (inexistente):");
    this.boxService.remover(999);

    // --- Listagem final ---
    console.log("\n>>> Listagem final após remoção:");
    this.boxService.listar();

    console.log("\n[FIM] Demonstração concluída.\n");
  }
}

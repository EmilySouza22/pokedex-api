import { PokemonResumo, PokemonApiResponse } from "../models/Pokemon";
import { APIError } from "../models/CustomErrors";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export class PokeApiService {
  async buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
    const url = `${BASE_URL}/${nomeOuId.toLowerCase().trim()}`;

    try {
      const resposta = await fetch(url);

      if (!resposta.ok) {
        if (resposta.status === 404) {
          throw new APIError(`Pokémon não encontrado: ${nomeOuId}`, 404);
        }
        throw new APIError(`Erro na API: status ${resposta.status}`, resposta.status);
      }

      const dados = (await resposta.json()) as PokemonApiResponse;

      return this.mapearPokemon(dados);
    } catch (erro) {
      if (erro instanceof APIError) {
        console.log(`[ERRO] ${erro.message}`);
      } else {
        console.log("[ERRO] Não foi possível buscar o Pokémon. Verifique sua conexão.");
      }
      return null;
    }
  }

  private mapearPokemon(dados: PokemonApiResponse): PokemonResumo {
    const tipos: string[] = dados.types.map((item) => item.type.name);

    const getStat = (nome: string): number => {
      const encontrado = dados.stats.find((s) => s.stat.name === nome);
      return encontrado ? encontrado.base_stat : 0;
    };

    return {
      id: dados.id,
      nome: dados.name,
      tipos,
      altura: dados.height,
      peso: dados.weight,
      hp: getStat("hp"),
      ataque: getStat("attack"),
      defesa: getStat("defense"),
    };
  }
}

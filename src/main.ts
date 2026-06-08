import { PokeApiService } from "./services/PokeApiService";
import { BoxService } from "./services/BoxService";
import { TerminalController } from "./controllers/TerminalController";

async function main(): Promise<void> {
  const pokeApiService = new PokeApiService();
  const boxService = new BoxService();
  const controller = new TerminalController(pokeApiService, boxService);

  await controller.executarDemonstracaoCompleta();
}

main();

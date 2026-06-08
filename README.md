# Pokédex com TypeScript

## Sobre o projeto

Aplicação back-end em Node.js com TypeScript que consulta dados de Pokémon na PokeAPI pública, mapeia as respostas para objetos tipados e gerencia um catálogo local em memória durante a execução.

Desenvolvido como Mini-Projeto Avaliativo do Módulo 01 — Semana 08.

---

## Objetivo

Praticar os principais conceitos do Módulo 01:

- Node.js
- JavaScript no back-end
- TypeScript
- Interfaces e types
- Funções tipadas com parâmetros e retornos
- Arrays e objetos
- JSON
- Métodos de array
- Classes, atributos, métodos e modificadores de acesso
- async/await, Promises e fetch
- Tratamento de erros com try/catch e classes customizadas
- GitHub e GitFlow
- Kanban

---

## Tecnologias utilizadas

- Node.js
- TypeScript
- TSX
- PokeAPI
- Git / GitHub

---

## Pré-requisitos

- Node.js
- npm
- Git

---

## Como instalar

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/pokedex-typescript-lite
cd pokedex-typescript-lite

# Instale as dependências
npm install
```

---

## Como executar

```bash
# Ambiente de desenvolvimento (recomendado)
npm run dev

# ou
npm run start
```

---

## Estrutura do projeto

```
pokedex-typescript-lite/
│
├── src/
│   ├── main.ts                        # Ponto de entrada: instancia serviços e inicia a execução
│   │
│   ├── controllers/
│   │   └── TerminalController.ts      # Camada de UI: orquestra exibições e fluxo do terminal
│   │
│   ├── services/
│   │   ├── PokeApiService.ts          # Integração com a PokeAPI via fetch nativo
│   │   └── BoxService.ts              # Catálogo local: adicionar, listar, remover, buscar por tipo
│   │
│   ├── models/
│   │   ├── Pokemon.ts                 # Interfaces PokemonResumo e PokemonApiResponse
│   │   └── CustomErrors.ts            # Classes APIError e LocalBoxError (extends Error)
│   │
│   └── utils/
│       └── textFormatters.ts          # Funções puras tipadas: formatar linha, peso médio, validação
│
├── pc_box.json                        # Base de dados local (array vazio inicial)
├── tsconfig.json                      # Strict mode habilitado
├── package.json                       # Scripts dev/start/build
└── README.md
```

---

## Funcionalidades

- Buscar Pokémon por nome ou ID via PokeAPI
- Tratar erro quando Pokémon não existe (404) ou falha de rede
- Mapear resposta da API para objeto simplificado (id, nome, tipos, altura, peso, hp, ataque, defesa)
- Adicionar Pokémon ao catálogo local
- Impedir duplicidade pelo ID
- Listar catálogo com peso médio calculado
- Remover Pokémon por ID
- Buscar Pokémon por tipo dentro do catálogo
- Exibir mensagens claras e padronizadas no terminal

---

## Exemplos de execução

### Busca válida

Entrada testada:
```
pikachu
```

Saída obtida:
```
[OK] Pokémon encontrado: Pikachu
[OK] pikachu adicionado ao catálogo.
```

---

### Busca inválida

Entrada testada:
```
pokemon-inexistente
```

Saída obtida:
```
[ERRO] Pokémon não encontrado: pokemon-inexistente
```

---

### Duplicidade

Entrada testada:
```
adicionar pikachu duas vezes
```

Saída obtida:
```
[AVISO] pikachu já está no catálogo.
```

---

### Listagem do catálogo

Saída obtida:
```
Catálogo atual:
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60 | HP: 35 | ATK: 55 | DEF: 40
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85 | HP: 39 | ATK: 52 | DEF: 43
#1 - bulbasaur | Tipos: grass, poison | Altura: 7 | Peso: 69 | HP: 45 | ATK: 49 | DEF: 49

Peso médio do catálogo: 71
```

---

### Remoção

Entrada testada:
```
remover ID 25
```

Saída obtida:
```
[OK] Pokémon removido do catálogo.
```

### Remoção de ID inexistente

Entrada testada:
```
remover ID 999
```

Saída obtida:
```
[AVISO] Nenhum Pokémon encontrado com esse ID.
```

---

## Conceitos aplicados

### TypeScript
Todos os arquivos usam `.ts` com `strict: true`. Parâmetros e retornos de todas as funções são explicitamente tipados. O compilador foi verificado com `npx tsc --noEmit` sem erros.

### Interfaces
- `PokemonResumo` — representa o objeto simplificado usado internamente no catálogo
- `PokemonApiResponse` — mapeia apenas os campos necessários do retorno da PokeAPI (id, name, height, weight, types, stats)

### Fetch e async/await
`PokeApiService.buscarPokemon()` usa `fetch` nativo do Node.js 18+ com `await`. O retorno é tipado como `Promise<PokemonResumo | null>`.

### Tratamento de erros
`try/catch` em `PokeApiService` captura erro 404 (lança `APIError`) e falhas de rede. `LocalBoxError` é usado para validações internas do catálogo. Nenhuma exceção não tratada chega ao terminal.

### Métodos de array utilizados
| Método | Onde |
|--------|------|
| `map` | `PokeApiService` — extrai nomes dos tipos da resposta da API |
| `find` | `PokeApiService` — localiza stat por nome (hp, attack, defense) |
| `some` | `BoxService.adicionar` — verifica duplicidade pelo id |
| `filter` | `BoxService.remover` — recria array sem o Pokémon removido; `BoxService.buscarPorTipo` — filtra por tipo |
| `forEach` | `BoxService.listar` e `TerminalController` — itera para exibir no terminal |
| `every` | `textFormatters.todosTemNome` — valida se todos os Pokémon têm nome |
| `reduce` | `textFormatters.calcularPesoMedio` — soma pesos para calcular média |

### Classe BoxService
- Atributo privado: `private pokemons: PokemonResumo[]`
- Métodos: `adicionar`, `listar`, `remover`, `buscarPorTipo`, `obterTodos`, `validarCatalogo`
- Modificadores de acesso: `private` para o array interno

### Injeção de dependências
`TerminalController` recebe `PokeApiService` e `BoxService` via construtor — sem acoplamento direto entre camadas.

---

## Branches utilizadas

- `main` — versão estável final
- `develop` — integração de funcionalidades
- `feat/pokedex` — desenvolvimento principal da aplicação
- `docs/readme` — documentação

---

## Kanban

Link do quadro Kanban:
[\[Kanban\]](https://github.com/users/EmilySouza22/projects/2)

---

## Melhorias futuras

- Menu interativo no terminal com `readline`
- Filtros por tipo, peso ou ataque
- Exibir ranking por ataque ou defesa

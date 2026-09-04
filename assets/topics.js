// Conteúdo dos 6 focos sobre os povos indígenas no Brasil.
// Cada foco cai na roleta de forma aleatória (sem repetir) em cada slide.
const TOPICS = [
  {
    id: "quem-sao",
    short: "Quem são",
    eyebrow: "Foco 1",
    title: "Um Brasil de muitos povos",
    text: "Não existe “um” povo indígena — existem centenas. O último Censo do IBGE, de 2022, contou 391 etnias diferentes espalhadas pelo país e quase 1,7 milhão de pessoas que se declararam indígenas, quase o dobro do levantamento anterior, em 2010.",
    facts: [
      "391 etnias registradas em todo o território nacional",
      "295 línguas indígenas ainda faladas hoje",
      "Tikúna, Kokama e Makuxí estão entre os povos mais numerosos"
    ]
  },
  {
    id: "onde-vivem",
    short: "Onde vivem",
    eyebrow: "Foco 2",
    title: "Da aldeia à cidade grande",
    text: "As terras indígenas se espalham por todas as regiões do Brasil, com maior concentração na Amazônia. Mas o retrato mudou: hoje mais da metade da população indígena mora em áreas urbanas, muitas vezes longe do território de origem, em busca de estudo e trabalho.",
    facts: [
      "Terras indígenas presentes em quase todos os estados",
      "Mais da metade da população indígena já vive em cidades",
      "São Paulo é a cidade com maior diversidade de etnias indígenas"
    ]
  },
  {
    id: "como-vivem",
    short: "Como vivem",
    eyebrow: "Foco 3",
    title: "Vida em comunidade",
    text: "O dia a dia costuma girar em torno da aldeia: roças cultivadas em conjunto, pesca e caça compartilhadas, casas coletivas que abrigam várias famílias e decisões tomadas em roda, com lideranças como caciques e pajés. O trabalho comunitário é regra, não exceção.",
    facts: [
      "Agricultura de coivara, pesca e caça sustentam a alimentação",
      "Casas coletivas abrigam mais de uma família",
      "Decisões importantes são discutidas em conjunto"
    ]
  },
  {
    id: "cultura",
    short: "Cultura",
    eyebrow: "Foco 4",
    title: "Memória que se conta e se canta",
    text: "Grande parte do conhecimento indígena passa de boca em boca: mitos de criação, cantos e rituais marcam nascimentos, colheitas e passagens para a vida adulta. Pinturas corporais, adornos e a própria língua carregam a identidade de cada povo.",
    facts: [
      "Tradição oral guarda mitos, histórias e regras da comunidade",
      "Pinturas corporais indicam povo, festa ou momento de vida",
      "Rituais como o Kuarup celebram e homenageiam ancestrais"
    ]
  },
  {
    id: "desafios",
    short: "Desafios",
    eyebrow: "Foco 5",
    title: "Uma luta que continua",
    text: "Apesar de crescer em número, os povos indígenas seguem enfrentando invasões de terra, garimpo ilegal e desmatamento em seus territórios, além de acesso mais difícil a saneamento e saúde. A demarcação das terras é hoje um dos principais pontos da luta por direitos.",
    facts: [
      "Garimpo ilegal e desmatamento ameaçam territórios demarcados",
      "Acesso a saneamento básico ainda é desigual",
      "Demarcação de terras segue como principal bandeira de luta"
    ]
  },
  {
    id: "legado",
    short: "Legado",
    eyebrow: "Foco 6",
    title: "O Brasil fala tupi",
    text: "O legado indígena está mais perto do que parece: palavras como “abacaxi”, “pipoca” e “Ipanema” vêm de línguas indígenas, assim como alimentos que viraram base da culinária brasileira, caso da mandioca e do milho. É também dos povos originários que vem boa parte do conhecimento sobre plantas medicinais e sobre como proteger a floresta em pé.",
    facts: [
      "Centenas de palavras do português têm origem indígena",
      "Mandioca, milho e pimenta fazem parte da herança alimentar",
      "Terras indígenas ajudam a conter o desmatamento na Amazônia"
    ]
  }
];

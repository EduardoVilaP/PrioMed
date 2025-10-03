# PrioMed - Navegador Inteligente de Saúde

![PrioMed Header](https://raw.githubusercontent.com/google/generative-ai-docs/main/site/en/gemini-api/docs/images/priomed_banner.png)

**PrioMed** é uma aplicação web inteligente projetada para ajudar usuários a encontrarem o atendimento médico mais adequado com base em seus sintomas. Utilizando o poder da **IA Gemini do Google** para triagem preliminar e a **API do Google Maps** para visualização, o PrioMed oferece uma experiência fluida para pacientes em busca de atendimento médico emergencial ou não emergencial.

---

## ✨ Principais Funcionalidades

-   **Triagem de Sintomas com IA**: O usuário descreve seus sintomas em linguagem natural. A API Gemini, atuando como uma enfermeira experiente de triagem, analisa a entrada e retorna um nível de cuidado recomendado (`Emergência`, `Urgente` ou `Rotina`), uma pontuação de prioridade (1-100) e um resumo conciso.
-   **Localização de Estabelecimentos de Saúde**: Detecta automaticamente a localização do usuário para encontrar e exibir os estabelecimentos de saúde mais próximos de acordo com o nível de cuidado recomendado pela IA.
-   **Mapa Interativo**: Exibe uma interface dinâmica do Google Maps com os estabelecimentos recomendados. Os marcadores são coloridos de acordo com o nível de ocupação em tempo real simulado (Baixo, Moderado, Alto, Lotado) e rotulados para rápida identificação.
-   **Simulação de Dados Dinâmicos**: Tempos de espera e níveis de ocupação dos estabelecimentos são continuamente simulados, proporcionando uma demonstração realista de um cenário do mundo real.
-   **Interface de Dupla Visualização**: Um botão simples alterna entre a **Visão do Paciente** (para análise de sintomas e busca de estabelecimentos) e a **Visão do Estabelecimento** (um painel somente leitura para monitoramento de status).
-   **Aplicativo Web Progressivo (PWA)**: Inclui manifesto e service worker, permitindo que os usuários "instalem" o PrioMed na tela inicial para uma experiência semelhante a um app e acesso offline.
-   **Integração com Rotas**: Cada cartão de estabelecimento e marcador no mapa inclui um link "Obter Direções" que abre o Google Maps com a rota preenchida a partir da localização atual do usuário.

---

## 🚀 Como Funciona

1.  **Entrada de Sintomas**: O usuário descreve seus sintomas na área de texto.
2.  **Análise por IA**: A entrada é enviada para a **Google Gemini API** (`gemini-2.5-flash`). Um prompt cuidadosamente elaborado instrui o modelo a agir como um especialista em triagem e retornar um objeto JSON estruturado contendo `careType`, `priorityScore` e `triageSummary`.
3.  **Serviços de Localização**: O aplicativo solicita a geolocalização do navegador do usuário.
4.  **Correspondência de Estabelecimentos**: O aplicativo filtra uma lista de estabelecimentos simulados com base no `careType` recomendado pela IA.
5.  **Exibição dos Resultados**: Os estabelecimentos filtrados são apresentados ao usuário em dois formatos:
    *   Uma lista ordenada, mostrando primeiro os mais próximos, com detalhes sobre tempo de espera e ocupação.
    *   Um mapa interativo com marcadores coloridos e janelas de informação

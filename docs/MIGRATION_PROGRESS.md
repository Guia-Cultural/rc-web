# Migração 1:1 — Rota Cultural

Os HTMLs em `legacy/` permanecem intactos. Assets Base64 foram extraídos programaticamente para `src/assets/legacy/`, com manifestos que preservam o nome original de cada imagem. O CSS de cada origem foi extraído para um arquivo próprio e isolado por escopo.

## `legacy/local__2_.html` → Local

| Seção/função original | Componente React | Status |
| --- | --- | --- |
| Hero, dados do local, tema, favoritos, share e rota | `LocalHero` | Concluído |
| Navegação interna sticky | `LocalNavigation` | Concluído |
| Sobre, ficha, indicadores e recomendações | `InformationSection` | Concluído |
| Galeria e ampliação | `GallerySection` + `Lightbox` | Concluído |
| Horários e estado aberto/fechado | `HoursSection` | Concluído |
| Endereço, contato e mapa ilustrativo | `LocationSection` | Concluído |
| Média, distribuição, ordenação e formulário | `ReviewsSection` | Concluído |
| Dicas de moradores | `ResidentTipsSection` | Concluído |
| Roteiros de visitantes | `VisitorRoutesSection` | Concluído |
| Busca, UF, preço e troca de local | `OtherPlacesSection` | Concluído |
| Papéis demonstrativos e moderação | `DemoRoleSwitcher` + `AdminSection` | Concluído |
| Denúncia, dica, roteiro, cadastro e gestão | `LocalDialogs` | Concluído no frontend |
| Persistência demonstrativa | `useLocalPage` + `localStorage` | Concluído |

## `legacy/roteiros__1_.html` → Criar Roteiro

| Seção/função original | Componente React | Status |
| --- | --- | --- |
| Hero, colagem e temas | `RoteirosHero` | Concluído |
| Mapa do Brasil, estado, cidade e destino livre | `DestinationStep` | Concluído |
| Perfil, ritmo e dias | `ProfileStep` | Concluído |
| Categorias, filtro, detalhes e atrações | `AttractionsStep` + `DetailModal` | Concluído |
| Refeições e preferências | `FoodStep` | Concluído |
| Tipo, detalhes e escolha de hospedagem | `StayStep` + `DetailModal` | Concluído |
| Meios e estimativas de deslocamento | `TransportStep` | Concluído |
| Perfil e distribuição de orçamento | `BudgetStep` | Concluído |
| Resumo, validação, geração e reinício | `GenerateStep` + `useItineraryBuilder` | Concluído |
| Resultado, custos e hospedagem | `ItineraryResults` | Concluído |
| Cronograma diário e abas | `ItineraryResults` | Concluído |
| Mapa, horários e transportes | `ItineraryResults` | Concluído |
| Mercados, saúde e segurança | `ItineraryResults` | Concluído |
| Cópia do resumo | `useItineraryBuilder` | Concluído |

## Integração e limites

- Rotas: `/local` e `/roteiros`; `/location` redireciona para `/local`.
- Header, Footer, `AuthContext` e `ModalContext` continuam compartilhados.
- Operações sem API usam estado React e, na página Local, `localStorage`. Cadastros, gestão e denúncias informam explicitamente que não há envio a servidor.
- Os arquivos preexistentes `Login.jsx`, `Community.jsx` e `Recommend.jsx` estão vazios e foram preservados sem reescrita; por isso não foram registrados como rotas renderizáveis.
- O Header compartilhado existente ocupa espaço próprio acima dos heros; nos HTMLs legados o header era sobreposto ao hero. Esta é a diferença visual de integração mantida para não duplicar a Navbar.

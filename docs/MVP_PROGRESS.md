# MVP Progress — rc-web

- Branch feat/mvp-integration; origem 74c6625 confirmada; correções c07d783/c17c1ff enviadas sem merge na main.
- CONCLUÍDO: lockfile corrigido, npm ci/build/lint aprovados; bundle de produção sem credenciais demo; visual preservado.
- CONCLUÍDO: https://rota-cultural-rhu4n.vercel.app — deployment production dpl_6gw3WW5y3ZdEqMrVW43AoZKvSY3C READY, source c4dc779; build com VITE_API_URL real do Azure. Domínio vinculado ao projeto Hobby rhu4ns-projects/rota-cultural.
- CONCLUÍDO: SPA/reload HTTP 200 em /, /explorar, /local/1, /roteiros, /admin e /comunidade; API no bundle, origem exata aceita pelo CORS e origem externa rejeitada. Proteção de staging preservada, bypass transitório revogado.
- PARCIAL: interação React no navegador; Home inspecionada por acessibilidade com dados reais; cliques aguardam cancelamento do diálogo de firewall Node.js no Windows. Jornadas de cadastro/login/favorito/roteiro/NATIVO/ADMIN aprovadas diretamente na API, incluindo persistência após restart.
- BLOQUEADO: integração Git com repo privado da organização é recusada no Hobby (409); CLI local funciona, sem contratação Pro.
- BLOQUEADO: PR direto para main, pois os históricos não têm ancestral comum. Necessita autorização para branch de entrega baseada em main; nenhum merge/rewrite realizado.
- Pendência manual: testar formulários, prévia de fotos pendentes, painel ADMIN, salvar/reabrir roteiro e mensagens de conexão no navegador. Aviso de chunk >500kB mantido.
- Script reutilizável versionado em deploy/vercel-deploy.ps1; não incluir .env.local/credenciais no Git.
- Continuação: corrigidos dois CTAs da Home que apontavam para roteiros.html; agora usam /roteiros. Build/lint aprovados. Home renderizada com dados Azure; interação ainda depende de cancelar diálogo de firewall Node.js no Windows.

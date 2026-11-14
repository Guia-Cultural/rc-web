/* ==========================================================================
   JAVASCRIPT — HOME DO ROTACULTURAL
   Arquivo extraído de home.html.
   Interações isoladas da marcação JSX e organizadas por responsabilidade.
   ========================================================================== */
/* =========================================================================
   BLOCO 1 — DADOS, IMAGENS E FUNCIONALIDADES PRINCIPAIS
   Importa o catálogo de imagens e concentra as interações da Home:
   conta/autenticação, interações globais, hero, exploração de destinos,
   tour, planejamento, números, navegação e newsletter.
   ========================================================================== */
import { HOME_IMAGES as IMG } from "../data/homeData.js";
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
/* ==========================================================================
   HELPERS: SELETORES DOM E ÍCONES
========================================================================== */
const ico = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
/* ==========================================================================
   IMAGENS: RESOLUÇÃO DOS ASSETS DA HOME
========================================================================== */
$$('img[data-i]').forEach(i => i.src = IMG[i.dataset.i]);
/* --------------------------------------------------------------------------
   SEÇÃO: SOBRE NÓS, COMUNIDADE E JANELAS
   -------------------------------------------------------------------------- */
// ===== Sobre nós + comunidade + janelas =====
(() => {
    /* ==========================================================================
       CONFIGURAÇÃO: COMUNIDADE, ARMAZENAMENTO E DIÁLOGOS
    ========================================================================== */
    const BLOG_URL = 'https://claude.ai/artifact/By1BDHKeEvxNvhDRUgWLdk'; // trocar pela rota real da tela do blog
    const getHomeImage = (name) => IMG[name];
    $$('img[data-as]').forEach(i => i.src = getHomeImage(i.dataset.as));
    const showToast = (message) => {
        const t = $('#gtoast');
        t.textContent = message;
        t.classList.add('rc-toast--visible');
        clearTimeout(showToast.timeoutId);
        showToast.timeoutId = setTimeout(() => t.classList.remove('rc-toast--visible'), 2800);
    };
    const gt = showToast;
    const ls = {
        get(key, fallback) {
            try {
                return JSON.parse(localStorage.getItem(key)) ?? fallback;
            }
            catch {
                return fallback;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            }
            catch {
                return false;
            }
        },
    };
    const esc2 = s => s.replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
    const dlg = $('#dlg'), dbody = dlg.querySelector('.rc-dialog__body');
    function show(html, w) { dbody.innerHTML = html; dlg.classList.toggle('rc-dialog--wide', !!w); dbody.classList.toggle('rc-dialog__body--wide', !!w); if (!dlg.open)
        dlg.showModal(); if (!w) {
        const f = dbody.querySelector('input,textarea');
        f && setTimeout(() => f.focus(), 50);
    } }
    dlg.addEventListener('click', e => { if (e.target === dlg || e.target.closest('[data-close]'))
        dlg.close(); });
    const EM = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    /* --- CONTA: exibição de telas e autenticação --- */
    // ----- conta -----
    const user = () => ls.get('rc_session', null);
    function authView(mode, reason) {
        const r = mode === 'register';
        show(`<div class="rc-dialog__tabs" role="tablist"><button role="tab" aria-selected="${r}" data-tab="register">Criar conta</button><button role="tab" aria-selected="${!r}" data-tab="login">Entrar</button></div>
 <h2>${r ? 'Faça parte da comunidade' : 'Que bom ver você de novo'}</h2><p class="rc-dialog__subtitle">${reason || (r ? 'Publique histórias, curta, comente e salve seus lugares favoritos.' : 'Entre para acessar a comunidade.')}</p>
 <form id="af" data-mode="${mode}" novalidate>${r ? '<label>Nome<input name="n" autocomplete="name"><span class="rc-dialog__error" data-e="n"></span></label>' : ''}
 <label>E-mail<input name="e" type="email" autocomplete="email"><span class="rc-dialog__error" data-e="e"></span></label>
 <label>Senha<span class="rc-dialog__password-field"><input name="p" type="password" autocomplete="${r ? 'new-password' : 'current-password'}"><button type="button" data-eye aria-label="Mostrar senha"><svg class="icon" aria-hidden="true"><use href="#i-eye"/></svg></button></span><span class="rc-dialog__error" data-e="p"></span></label>
 <button class="button button--wide" type="submit">${r ? 'Criar minha conta' : 'Entrar'}</button>
 ${r ? '' : '<p class="rc-dialog__subtitle rc-dialog__subtitle--small"><button type="button" class="rc-dialog__link" data-forgot>Esqueci minha senha</button></p>'}
 <p class="rc-dialog__subtitle rc-dialog__subtitle--small">${r ? 'Ao criar a conta você concorda com os <button type="button" class="rc-dialog__link" data-dlgb="terms">Termos de uso</button>.' : 'Ainda não tem conta? <button type="button" class="rc-dialog__link" data-tab="register">Criar conta grátis</button>'}</p></form>`);
    }
    function renderAuth() {
        const u = user(), acts = $('.header__actions');
        acts.querySelectorAll('[data-auth]').forEach(a => a.hidden = !!u);
        let ac = $('#acct');
        if (u) {
            if (!ac) {
                ac = document.createElement('div');
                ac.id = 'acct';
                ac.className = 'account-menu';
                acts.prepend(ac);
            }
            ac.innerHTML = `<button class="account-menu__button" aria-haspopup="true" aria-expanded="false"><span class="account-menu__avatar">${esc2(u.n[0].toUpperCase())}</span><span class="account-menu__name">${esc2(u.n.split(' ')[0])}</span> ▾</button><div class="account-menu__menu"><a href="${BLOG_URL}" target="_blank" rel="noopener"><svg class="icon" aria-hidden="true"><use href="#i-users"/></svg> Ir para a comunidade</a><button data-out><svg class="icon" aria-hidden="true"><use href="#i-user"/></svg> Sair</button></div>`;
        }
        else if (ac)
            ac.remove();
        $('#btCtas').innerHTML = u ? `<a class="button" href="${BLOG_URL}" target="_blank" rel="noopener">Ir para a comunidade <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>` : '<button class="button" data-auth="register">Criar conta grátis <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></button><button class="button button--ghost" data-auth="login">Já tenho conta</button>';
        $$('.blog__access-gate .button').forEach(b => { b.textContent = u ? 'Abrir a comunidade' : 'Entrar na comunidade'; });
        typeof fillPlan === 'function' && fillPlan();
    }
    function setErr(f, k, m) { const s = f.querySelector(`[data-e="${k}"]`); s && (s.textContent = m || ''); return !!m; }
    dlg.addEventListener('click', e => {
        const t = e.target;
        const tab = t.closest('[data-tab]');
        if (tab)
            return authView(tab.dataset.tab);
        const eye = t.closest('[data-eye]');
        if (eye) {
            const i = eye.parentElement.querySelector('input');
            i.type = i.type === 'password' ? 'text' : 'password';
            return;
        }
        const db = t.closest('[data-dlgb]');
        if (db)
            return view(db.dataset.dlgb);
        if (t.closest('[data-forgot]')) {
            const f = $('#af'), m = f.elements.e.value.trim();
            if (setErr(f, 'e', EM.test(m) ? '' : 'Informe o e-mail da conta.'))
                return;
            show(`<div class="rc-dialog__success"><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg><h2>Confira seu e-mail</h2><p class="rc-dialog__subtitle">Enviamos as instruções para redefinir a senha para <b>${esc2(m)}</b>.</p><button class="button" data-close>Fechar</button></div>`);
        }
    });
    dlg.addEventListener('submit', e => {
        e.preventDefault();
        const f = e.target;
        if (f.id === 'af') {
            const r = f.dataset.mode === 'register', v = Object.fromEntries(new FormData(f)), us = ls.get('rc_users', []);
            let bad = false;
            if (r)
                bad = setErr(f, 'n', (v.n || '').trim().length < 2 ? 'Informe seu nome.' : '') || bad;
            bad = setErr(f, 'e', EM.test(v.e) ? '' : 'Informe um e-mail válido.') || bad;
            bad = setErr(f, 'p', (v.p || '').length < 6 ? 'A senha precisa ter ao menos 6 caracteres.' : '') || bad;
            if (bad)
                return;
            const em = v.e.trim().toLowerCase(), ex = us.find(u => u.e === em);
            let u;
            if (r) {
                if (ex)
                    return setErr(f, 'e', 'Este e-mail já tem conta. Entre na sua conta.');
                u = { n: v.n.trim(), e: em };
                us.push(u);
                ls.set('rc_users', us);
            }
            else {
                if (!ex)
                    return setErr(f, 'e', 'Não encontramos essa conta. Crie uma conta grátis.');
                u = ex;
            }
            ls.set('rc_session', u);
            dlg.close();
            renderAuth();
            gt(r ? `Conta criada! Bem-vindo(a), ${u.n.split(' ')[0]}.` : `Olá de novo, ${u.n.split(' ')[0]}!`);
            return;
        }
        if (f.id === 'cf') {
            const v = Object.fromEntries(new FormData(f));
            let bad = false;
            bad = setErr(f, 'n', v.n.trim().length < 2 ? 'Informe seu nome.' : '') || bad;
            bad = setErr(f, 'e', EM.test(v.e) ? '' : 'Informe um e-mail válido.') || bad;
            bad = setErr(f, 'm', v.m.trim().length < 10 ? 'Escreva ao menos 10 caracteres.' : '') || bad;
            if (bad)
                return;
            show(`<div class="rc-dialog__success"><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg><h2>Mensagem enviada!</h2><p class="rc-dialog__subtitle">Obrigado, ${esc2(v.n.trim().split(' ')[0])}. Responderemos em <b>${esc2(v.e)}</b>.</p><button class="button" data-close>Fechar</button></div>`);
        }
    });
    /* ==========================================================================
       CONTEÚDO: PERGUNTAS FREQUENTES E TERMOS
    ========================================================================== */
    const FAQ = [['O Rota Cultural é gratuito?', 'Sim. Explorar destinos, filtrar locais e criar sua conta não custam nada. Locais com entrada paga aparecem com a indicação “Pago”.'], ['Como funcionam as recomendações?', 'Você informa seu perfil de interesse e montamos um plano com lugares alinhados ao seu estilo. Avisamos por e-mail quando ele estiver pronto.'], ['Quem pode publicar na comunidade?', 'A comunidade é exclusiva para contas cadastradas, o que mantém as conversas seguras e respeitosas.'], ['Os preços e horários estão atualizados?', 'Os valores são referenciais. Confirme sempre no canal oficial da atração antes de ir.']];
    function view(k) {
        if (k === 'faq' || k === 'help')
            show(`<h2>${k === 'faq' ? 'Perguntas frequentes' : 'Central de ajuda'}</h2><p class="rc-dialog__subtitle">${k === 'faq' ? 'As dúvidas mais comuns sobre o Rota Cultural.' : 'Encontre respostas rápidas ou fale com a gente.'}</p>${FAQ.map(q => `<details><summary>${q[0]}</summary><p>${q[1]}</p></details>`).join('')}<p class="rc-dialog__subtitle rc-dialog__subtitle--small">Não achou o que procurava? <button class="rc-dialog__link" data-dlgb="contact">Fale conosco</button></p>`);
        else if (k === 'terms')
            show(`<h2>Termos de uso</h2><p class="rc-dialog__subtitle">Resumo das regras para usar o Rota Cultural.</p><details open><summary>Uso da plataforma</summary><p>O conteúdo é informativo. Valores, horários e disponibilidade devem ser confirmados no canal oficial de cada local.</p></details><details open><summary>Comunidade</summary><p>Seja gentil, fale de experiências reais e não divulgue dados pessoais. Conteúdo ofensivo pode ser removido.</p></details><details><summary>Privacidade</summary><p>Usamos seus dados apenas para criar sua conta, enviar recomendações e melhorar sua experiência.</p></details>`);
        else
            show(`<h2>Fale conosco</h2><p class="rc-dialog__subtitle">Conte como podemos ajudar. Respondemos por e-mail.</p><form id="cf" novalidate><label>Nome<input name="n" autocomplete="name"><span class="rc-dialog__error" data-e="n"></span></label><label>E-mail<input name="e" type="email" autocomplete="email"><span class="rc-dialog__error" data-e="e"></span></label><label>Mensagem<textarea name="m" rows="4"></textarea><span class="rc-dialog__error" data-e="m"></span></label><button class="button button--wide" type="submit">Enviar mensagem</button></form>`);
    }
    /* --- CLIQUES GLOBAIS: ações e eventos compartilhados --- */
    // ----- cliques globais -----
    document.addEventListener('click', e => {
        const a = e.target.closest('[data-auth]');
        if (a) {
            e.preventDefault();
            return authView(a.dataset.auth, a.dataset.reason);
        }
        const d = e.target.closest('[data-dlg]');
        if (d) {
            e.preventDefault();
            return view(d.dataset.dlg);
        }
        const o = e.target.closest('[data-out]');
        if (o) {
            ls.set('rc_session', null);
            renderAuth();
            gt('Você saiu da conta.');
            return;
        }
        const ab = e.target.closest('.account-menu .account-menu__button');
        if (ab) {
            const c = ab.parentElement;
            c.classList.toggle('account-menu--open');
            ab.setAttribute('aria-expanded', c.classList.contains('account-menu--open'));
            return;
        }
        if (!e.target.closest('.account-menu'))
            $('#acct')?.classList.remove('account-menu--open');
    });
    /* --- BLOG: teaser e interações de conteúdo --- */
    // ----- teaser do blog -----
    const CT = ['Históricas', 'Natureza', 'Praias', 'Cidades', 'Aventura'], CI = { Históricas: 'x-church', Natureza: 'x-fall', Praias: 'card-praias', Cidades: 'x-rio', Aventura: 'surf' };
    const TP = [['Lucas Silva', 'Históricas', 'Três horas no centro histórico sem gastar nada', 'Roteiro a pé por igrejas, praças e casarões. Vá cedo: a luz da manhã deixa tudo mais bonito.', 41, 2], ['Bruno Martins', 'Históricas', 'O museu pequeno que roubou a cena', 'Entrada gratuita aos domingos e um acervo que conta a história da cidade em meia hora.', 18, 4],
        ['Camila Ribeiro', 'Natureza', 'Primeira vez em uma trilha: o que levar', 'Água, boné, lanche leve e tênis com aderência. Comece por trilhas curtas e avise o trajeto.', 33, 5], ['Juliana Prado', 'Natureza', 'Amanhecer no lago vale acordar às 5h', 'Chegamos no escuro e esperamos o sol tocar as montanhas. O reflexo na água é a recompensa.', 19, 3],
        ['Lucas Almeida', 'Praias', 'Praia tranquila fora da temporada', 'Em dia de semana a areia fica quase vazia e os quiosques têm preço mais justo.', 12, 1], ['Ana Paula', 'Praias', 'Pôr do sol sem multidão', 'Caminhe até o fim da orla: a vista é a mesma, só que sem fila para a foto.', 16, 2],
        ['Rafael Souza', 'Cidades', 'Programas gratuitos para o fim de semana', 'Museus abertos aos domingos, feiras de artesanato e saraus em praças da cidade.', 24, 6], ['Mariana Silva', 'Cidades', 'Um fim de semana a pé na capital', 'Metrô, centro antigo e um parque para fechar o dia. Dá para fazer tudo sem carro.', 21, 2],
        ['Pedro Lima', 'Aventura', 'Tirolesa na mata: vale o frio na barriga', 'Reserve com antecedência, vá de roupa leve e deixe o celular guardado.', 27, 7], ['Larissa Costa', 'Aventura', 'Um dia de barco pelos rios da Amazônia', 'Passeio com guia local, araras no céu e parada em comunidade ribeirinha.', 15, 3]];
    let cat = 'Todos';
    const chips = $('#btChips'), stack = $('#btStack');
    chips.innerHTML = ['Todos', ...CT].map(c => `<button data-c="${c}" aria-pressed="${c === cat}">${c}</button>`).join('');
    function feed() {
        chips.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.c === cat));
        const l = (cat === 'Todos' ? [...TP].sort((a, b) => b[4] - a[4]) : TP.filter(p => p[1] === cat)), sh = l.slice(0, 2), lk = TP.filter(p => !sh.includes(p) && p[1] !== sh[0]?.[1])[1] || TP[3];
        stack.innerHTML = [...sh, lk].map((p, i) => `<article class="blog__post-card${i === 2 ? ' blog__post-card--locked' : ''}" style="--blog-delay:${i * .09}s" data-gate="Entre para ler a história completa e comentar."><div class="blog__post-image"><img src="${getHomeImage(CI[p[1]])}" alt="" loading="lazy"><span class="blog__post-tag">${p[1]}</span></div><div class="blog__post-content"><div class="blog__post-author"><span class="blog__author-avatar">${p[0][0]}</span>${p[0]}</div><h4 class="blog__post-title">${esc2(p[2])}</h4><p class="blog__post-excerpt">${esc2(p[3])}</p><div class="blog__post-actions"><button data-gate="Crie sua conta para curtir as histórias."><svg class="icon" aria-hidden="true"><use href="#i-heart"/></svg> ${p[4]}</button><button data-gate="Entre para comentar e conversar."><svg class="icon" aria-hidden="true"><use href="#i-chat"/></svg> ${p[5]}</button><button data-gate="Entre para compartilhar e salvar nos favoritos."><svg class="icon" aria-hidden="true"><use href="#i-share"/></svg></button></div></div></article>`).join('');
    }
    chips.addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (b) {
        cat = b.dataset.c;
        feed();
    } });
    stack.addEventListener('click', e => { const g = e.target.closest('[data-gate]'); if (!g)
        return; e.stopPropagation(); if (user())
        return window.open(BLOG_URL, '_blank', 'noopener'); authView('register', g.dataset.gate); });
    const LV = ['Lucas publicou em Históricas · agora há pouco', 'Camila curtiu “Primeira vez em uma trilha”', 'Rafael comentou em “Programas gratuitos”', 'Ana Paula salvou um roteiro em Praias', 'Pedro publicou em Aventura · há 2 min'];
    let li = 0;
    const lv = $('#btLive');
    const tick = () => { lv.style.opacity = 0; setTimeout(() => { lv.textContent = LV[li++ % LV.length]; lv.style.opacity = 1; }, 350); };
    tick();
    setInterval(tick, 3800);
    /* --------------------------------------------------------------------------
       SEÇÃO: FUNCIONALIDADES PRINCIPAIS DA HOME
       -------------------------------------------------------------------------- */
    // ===== Home: hero, explorar, locais, tour, plano =====
    /* ==========================================================================
       DADOS: CATEGORIAS E LOCAIS
    ========================================================================== */
    const CATS = { Praias: ['#7BE0F2', 'wave', 'Paraísos Tropicais', 'Sol, mar e paisagens inesquecíveis.', 'card-praias', '#00B8D9', '#0891B2', '#00B8D9'], História: ['#FFC107', 'landmark', 'Riqueza Cultural', 'História, arte e tradição em cada esquina.', 'stairs', '#FF6B00', '#EA580C', '#FFC107'], Cidades: ['#9DB8FF', 'building', 'Grandes Metrópoles', 'Cultura, gastronomia e novas experiências.', 'card-cidades', '#5B4BFF', '#5B3DF5', '#6B7CFF'], Natureza: ['#6BDDA0', 'mountain', 'Aventuras Naturais', 'Paisagens que renovam a alma.', 'macaw', '#12B76A', '#15803D', '#22C55E'], Aventura: ['#FF9A6B', 'compass', 'Viva o Extraordinário', 'Para quem busca emoção e liberdade.', 'surf', '#E8222B', '#DC2626', '#FF6B3D'] };
    const PL = [['Praia do Campeche', 'Florianópolis, SC', 'Praias', 0, 'hero-praias', 'Faixa de areia clara e mar azul, longe da muvuca. Ótima para caminhar, surfar e ver o pôr do sol.', 'Abril a setembro', 'Leve protetor e água: há poucos quiosques no trecho sul.'],
        ['Pelourinho', 'Salvador, BA', 'História', 0, 'card-historico', 'Casarões coloridos, igrejas barrocas e música nas ladeiras. Um dos conjuntos coloniais mais vivos do país.', 'O ano todo', 'Vá à tarde e fique para o pôr do sol e a música nas ruas.'],
        ['Centro História de Ouro Preto', 'Ouro Preto, MG', 'História', 0, 'x-church', 'Ladeiras de pedra, igrejas do ciclo do ouro e museus pequenos a poucos passos uns dos outros.', 'Maio a setembro', 'Use calçado confortável: o centro é todo de ladeira.'],
        ['Avenida Paulista', 'São Paulo, SP', 'Cidades', 0, 'card-cidades', 'Museus, livrarias, cinema e comida de todo canto. Aos domingos fecha para carros e vira área de lazer.', 'O ano todo', 'Aos domingos há feira, música e muita gente caminhando.'],
        ['Pão de Açúcar', 'Rio de Janeiro, RJ', 'Cidades', 1, 'x-rio', 'Bondinho com vista da Baía de Guanabara e do Cristo. O pôr do sol aqui vale a fila.', 'Abril a outubro', 'Compre o ingresso online e vá no fim da tarde.'],
        ['Chapada Diamantina', 'Lençóis, BA', 'Natureza', 1, 'x-fall', 'Cachoeiras, grutas e mirantes em trilhas guiadas. Um dos melhores lugares do país para quem ama natureza.', 'Maio a setembro', 'Contrate guia local: muitas trilhas exigem acompanhamento.'],
        ['Tirolesa na floresta', 'Brotas, SP', 'Aventura', 1, 'card-aventura', 'Tirolesas, rapel e boia-cross em meio à mata. Aventura para iniciantes e para quem já é veterano.', 'Março a outubro', 'Reserve com antecedência e vá de roupa leve.'],
        ['Reserva na Amazônia', 'Manaus, AM', 'Natureza', 1, 'hero-amazonia', 'Passeios de barco pelos rios, observação de aves e visita a comunidades ribeirinhas.', 'Julho a dezembro', 'Leve repelente e roupa de manga longa.'],
        ['Centro História de Paraty', 'Paraty, RJ', 'História', 0, 'x-colonial', 'Ruas de pedra que alagam com a maré, casario colonial e muita cachaça artesanal.', 'Março a novembro', 'Caminhe pela manhã, antes dos passeios de barco chegarem.'],
        ['Tiradentes', 'Tiradentes, MG', 'História', 0, 'x-street', 'Cidade pequena, cheia de museus, ateliês e uma das melhores gastronomias de Minas.', 'Maio a setembro', 'No fim de semana a cidade enche: prefira a sexta.'],
        ['Serra da Mantiqueira', 'Campos do Jordão, SP', 'Natureza', 0, 'hero-montanhas', 'Montanhas, lagos e trilhas curtas com clima de serra. Perfeita para quem quer descansar.', 'Maio a agosto', 'Leve agasalho: mesmo no verão as manhãs são frias.'],
        ['Rio Sucuri', 'Bonito, MS', 'Aventura', 1, 'boat', 'Rios de água cristalina para flutuação e mergulho, grutas e cachoeiras.', 'Março a novembro', 'Os passeios exigem reserva prévia em agências locais.'],
        ['Escadaria Selarón', 'Rio de Janeiro, RJ', 'Cidades', 0, 'stairs', 'Mais de 200 degraus cobertos de azulejos de todo o mundo, com as cores da bandeira do Brasil no meio da Lapa.', 'O ano todo', 'Vá cedo: a escadaria lota no meio da tarde.'],
        ['Surfe em Itacaré', 'Itacaré, BA', 'Aventura', 1, 'surf', 'Ondas para todos os níveis, com aulas e aluguel de prancha. Mata Atlântica de um lado, mar do outro.', 'Abril a setembro', 'Faça uma aula com instrutor local antes de entrar no mar.'],
        ['Praia do Forte', 'Mata de São João, BA', 'Praias', 0, 'flip', 'Piscinas naturais, coqueiros e um projeto de preservação de tartarugas marinhas. Ideal para ir de chinelo e sem pressa.', 'Setembro a março', 'Vá na maré baixa para aproveitar as piscinas naturais.'],
        ['Mergulho em Fernando de Noronha', 'Fernando de Noronha, PE', 'Aventura', 1, 'bubble', 'Águas transparentes, tartarugas e peixes coloridos. Há opções de snorkel e mergulho para iniciantes.', 'Agosto a janeiro', 'Reserve com antecedência: a ilha limita o número de visitantes.'],
        ['Pantanal', 'Poconé, MT', 'Natureza', 1, 'capy', 'Capivaras, jacarés, araras e uma das maiores planícies alagadas do planeta, em passeios de barco, a pé ou a cavalo.', 'Maio a outubro', 'Escolha pousadas com guia local para ver mais animais.'],
        ['Turismo rural na serra', 'Gonçalves, MG', 'Natureza', 0, 'cows', 'Fazendas com café da manhã mineiro, queijo fresco e vista para as montanhas. Perfeito para um fim de semana tranquilo.', 'Abril a setembro', 'Pergunte pelo ordenha das 7h: crianças adoram.']];
    const TH = ['Praias', 'História', 'Cidades', 'Natureza', 'Aventura'], TF = { Praias: [0, 'hero-praias', 'Sol, mar e paisagens inesquecíveis. Descubra praias para todos os gostos e bolsos.'], História: [2, 'x-church', 'Ladeiras, igrejas e museus que contam a história do Brasil em cada esquina.'], Cidades: [3, 'hero-cidades', 'Cultura, gastronomia e novas experiências nas grandes metrópoles.'], Natureza: [5, 'hero-natureza', 'Cachoeiras, trilhas e paisagens que renovam a alma.'], Aventura: [13, 'surf', 'Emoção e liberdade para quem quer viver o extraordinário.'] };
    const pr = p => p[3] ? 'Pago' : 'Gratuito', mapsU = p => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(p[0] + ' ' + p[1]);
    /* --- HERO: temas, imagens, alternância e busca inicial --- */
    // ----- hero -----
    const hero = $('#inicio');
    let hi = 0, hOn = 1, hTimer, hAuto = true;
    $('#themes').insertAdjacentHTML('beforeend', TH.map((t, i) => `<button class="hero__theme" data-t="${i}" aria-pressed="${i === 0}">${ico(CATS[t][1])}${t}</button>`).join(''));
    function theme(i, manual) {
        hi = i;
        const t = TH[i], f = TF[t], p = PL[f[0]];
        hero.style.setProperty('--hero-theme-color', CATS[t][5]);
        $$('.hero__theme').forEach((b, k) => b.setAttribute('aria-pressed', k === i));
        const sub = $('#hsub');
        sub.style.opacity = 0;
        setTimeout(() => { sub.textContent = f[2]; sub.style.opacity = 1; }, 250);
        const a = $('#hi' + hOn), b = $('#hi' + (3 - hOn));
        b.src = IMG[f[1]];
        b.classList.remove('hero__image--inactive');
        b.classList.add('hero__image--active');
        a.classList.add('hero__image--inactive');
        a.classList.remove('hero__image--active');
        hOn = 3 - hOn;
        $('#hn').textContent = p[0];
        $('#hc').textContent = p[1];
        $('#hct').textContent = t;
        $('#hct').style.background = CATS[t][5];
        hero.style.setProperty('--hero-theme-text', CATS[t][6]);
        $('#hcap').dataset.p = f[0];
        $$('#hseg i').forEach((s, k) => { s.className = k < i ? 'hero__segment--complete' : k === i ? 'hero__segment--active' : ''; });
        $('#hseg').classList.toggle('hero__segments--manual', !hAuto || !!manual);
        if (manual) {
            hAuto = false;
            clearInterval(hTimer);
            $('#hseg').classList.add('hero__segments--manual');
        }
    }
    $('#themes').onclick = e => { const b = e.target.closest('[data-t]'); if (b)
        theme(+b.dataset.t, 1); };
    hTimer = setInterval(() => hAuto && theme((hi + 1) % TH.length), 6500);
    $('#hcap').onclick = () => detail(+$('#hcap').dataset.p);
    $('#hcap').onkeydown = e => { if (e.key === 'Enter')
        detail(+$('#hcap').dataset.p); };
    $('#hs').onsubmit = e => { e.preventDefault(); const q = $('#hq').value.trim(); P.q = q; P.cat = TH.find(c => c.toLowerCase() === q.toLowerCase()) || null; if (P.cat)
        P.q = ''; $('#pq').value = P.q; P.n = 8; plist(); $('#locais').scrollIntoView(); gt(q ? `Buscando por “${q}”` : 'Mostrando todos os locais'); };
    /* --- EXPLORAR: categorias, filtros e listagem de destinos --- */
    // ----- explorar -----
    const P = { cat: null, q: '', uf: '', price: 'all', n: 8 };
    $('#cats').innerHTML = TH.map(c => { const d = CATS[c]; return `<button class="destinos__category reveal" style="--destinos-card-color:${d[0]};--destinos-accent:${d[7]};--destinos-rotation:${c.length % 2 ? '3deg' : '-3deg'}" data-c="${c}" aria-pressed="false"><span class="destinos__image"><img src="${IMG[d[4]]}" alt="${d[2]}"></span><span class="destinos__tag">${ico(d[1])}${c}</span><span class="destinos__copy"><b>${d[2]}</b><small>${d[3]}</small></span><span class="destinos__action"><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></span></button>`; }).join('');
    const ufs = [...new Set(PL.map(p => p[1].split(', ').pop()))].sort();
    $('#puf').innerHTML = '<option value="">Todos os estados</option>' + ufs.map(u => `<option>${u}</option>`).join('');
    const favs = () => ls.get('rc_favs', []);
    function plist() {
        $$('.destinos__category').forEach(b => b.setAttribute('aria-pressed', b.dataset.c === P.cat));
        $$('#pp button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === P.price));
        const q = P.q.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(), nz = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        const l = PL.map((p, i) => ({ p, i })).filter(({ p }) => (!P.cat || p[2] === P.cat) && (!P.uf || p[1].endsWith(P.uf)) && (P.price === 'all' || (P.price === 'free') === !p[3]) && (!q || nz(p[0] + p[1] + p[2]).includes(q)));
        $('#pcount').textContent = `${l.length} ${l.length === 1 ? 'local encontrado' : 'locais encontrados'}${P.cat ? ' em ' + P.cat : ''}`;
        const fv = favs();
        $('#pgrid').innerHTML = l.length ? l.slice(0, P.n).map(({ p, i }, k) => `<article class="destinos__place-card" style="--destinos-delay:${k % 4 * .07}s"><div class="destinos__image" data-d="${i}"><img src="${IMG[p[4]]}" alt="${p[0]}" loading="lazy"><span class="destinos__price ${p[3] ? 'destinos__price--paid' : ''}">${pr(p)}</span><button class="destinos__favorite" data-f="${i}" aria-pressed="${fv.includes(p[0])}" aria-label="Favoritar ${p[0]}"><svg class="icon" aria-hidden="true"><use href="#i-heart"/></svg></button></div><div class="destinos__place-content"><span class="destinos__place-category" style="--destinos-card-color:${CATS[p[2]][0]}">${ico(CATS[p[2]][1])}${p[2]}</span><h4 class="destinos__place-title" data-d="${i}">${p[0]}</h4><span class="destinos__place-location"><svg class="icon" aria-hidden="true"><use href="#i-pin"/></svg>${p[1]}</span><button class="button button--ghost" data-d="${i}">Ver detalhes</button></div></article>`).join('') : '<div class="destinos__empty"><h3>Nenhum local encontrado</h3><p>Tente outra categoria ou limpe os filtros.</p><button class="button" data-clr>Limpar filtros</button></div>';
        $('#pmore').hidden = l.length <= P.n;
    }
    $('#cats').onclick = e => { const b = e.target.closest('[data-c]'); if (!b)
        return; P.cat = P.cat === b.dataset.c ? null : b.dataset.c; P.n = 8; plist(); if (P.cat)
        $('#locais').scrollIntoView(); };
    $('#pq').oninput = e => { P.q = e.target.value.trim(); P.n = 8; plist(); };
    $('#puf').onchange = e => { P.uf = e.target.value; P.n = 8; plist(); };
    $('#pp').onclick = e => { const b = e.target.closest('[data-v]'); if (b) {
        P.price = b.dataset.v;
        P.n = 8;
        plist();
    } };
    $('#pmore button').onclick = () => { P.n += 4; plist(); };
    document.addEventListener('click', e => {
        if (e.target.closest('[data-clr]') || e.target.closest('#pclr')) {
            Object.assign(P, { cat: null, q: '', uf: '', price: 'all', n: 8 });
            $('#pq').value = '';
            $('#puf').value = '';
            plist();
        }
        const c = e.target.closest('[data-cat]');
        if (c) {
            e.preventDefault();
            P.cat = c.dataset.cat;
            P.n = 8;
            plist();
            $('#locais').scrollIntoView();
        }
    });
    $('#pgrid').addEventListener('click', e => {
        const f = e.target.closest('[data-f]');
        if (f) {
            e.stopPropagation();
            const p = PL[+f.dataset.f];
            if (!user())
                return authView('register', 'Crie sua conta para salvar seus locais favoritos.');
            let v = favs();
            v.includes(p[0]) ? v = v.filter(x => x !== p[0]) : v.push(p[0]);
            ls.set('rc_favs', v);
            plist();
            gt(v.includes(p[0]) ? 'Salvo nos favoritos' : 'Removido dos favoritos');
            return;
        }
        const d = e.target.closest('[data-d]');
        if (d)
            detail(+d.dataset.d);
    });
    function detail(i) { const p = PL[i], r = ls.get('rc_route', []); show(`<div class="destinos__detail-modal"><div class="destinos__detail-image"><img src="${IMG[p[4]]}" alt="${p[0]}"><span class="destinos__price ${p[3] ? 'destinos__price--paid' : ''}">${pr(p)}</span></div><div class="destinos__detail-body"><span class="destinos__place-category" style="--destinos-card-color:${CATS[p[2]][0]}">${ico(CATS[p[2]][1])}${p[2]}</span><h2 class="destinos__detail-title">${p[0]}</h2><p class="destinos__place-location"><svg class="icon" aria-hidden="true"><use href="#i-pin"/></svg>${p[1]}</p><p>${p[5]}</p><ul class="destinos__detail-list"><li><b>Entrada</b>${p[3] ? 'Paga (confirme o valor no site oficial)' : 'Gratuita'}</li><li><b>Melhor época</b>${p[6]}</li><li><b>Dica</b>${p[7]}</li></ul><div class="destinos__detail-actions"><button class="button" data-add="${i}"><svg class="icon" aria-hidden="true"><use href="#i-map"/></svg>${r.includes(p[0]) ? 'No seu roteiro' : 'Adicionar ao roteiro'}</button><a class="button button--ghost" href="${mapsU(p)}" target="_blank" rel="noopener">Ver no mapa</a></div></div></div>`, 1); }
    dlg.addEventListener('click', e => { const a = e.target.closest('[data-add]'); if (!a)
        return; const p = PL[+a.dataset.add]; let r = ls.get('rc_route', []); if (!r.includes(p[0])) {
        r.push(p[0]);
        ls.set('rc_route', r);
    } gt(`${p[0]} foi para o seu roteiro (${r.length} ${r.length === 1 ? 'local' : 'locais'})`); a.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>No seu roteiro'; });
    /* --- TOUR: apresentação/visualização em vídeo --- */
    // ----- tour (vídeo) -----
    /* ==========================================================================
       DADOS: SEQUÊNCIA DO TOUR VISUAL
    ========================================================================== */
    const TOUR = [['x-rio', 'Rio de Janeiro, RJ', 'Uma baía que parece pintura'], ['hero-praias', 'Litoral brasileiro', 'Mar azul e areia clara'], ['x-fall', 'Chapada Diamantina, BA', 'Cachoeiras no meio da mata'], ['x-colonial', 'Paraty, RJ', 'Ruas de pedra e casario colonial'], ['hero-montanhas', 'Serra da Mantiqueira', 'Montanhas ao amanhecer']];
    let ti = 0, tt;
    function tshow(i) { ti = (i + TOUR.length) % TOUR.length; const s = TOUR[ti]; $('#tImg').src = IMG[s[0]]; $('#tT').textContent = s[1]; $('#tS').textContent = s[2]; $$('.momentos__tour-progress-item').forEach((b, k) => { b.className = 'momentos__tour-progress-item' + (k < ti ? ' momentos__tour-progress-item--complete' : k === ti ? ' momentos__tour-progress-item--active' : ''); }); clearTimeout(tt); tt = setTimeout(() => tshow(ti + 1), 3400); }
    $('#vid').onclick = () => { show(`<div class="momentos__tour-modal"><div class="momentos__tour-progress">${TOUR.map(() => '<span class="momentos__tour-progress-item"><i></i></span>').join('')}</div><img id="tImg" alt=""><div class="momentos__tour-caption"><b id="tT"></b><span id="tS"></span></div><button class="momentos__tour-navigation" data-ts="-1" aria-label="Anterior">‹</button><button class="momentos__tour-navigation momentos__tour-navigation--next" data-ts="1" aria-label="Próximo">›</button></div>`, 1); tshow(0); };
    dlg.addEventListener('click', e => { const b = e.target.closest('[data-ts]'); if (b)
        tshow(ti + +b.dataset.ts); });
    dlg.addEventListener('close', () => clearTimeout(tt));
    /* --- PLANEJAMENTO: montagem e preenchimento do roteiro --- */
    // ----- plano -----
    const IN = ['Praias', 'História', 'Cidades', 'Natureza', 'Aventura'];
    let pick = new Set();
    $('#pch').innerHTML = IN.map(c => `<button type="button" data-i="${c}" style="--recomendacao-accent:${CATS[c][0]}" aria-pressed="false">${ico(CATS[c][1])}${c}</button>`).join('');
    $('#pch').onclick = e => { const b = e.target.closest('[data-i]'); if (!b)
        return; pick.has(b.dataset.i) ? pick.delete(b.dataset.i) : pick.add(b.dataset.i); b.setAttribute('aria-pressed', pick.has(b.dataset.i)); };
    function confetti() { const cs = ['#FFC107', '#FF6B00', '#0B5BFF', '#12B76A', '#E91E8C']; for (let i = 0; i < 44; i++) {
        const s = document.createElement('i');
        s.className = 'recomendacao__confetti-piece';
        s.style.left = '50%';
        s.style.top = '40%';
        s.style.background = cs[i % 5];
        s.style.setProperty('--recomendacao-x', (Math.random() * 600 - 300) + 'px');
        s.style.setProperty('--recomendacao-y', (Math.random() * 400 - 120) + 'px');
        s.style.setProperty('--recomendacao-rotation', (Math.random() * 720) + 'deg');
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 1500);
    } }
    function fillPlan() { const u = user(); if (u) {
        $('#pn').value = u.n;
        $('#pe').value = u.e;
    } }
    fillPlan();
    $('#pf').onsubmit = e => {
        e.preventDefault();
        const n = $('#pn').value.trim(), m = $('#pe').value.trim(), f = $('#pbud').value, loc = ($('#ploc').value || '').trim().toLowerCase();
        let err = '';
        if (n.length < 2)
            err = 'Informe seu nome.';
        else if (!EM.test(m))
            err = 'Informe um e-mail válido.';
        else if (!pick.size)
            err = 'Escolha ao menos um interesse.';
        $('#perr').textContent = err;
        if (err)
            return;
        const sc = PL.map((p, i) => ({ p, i, s: (pick.has(p[2]) ? 90 : 55) + (loc && p[1].toLowerCase().includes(loc) ? 8 : 0) + ((i * 7 + n.length * 3) % 9) - (f === 'free' && p[3] ? 30 : 0) })).filter(x => !(f === 'free' && x.p[3])).sort((a, b) => b.s - a.s).slice(0, 3);
        ls.set('rc_plan', { n, m, i: [...pick], f });
        $('#pres').innerHTML = `<div class="recomendacao__success-icon">✓</div><h3 class="recomendacao__result-title">${esc2(n.split(' ')[0])}, seu plano está pronto!</h3><p class="rc-dialog__subtitle" style="margin:.2rem 0 .8rem">Enviamos uma cópia para <b>${esc2(m)}</b>. Estes são os lugares com mais a ver com você:</p>${sc.map((x, k) => `<div class="recomendacao__result-card" style="--recomendacao-delay:${k * .12}s"><img src="${IMG[x.p[4]]}" alt=""><span><b>${x.p[0]}</b><small>${x.p[1]} · ${pr(x.p)}</small></span><span class="recomendacao__score">${Math.min(99, x.s)}% a ver</span></div>`).join('')}<div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1rem"><a class="button button--blue" href="#explorar">Explorar mais locais <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a><button class="button button--ghost" type="button" id="pagain">Refazer plano</button></div>`;
        $('#pcard').classList.add('recomendacao__card--completed');
        confetti();
    };
    document.addEventListener('click', e => { if (e.target.id === 'pagain') {
        $('#pcard').classList.remove('recomendacao__card--completed');
    } });
    /* --- NÚMEROS, NAVEGAÇÃO E NEWSLETTER --- */
    // ----- números, navegação, newsletter -----
    const nio = new IntersectionObserver(es => es.forEach(en => { if (!en.isIntersecting)
        return; nio.unobserve(en.target); en.target.querySelectorAll('[data-count]').forEach(el => { const to = +el.dataset.count, t0 = performance.now(), f = k => (to * k).toFixed(1).replace('.', ',') + el.dataset.suf; const st = t => { const k = Math.min(1, (t - t0) / 1600); el.textContent = f(1 - Math.pow(1 - k, 3)); k < 1 && requestAnimationFrame(st); }; requestAnimationFrame(st); }); }), { threshold: .4 });
    $$('#stats').forEach(el => nio.observe(el));
    const rio = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting)
            return;
        entry.target.classList.add('reveal--visible');
        if (entry.target.matches('.sobre-nos__banner')) {
            entry.target.classList.add('sobre-nos__banner--visible');
        }
        rio.unobserve(entry.target);
    }), { threshold: .1 });
    $$('.reveal,.sobre-nos__checklist,.sobre-nos__banner').forEach(el => rio.observe(el));
    /* A navegação, o estado ativo e o menu responsivo são controlados pelo componente React Header. */
    $('#nl') && ($('#nl').onsubmit = e => { e.preventDefault(); const v = $('#nle').value.trim(); if (!EM.test(v))
        return gt('Informe um e-mail válido.'); $('#nle').value = ''; gt('Pronto! Você vai receber nossas dicas de viagem.'); });
    theme(0);
    plist();
    feed();
    renderAuth();
})();
/* =========================================================================
   BLOCO 2 — COMPONENTES VISUAIS E SEÇÕES COMPLEMENTARES
   Cria os painéis “tudo que você precisa”, trilha ilustrada de viagem,
   faixas rolantes, efeitos de revelação, parallax, carrossel de categorias
   e pequenos ajustes de acessibilidade/interação.
   ========================================================================== */
(() => {
    const q = s => document.querySelector(s), qa = s => [...document.querySelectorAll(s)];
    const im = n => (typeof IMG !== 'undefined' && IMG[n]) || '';
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) {
        en.target.classList.add('reveal--visible');
        io.unobserve(en.target);
    } }), { threshold: .1 });
    const sp = `<svg style="display:none"><symbol id="h-bed" viewBox="0 0 24 24"><path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.5"/></symbol><symbol id="h-fork" viewBox="0 0 24 24"><path d="M6 3v8a2 2 0 0 0 2 2v8M10 3v8M6 7h4M17 21V3c-2 1-3.500 4-3.500 8 0 1.500 1 2.500 3.500 2.500"/></symbol><symbol id="h-bus" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="14" rx="3"/><path d="M4 11h16M8 21v-4M16 21v-4"/></symbol><symbol id="h-bulb" viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.500 10.900c.6.500 1 1.200 1 2.100h5c0-.9.4-1.600 1-2.100A6 6 0 0 0 12 3z"/></symbol><symbol id="h-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol><symbol id="h-cal" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></symbol><symbol id="h-foot" viewBox="0 0 24 24"><ellipse cx="12" cy="16" rx="4.500" ry="6" fill="currentColor" stroke="none"/><circle cx="7.500" cy="7.500" r="1.600" fill="currentColor" stroke="none"/><circle cx="11" cy="5.500" r="1.600" fill="currentColor" stroke="none"/><circle cx="14.500" cy="5.500" r="1.600" fill="currentColor" stroke="none"/><circle cx="17.500" cy="7.800" r="1.500" fill="currentColor" stroke="none"/></symbol><symbol id="h-tk" viewBox="0 0 24 24"><path d="M3 9a2 2 0 0 0 0 6v3h18v-3a2 2 0 0 1 0-6V6H3zM14 6v12"/></symbol></svg>`;
    document.body.insertAdjacentHTML('afterbegin', sp);
    /* ---- painéis "tudo que você precisa" ---- */
    /* ==========================================================================
       DADOS: ETAPAS VISUAIS DO ROTEIRO
    ========================================================================== */
    const PN = [
        ['Onde ficar', 'Hospedagem e a região certa para dormir.', ['Hotel', 'Pousada', 'Hostel', 'Região'], 'x-colonial', '#FFC107', 'h-bed'],
        ['Onde comer', 'Gastronomia do café da manhã à janta.', ['Comida local', 'Comida de rua', 'Cafés', 'Bares'], 'vendor', '#FF6B00', 'h-fork'],
        ['Onde ir', 'Atrações e experiências, grátis ou pagas.', ['Pontos turísticos', 'Passeios', 'Shows', 'Vida noturna'], 'x-hiker', '#00B8D9', 'i-compass'],
        ['Deslocamento', 'Como ir de um ponto ao outro.', ['A pé', 'Metrô', 'Ônibus', 'Carro'], 'boat', '#12B76A', 'h-bus'],
        ['Dicas de viajante', 'Época, documentos, segurança e golpes.', ['Melhor época', 'Documentos', 'Segurança', 'Golpes'], 'stairs', '#E91E8C', 'h-bulb']
    ];
    const CK = ['#FFC107', '#FF6B00', '#12A5F0', '#12B76A', '#E91E8C'], KT = ['#B98600', '#D95700', '#0C86C8', '#0A8A4F', '#C2187A'], KEY = ['sleep', 'food', 'places', 'transport', 'finish'];
    const crumbs = n => Array.from({ length: n }, (_, i) => `<i style="--roteiros-x:${8 + i * 9}%;--roteiros-y:${(i % 3) * 22 + 12}px;--roteiros-size:${6 + (i * 7) % 7}px;--roteiros-delay:${i * .12}s"></i>`).join('');
    const DECO = { sleep: '<svg class="roteiros__moon" viewBox="0 0 24 24"><path d="M20 14.500A8 8 0 0 1 9.500 4a8 8 0 1 0 10.500 10.500z" fill="currentColor"/></svg><b class="roteiros__sleep-letter">z</b><b class="roteiros__sleep-letter roteiros__sleep-letter--two">z</b><b class="roteiros__sleep-letter roteiros__sleep-letter--three">Z</b>', food: crumbs(9), places: [0, 1, 2, 3].map(i => `<svg class="roteiros__compass" viewBox="0 0 24 24" style="--roteiros-x:${8 + i * 20}%;--roteiros-size:${46 - i * 8}px;--roteiros-delay:${i * .2}s"><use href="#i-compass"/></svg>`).join(''), transport: Array.from({ length: 6 }, (_, i) => `<svg class="roteiros__footstep" viewBox="0 0 24 24" style="--roteiros-x:${6 + i * 15}%;--roteiros-y:${i % 2 ? 34 : 6}px;--roteiros-delay:${i * .18}s"><use href="#h-foot"/></svg>`).join(''), finish: '<svg class="roteiros__finish-flag" viewBox="0 0 24 24"><use href="#i-pin"/></svg><span class="roteiros__finish-label">Ponto final</span>' };
    q('#trail').innerHTML = '<i class="roteiros__line"></i><i class="roteiros__progress" id="trFill"></i><svg class="roteiros__plane" id="trPlane" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-plane"/></svg>' + PN.map((p, i) => `<div class="roteiros__step ${i % 2 ? 'roteiros__step--right' : 'roteiros__step--left'}" style="--roteiros-step-color:${CK[i]};--roteiros-step-contrast:${KT[i]}"><div class="roteiros__card"><img src="${im(p[3])}" alt=""><div><h3 class="roteiros__card-title">${p[0]}</h3><p class="roteiros__card-description">${p[1]}</p><em class="roteiros__card-meta">${p[2].join(' · ')}</em></div></div><div class="roteiros__decoration roteiros__decoration--${KEY[i]}" aria-hidden="true">${DECO[KEY[i]]}</div></div>`).join('');
    const trl = q('#trail'), trF = q('#trFill'), trP = q('#trPlane'), trS = qa('.roteiros__step');
    const trScroll = () => { const r = trl.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height)), y = p * r.height; trP.style.top = (y - 22) + 'px'; trF.style.height = y + 'px'; trS.forEach(step => { if (step.offsetTop + step.offsetHeight / 2 <= y + 40)
        step.classList.add('roteiros__step--visible'); }); };
    addEventListener('scroll', trScroll, { passive: true });
    trScroll();
    q('#rtRib').innerHTML = Array(4).fill(['Onde ficar', 'Onde comer', 'Onde ir', 'Deslocamento', 'Dicas de viajante'].map(x => `<span>${x}</span>`).join('')).join('');
    /* ---- imagens e revelação das novas seções ---- */
    qa('.recomendacao.recomendacao--v2 img[data-i]').forEach(i => i.src = im(i.dataset.i));
    qa('#roteiros .reveal,.recomendacao.recomendacao--v2 .reveal').forEach(e => io.observe(e));
    const pr = [...qa('[data-par]')];
    if (pr.length && !reduce)
        addEventListener('scroll', () => { const y = scrollY; pr.forEach(e => e.style.translate = '0 ' + (y * parseFloat(e.dataset.par)) + 'px'); }, { passive: true });
    const cs = q('#cats');
    if (cs && q('#cprev')) {
        const mv = d => { const c = cs.querySelector('.destinos__category'); cs.scrollBy({ left: d * (c ? c.offsetWidth + 32 : 300), behavior: 'smooth' }); };
        q('#cprev').onclick = () => mv(-1);
        q('#cnext').onclick = () => mv(1);
    }
    /* faixas rolantes: repete o conjunto até cobrir a tela, para o loop nunca abrir um vazio */
    const fixRib = () => qa('.marquee__track').forEach(t => { if (!t.dataset.o)
        t.dataset.o = t.innerHTML; t.innerHTML = t.dataset.o; const ch = [...t.children], n = ch.length / 2; let set = ch; if (Number.isInteger(n) && n > 0 && ch.slice(0, n).map(x => x.textContent).join('|') === ch.slice(n).map(x => x.textContent).join('|'))
        set = ch.slice(0, n); const u = set.map(x => x.outerHTML).join(''); t.innerHTML = u; const w = t.getBoundingClientRect().width; if (!w)
        return; let k = 1; while (w * k < innerWidth * 1.3 && k < 14)
        k++; t.innerHTML = u.repeat(k * 2); t.style.setProperty('--mqd', (w * k / 80) + 's'); });
    fixRib();
    if (document.fonts && document.fonts.ready)
        document.fonts.ready.then(fixRib);
    let rz;
    addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(fixRib, 200); });
    const TC = { Praias: '#00B8D9', História: '#FF6B00', Cidades: '#5B4BFF', Natureza: '#12B76A', Aventura: '#E8222B' };
    qa('.hero__theme').forEach(b => { const k = b.textContent.trim(); if (TC[k])
        b.style.setProperty('--hero-theme-accent', TC[k]); });
})();

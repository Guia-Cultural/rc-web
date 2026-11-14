/* ==========================================================================
   INTERAÇÕES DA PÁGINA LOCAL | Renderização, temas, avaliações e ações.
   Seletores de interface são limitados ao root do componente React.
========================================================================== */
import { LOCATION_IMAGES } from "../data/locationImages.js";

export function initializeLocationInteractions(root) {
  if (!root) return () => {};
  window.__IMG = LOCATION_IMAGES;
  const RC = window.RC;
  if (!RC) throw new Error("A camada compartilhada RC não foi inicializada.");


const $=(s,scope=root)=>scope.querySelector(s),$$=(s,scope=root)=>[...scope.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const ico=n=>`<svg class="location-icon" aria-hidden="true"><use href="#i-${n}"/></svg>`;
RC.config.inline=true; // login, menu do usuário e ações abrem DENTRO desta tela
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const IMG=n=>(window.__IMG&&window.__IMG[n])||('assets/'+n);

/* ===== temas (1 por estilo de local) ===== */
const THEMES={
 natureza:{label:'Natureza',icon:'mountain',adj:'naturais',c:'#7BD389',td:'#1F6B3A',ts:'#E3F6E7',tb:'#F3FBF4',tx:'#1F9D55',tc:'#E8467C',tm:'#1F2A24',bp:'50% 55%',div:'hills',fx:{k:'leaf',m:'fall',n:14,col:'#C8F5CF'},gal:['hero-natureza','g-ponte','card-natureza','hero-montanhas']},
 historico:{label:'Histórico',icon:'landmark',adj:'históricas',c:'#D9A05B',td:'#7A4A12',ts:'#F6E6D2',tb:'#FBF4EA',tx:'#A8561F',tc:'#1E6F78',tm:'#2A241E',bp:'50% 62%',div:'arches',fx:{k:'dot',m:'drift',n:18,col:'#FFE2A0'},gal:['hero-historico','g-selaron','hero-romanticos','g-copa-calcadao']},
 praias:{label:'Praias',icon:'waves',adj:'tropicais',c:'#2BD4E6',td:'#06707F',ts:'#DDF8FB',tb:'#F0FCFD',tx:'#0A9FB5',tc:'#FF5A5F',tm:'#1B2B30',bp:'50% 58%',div:'wave',fx:{k:'bubble',m:'rise',n:16,col:'#fff'},gal:['hero-praias','g-praia-tropical','g-copa-aerea','g-parapente']},
 cidades:{label:'Cidades',icon:'building',adj:'urbanas',c:'#8C9BFF',td:'#2E3FA8',ts:'#E6E9FF',tb:'#F4F5FF',tx:'#4457E0',tc:'#FFB400',tm:'#22273A',bp:'50% 45%',div:'skyline',fx:{k:'star',m:'tw',n:22,col:'#fff'},gal:['hero-cidades','g-selaron','g-skyline','g-copa-calcadao']},
 aventura:{label:'Aventura',icon:'compass',adj:'radicais',c:'#FF7A45',td:'#A93310',ts:'#FFE5DA',tb:'#FFF4EE',tx:'#E8501A',tc:'#00A8C8',tm:'#30231F',bp:'50% 55%',div:'dunes',fx:{k:'dot',m:'rise',n:18,col:'#FFB48A',g:1},gal:['hero-aventura','g-cachoeira','g-parapente','g-paraquedismo']},
 montanhas:{label:'Montanhas',icon:'mountain',adj:'de altitude',c:'#6F8FBF',td:'#26426B',ts:'#DCE6F3',tb:'#EEF3F9',tx:'#35588C',tc:'#E8892F',tm:'#1E2733',bp:'50% 38%',div:'peaks',fx:{k:'dot',m:'fall',n:26,col:'#fff'},gal:['hero-montanhas','card-montanhas','g-parapente','g-ponte']},
 amazonia:{label:'Amazônia',icon:'sparkles',adj:'amazônicas',c:'#3FD18A',td:'#136B44',ts:'#D8F5E4',tb:'#EEFBF4',tx:'#12A15A',tc:'#E0368A',tm:'#1C2B25',bp:'50% 50%',div:'hills2',fx:{k:'dot',m:'drift',n:20,col:'#FFF59D',g:1},gal:['hero-amazonia','g-trilha','card-natureza','g-ponte']},
 romanticos:{label:'Românticos',icon:'heart',adj:'românticas',c:'#EBB0A4',td:'#8F4337',ts:'#FBE9E4',tb:'#FFF8F5',tx:'#C4604F',tc:'#2F7076',tm:'#30262A',bp:'50% 45%',div:'scallop',fx:{k:'heart',m:'rise',n:14,col:'#FFC2D1'},gal:['hero-romanticos','g-selaron','g-praia-tropical','hero-historico']}};
const ORDER=Object.keys(THEMES);
const H=(a,b)=>Array(7).fill([a,b]),H24=Array(7).fill('24h');
const SEG=(a,b)=>[[a,b],null,[a,b],[a,b],[a,b],[a,b],[a,b]]; // dom..sáb; fecha na segunda (índice 1)
/* ===== locais (dados de EXEMPLO — troque pelos reais/API) ===== */
const PLACES={
 'chapada-diamantina':{tema:'natureza',n:'Chapada Diamantina',loc:'Lençóis, BA',cat:'Natureza',pago:true,priceTxt:'Passeios guiados e taxas variam por trilha.',tag:'Serras, cachoeiras e rios de águas escuras.',desc:'Região de serras, cachoeiras e rios de águas cor de chá, ideal para trilhas de um ou vários dias. A maior parte dos passeios é feita com guias locais, que conhecem os caminhos e a história de cada vale.',dest:['Cachoeiras e poços','Trilhas para todos os níveis','Guias da comunidade'],melhor:'Maio a setembro',dur:'1 a 3 dias',ideal:'Quem gosta de caminhar e natureza',acess:'Varia por trilha; consulte o guia',end:'Centro de Lençóis (ponto de partida)',h:H('07:00','17:00'),rev:[['Paula R.',5,'Trilhas lindas e guias muito atenciosos. Vale cada passo.',3000],['Diego F.',4,'Leve bastante água e chegue cedo. Vista incrível.',9000]],fb:[['Seu Antônio','Guia local há 25 anos','Prefira ir na primeira hora: a água fica transparente e a trilha, vazia.']]},
 'pelourinho':{tema:'historico',n:'Pelourinho',loc:'Salvador, BA',cat:'Histórico',pago:false,priceTxt:'Circulação livre pelas ruas; museus e igrejas podem cobrar entrada.',tag:'Casarões coloridos, igrejas barrocas e música nas ruas.',desc:'Conjunto de ruas de pedra, casarões coloridos e igrejas barrocas no coração histórico da cidade. Há música, artesanato e gastronomia por todo lado, com movimento até a noite.',dest:['Casarões coloridos','Igrejas barrocas','Música nas ruas'],melhor:'Fim de tarde',dur:'3 a 4 horas',ideal:'Quem gosta de história e cultura',acess:'Ladeiras e pedras irregulares',end:'Largo do Pelourinho, Centro Histórico',h:SEG('09:00','18:00'),rev:[['Marcos O.',5,'Cada esquina tem uma história. Fui no fim da tarde e foi perfeito.',4000],['Ana L.',4,'Lindo, mas use calçado confortável por causa das pedras.',12000]],fb:[['Dona Célia','Moradora há 40 anos','Procure as ruas laterais: é lá que mora a comida mais honesta.']]},
 'campeche':{tema:'praias',n:'Praia do Campeche',loc:'Florianópolis, SC',cat:'Praias',pago:false,priceTxt:'Acesso livre. Estruturas de apoio (quiosques, guarda-sol) são cobradas à parte.',tag:'Mar turquesa e areia clara para desacelerar.',desc:'Faixa de areia extensa e mar de tons azul-turquesa, ótima para caminhar ao amanhecer e mergulhar nos dias calmos. Chegando cedo, a praia fica bem mais tranquila.',dest:['Mar de cor turquesa','Boa para caminhadas','Pôr do sol aberto'],melhor:'Manhãs de semana',dur:'2 a 4 horas',ideal:'Casais, famílias e quem busca descanso',acess:'Acesso por areia; estrutura varia',end:'Orla do Campeche',h:H24,rev:[['Fernanda C.',5,'Chegamos às 8h e tivemos o mar quase só para nós.',2500],['Rafael S.',4,'Leve lanche e guarda-sol, a estrutura é simples.',8000]],fb:[['Seu Zeca','Pescador local','Quando o mar está calmo de manhã, a água fica cristalina até a primeira arrebentação.']]},
 'paulista':{tema:'cidades',n:'Avenida Paulista',loc:'São Paulo, SP',cat:'Cidades',pago:false,priceTxt:'Caminhar é gratuito; museus e centros culturais têm preços próprios.',tag:'Museus, livrarias, cafés e muita gente.',desc:'Avenida cultural com museus, centros culturais, livrarias e cafés. Aos domingos costuma ficar aberta para pedestres, com música e feirinhas. Combine um museu com uma boa caminhada.',dest:['Museus e exposições','Livrarias e cafés','Domingo para pedestres'],melhor:'Domingos e fins de tarde',dur:'3 a 5 horas',ideal:'Quem curte cidade e programação cultural',acess:'Calçadas amplas; metrô próximo',end:'Av. Paulista, Bela Vista',h:H('00:00','23:59'),rev:[['Camila R.',5,'Dá para passar o dia inteiro só entre museus e cafés.',1500],['Bruno T.',4,'Domingo é o melhor dia, mas chegue cedo.',7000]],fb:[['Rosana','Moradora do bairro','Fuja do horário de pico e prefira as ruas paralelas para descansar.']]},
 'tirolesa-brotas':{tema:'aventura',n:'Tirolesa na floresta',loc:'Brotas, SP',cat:'Aventura',pago:true,priceTxt:'Valor por pessoa; pacotes combinam vários esportes.',tag:'Voe entre as árvores com segurança.',desc:'Voo entre árvores com equipamentos de segurança e monitores treinados. Há percursos para iniciantes e para quem quer mais emoção. Vá com roupas leves e calçado fechado.',dest:['Voo entre as árvores','Monitores treinados','Percursos para iniciantes'],melhor:'Manhãs secas',dur:'2 a 3 horas',ideal:'Quem busca emoção e adrenalina',acess:'Exige condição física básica',end:'Estrada de acesso ao parque',h:SEG('08:00','17:00'),rev:[['Marcos O.',5,'Adrenalina pura e equipe super cuidadosa.',3500],['Juliana P.',5,'Tive medo, mas os monitores deixaram tudo tranquilo.',10000]],fb:[['Paulo','Monitor há 6 anos','Respire fundo antes de sair da plataforma. Depois do primeiro voo ninguém quer parar.']]},
 'pao-de-acucar':{tema:'montanhas',n:'Pão de Açúcar',loc:'Rio de Janeiro, RJ',cat:'Cidades',pago:true,priceTxt:'Ingresso para o bondinho; consulte valores oficiais.',tag:'Vista da baía e da cidade do alto.',desc:'Mirante com vista para a baía e a cidade, acessível por bondinho em dois trechos. Vá perto do pôr do sol para ver a cidade mudar de cor e acender as luzes.',dest:['Vista panorâmica','Bondinho em dois trechos','Pôr do sol'],melhor:'Fim de tarde',dur:'2 a 3 horas',ideal:'Quem ama vistas e fotos',acess:'Bondinho acessível; trilhas não',end:'Av. Pasteur, Urca',h:H('08:00','21:00'),rev:[['Lucas A.',5,'A vista no fim da tarde não tem preço.',2000],['Mariana S.',4,'Chegue cedo para evitar fila no bondinho.',9500]],fb:[['Lúcia','Moradora da Urca','Depois do passeio, caminhe pela Praia Vermelha: é a parte mais tranquila do bairro.']]},
 'amazonia-reserva':{tema:'amazonia',n:'Reserva na Amazônia',loc:'Manaus, AM',cat:'Natureza',pago:true,priceTxt:'Visita com guia e transporte; reserve com antecedência.',tag:'Rios, mata e araras no céu.',desc:'Passeios de barco, trilhas na mata e observação de aves como as araras. A visita é feita com guias locais, que mostram os sons e os cheiros da floresta e explicam como a comunidade cuida dela.',dest:['Passeios de barco','Observação de aves','Guias da comunidade'],melhor:'Estação seca',dur:'1 dia ou mais',ideal:'Quem quer viver a floresta de perto',acess:'Embarque em barco; consulte a operadora',end:'Ponto de embarque, Manaus',h:SEG('08:00','16:00'),rev:[['Paula R.',5,'Ver as araras ao amanhecer foi inesquecível.',5000],['Thiago M.',5,'Guia incrível, aprendi muito sobre a floresta.',14000]],fb:[['Dona Raimunda','Ribeirinha','Leve repelente e um chapéu. E fique em silêncio ao amanhecer: é quando a floresta fala.']]},
 'ouro-preto':{tema:'romanticos',n:'Centro Histórico de Ouro Preto',loc:'Ouro Preto, MG',cat:'Histórico',pago:false,priceTxt:'Ruas livres; igrejas e museus podem cobrar entrada.',tag:'Ladeiras, igrejas e becos para se perder a dois.',desc:'Cidade de ladeiras, igrejas e casarões coloridos, perfeita para caminhar sem pressa e se perder por becos. À noite, a iluminação deixa tudo ainda mais charmoso.',dest:['Ladeiras e becos','Igrejas históricas','Passeio à noite'],melhor:'Manhã e noite',dur:'1 a 2 dias',ideal:'Casais e quem gosta de caminhar',acess:'Ladeiras íngremes e pedras',end:'Praça Tiradentes',h:SEG('09:00','17:00'),rev:[['Camila R.',5,'Cada ladeira é um cenário. Fomos em casal e foi perfeito.',3800],['Rafael S.',4,'Cansa um pouco, mas vale muito.',11000]],fb:[['Seu Geraldo','Morador há 50 anos','Suba cedo, quando o sol bate nas igrejas e os becos ainda estão em silêncio.']]}};
const BY={};Object.entries(PLACES).forEach(([k,v])=>{if(!BY[v.tema])BY[v.tema]=k});
const DAYS=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

/* ===== estado (contas, favoritos e status vêm do RC compartilhado) ===== */
const KEY='rc_local_v1';let S={rev:{},fb:{},rep:[],edit:{},rot:{}};
S={...S,...RC.store.get(KEY,{})};
const save=()=>{const cur=RC.store.get(KEY,{});cur.rev=S.rev;cur.fb=S.fb;cur.rep=S.rep;cur.edit=S.edit;cur.rot=S.rot;RC.store.set(KEY,cur)};
const LVL=RC.LVL,me=()=>RC.user();
const qp=new URLSearchParams(location.search);
const EXTRA={
 'chapada-diamantina':{intens:4,lot:2,levar:['Tênis de trilha','Garrafa de água','Protetor solar','Roupa de banho'],publico:['Trilheiros','Fotógrafos','Casais','Grupos de amigos'],dica:'Comece pelas cachoeiras mais perto da cidade e deixe as trilhas longas para os dias de sol firme.',
  rot:[['Marina T.','Fim de semana nas cachoeiras','2 dias','Moderado',['Sábado 8h: cachoeira mais próxima, com banho','Almoço na vila','15h: mirante para o pôr do sol','Domingo 7h: trilha curta até o poço azul'],'Leve calçado que molhe e seque rápido.',18],['Renato C.','Trilha de um dia para iniciantes','1 dia','Econômico',['7h: café e saída com o guia','9h: trilha leve até a cachoeira','12h: piquenique à beira d\'água','15h: volta com calma'],'Contratar guia local deixa tudo mais seguro.',11]]},
 'pelourinho':{intens:2,lot:4,levar:['Calçado confortável','Água','Celular carregado','Dinheiro para lanches'],publico:['Quem curte história','Famílias','Fotógrafos','Grupos de amigos'],dica:'Vá no fim da tarde: a luz valoriza os casarões e a música começa a esquentar as ruas.',
  rot:[['Carla M.','Tarde histórica a pé','Meio dia','Econômico',['14h: largo principal','15h: igrejas e miradouros próximos','17h: lanche de rua','18h: música nas ladeiras'],'Prefira ruas laterais para descansar.',24],['Bruno T.','Centro histórico com fotos','Meio dia','Moderado',['9h: casarões coloridos com luz suave','11h: museu aberto na região','13h: almoço típico'],'Chegue cedo para fotos sem fila.',9]]},
 'campeche':{intens:1,lot:3,levar:['Protetor solar','Guarda-sol','Água e lanche','Canga'],publico:['Casais','Famílias','Quem busca descanso','Caminhantes'],dica:'Chegue antes das 9h para pegar a praia quase vazia e o mar mais calmo.',
  rot:[['Fernanda C.','Dia de praia sem pressa','1 dia','Econômico',['8h: caminhada na areia','10h: banho de mar','13h: almoço na orla','17h: pôr do sol aberto'],'Leve lanche: a estrutura é simples.',21],['Rafael S.','Manhã tranquila e café','Meio dia','Moderado',['7h30: chegada e alongamento','9h: mergulho nos dias calmos','11h: café na orla'],'Marés calmas pela manhã.',7]]},
 'paulista':{intens:2,lot:5,levar:['Calçado confortável','Carregador portátil','Dinheiro para cafés','Guarda-chuva'],publico:['Quem curte cultura','Estudantes','Casais','Turistas'],dica:'Aos domingos a avenida costuma ficar aberta para pedestres: ótimo para caminhar e ver artistas.',
  rot:[['Camila R.','Museus e cafés em um dia','1 dia','Moderado',['10h: museu de artes','13h: almoço','15h: centro cultural','17h: café e livraria'],'Compre ingressos antes e evite filas.',30],['Lucas A.','Domingo de caminhada','Meio dia','Econômico',['10h: caminhada pela avenida','12h: feirinha','14h: exposição gratuita'],'Domingo é o melhor dia.',12]]},
 'tirolesa-brotas':{intens:5,lot:3,levar:['Calçado fechado','Roupa leve','Protetor solar','Documento'],publico:['Quem busca emoção','Grupos de amigos','Casais aventureiros','Jovens'],dica:'Respire fundo antes de sair da plataforma. Depois do primeiro voo, ninguém quer parar.',
  rot:[['Marcos O.','Dia de adrenalina','1 dia','Moderado',['8h: instruções de segurança','9h: primeiros trechos de tirolesa','11h: trilha de aquecimento','13h: almoço'],'Reserve com antecedência nos feriados.',27],['Juliana P.','Primeira vez na tirolesa','Meio dia','Econômico',['9h: chegada e equipamentos','10h: percurso para iniciantes','12h: foto e lanche'],'Os monitores cuidam de tudo.',10]]},
 'pao-de-acucar':{intens:2,lot:5,levar:['Casaco leve','Câmera','Protetor solar','Dinheiro para lanche'],publico:['Quem ama vistas','Casais','Famílias','Fotógrafos'],dica:'Suba perto do pôr do sol e fique até as luzes da cidade acenderem.',
  rot:[['Lúcia F.','Pôr do sol na Urca','Meio dia','Moderado',['15h: caminhada pelo bairro','16h30: subida de bondinho','18h: pôr do sol','19h: luzes da cidade'],'Compre o ingresso antes e evite fila.',33],['Diego F.','Baía em duas paradas','Meio dia','Moderado',['14h: primeiro morro','15h: segundo trecho','17h: volta e lanche'],'Dias claros têm a melhor vista.',14]]},
 'amazonia-reserva':{intens:3,lot:2,levar:['Repelente','Chapéu','Roupa leve de manga longa','Binóculos'],publico:['Observadores de aves','Quem ama natureza','Fotógrafos','Famílias'],dica:'Fique em silêncio ao amanhecer: é quando a floresta mais fala e as araras aparecem.',
  rot:[['Paula R.','Floresta ao amanhecer','1 dia','Moderado',['5h30: saída de barco','7h: observação de araras','10h: trilha na mata','13h: almoço com a comunidade'],'Leve repelente e água.',19],['Thiago M.','Barco e trilha leve','Meio dia','Econômico',['8h: passeio de barco','10h: trilha curta','12h: volta com calma'],'O guia local faz toda a diferença.',8]]},
 'ouro-preto':{intens:3,lot:3,levar:['Calçado de solado firme','Casaco leve','Guarda-chuva','Câmera'],publico:['Casais','Quem curte história','Caminhantes','Fotógrafos'],dica:'Suba cedo, quando o sol bate nas igrejas e os becos ainda estão em silêncio.',
  rot:[['Camila R.','Fim de semana a dois','2 dias','Confortável',['Sábado: ladeiras e igrejas','Jantar à luz de velas','Domingo 8h: mirante e café','Passeio sem pressa pelos becos'],'As ladeiras cansam: pare para um café.',26],['Rafael S.','Ouro Preto em um dia','1 dia','Moderado',['9h: praça central','11h: igrejas principais','14h: museu','17h: pôr do sol no mirante'],'Calçado firme é essencial.',13]]}};
Object.entries(EXTRA).forEach(([k,v])=>PLACES[k]&&Object.assign(PLACES[k],v));
const SEEDKEYS=Object.keys(PLACES);
function mergeUserPlaces(){
 Object.keys(PLACES).forEach(k=>{if(PLACES[k].user)delete PLACES[k]});const u=me();
 RC.userPlaces().forEach(p=>{const vis=p.status==='aprovado'||(u&&(u.role==='admin'||u.id===p.owner));if(!vis)return;
  PLACES[p.slug]={tema:p.tema,n:p.n,loc:p.loc,cat:RC.THEME_CAT[p.tema]||'Cidades',pago:!!p.pago,priceTxt:p.priceTxt||(p.pago?'Consulte os valores com o local.':'Entrada gratuita.'),tag:p.tag||'',desc:p.desc,
   dest:(p.dest&&p.dest.filter(Boolean).length?p.dest.filter(Boolean):['Cadastrado pela comunidade','Informações de moradores','Confirme no local']).slice(0,3),melhor:p.melhor||'Consulte os horários',dur:p.dur||'Sob consulta',ideal:p.ideal||'Todos os públicos',acess:p.acess||'Sem informação',end:p.end||p.loc,h:p.h||Array(7).fill(null),rev:[],fb:[],photos:p.photos||[],contato:p.contato||{},coords:p.coords||null,user:true,owner:p.owner}})}
mergeUserPlaces();
const visible=k=>!!PLACES[k]&&(!SEEDKEYS.includes(k)||RC.seedStatus(k)==='aprovado'||RC.can('admin'));
let slug=visible(qp.get('local'))?qp.get('local'):(BY[qp.get('tema')]||BY.natureza);
if(!visible(slug))slug=SEEDKEYS.find(visible)||SEEDKEYS[0];
let tema=PLACES[slug].tema,front=$('#bgA'),back=$('#bgB');
const P=()=>({...PLACES[slug],...(S.edit[slug]||{})});
const T=()=>THEMES[tema];
const nowMs=Date.now();
const revs=()=>S.rev[slug]||(S.rev[slug]=PLACES[slug].rev.map((r,i)=>({id:'s'+i,a:r[0],n:r[1],t:r[2],ts:nowMs-r[3]*60000})),save(),S.rev[slug]);
const fbs=()=>S.fb[slug]||(S.fb[slug]=PLACES[slug].fb.map((r,i)=>({id:'f'+i,a:r[0],r:r[1],t:r[2],ts:nowMs})),save(),S.fb[slug]);
const ago=RC.ago;const toast=m=>RC.toast(m);
const mineOrAdmin=x=>{const u=me();return !!u&&(u.role==='admin'||x.uid===u.id)};

/* ===== divisórias temáticas (máscaras SVG) ===== */
function divPath(k){
 let d='';
 if(k==='wave')d='M0 45C100 15 200 15 300 45S500 75 600 45S800 15 900 45S1100 75 1200 45V80H0Z';
 else if(k==='hills')d='M0 55Q150 5 300 45T600 35T900 40T1200 25V80H0Z';
 else if(k==='hills2')d='M0 40Q120 0 240 38T480 30T720 45T960 25T1200 42V80H0Z';
 else if(k==='peaks')d='M0 80L120 20L200 60L320 5L440 70L560 25L700 65L820 15L950 70L1060 30L1200 80Z';
 else if(k==='dunes')d='M0 80C150 10 280 10 400 55S650 85 760 40S1000 5 1200 50V80Z';
 else if(k==='arches'){for(let i=0;i<12;i++)d+=`M${i*100+6} 80V46A44 44 0 0 1 ${i*100+94} 46V80Z`;d+='M0 76H1200V80H0Z'}
 else if(k==='skyline'){[30,56,40,72,36,62,46,76,52,38,66,44].forEach((h,i)=>d+=`M${i*100+6} 80V${80-h}H${i*100+88}V80Z`);d+='M0 76H1200V80H0Z'}
 else if(k==='scallop'){d='M0 80V50';for(let i=0;i<20;i++)d+='a30 30 0 0 1 60 0';d+='V80Z'}
 const svg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 80' preserveAspectRatio='none'><path d='${d}'/></svg>`;
 return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
/* ===== partículas temáticas ===== */
function fx(){
 const box=$('#fx'),f=T().fx;box.innerHTML='';if(reduce)return;
 for(let i=0;i<f.n;i++){
  const s=document.createElement('span'),sz=f.k==='leaf'||f.k==='heart'?14+Math.random()*16:(f.k==='bubble'?10+Math.random()*26:(f.k==='star'?6+Math.random()*10:4+Math.random()*7));
  s.className=`location-hero__particle ${f.k==='bubble'?'location-hero__particle--bubble':''} ${f.g?'location-hero__particle--glow':''}`;
  const an=f.m==='tw'?'tw':f.m;
  s.style.cssText=`--location-x:${Math.random()*100}%;--location-s:${sz}px;--location-pc:${f.col};--location-sw:${(Math.random()*160-80).toFixed(0)}px;--location-dur:${(f.m==='tw'?2+Math.random()*3:9+Math.random()*10).toFixed(1)}s;--location-del:${(-Math.random()*14).toFixed(1)}s;--location-an:${an};${f.m==='tw'||f.m==='drift'?`--location-y:${(8+Math.random()*80).toFixed(0)}%;`:(f.m==='fall'?'--location-y:0;':'')}`;
  s.innerHTML=`<svg viewBox="0 0 24 24"><use href="#p-${f.k}"/></svg>`;box.appendChild(s);
 }
}
/* ===== aplicar tema ===== */
function applyTema(first){
 const t=T(),a=$('#app');
 a.dataset.tema=tema;[a,document.documentElement].forEach(el=>{el.style.setProperty('--location-t',t.c);el.style.setProperty('--location-td',t.td);el.style.setProperty('--location-ts',t.ts);el.style.setProperty('--location-tb',t.tb);el.style.setProperty('--location-tx',t.tx);el.style.setProperty('--location-tc',t.tc);el.style.setProperty('--location-tm',t.tm)});
 a.style.setProperty('--location-div',divPath(t.div));
 back.style.setProperty('--location-bp',t.bp);back.src=IMG('hero-'+tema+'.jpg');
 const go=()=>{back.classList.add('is-visible');front.classList.remove('is-visible');[front,back]=[back,front]};
 first?(front.style.setProperty('--location-bp',t.bp),front.src=IMG('hero-'+tema+'.jpg')):(back.decode?back.decode().then(go,go):go());
 $('#bigIco use').setAttribute('href','#i-'+t.icon);fx();
 $$('.location-style-selector__option').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===tema));
}
function wipe(ev,cb){
 if(reduce||!ev||!ev.clientX){cb();return}
 const t=THEMES[ev.__to],d=document.createElement('div');d.className='location-theme-transition';d.style.background=t.c;root.appendChild(d);
 const x=ev.clientX,y=ev.clientY;
 d.animate([{clipPath:`circle(0 at ${x}px ${y}px)`},{clipPath:`circle(150% at ${x}px ${y}px)`}],{duration:600,easing:'cubic-bezier(.2,.75,.2,1)',fill:'forwards'});
 setTimeout(cb,420);
 setTimeout(()=>d.animate([{opacity:1},{opacity:0}],{duration:500,fill:'forwards'}).onfinish=()=>d.remove(),620);
}
function goPlace(k,ev){
 if(!visible(k))return;const nt=PLACES[k].tema;
 const apply=()=>{slug=k;tema=nt;history.replaceState(null,'','?local='+slug);applyTema();renderAll();window.scrollTo({top:0,behavior:reduce?'auto':'smooth'})};
 if(nt!==tema&&ev&&ev.clientX){ev.__to=nt;wipe(ev,apply)}else apply();
}
function setStyle(id,ev){if(id===tema&&PLACES[slug].tema===id)return;goPlace(BY[id],ev)}
/* ===== renderização do conteúdo ===== */
function stars(n,c=5){let s='';for(let i=1;i<=c;i++)s+=`<svg class="i ${i<=Math.round(n)?'':'off'}" aria-hidden="true"><use href="#i-star"/></svg>`;return `<span class="location-rating" role="img" aria-label="${n.toFixed(1)} de 5 estrelas">${s}</span>`}
const avgOf=()=>{const r=revs();return r.length?r.reduce((a,b)=>a+b.n,0)/r.length:0};
function openStatus(){
 const p=P(),d=new Date(),h=p.h[d.getDay()];
 if(h==='24h')return{ok:true,txt:'Aberto 24 horas'};
 if(!h)return{ok:false,txt:'Fechado hoje'};
 const mn=d.getHours()*60+d.getMinutes(),[a,b]=h.map(x=>{const[hh,mm]=x.split(':');return +hh*60+ +mm});
 return mn>=a&&mn<b?{ok:true,txt:`Aberto agora · fecha às ${h[1]}`}:{ok:false,txt:mn<a?`Fechado agora · abre às ${h[0]}`:'Fechado agora'};
}
function renderHero(){
 const p=P(),t=T(),st=openStatus(),f=RC.isFav(slug),ps=RC.placeStatus(slug);
 document.title=`${p.n} – Rota Cultural`;
 $('#crumbCat').textContent=p.cat;
 $('#kick').innerHTML=`viva experiências <b>${esc(t.adj)}</b>`;
 const w=p.n.split(' '),last=w.pop();$('#lName').innerHTML=(w.length?esc(w.join(' '))+' ':'')+`<em>${esc(last)}</em>`;
 $('#lTag').textContent=p.tag;
 $('#lMeta').innerHTML=`<span class="location-chip">${ico('pin')}${esc(p.loc)}</span><span class="location-chip">${stars(avgOf())}${avgOf().toFixed(1).replace('.',',')} <small>(${revs().length})</small></span><span class="location-chip">${ico('dollar')}${p.pago?'Pago':'Gratuito'}</span><span class="lchip ${st.ok?'ok':'no'}">${ico('clock')}${st.txt}</span>${ps!=='aprovado'?`<span class="location-chip location-no">${ico('info')}${ps==='pendente'?'Em análise pela equipe':'Reprovado'}</span>`:''}`;
 const b=$('#btnFav');b.setAttribute('aria-pressed',f);b.querySelector('span').textContent=f?'Favoritado':'Favoritar';
 $('#btnRoute').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.coords?p.coords.lat+','+p.coords.lng:p.n+' '+p.loc);
 $('#btnMap').href=$('#btnRoute').href;
}
function renderInfo(){
 const p=P(),t=T();$('#infoName').textContent=p.n;$('#lDesc').textContent=p.desc;
 const goal=['#fotos','#roteiros','#localizacao'];
 $('#lDests').innerHTML=p.dest.map((d,i)=>`<button type="button" class="location-icard" data-jump="${goal[i%3]}" style="--location-i:${i}"><span class="location-ct">${ico(t.icon)}${esc(t.label)}</span><h4>${esc(d)}</h4><span class="location-lc">${ico('pin')}${esc(p.loc)}</span><span class="location-go2" aria-hidden="true">${ico('arrow')}</span></button>`).join('');
 const row=(i,l,v)=>`<div><span class="location-ib">${ico(i)}</span><span><dt>${l}</dt><dd>${esc(v)}</dd></span></div>`;
 $('#lFicha').innerHTML=row('dollar','Preço',p.pago?'Pago':'Gratuito')+row('sun','Melhor época',p.melhor)+row('clock','Duração sugerida',p.dur)+row('users','Ideal para',p.ideal)+row('info','Acessibilidade',p.acess);
 const r=revs(),avg=r.length?r.reduce((a,b)=>a+b.n,0)/r.length:0,favs=RC.users().filter(u=>(u.favs||[]).includes(slug)).length,st=(a,l,i,to,d)=>`<div class="location-st4 location-an"><span class="location-ib">${ico(i)}</span><div><b class="location-cnt" data-to="${to}" data-dec="${d||0}">0</b><small>${l}</small></div></div>`;
 $('#lStats').innerHTML=st(0,'Nota média','star',avg.toFixed(1),1)+st(0,'Avaliações','chat',r.length)+st(0,'Favoritos','heart',favs)+st(0,'Roteiros','map',rots().length);
 const lvl=(n,a)=>a[Math.min(4,Math.max(0,n-1))],intens=p.intens||2,lot=p.lot||3,custo=p.pago?3:1,meter=(l,n,txt)=>`<div class="location-meter"><div class="location-tp"><span>${l}</span><span>${txt}</span></div><i><b style="--location-w:${n*20}%"></b></i></div>`;
 $('#lMeters').innerHTML=`<h3 class="location-mh">Como é a experiência</h3><div class="location-meters">`+meter('Esforço físico',intens,lvl(intens,['Bem leve','Leve','Moderado','Intenso','Desafiador']))+meter('Movimento de pessoas',lot,lvl(lot,['Bem tranquilo','Tranquilo','Médio','Movimentado','Lotado']))+meter('Custo',custo,lvl(custo,['Gratuito','Econômico','Moderado','Alto','Premium']))+`</div>`;
 const pub=(p.publico&&p.publico.length?p.publico:['Todos os públicos']),lev=(p.levar&&p.levar.length?p.levar:['Água','Protetor solar','Calçado confortável']);
 $('#lMore').innerHTML=`<h3 class="location-mh">Quem vai gostar</h3><div class="location-chipsl">${pub.map((x,i)=>`<span style="--location-i:${i}">${ico(t.icon)}${esc(x)}</span>`).join('')}</div><h3 class="location-mh" style="margin-top:1.3rem">O que levar</h3><ul class="location-check">${lev.map((x,i)=>`<li style="--location-i:${i}"><span class="location-ck">${ico('check')}</span>${esc(x)}</li>`).join('')}</ul>`;
 $('#lTip').innerHTML=`${ico('sparkles')}<span><b>Dica rápida:</b> ${esc(p.dica||((p.fb&&p.fb[0])?p.fb[0][2]:'')||'Confirme horários e condições antes de ir.')}</span>`;
 const ph=['Conheça o local','Veja as fotos','Confira os horários','Trace o caminho','Leia as avaliações','Ouça os moradores','Monte seu roteiro','Favorite','Compartilhe','Volte sempre'];
 $('#ribTrk').innerHTML=ph.concat(ph).map(x=>`<span>${x}</span>`).join('');
}

/* ---- relógio ao vivo nos horários ---- */
let liveTm=null;const pad2=n=>String(n).padStart(2,'0');
function renderLive(){
 const p=P();$('#lLive').innerHTML=`<span class="location-dotp" id="lvDot"></span><div><small id="lvL"></small><b id="lvT">--:--:--</b></div><div class="location-lvp"><small id="lvP"></small><i><b id="lvB"></b></i></div>`;
 const h=p.h[new Date().getDay()],mm=x=>{const[a,b]=x.split(':');return +a*60+ +b};let win='left:0;width:0';
 if(h==='24h')win='left:0;width:100%';else if(h)win=`left:${mm(h[0])/14.4}%;width:${(mm(h[1])-mm(h[0]))/14.4}%`;
 $('#lTl').innerHTML=`<div class="location-bar24"><span class="location-win" style="${win}"></span><span class="location-nowm" id="lvN"></span></div><div class="location-ticks"><span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>24h</span></div>`;
 tickLive();if(!liveTm)liveTm=setInterval(tickLive,1000);
}
function tickLive(){
 const dot=$('#lvDot');if(!dot)return;const p=P(),now=new Date(),day=now.getDay(),h=p.h[day];
 const at=(d,t)=>{const[hh,m]=t.split(':'),x=new Date(now);x.setDate(now.getDate()+d);x.setHours(+hh,+m,0,0);return x};
 const fmt=ms=>{const s0=Math.max(0,Math.floor(ms/1000)),d=Math.floor(s0/86400),r=s0%86400;return(d?d+'d ':'')+pad2(Math.floor(r/3600))+':'+pad2(Math.floor(r%3600/60))+':'+pad2(r%60)};
 let lab='',time='--:--:--',pct=0,ok=false,ptxt='';
 if(h==='24h'){ok=true;lab='Aberto 24 horas · agora';time=pad2(now.getHours())+':'+pad2(now.getMinutes())+':'+pad2(now.getSeconds());pct=100;ptxt='O dia todo'}
 else{let found=false;
  if(h){const o=at(0,h[0]),c=at(0,h[1]);if(now>=o&&now<c){ok=found=true;lab='Fecha em';time=fmt(c-now);pct=(now-o)/(c-o)*100;ptxt=`Aberto das ${h[0]} às ${h[1]}`}else if(now<o){found=true;lab='Abre em';time=fmt(o-now);ptxt=`Abre hoje às ${h[0]}`}}
  if(!found){for(let i=1;i<=7;i++){const hh=p.h[(day+i)%7];if(hh){const hs=hh==='24h'?'00:00':hh[0];lab=`Abre ${i===1?'amanhã':DAYS[(day+i)%7].toLowerCase()} às ${hs} em`;time=fmt(at(i,hs)-now);ptxt='Fechado agora';break}}if(!lab)lab='Sem horários cadastrados'}}
 $('#lLive').classList.toggle('location-no',!ok);$('#lvL').textContent=lab;$('#lvT').textContent=time;$('#lvB').style.width=pct+'%';$('#lvP').textContent=ptxt;
 const n=$('#lvN');if(n)n.style.left=((now.getHours()*60+now.getMinutes())/14.4)+'%';
}
/* ---- animações ao rolar (números, medidores, listas) ---- */
const io3=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');e.target.querySelectorAll('.location-cnt').forEach(countUp);if(e.target.classList.contains('location-st4'))e.target.querySelectorAll('.location-cnt').forEach(countUp);io3.unobserve(e.target)}}),{threshold:.25});
function observeAnim(){$$('.location-an:not(.is-visible)').forEach(el=>io3.observe(el))}
function countUp(el){const to=+el.dataset.to,dec=+el.dataset.dec||0,f=v=>v.toFixed(dec).replace('.',',');if(reduce){el.textContent=f(to);return}const t0=performance.now();(function fr(t){const p=Math.min(1,(t-t0)/1300),k=1-Math.pow(1-p,3);el.textContent=f(to*k);if(p<1)requestAnimationFrame(fr)})(t0)}
let gal=[],gi=0;
function renderGal(){
 const p=P();gal=(p.photos||[]).map(src=>({src,cap:p.n})).concat(T().gal.map(g=>({src:IMG(g+'.jpg'),cap:'Na região'}))).slice(0,Math.max(4,(p.photos||[]).length));
 $('#mosaic').innerHTML=gal.map((g,i)=>`<button class="location-gallery__item" data-i="${i}" aria-label="Ampliar foto ${i+1}"><img src="${g.src}" alt="${esc(g.cap)}" loading="lazy"><span>${ico('image')}${i+1}/${gal.length}</span></button>`).join('');
}
function showLb(i){gi=(i+gal.length)%gal.length;$('#lbImg').src=gal[gi].src;$('#lbImg').alt=`Foto ${gi+1} de ${P().n}`;$('#lbCap').textContent=`${gi+1} / ${gal.length}`}
function renderHours(){renderLive();
 const p=P(),st=openStatus(),td=new Date().getDay();
 $('#lStatus').innerHTML=`<span class="pill-st ${st.ok?'ok':'no'}">${ico('clock')}${st.txt}</span>`;
 $('#lHrs').innerHTML=DAYS.map((d,i)=>{const h=p.h[i];return `<tr class="${i===td?'today':''}"><td>${d}${i===td?' · hoje':''}</td><td class="${h?'':'closed'}">${h==='24h'?'24 horas':(h?h[0]+' – '+h[1]:'Fechado')}</td></tr>`}).join('');
 $('#lPrice').textContent=p.pago?'Pago':'Gratuito';$('#lPriceTxt').textContent=p.priceTxt;
 $('#lAddr').textContent=p.end;$('#lCity').textContent=p.loc;
 const c=p.contato||{};$('#lContato').innerHTML=(c.tel?`<p>${ico('phone')}<a href="tel:${esc(c.tel.replace(/[^+\d]/g,''))}">${esc(c.tel)}</a></p>`:'')+(c.email?`<p>${ico('mail')}<a href="mailto:${esc(c.email)}">${esc(c.email)}</a></p>`:'')+(c.site&&/^https?:\/\//i.test(c.site)?`<p>${ico('globe')}<a href="${esc(c.site)}" target="_blank" rel="noopener noreferrer">${esc(c.site)}</a></p>`:'');
}
function renderRevs(){renderRevs0();$('#revMore').hidden=revs().length<=revLimit;$('#revCount').textContent=revs().length+(revs().length===1?' avaliação':' avaliações')}
let revSort='recentes',revLimit=4;
const sortedRevs=r=>{const a=[...r];a.sort(revSort==='melhor'?(x,y)=>y.n-x.n||y.ts-x.ts:revSort==='pior'?(x,y)=>x.n-y.n||y.ts-x.ts:(x,y)=>y.ts-x.ts);return a.slice(0,revLimit)};
function renderRevs0(){
 const r=revs(),avg=avgOf();$('#avg').innerHTML=`${avg.toFixed(1).replace('.',',')}${stars(avg)}<small>${r.length} avaliações</small>`;
 $('#bars').innerHTML=[5,4,3,2,1].map(n=>{const c=r.filter(x=>x.n===n).length;return `<div class="location-rbar"><span>${n} ★</span><i><b style="width:${r.length?c/r.length*100:0}%"></b></i><span>${c}</span></div>`}).join('');
 $('#revs').innerHTML=sortedRevs(r).map(x=>`<li class="location-review"><header><span class="location-av2" aria-hidden="true">${esc(x.a[0].toUpperCase())}</span><div><b>${esc(x.a)}</b><br><small>${ago(x.ts)}</small></div>${stars(x.n)}</header><p>${esc(x.t)}</p>${mineOrAdmin(x)?`<button class="location-button location-button--ghost location-button--extra-small" data-delrev="${x.id}" style="margin-top:.6rem">${ico('trash')}Excluir</button>`:''}</li>`).join('');
}
function renderFb(){
 $('#fbs').innerHTML=fbs().map(x=>`<article class="location-feedback__card"><span class="location-tipt">${ico('pin')}Dica do local</span><p>${esc(x.t)}</p><b>${esc(x.a)}</b><small>${esc(x.r)}</small>${mineOrAdmin(x)?`<button class="location-button location-button--ghost location-button--extra-small" data-delfb="${x.id}" style="margin-top:.6rem">${ico('trash')}Excluir</button>`:''}</article>`).join('')||'<p>Ainda não há dicas por aqui.</p>';
}
function renderAdmin(){
  // O painel administrativo completo roda isolado no iframe AdminDashboardTemplate.
  // Estes alvos opcionais ficam disponíveis para compatibilidade com versões antigas.
  const statusElement = $('#stt');
  if (statusElement) {
    const status = RC.placeStatus(slug);
    const statusLabel = {
      aprovado: 'Aprovado',
      pendente: 'Pendente de aprovação',
      reprovado: 'Reprovado',
    }[status] || status;
    const statusModifier = {
      aprovado: 'approved',
      pendente: 'pending',
      reprovado: 'rejected',
    }[status] || 'pending';

    statusElement.textContent = statusLabel;
    statusElement.className = `location-stt location-stt--${statusModifier}`;
  }

  const reportsElement = $('#repl');
  if (reportsElement) {
    const reports = S.rep.filter(report => report.slug === slug);
    reportsElement.innerHTML = reports.length
      ? reports.map(report => `<li><b>${esc(report.motivo)}</b> · ${ago(report.ts)}${report.user ? ' · ' + esc(report.user) : ''}${report.resolvida ? ' · <b>resolvida</b>' : ''}<br>${esc(report.texto)}<div style="margin-top:.4rem;display:flex;gap:.4rem;flex-wrap:wrap">${report.resolvida ? '' : `<button class="location-button location-button--outline location-button--extra-small" data-resrep="${esc(report.id || '')}">Marcar resolvida</button>`}<button class="location-button location-button--outline location-button--extra-small" data-delrep="${esc(report.id || '')}">Excluir</button></div></li>`).join('')
      : '<li>Nenhuma denúncia.</li>';
  }
}
function applyRole(){
 const L=LVL[RC.role()],u=me();
 $('#btnFav').hidden=false;
 $('#lockRev').hidden=L>=1;$('#revForm').hidden=L<1;$('#btnReport').hidden=L<1;
 $('#btnFb').hidden=L<2;$('#btnCreate').hidden=L<2;
 const la=$('#lockRev a');if(la)la.href=RC.loginUrl('entrar');
 if(u){const mine=revs().find(r=>r.uid===u.id),f=$('#revForm');$('#revAs').textContent='Avaliando como '+u.nome;
  f.querySelectorAll('input[name=nota]').forEach(i=>i.checked=!!mine&&+i.value===mine.n);f.elements.texto.value=mine?mine.t:'';f.querySelector('button[type=submit]').textContent=mine?'Atualizar minha avaliação':'Publicar avaliação'}
}
function renderAll(){renderHero();renderInfo();renderGal();renderHours();renderRevs();renderFb();renderAdmin();applyRole();renderDestinos();renderRot();renderStyleP();observeAnim()}

/* ===== construção da interface ===== */
$('#styRow').innerHTML=ORDER.map(id=>`<button class="location-style-selector__option" data-t="${id}" aria-pressed="false"><img src="${IMG('card-'+id+'.jpg')}" alt="">${THEMES[id].label}</button>`).join('');
$('#styRow').addEventListener('click',e=>{const b=e.target.closest('.location-style-selector__option');if(b)setStyle(b.dataset.t,e)});
/* ações */
$('#btnFav').addEventListener('click',()=>{if(!RC.need('favoritar locais'))return;const on=RC.toggleFav(slug);renderHero();toast(on?'Adicionado aos favoritos':'Removido dos favoritos')});
$('#btnShare').addEventListener('click',async()=>{if(navigator.share){try{await navigator.share({title:document.title,url:location.href});return}catch(e){if(e&&e.name==='AbortError')return}}(navigator.clipboard?.writeText(location.href)||Promise.reject()).then(()=>toast('Link copiado!'),()=>toast('Copie o endereço na barra do navegador.'))});
$('#mosaic').addEventListener('click',e=>{const b=e.target.closest('.location-gallery__item');if(b){showLb(+b.dataset.i);$('#lb').showModal()}});
$('#lbPrev').onclick=()=>showLb(gi-1);$('#lbNext').onclick=()=>showLb(gi+1);$('#lbX').onclick=()=>$('#lb').close();
$('#lb').addEventListener('keydown',e=>{if(e.key==='ArrowLeft')showLb(gi-1);if(e.key==='ArrowRight')showLb(gi+1)});
$('#lb').addEventListener('click',e=>{if(e.target.id==='lb')e.target.close()});
$$('dialog [data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());
/* avaliar (1 avaliação por pessoa; dá para atualizar ou excluir a sua) */
const fieldErr=(f,k,m)=>{f.querySelector(`[data-for=${k}]`).textContent=m||''};
$('#revForm').addEventListener('submit',e=>{e.preventDefault();if(!RC.need('avaliar'))return;const f=e.target,el=f.elements,nota=+(f.querySelector('input[name=nota]:checked')?.value||0),t=el.texto.value.trim(),u=me();
 fieldErr(f,'nota',nota?'':'Escolha uma nota.');fieldErr(f,'texto',t.length>=5?'':'Escreva um comentário.');if(!nota||t.length<5)return;
 const r=revs(),mine=r.find(x=>x.uid===u.id);
 if(mine){mine.n=nota;mine.t=t;mine.ts=Date.now()}else r.push({id:'r'+Date.now(),a:u.nome,uid:u.id,n:nota,t,ts:Date.now()});
 save();renderRevs();renderHero();applyRole();toast(mine?'Avaliação atualizada.':'Avaliação publicada. Obrigado!')});
$('#revs').addEventListener('click',e=>{const b=e.target.closest('[data-delrev]');if(!b)return;const r=revs(),x=r.find(v=>v.id===b.dataset.delrev);if(!x||!mineOrAdmin(x)||!confirm('Excluir esta avaliação?'))return;
 S.rev[slug]=r.filter(v=>v!==x);save();renderRevs();renderHero();applyRole();toast('Avaliação excluída.')});
/* reportar */
$('#btnReport').addEventListener('click',()=>{if(RC.need('reportar um problema'))$('#dlgRep').showModal()});
$('#repForm').addEventListener('submit',e=>{e.preventDefault();const f=e.target,t=f.elements.texto.value.trim();fieldErr(f,'texto',t.length>=5?'':'Descreva o problema.');if(t.length<5)return;
 S.rep.push({id:'d'+Date.now(),slug,place:P().n,motivo:f.elements.motivo.value,texto:t,ts:Date.now(),uid:me().id,user:me().nome,resolvida:false});save();f.reset();$('#dlgRep').close();renderAdmin();toast('Denúncia enviada para análise.')});
/* dica de morador */
$('#btnFb').addEventListener('click',()=>{if(!RC.need('escrever dicas de morador','morador'))return;const u=me(),f=$('#fbForm').elements;f.autor.value=u.nome;f.autor.readOnly=true;$('#dlgFb').showModal()});
$('#fbForm').addEventListener('submit',e=>{e.preventDefault();if(!RC.need('escrever dicas de morador','morador'))return;const f=e.target,t=f.elements.texto.value.trim(),u=me();
 fieldErr(f,'texto',t.length>=10?'':'Conte um pouco mais.');if(t.length<10)return;
 fbs().unshift({id:'f'+Date.now(),a:u.nome,uid:u.id,r:`Morador(a) de ${u.cidade}/${u.uf}${u.cepOk?' · localidade verificada':''}`,t,ts:Date.now()});save();f.reset();$('#dlgFb').close();renderFb();toast('Dica publicada!')});
$('#fbs').addEventListener('click',e=>{const b=e.target.closest('[data-delfb]');if(!b)return;const l=fbs(),x=l.find(v=>v.id===b.dataset.delfb);if(!x||!mineOrAdmin(x)||!confirm('Excluir esta dica?'))return;S.fb[slug]=l.filter(v=>v!==x);save();renderFb();toast('Dica excluída.')});

/* sessão mudou (login, logout, modo demonstração): atualiza a tela toda */
addEventListener('rc:session',()=>{mergeUserPlaces();if(!visible(slug)){slug=SEEDKEYS.find(visible)||SEEDKEYS[0];tema=PLACES[slug].tema;applyTema()}renderAll();if($('#drawer').open)drawer(drTab)});

/* ===================== TUDO ABRE DENTRO DESTA TELA ===================== */
const stBadge=x=>`<span class="xst ${x==='aprovado'?'a':x==='pendente'?'p':'r'}">${({aprovado:'Aprovado',pendente:'Em análise',reprovado:'Reprovado'})[x]||x}</span>`;
const nameOfPlace=k=>(RC.placeInfo(k)||{n:k}).n;
/* ---- Explorar outros locais ---- */
const CATSC={'Praias':['#7BE0F2','waves'],'Histórico':['#FFC107','landmark'],'Cidades':['#9DB8FF','building'],'Natureza':['#6BDDA0','mountain'],'Aventura':['#FF9A6B','compass']};
const PLACE_IMG={campeche:'g-copa-aerea',pelourinho:'g-selaron','ouro-preto':'hero-romanticos',paulista:'g-paulista','pao-de-acucar':'hero-montanhas','chapada-diamantina':'hero-natureza','tirolesa-brotas':'g-ponte','amazonia-reserva':'g-trilha'};
const placeImg=k=>{const p=PLACES[k];return(p.photos&&p.photos[0])||IMG((PLACE_IMG[k]||('card-'+p.tema))+'.jpg')};
const catOf=k=>RC.THEME_CAT[PLACES[k].tema]||'Cidades',ufOf=k=>(PLACES[k].loc.split(', ').pop()||'').toUpperCase();
let dF='',dQ='',dUF='',dP='',dLim=8;
function renderDestinos(){
 const ks=Object.keys(PLACES).filter(visible),ufs=[...new Set(ks.map(ufOf))].sort();
 $('#dUF').innerHTML='<option value="">Todos os estados</option>'+ufs.map(u=>`<option ${dUF===u?'selected':''}>${u}</option>`).join('');
 $('#dFil').innerHTML=`<button type="button" class="location-dchip" data-df="" aria-pressed="${dF===''}">${ico('grid')}Todos os estilos</button>`+ORDER.map(id=>`<button type="button" class="location-dchip" data-df="${id}" aria-pressed="${dF===id}">${ico(THEMES[id].icon)}${THEMES[id].label}</button>`).join('');
 $$('#dSeg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.dp===dP));renderDGrid();
}
function renderDGrid(){
 const q=dQ.trim().toLowerCase(),all=Object.keys(PLACES).filter(k=>visible(k)&&(!dF||PLACES[k].tema===dF)&&(!dUF||ufOf(k)===dUF)&&(!dP||(dP==='g')===!PLACES[k].pago)&&(!q||(PLACES[k].n+' '+PLACES[k].loc+' '+catOf(k)+' '+THEMES[PLACES[k].tema].label).toLowerCase().includes(q))),ks=all.slice(0,dLim);
 $('#dCount').textContent=all.length?`${all.length} ${all.length>1?'locais encontrados':'local encontrado'}`:'';$('#dMore').hidden=all.length<=dLim;
 $('#dGrid').innerHTML=ks.length?ks.map((k,i)=>{const p=PLACES[k],cat=catOf(k),cc=CATSC[cat]||['#FFC107','pin'],ps=RC.placeStatus(k),fav=RC.isFav(k);
  return `<article class="location-plc" style="--location-c:${cc[0]};--location-d:${i*.05}s"><div class="location-im" data-view="${esc(k)}"><img src="${placeImg(k)}" alt="" loading="lazy"><button type="button" class="location-fv" data-favp="${esc(k)}" aria-pressed="${fav}" aria-label="${fav?'Remover dos favoritos':'Favoritar'} ${esc(p.n)}">${ico('heart')}</button><span class="pr ${p.pago?'p':''}">${p.pago?'Pago':'Gratuito'}</span></div>
  <div class="location-bd"><span class="location-ct">${ico(cc[1])}${cat}</span><h4 data-view="${esc(k)}">${esc(p.n)}</h4><span class="location-lc">${ico('pin')}${esc(p.loc)}</span>${ps!=='aprovado'?'<span class="location-xst location-p">Em análise</span>':''}<button type="button" class="location-button location-button--ghost" data-view="${esc(k)}">Ver detalhes</button></div></article>`}).join(''):'<p class="location-dr-empty" style="grid-column:1/-1">Nenhum local encontrado. Tente limpar os filtros.</p>';
}
/* janela rápida do local (igual à da home, com o clima do próprio local) */
const dv=$('#dlgView');let viewK=null;
function openView(k){
 const p=PLACES[k];if(!p)return;viewK=k;const t=THEMES[p.tema],cat=catOf(k),cc=CATSC[cat]||['#FFC107','pin'];
 dv.style.setProperty('--location-pvt',t.c);dv.style.setProperty('--location-pvs',t.ts);dv.style.setProperty('--location-pvd',t.td);dv.style.setProperty('--location-c',cc[0]);
 const dica=p.dica||((p.fb&&p.fb[0])?p.fb[0][2]:'')||'Confirme horários e condições antes de ir.',desc=p.desc.length>190?p.desc.slice(0,187)+'…':p.desc;
 dv.innerHTML=`<button class="location-pvx" type="button" data-x aria-label="Fechar">${ico('x')}</button><div class="location-pd"><div class="location-pdi"><img src="${placeImg(k)}" alt="${esc(p.n)}"><span class="pr ${p.pago?'p':''}">${p.pago?'Pago':'Gratuito'}</span></div>
 <div class="location-pdb"><span class="location-ct">${ico(cc[1])}${cat}</span><h2>${esc(p.n)}</h2><p class="location-lc">${ico('pin')}${esc(p.loc)}</p><p class="location-pdd">${esc(desc)}</p>
 <ul class="location-pdl"><li><b>Entrada</b>${p.pago?'Paga · '+esc(p.priceTxt||'consulte os valores'):'Gratuita'}</li><li><b>Melhor época</b>${esc(p.melhor||'Consulte')}</li><li><b>Dica</b>${esc(dica)}</li></ul>
 <div class="location-pda"><button class="location-button" type="button" data-route="${esc(k)}">${ico('map')}<span>${RC.inRoute(k)?'No meu roteiro':'Adicionar ao roteiro'}</span></button><a class="location-button location-button--ghost" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.coords?p.coords.lat+','+p.coords.lng:p.n+' '+p.loc)}">${ico('nav')}Ver no mapa</a><button class="location-button location-button--ghost" type="button" data-openplace>Abrir página do local</button></div></div></div>`;
 dv.showModal();
}
dv.addEventListener('click',e=>{
 if(e.target===dv||e.target.closest('[data-x]')){dv.close();return}
 const r=e.target.closest('[data-route]');if(r){const on=RC.toggleRoute(r.dataset.route);r.querySelector('span').textContent=on?'No meu roteiro':'Adicionar ao roteiro';toast(on?'Adicionado ao seu roteiro.':'Removido do seu roteiro.');return}
 if(e.target.closest('[data-openplace]')){const k=viewK;dv.close();goPlace(k,e)}
});
$('#dUF').addEventListener('change',e=>{dUF=e.target.value;dLim=8;renderDGrid()});
$('#dSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;dP=b.dataset.dp;dLim=8;renderDestinos()});
$('#dClr').addEventListener('click',()=>{dF=dQ=dUF=dP='';dLim=8;$('#dQ').value='';renderDestinos()});
$('#dMore').addEventListener('click',()=>{dLim+=8;renderDGrid()});
/* ---- Roteiros de outras pessoas ---- */
const rots=()=>S.rot[slug]||(S.rot[slug]=((PLACES[slug].rot)||[]).map((r,i)=>({id:slug+'-r'+i,a:r[0],titulo:r[1],dur:r[2],custo:r[3],paradas:r[4],dica:r[5],base:r[6],likers:[],ts:nowMs-(i+2)*86400000})),save(),S.rot[slug]);
const rotLikes=r=>(r.base||0)+(r.likers||[]).length;
function renderRot(){
 const l=rots(),u=me();
 $('#rGrid').innerHTML=l.length?l.map((r,i)=>{const liked=!!u&&(r.likers||[]).includes(u.id),st=r.paradas||[];
  return `<article class="location-route-card" style="--location-d:${i*.06}s"><div class="location-rh"><h4>${esc(r.titulo)}</h4><span class="location-rl">${ico('heart')}${rotLikes(r)}</span></div><div class="location-rb"><div class="location-rmeta"><span>${ico('clock')}${esc(r.dur)}</span><span>${ico('dollar')}${esc(r.custo)}</span><span>${ico('pin')}${st.length} paradas</span></div>
  <ol class="location-routes__steps">${st.map((x,j)=>`<li class="${j>=3?'hid':''}">${esc(x)}</li>`).join('')}</ol>${st.length>3?'<button type="button" class="location-linkbtn" data-rexp>Ver roteiro completo</button>':''}${r.dica?`<p class="location-rtip">${ico('sparkles')}${esc(r.dica)}</p>`:''}
  <div class="location-rby"><span class="location-av2" aria-hidden="true">${esc((r.a||'?')[0].toUpperCase())}</span>por ${esc(r.a)} · ${ago(r.ts)}</div></div>
  <div class="location-rfoot"><button type="button" class="location-button location-rsave location-button--ghost location-button--extra-small" data-rsave="${esc(r.id)}" aria-pressed="${liked}">${ico('heart')}${liked?'Salvo':'Salvar roteiro'}</button>${mineOrAdmin(r)?`<button type="button" class="location-button location-button--extra-small location-button--danger" data-rdel="${esc(r.id)}">${ico('trash')}Excluir</button>`:''}</div></article>`}).join(''):'<p class="location-dr-empty" style="grid-column:1/-1">Ainda não há roteiros para este local. Seja a primeira pessoa a criar um!</p>';
}
const fr=$('#fRot');
function openRot(){if(!RC.need('criar um roteiro'))return;fr.reset();$$('[data-for]',fr).forEach(x=>x.textContent='');$('#rotFor').textContent='Roteiro para: '+P().n;$('#dlgRot').showModal()}
fr.addEventListener('submit',e=>{e.preventDefault();if(!RC.need('criar um roteiro'))return;const el=fr.elements,u=me(),t=el.titulo.value.trim(),st=el.paradas.value.split('\n').map(x=>x.trim()).filter(Boolean).slice(0,8);
 fieldErr(fr,'titulo',t.length>=4?'':'Dê um título ao roteiro.');fieldErr(fr,'paradas',st.length>=2?'':'Informe ao menos 2 paradas (uma por linha).');if(t.length<4||st.length<2)return;
 rots().unshift({id:slug+'-u'+Date.now(),a:u.nome,uid:u.id,titulo:t,dur:el.dur.value,custo:el.custo.value,paradas:st,dica:el.dica.value.trim(),base:0,likers:[],ts:Date.now()});save();$('#dlgRot').close();renderRot();renderInfo();observeAnim();toast('Roteiro publicado! Obrigado por compartilhar.')});
$('#btnNewRot').addEventListener('click',openRot);
$('#rGrid').addEventListener('click',e=>{
 const ex=e.target.closest('[data-rexp]');if(ex){const c=ex.closest('.location-route-card');c.classList.toggle('is-open');ex.textContent=c.classList.contains('is-open')?'Mostrar menos':'Ver roteiro completo';return}
 const sv=e.target.closest('[data-rsave]');if(sv){if(!RC.need('salvar roteiros'))return;const r=rots().find(x=>x.id===sv.dataset.rsave),u=me();r.likers=r.likers||[];const k=r.likers.indexOf(u.id);k>=0?r.likers.splice(k,1):r.likers.push(u.id);save();renderRot();toast(k>=0?'Roteiro removido dos salvos.':'Roteiro salvo! Veja em Minha conta › Meus roteiros.');return}
 const dl=e.target.closest('[data-rdel]');if(dl&&confirm('Excluir este roteiro?')){const r=rots().find(x=>x.id===dl.dataset.rdel);if(r&&mineOrAdmin(r)){S.rot[slug]=rots().filter(x=>x!==r);save();renderRot();renderInfo();observeAnim();toast('Roteiro excluído.')}}
});
/* ---- painel flutuante: escolha o estilo do local (de qualquer ponto da página) ---- */
const sp=$('#styleP');
function renderStyleP(){const open=sp._open;sp.innerHTML=`<button class="location-sp-t" id="spT" type="button" aria-expanded="${!!open}">${ico('sparkles')}<span>Estilo: <b>${THEMES[tema].label}</b></span><i class="location-sp-dot"></i></button><div class="location-sp-l" id="spL" ${open?'':'hidden'}><b>Escolha o estilo do local</b>${ORDER.map(id=>`<button type="button" data-sp="${id}" aria-pressed="${id===tema}"><i style="background:${THEMES[id].c}"></i>${ico(THEMES[id].icon)}${THEMES[id].label}</button>`).join('')}</div>`}
sp.addEventListener('click',e=>{const t=e.target.closest('#spT');if(t){sp._open=!sp._open;renderStyleP();return}const b=e.target.closest('[data-sp]');if(b){setStyle(b.dataset.sp,e)}});
root.addEventListener('click',e=>{if(sp._open&&!e.target.closest('#styleP')){sp._open=false;renderStyleP()}});
root.addEventListener('keydown',e=>{if(e.key==='Escape'&&sp._open){sp._open=false;renderStyleP()}});
/* ---- Painel "Minha conta" ---- */
const dr=$('#drawer'),DR=[['dados','Meus dados','user',1],['lugares','Lugares para conhecer','heart',1],['roteiros','Meus roteiros','map',1],['historias','Minhas histórias','pen',1],['cadastrar','Cadastrar local','plus',2],['locais','Meus locais','pin',2],['seguranca','Segurança','lock',1]];
let drTab='dados';
function drawer(tab){
 tab=({favoritos:'lugares',atividades:'dados',plano:'dados'})[tab]||tab;
 const L=LVL[RC.role()];let t=DR.find(d=>d[0]===tab);
 if(L<1){RC.openAuth('entrar','acessar a sua conta');return}
 if(!t||L<t[3])t=DR[0];
 drTab=t[0];drawRender();if(!dr.open)dr.showModal();
}
function drawRender(){
 const L=LVL[RC.role()],u=me();if(!DR.find(d=>d[0]===drTab&&L>=d[3]))drTab='dados';const cur=DR.find(d=>d[0]===drTab);
 $('#drTabs').innerHTML=DR.filter(d=>L>=d[3]).map(d=>`<button type="button" role="tab" data-drt="${d[0]}" aria-selected="${d[0]===drTab}">${ico(d[2])}${d[1]}</button>`)+(L>=3?`<button type="button" data-goadmin>${ico('shield')}Área do administrador</button>`:'');
 $('#drAv').textContent=u?u.nome[0].toUpperCase():'?';$('#drT').textContent=u?u.nome:'Visitante';$('#drR').textContent=RC.ROLE_LABEL[RC.role()];
 $('#drH').innerHTML=ico(cur[2])+cur[1];$('#drB').innerHTML=DRR[drTab]();
}
function openAdminArea(){if(RC.role()!=='admin')return;const h=$('#admArea');h.innerHTML='';const f=document.createElement('iframe');f.title='Área do administrador';f.style.cssText='border:0;width:100%;height:100%;display:block';f.srcdoc=$('#admSrc').textContent.replace(/<\\\/script/g,'</script');h.appendChild(f);if(dr.open)dr.close();h.hidden=false;document.documentElement.style.overflow='hidden'}
window.addEventListener('message',e=>{if(e.data==='rc-admin-close'){location.reload()}else if(e.data==='rc-admin-logout'){RC.logout();location.reload()}});
/* acompanhamento da análise do cadastro (nativo) */
const jg=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch{return d}};
function watchPlaces(){const u=me();if(!u||u.role!=='morador')return;const k='rc_seen_'+u.id,seen=jg(k,{});let msg='',chg=false;
 RC.userPlaces().filter(p=>p.owner===u.id).forEach(p=>{const prev=seen[p.slug]||'pendente';if(p.status!==prev){chg=true;msg=p.status==='aprovado'?`Seu local “${p.n}” foi APROVADO e já está no site!`:p.status==='reprovado'?`Seu local “${p.n}” foi REPROVADO: ${p.motivo||'sem motivo informado'}.`:msg}seen[p.slug]=p.status});
 try{localStorage.setItem(k,JSON.stringify(seen))}catch{/* A comparação de status continua válida durante esta sessão. */}
 if(chg){try{mergeUserPlaces();renderAll()}catch{/* Mantém a interface atual se a atualização dos locais falhar. */}if(dr.open&&drTab==='locais')drawRender();if(msg)toast(msg)}}
setInterval(watchPlaces,2000);window.addEventListener('storage',watchPlaces);setTimeout(watchPlaces,600);
const DRR={
 roteiros(){const u=me(),r=RC.route().map(k=>RC.placeInfo(k)).filter(Boolean),saved=u?Object.entries(S.rot).flatMap(([k,a])=>a.filter(x=>(x.likers||[]).includes(u.id)).map(x=>({...x,k}))):[];
  return `<h4 class="location-sec-h" style="margin-top:0">Meu roteiro · ${r.length} ${r.length===1?'local':'locais'}</h4>`+(r.length?`<ol class="location-account-drawer__list">${r.map((p,i)=>`<li class="location-account-drawer__item"><span class="location-grow"><b>${i+1}. ${esc(p.n)}</b><small>${esc(p.l)} · ${esc(p.p)}</small></span><button type="button" class="location-button location-button--extra-small" data-dplace="${esc(p.s)}">Abrir</button><button type="button" class="location-button location-button--extra-small location-button--danger" data-rmroute="${esc(p.s)}">${ico('trash')}Remover</button></li>`).join('')}</ol>`:'<p class="location-dr-empty">Seu roteiro está vazio. Em <b>Explore outros locais</b>, use <b>Adicionar ao roteiro</b>.</p>')
  +`<h4 class="location-sec-h">Roteiros salvos de outras pessoas</h4>`+(u?(saved.length?`<ul class="location-account-drawer__list">${saved.map(x=>`<li class="location-account-drawer__item"><span class="location-grow"><b>${esc(x.titulo)}</b><small>${esc(nameOfPlace(x.k))} · ${esc(x.dur)} · por ${esc(x.a)}</small></span><button type="button" class="location-button location-button--extra-small" data-dplace="${esc(x.k)}">Abrir local</button><button type="button" class="location-button location-button--extra-small location-button--danger" data-unsaverot="${esc(x.k)}|${esc(x.id)}">${ico('trash')}</button></li>`).join('')}</ul>`:'<p class="location-dr-empty">Você ainda não salvou roteiros. Use <b>Salvar roteiro</b> na seção Roteiros.</p>'):'<p class="location-hint">Entre na conta para salvar roteiros. <button type="button" class="location-linkbtn" data-auth="entrar">Entrar</button></p>')},
 dados(){const u=me(),pt=u.nome.split(' '),pn=pt.shift(),sn=pt.join(' '),demo=u.id.startsWith('demo-');return `<form class="location-lform" id="fDados" novalidate><div class="location-pgrid">
   <label>Nome<input name="nome" value="${esc(pn)}"><span class="location-err" data-for="nome"></span></label><label>Sobrenome<input name="sobrenome" value="${esc(sn)}"></label>
   <label class="location-button--full">E-mail<input value="${esc(u.email)}" readonly></label>
   <label class="location-button--full">Senha<input value="••••••••" readonly aria-describedby="pwh"><span class="location-hint" id="pwh">Por segurança a senha é guardada criptografada e não pode ser exibida. <button type="button" class="location-linkbtn" data-drt="seguranca">Alterar senha</button> · <button type="button" class="location-linkbtn" data-forgot>Esqueci a senha</button></span></label>
   <label>Cidade<input name="cidade" value="${esc(u.cidade)}"></label><label>UF<input name="uf" maxlength="2" value="${esc(u.uf)}" style="text-transform:uppercase"></label>
   <p class="location-err location-button--full" id="dadosErr" role="alert"></p><div class="location-button--full"><button class="location-button" type="submit">Salvar alterações</button></div></div></form>
  <h4 class="location-sec-h">Sessão e conta</h4><div style="display:flex;gap:.6rem;flex-wrap:wrap"><button type="button" class="location-button location-button--ghost" data-logout>${ico('logout')}Sair</button><button type="button" class="location-button location-button--danger" data-delacc ${demo?'disabled':''}>${ico('trash')}Excluir conta</button></div>${demo?'<p class="location-hint" style="margin-top:.6rem">As contas de teste não podem ser excluídas (crie uma conta nova para testar).</p>':''}
  <div id="delBox" class="location-account-drawer__item" hidden style="flex-direction:column;align-items:stretch;gap:.5rem;margin-top:.8rem"><b>Excluir conta permanentemente</b><small>A exclusão é <b>permanente</b> e não pode ser desfeita: seus dados, lugares e roteiros serão apagados. Para confirmar, digite <b>excluir</b>.</small><input id="delTxt" placeholder="Digite: excluir" autocomplete="off"><div style="display:flex;gap:.5rem;flex-wrap:wrap"><button type="button" class="location-button location-button--danger" id="delOk" disabled>Excluir definitivamente</button><button type="button" class="location-button location-button--ghost" data-delcancel>Cancelar</button></div></div>`},
 lugares(){const l=RC.favs().map(k=>RC.placeInfo(k)).filter(Boolean);return l.length?`<ul class="location-account-drawer__list">${l.map(p=>`<li class="location-account-drawer__item"><span class="location-grow"><b>${esc(p.n)}</b><small>${esc(p.l)} · ${esc(p.p)}</small></span><button type="button" class="location-button location-button--extra-small" data-dplace="${esc(p.s)}">Abrir</button><button type="button" class="location-button location-button--extra-small location-button--danger" data-unfav="${esc(p.s)}">${ico('trash')}Remover</button></li>`).join('')}</ul>`:'<p class="location-dr-empty">Sua lista está vazia.<br>Abra um local e clique em <b>Favoritar</b> para guardá-lo aqui.</p>'},
 historias(){const u=me(),st=RC.stories().filter(x=>x.uid===u.id),
   rv=Object.entries(S.rev).flatMap(([k,a])=>a.filter(x=>x.uid===u.id).map(x=>({k,id:x.id,h:`Avaliou ${nameOfPlace(k)} com ${x.n} ★`,d:x.t,t:x.ts}))),
   tp=Object.entries(S.fb).flatMap(([k,a])=>a.filter(x=>x.uid===u.id).map(x=>({k,id:x.id,h:`Dica em ${nameOfPlace(k)}`,d:x.t,t:x.ts}))),fb=rv.concat(tp).sort((a,b)=>b.t-a.t);
  return `<form class="location-lform" id="fHist" novalidate><div class="location-pgrid"><label class="location-button--full">Título<input name="titulo" maxlength="80"><span class="location-err" data-for="titulo"></span></label><label class="location-button--full">Sua história<textarea name="texto" maxlength="1200" placeholder="Conte uma experiência, um achado, uma lembrança de viagem…"></textarea><span class="location-err" data-for="texto"></span></label><div class="location-button--full"><button class="location-button" type="submit">${ico('pen')}Publicar no blog</button></div></div></form>
   <h4 class="location-sec-h">Minhas histórias · ${st.length}</h4>`+(st.length?`<ul class="location-account-drawer__list">${st.map(x=>`<li class="location-account-drawer__item"><span class="location-grow"><b>${esc(x.titulo)}</b><small>${ago(x.ts)} · ${esc(x.texto.slice(0,90))}</small></span><button type="button" class="location-button location-button--extra-small location-button--danger" data-delhist="${esc(x.id)}">${ico('trash')}</button></li>`).join('')}</ul>`:'<p class="location-dr-empty">Você ainda não publicou histórias.</p>')
   +`<h4 class="location-sec-h">Meus feedbacks · ${fb.length}</h4>`+(fb.length?`<ul class="location-account-drawer__list">${fb.slice(0,30).map(x=>`<li class="location-account-drawer__item"><span class="location-grow"><b>${esc(x.h)}</b><small>${ago(x.t)} · ${esc(String(x.d).slice(0,100))}</small></span><button type="button" class="location-button location-button--extra-small location-button--danger" data-delrv="${esc(x.k)}|${esc(x.id)}">${ico('trash')}</button></li>`).join('')}</ul>`:'<p class="location-dr-empty">Nenhuma avaliação ou dica ainda.</p>')},
 cadastrar(){return `<p class="location-hint" style="margin-bottom:.9rem">Informe nome, categoria, descrição, endereço, localização, horários, fotos e contato. Ao enviar, o cadastro segue para a <b>análise do administrador</b>.</p><button type="button" class="location-button" data-newplace>${ico('plus')}Abrir formulário de cadastro</button>`},
 locais(){const u=me(),l=RC.userPlaces().filter(p=>p.owner===u.id);
  return `<div style="margin-bottom:1rem"><button type="button" class="location-button" data-newplace>${ico('plus')}Cadastrar novo local</button></div>`+(l.length?`<ul class="location-account-drawer__list">${l.map(p=>`<li class="location-account-drawer__item"><span class="location-grow"><b>${esc(p.n)}</b><small>${esc(p.loc)} · ${esc(RC.THEME_LABEL[p.tema])}</small>${p.status==='pendente'?'<small style="color:#8a6d00;font-weight:800">Aguardando análise do administrador…</small>':''}${p.status==='aprovado'?'<small style="color:#0a7a5b;font-weight:800">Aprovado pelo administrador.</small>':''}${p.status==='reprovado'?`<small style="color:#b3261e;font-weight:800">Reprovado: ${esc(p.motivo||'sem motivo informado')}. Edite e reenvie.</small>`:''}</span>${stBadge(p.status)}<button type="button" class="location-button location-button--extra-small" data-dplace="${esc(p.slug)}">Ver</button><button type="button" class="location-button location-button--ghost location-button--extra-small" data-editplace="${esc(p.slug)}">${ico('pen')}Editar</button><button type="button" class="location-button location-button--extra-small location-button--danger" data-delplace="${esc(p.slug)}">${ico('trash')}Remover</button></li>`).join('')}</ul>`:'<p class="location-dr-empty">Você ainda não cadastrou locais.</p>')},
 seguranca(){return `<form class="location-lform" id="fPw" novalidate><h4 class="location-sec-h" style="margin-top:0">Alterar senha</h4>
   <label>Senha atual<input name="atual" type="password" autocomplete="current-password"><span class="location-err" data-for="atual"></span></label><label>Nova senha<input name="nova" type="password" autocomplete="new-password"><span class="location-err" data-for="nova"></span></label><label>Confirmar nova senha<input name="conf" type="password" autocomplete="new-password"><span class="location-err" data-for="conf"></span></label>
   <button class="location-button" type="submit">Salvar nova senha</button></form>`}
};
dr.addEventListener('click',e=>{const t=e.target;let b;
 if(t.closest('[data-goadmin]')){openAdminArea();return}
 if(t.closest('[data-forgot]')){dr.close();RC.openAuth('recuperar');return}
 if(t.closest('[data-delacc]')){$('#delBox').hidden=false;$('#delTxt').focus();return}
 if(t.closest('[data-delcancel]')){$('#delBox').hidden=true;$('#delTxt').value='';$('#delOk').disabled=true;return}
 if(t.closest('#delOk')){if($('#delTxt').value.trim().toLowerCase()!=='excluir')return;dr.close();RC.deleteUser(me().id);toast('Conta excluída permanentemente.');return}
 b=t.closest('[data-delhist]');if(b&&confirm('Excluir esta história?')){RC.saveStories(RC.stories().filter(x=>x.id!==b.dataset.delhist));drawRender();toast('História excluída.');return}
 b=t.closest('[data-delrv]');if(b&&confirm('Excluir este feedback?')){const[k,id]=b.dataset.delrv.split('|');S.rev[k]=(S.rev[k]||[]).filter(x=>x.id!==id);S.fb[k]=(S.fb[k]||[]).filter(x=>x.id!==id);save();drawRender();renderAll();toast('Feedback excluído.')}
});
dr.addEventListener('input',e=>{if(e.target.id==='delTxt')$('#delOk').disabled=e.target.value.trim().toLowerCase()!=='excluir'});
dr.addEventListener('submit',e=>{const f=e.target;if(f.id!=='fHist')return;const el=f.elements,u=me(),ti=el.titulo.value.trim(),tx=el.texto.value.trim();fieldErr(f,'titulo','');fieldErr(f,'texto','');
 if(ti.length<3)return fieldErr(f,'titulo','Dê um título à história.');if(tx.length<20)return fieldErr(f,'texto','Conte um pouco mais (mínimo 20 caracteres).');
 RC.saveStories([{id:'h'+Date.now(),uid:u.id,a:u.nome,titulo:ti,texto:tx,ts:Date.now()}].concat(RC.stories()));drawRender();toast('História publicada no blog!')});
dr.addEventListener('click',async e=>{
 if(e.target.closest('.location-account-drawer__close')||e.target===dr){dr.close();return}
 let rb=e.target.closest('[data-rmroute]');if(rb){RC.toggleRoute(rb.dataset.rmroute);drawRender();toast('Removido do seu roteiro.');return}
 rb=e.target.closest('[data-unsaverot]');if(rb){const[k,id]=rb.dataset.unsaverot.split('|'),r=(S.rot[k]||[]).find(x=>x.id===id),u=me();if(r&&u){r.likers=(r.likers||[]).filter(x=>x!==u.id);save();drawRender();if(k===slug)renderRot();toast('Roteiro removido dos salvos.')}return}
 let b=e.target.closest('[data-drt]');if(b){drTab=b.dataset.drt;drawRender();return}
 b=e.target.closest('[data-dplace]');if(b){dr.close();goPlace(b.dataset.dplace,e);return}
 b=e.target.closest('[data-unfav]');if(b){RC.toggleFav(b.dataset.unfav);drawRender();renderHero();toast('Removido dos favoritos.');return}
 if(e.target.closest('[data-newplace]')){dr.close();openPlace();return}
 b=e.target.closest('[data-editplace]');if(b){dr.close();openPlace(b.dataset.editplace);return}
 b=e.target.closest('[data-delplace]');if(b&&confirm('Excluir este local? Esta ação não pode ser desfeita.')){const k=b.dataset.delplace;RC.savePlaces(RC.userPlaces().filter(p=>p.slug!==k));mergeUserPlaces();if(slug===k)goPlace(SEEDKEYS[0]);drawRender();renderDestinos();toast('Local excluído.');return}
 if(e.target.closest('[data-logout]')){dr.close();RC.logout();toast('Você saiu da conta.');return}
 
 if(e.target.closest('[data-auth]')){dr.close();return}
 if(e.target.closest('[data-cepd]')){const f=$('#fDados').elements,m=$('#cepd');m.textContent='Consultando…';const r=await RC.lookupCep(f.cep.value);if(r.ok){f.cidade.value=r.cidade;f.uf.value=r.uf;f.cidade.readOnly=f.uf.readOnly=true;dr._cepOk=true;m.textContent=`Localidade confirmada: ${r.cidade}/${r.uf}.`}else{dr._cepOk=false;m.textContent=r.error}}
});
dr.addEventListener('input',e=>{if(e.target.name==='cep'&&e.target.form&&e.target.form.id==='fDados'){e.target.value=RC.maskCep(e.target.value);dr._cepOk=false;const f=e.target.form.elements;f.cidade.readOnly=f.uf.readOnly=false}});
dr.addEventListener('submit',async e=>{e.preventDefault();const f=e.target,el=f.elements;
 if(f.id==='fDados'){fieldErr(f,'nome','');$('#dadosErr').textContent='';const nome=(el.nome.value+' '+el.sobrenome.value).trim().replace(/\s+/g,' ');
  if(nome.length<3||!/\s/.test(nome))return fieldErr(f,'nome','Informe nome e sobrenome.');
  if(!el.cidade.value.trim()||!/^[A-Za-z]{2}$/.test(el.uf.value.trim()))return($('#dadosErr').textContent='Informe cidade e UF (ou use o CEP).');
  const u=me(),patch={nome,cidade:el.cidade.value.trim(),uf:el.uf.value.trim().toUpperCase()};if(dr._cepOk!==undefined)patch.cepOk=dr._cepOk;
  if(u.role!=='admin'&&el.nativo){patch.nativo=el.nativo.checked;patch.role=el.nativo.checked?'morador':'usuario'}
  RC.updateUser(u.id,patch);toast('Dados atualizados.')}
 if(f.id==='fPlano'){fieldErr(f,'perfil','');if(!el.perfil.value)return fieldErr(f,'perfil','Escolha um perfil de interesse.');
  const p={perfil:el.perfil.value,preco:el.preco.value,cidade:el.cidade.value.trim(),ts:Date.now()};p.items=RC.recommend(p).map(x=>x.s);RC.savePlan(p);drawRender();toast('Plano criado com '+p.items.length+' locais!')}
 if(f.id==='fPw'){['atual','nova','conf'].forEach(k=>fieldErr(f,k,''));if(!el.atual.value)return fieldErr(f,'atual','Informe a senha atual.');if(el.nova.value!==el.conf.value)return fieldErr(f,'conf','As senhas não conferem.');
  const r=await RC.changePassword(me().id,el.atual.value,el.nova.value);if(!r.ok)return fieldErr(f,r.field==='nova'?'nova':'atual',r.error);f.reset();toast('Senha alterada com sucesso.')}
});
/* ---- Cadastrar / editar local ---- */
const fp=$('#fPlace'),pe=fp.elements,DAYSN=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];let plPhotos=[],plEdit=null;
$('#plDays').innerHTML=DAYSN.map((d,i)=>`<div class="location-day"><b>${d}</b><input type="time" name="o${i}" value="09:00" aria-label="Abre ${d}"><input type="time" name="c${i}" value="17:00" aria-label="Fecha ${d}"><label class="location-ckl"><input type="checkbox" name="x${i}">Fechado</label></div>`).join('');
const plPh=()=>{$('#plPhotos').innerHTML=plPhotos.map((x,i)=>`<figure><img src="${x}" alt="Foto ${i+1}"><button type="button" data-rmph="${i}" aria-label="Remover foto ${i+1}">${ico('x')}</button></figure>`).join('')};
function openPlace(editSlug){
 if(!RC.need('cadastrar locais','morador'))return;const u=me(),off=RC.catsOff();
 fp.reset();plPhotos=[];plEdit=null;$('#plErr').textContent='';$$('[data-for]',fp).forEach(x=>x.textContent='');$('#plGeoMsg').textContent='';
 $('#plDays').style.opacity=1;$('#plDays').style.pointerEvents='';
 $('#plT').innerHTML=ico('plus')+'Cadastrar local';$('#plSend').textContent='Enviar cadastro';
 $('#plNote').textContent=u.role==='admin'?'Como administrador, o local é publicado imediatamente.':'Seu cadastro fica "em análise" até a equipe aprovar. Acompanhe em Minha conta › Meus locais.';
 let r=null;if(editSlug){r=RC.userPlaces().find(p=>p.slug===editSlug);if(!r||(r.owner!==u.id&&u.role!=='admin')){toast('Você não pode editar esse local.');return}plEdit=r}
 pe.tema.innerHTML='<option value="">Selecione</option>'+ORDER.filter(id=>!off.includes(id)||(r&&r.tema===id)).map(id=>`<option value="${id}">${THEMES[id].label}</option>`).join('');
 if(r){$('#plT').innerHTML=ico('pen')+'Editar local';$('#plSend').textContent='Salvar alterações';const c=r.contato||{};
  pe.nome.value=r.n;pe.tema.value=r.tema;pe.pago.value=r.pago?'1':'0';pe.priceTxt.value=r.priceTxt||'';pe.desc.value=r.desc;
  pe.end.value=(r.end||'').split(' – ')[0];const lc=(r.loc||'').split(', ');pe.cidade.value=lc[0]||'';pe.uf.value=(lc[1]||'').toUpperCase();if(r.coords){pe.lat.value=r.coords.lat;pe.lng.value=r.coords.lng}
  const h=r.h||[];if(h.length&&h.every(x=>x==='24h')){pe.h24.checked=true;$('#plDays').style.opacity=.4;$('#plDays').style.pointerEvents='none'}else h.forEach((x,i)=>{if(!x)pe['x'+i].checked=true;else if(Array.isArray(x)){pe['o'+i].value=x[0];pe['c'+i].value=x[1]}});
  (r.dest||[]).forEach((d,i)=>pe['d'+(i+1)]&&(pe['d'+(i+1)].value=d));['melhor','dur','ideal','acess'].forEach(k=>pe[k].value=r[k]||'');pe.tel.value=c.tel||'';pe.email.value=c.email||'';pe.site.value=c.site||'';plPhotos=[...(r.photos||[])]}
 plPh();$('#dlgPlace').showModal();
}
$('#plPhotos').addEventListener('click',e=>{const b=e.target.closest('[data-rmph]');if(b){plPhotos.splice(+b.dataset.rmph,1);plPh()}});
$('#plFotos').addEventListener('change',async e=>{fieldErr(fp,'fotos','');for(const file of [...e.target.files]){if(plPhotos.length>=4){fieldErr(fp,'fotos','Máximo de 4 fotos.');break}try{plPhotos.push(await RC.resizeImage(file,900,.76))}catch(x){fieldErr(fp,'fotos',x.message)}}e.target.value='';plPh()});
pe.cep.addEventListener('input',()=>pe.cep.value=RC.maskCep(pe.cep.value));
$('#plCep').onclick=async()=>{const r=await RC.lookupCep(pe.cep.value);if(!r.ok){fieldErr(fp,'end',r.error);return}fieldErr(fp,'end','');pe.cidade.value=r.cidade;pe.uf.value=r.uf;if(!pe.end.value)pe.end.value=[r.logradouro,r.bairro].filter(Boolean).join(', ');toast('Endereço preenchido pelo CEP.')};
$('#plGeo').onclick=()=>{const m=$('#plGeoMsg');if(!navigator.geolocation){m.textContent='Seu navegador não oferece geolocalização.';return}m.textContent='Obtendo localização…';
 navigator.geolocation.getCurrentPosition(p=>{pe.lat.value=p.coords.latitude.toFixed(5);pe.lng.value=p.coords.longitude.toFixed(5);m.textContent='Localização preenchida.'},x=>m.textContent=x.code===1?'Permissão negada. Digite as coordenadas.':'Não foi possível obter a localização.',{timeout:8000})};
pe.h24.addEventListener('change',()=>{$('#plDays').style.opacity=pe.h24.checked?.4:1;$('#plDays').style.pointerEvents=pe.h24.checked?'none':''});
$('#plCopy').onclick=()=>{for(let i=0;i<7;i++){if(i===1)continue;pe['o'+i].value=pe.o1.value;pe['c'+i].value=pe.c1.value;pe['x'+i].checked=pe.x1.checked}toast('Horário copiado para todos os dias.')};
fp.addEventListener('submit',e=>{e.preventDefault();if(!RC.need('cadastrar locais','morador'))return;const u=me(),admin=u.role==='admin';$('#plErr').textContent='';let bad=null;
 const chk=(k,ok,m)=>{fieldErr(fp,k,ok?'':m);if(!ok&&!bad)bad=pe[k]||fp};
 const nome=pe.nome.value.trim(),desc=pe.desc.value.trim(),cidade=pe.cidade.value.trim(),uf=pe.uf.value.trim().toUpperCase(),site=pe.site.value.trim();
 chk('nome',nome.length>=3,'Informe o nome do local.');chk('tema',!!pe.tema.value,'Escolha o estilo do local.');chk('desc',desc.length>=30,'Descreva o local (mín. 30 caracteres).');
 chk('end',pe.end.value.trim().length>=3,'Informe o endereço.');chk('cidade',cidade.length>=2,'Informe a cidade.');chk('uf',/^[A-Z]{2}$/.test(uf),'UF com 2 letras.');
 chk('email',!pe.email.value||RC.emailOk(pe.email.value),'E-mail inválido.');chk('site',!site||/^https?:\/\/[^\s.]+\.[^\s]+$/i.test(site),'Use um endereço começando com https://');
 const h=[];let hErr='';for(let i=0;i<7;i++){if(pe.h24.checked){h.push('24h');continue}if(pe['x'+i].checked){h.push(null);continue}const o=pe['o'+i].value,c=pe['c'+i].value;if(!o||!c||o>=c)hErr=`Revise o horário de ${DAYSN[i]} (abre antes de fechar).`;h.push([o,c])}
 if(!pe.h24.checked&&h.every(x=>x===null))hErr='Informe ao menos um dia de funcionamento.';fieldErr(fp,'horarios',hErr);if(hErr&&!bad)bad=$('#plDays');
 const lat=pe.lat.value.trim().replace(',','.'),lng=pe.lng.value.trim().replace(',','.');let coords=null;if(lat||lng){if(isNaN(+lat)||isNaN(+lng)||Math.abs(+lat)>90||Math.abs(+lng)>180){$('#plGeoMsg').textContent='Coordenadas inválidas.';if(!bad)bad=pe.lat}else coords={lat:+lat,lng:+lng}}
 if(bad){bad.focus&&bad.focus();return}
 const dest=[pe.d1.value,pe.d2.value,pe.d3.value].map(x=>x.trim()).filter(Boolean),ps=RC.userPlaces(),k=plEdit?plEdit.slug:'u-'+RC.slug(nome)+'-'+Math.random().toString(36).slice(2,6);
 const rec={...(plEdit||{}),slug:k,owner:plEdit?plEdit.owner:u.id,status:admin?'aprovado':'pendente',tema:pe.tema.value,n:nome,loc:`${cidade}, ${uf}`,pago:pe.pago.value==='1',priceTxt:pe.priceTxt.value.trim(),tag:desc.split(/[.!?]/)[0].slice(0,90),desc,dest,melhor:pe.melhor.value.trim(),dur:pe.dur.value.trim(),ideal:pe.ideal.value.trim(),acess:pe.acess.value.trim(),end:`${pe.end.value.trim()} – ${cidade}/${uf}`,h,photos:plPhotos,contato:{tel:pe.tel.value.trim(),email:pe.email.value.trim(),site},coords,created:plEdit?plEdit.created:Date.now(),updated:Date.now()};
 const i=ps.findIndex(p=>p.slug===k);i>=0?ps[i]=rec:ps.unshift(rec);
 if(!RC.savePlaces(ps)){$('#plErr').textContent='Não foi possível salvar: armazenamento cheio. Remova algumas fotos e tente de novo.';return}
 $('#dlgPlace').close();mergeUserPlaces();
 if(admin)goPlace(k);else{renderAll();toast(plEdit?'Local atualizado (volta para análise).':'Cadastro enviado para análise. Obrigado!');drawer('locais')}});
/* ---- Ajuda: sobre, perguntas, guia, contato e termos ---- */
const FAQ=[['Preciso pagar para usar o Rota Cultural?','Não. Explorar locais, favoritar, avaliar e escrever dicas são gratuitos.'],['Como crio minha conta?','Clique em Cadastrar no topo, informe nome, e-mail, CPF, CEP e uma senha com letras e números. A sua localidade é confirmada pelo CEP.'],['Esqueci minha senha. E agora?','Na janela Entrar, clique em Esqueci a senha, informe o e-mail e o código de verificação e crie uma nova senha.'],['Para que serve o CPF?','Evitar contas duplicadas. Ele é guardado de forma protegida e nunca aparece para outras pessoas.'],['O que é um morador nativo?','Pessoa que mora na cidade e quer compartilhar dicas locais. Moradores nativos podem escrever dicas de morador e cadastrar locais.'],['Como cadastro um local?','Entre como morador nativo, abra Cadastrar local no menu do usuário e preencha os dados. A equipe analisa antes de publicar.'],['Por que meu local está "em análise"?','Todo local cadastrado por moradores passa por aprovação. Você acompanha o status em Minha conta › Meus locais.'],['Encontrei uma informação errada. Como aviso?','Na página do local, use Reportar um problema. A equipe recebe e analisa sua denúncia.'],['O que muda quando escolho um estilo?','A tela inteira ganha o clima do estilo (foto, cores e detalhes) e mostra um local desse estilo. A navbar e o rodapé não mudam.'],['Como excluo minha conta?','Em Minha conta › Segurança, use Excluir minha conta.']];
const HT=[['sobre','Sobre nós'],['faq','Perguntas'],['ajuda','Como funciona'],['contato','Fale conosco'],['termos','Termos de uso']];let hTab='sobre';
const sHref=k=>k==='wa'?`https://wa.me/${RC.config.whatsapp||''}?text=${encodeURIComponent(RC.config.whatsappText)}`:RC.config.social[k];
const HB={
 sobre:()=>`<p>O <b>Rota Cultural</b> reúne eventos, museus, pontos turísticos e gastronomia local em um só lugar, para você economizar tempo, planejar melhor e viver uma experiência cultural acessível.</p>
  <h4>O problema</h4><p>As informações ficam espalhadas entre redes sociais e sites de turismo, e os espaços de menor porte quase não aparecem. Só 29,6% dos municípios brasileiros têm museus (IBGE).</p>
  <h4>Nossa resposta</h4><p>Uma plataforma única para descobrir atrações e experiências alinhadas ao seu perfil, seja você turista ou morador.</p>`,
 faq:()=>FAQ.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join(''),
 ajuda:()=>`<h4>${ico('user')} Criar conta e entrar</h4><ol><li>Clique em <b>Cadastrar</b> no topo.</li><li>Preencha nome, e-mail, CPF, CEP e senha.</li><li>Confirme a localidade e aceite os termos.</li></ol>
  <h4>${ico('heart')} Favoritar e avaliar</h4><ol><li>Clique em <b>Favoritar</b> no topo do local.</li><li>Em <b>Avaliações</b>, dê uma nota e conte como foi.</li><li>Seus favoritos ficam em Minha conta.</li></ol>
  <h4>${ico('sparkles')} Criar um roteiro</h4><ol><li>Abra <b>Roteiros</b> no topo.</li><li>Escolha perfil, preço e cidade.</li><li>Receba a lista de locais e abra cada um.</li></ol>
  <h4>${ico('plus')} Cadastrar um local</h4><ol><li>Crie a conta como <b>morador nativo</b>.</li><li>Abra <b>Cadastrar local</b> no menu do usuário.</li><li>Envie para análise e acompanhe o status.</li></ol>`,
 contato:()=>`<form class="location-lform" id="fMsg" novalidate><div class="location-row2"><label>Nome<input name="nome" autocomplete="name"><span class="location-err" data-for="nome"></span></label><label>E-mail<input name="email" type="email" autocomplete="email"><span class="location-err" data-for="email"></span></label></div>
  <label>Assunto<select name="assunto"><option>Dúvida</option><option>Sugestão</option><option>Problema técnico</option><option>Parcerias</option><option>Outro</option></select></label>
  <label>Mensagem<textarea name="texto" maxlength="800" placeholder="Como podemos ajudar?"></textarea><span class="location-err" data-for="texto"></span></label><button class="location-button" type="submit">${ico('mail')}Enviar mensagem</button></form>
  <p class="location-hint" style="margin-top:1rem">Ou fale pelos nossos canais:</p><div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.4rem"><a class="location-button location-button--ghost location-button--extra-small" target="_blank" rel="noopener noreferrer" href="${sHref('wa')}">${ico('phone')}WhatsApp</a><a class="location-button location-button--ghost location-button--extra-small" target="_blank" rel="noopener noreferrer" href="${sHref('ig')}">${ico('image')}Instagram</a><a class="location-button location-button--ghost location-button--extra-small" target="_blank" rel="noopener noreferrer" href="${sHref('fb')}">${ico('users')}Facebook</a></div>`,
 termos:()=>`<p class="location-hint">Texto-modelo para o projeto acadêmico. Antes de publicar de verdade, revise com um profissional de direito digital.</p>
  <h4>1. Sua conta</h4><p>Você é responsável pelas informações que fornece e pela segurança da senha.</p><h4>2. Conteúdo publicado</h4><ul><li>Publique apenas experiências reais e informações úteis.</li><li>Não é permitido conteúdo ofensivo, discriminatório ou enganoso, nem expor dados pessoais de terceiros.</li><li>Podemos remover conteúdos que violem estas regras.</li></ul>
  <h4>3. Privacidade (LGPD)</h4><p>Coletamos nome, e-mail, CPF, CEP/cidade e suas atividades para criar a conta, verificar a localidade e personalizar recomendações. O CPF serve apenas para evitar contas duplicadas e não é exibido. Você pode corrigir seus dados e excluir a conta a qualquer momento.</p>
  <h4>4. Informações dos locais</h4><p>Horários, preços e descrições podem mudar. Confirme sempre com o local antes de ir.</p>`};
function openHelp(tab){hTab=HT.find(t=>t[0]===tab)?tab:'sobre';helpRender();const d=$('#dlgHelp');if(!d.open)d.showModal()}
function helpRender(){$('#hT').textContent=HT.find(t=>t[0]===hTab)[1];$('#hTabs').innerHTML=HT.map(([k,l])=>`<button type="button" role="tab" data-ht="${k}" aria-selected="${k===hTab}">${l}</button>`).join('');$('#hBody').innerHTML=HB[hTab]();if(hTab==='contato'){const u=me(),f=$('#fMsg').elements;if(u){f.nome.value=u.nome;f.email.value=u.email}}}
$('#hTabs').addEventListener('click',e=>{const b=e.target.closest('[data-ht]');if(b){hTab=b.dataset.ht;helpRender()}});
$('#hBody').addEventListener('submit',e=>{e.preventDefault();const f=e.target,el=f.elements;let bad=null;
 const rules={nome:[el.nome.value.trim().length>=2,'Informe seu nome.'],email:[RC.emailOk(el.email.value),'Informe um e-mail válido.'],texto:[el.texto.value.trim().length>=10,'Escreva uma mensagem (mín. 10 caracteres).']};
 for(const k in rules){fieldErr(f,k,rules[k][0]?'':rules[k][1]);if(!rules[k][0]&&!bad)bad=el[k]}if(bad)return bad.focus();
 RC.push('rc_msgs',{id:'m'+Date.now(),nome:el.nome.value.trim(),email:el.email.value.trim(),assunto:el.assunto.value,texto:el.texto.value.trim(),ts:Date.now(),lida:false,uid:(me()||{}).id||null});
 el.texto.value='';f.insertAdjacentHTML('afterend','<p class="location-success" role="status">Mensagem enviada! Responderemos pelo e-mail informado.</p>');toast('Mensagem enviada.')});
/* ---- cliques globais, atalhos e voltar ao topo ---- */
root.addEventListener('click',e=>{
 let b=e.target.closest('[data-help]');if(b){openHelp(b.dataset.help);return}
 b=e.target.closest('#nav [data-open]');if(b){drawer(b.dataset.open);return}
 b=e.target.closest('[data-df]');if(b){dF=b.dataset.df;renderDestinos();return}
 b=e.target.closest('[data-favp]');if(b){e.stopPropagation();if(!RC.need('favoritar locais'))return;const on=RC.toggleFav(b.dataset.favp);renderDGrid();if(b.dataset.favp===slug)renderHero();toast(on?'Adicionado aos favoritos':'Removido dos favoritos');return}
 b=e.target.closest('[data-view]');if(b){openView(b.dataset.view);return}
 b=e.target.closest('[data-jump]');if(b){root.querySelector(b.dataset.jump).scrollIntoView({behavior:reduce?'auto':'smooth'});return}
 b=e.target.closest('[data-fopen]');if(b){if(b.dataset.fopen==='newrot')openRot();else drawer(b.dataset.fopen);return}
 b=e.target.closest('[data-resrep]');if(b&&RC.can('admin')){const r=S.rep.find(x=>x.id===b.dataset.resrep);if(r){r.resolvida=true;save();renderAdmin();toast('Denúncia marcada como resolvida.')}return}
 b=e.target.closest('[data-delrep]');if(b&&RC.can('admin')&&confirm('Excluir esta denúncia?')){S.rep=S.rep.filter(x=>x.id!==b.dataset.delrep);save();renderAdmin();toast('Denúncia excluída.');return}
});
root.addEventListener('input',e=>{if(e.target.id==='dQ'){dQ=e.target.value;dLim=8;renderDGrid()}});
$('#revSort').addEventListener('change',e=>{revSort=e.target.value;renderRevs()});$('#revMore').addEventListener('click',()=>{revLimit+=4;renderRevs()});
addEventListener('rc:open',e=>{const k=e.detail;if(k==='cadastrar')openPlace();else if(k==='admin')openAdminArea();else drawer(k)});
$('#btnCreate').addEventListener('click',()=>openPlace());
const lprog=$('#lProg');addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;lprog.style.width=(h>0?scrollY/h*100:0)+'%'},{passive:true});
const toTop=$('#toTop');addEventListener('scroll',()=>toTop.classList.toggle('is-visible',scrollY>700),{passive:true});toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduce?'auto':'smooth'}));

/* destaque da seção atual no menu do local */
const links=$$('.location-section-nav a');
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('is-active',l.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-40% 0px -55% 0px'});
$$('.location-section').forEach(s=>io2.observe(s));
/* revelar ao rolar */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});
$$('.location-reveal').forEach(el=>io.observe(el));
applyTema(true);renderAll();
  return () => {
    io3?.disconnect();
    io2?.disconnect();
    io?.disconnect();
  };
}

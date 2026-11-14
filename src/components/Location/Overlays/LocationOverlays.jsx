/* ==========================================================================
   COMPONENTE: Overlays
   Diálogos, drawer, lightbox, avisos e template do painel administrativo.
========================================================================== */

import { adminDashboardDocument } from "../../../features/Admin/templates/adminDashboardDocument";

export default function Overlays() {
  return (
    <>
      <div id="admSrc" hidden>{adminDashboardDocument}</div>
      <div className="location-toast" id="gtoast" role="status" aria-live="polite"></div>
      <dialog className="location-dialog" id="lb" aria-label="Foto ampliada">
        <img id="lbImg" alt="" />
        <div className="location-bar2">
          <button id="lbPrev" aria-label="Foto anterior"><svg className="location-icon" aria-hidden="true"><use href="#i-chev-l"></use></svg></button>
          <span id="lbCap"></span>
          <button id="lbNext" aria-label="Próxima foto"><svg className="location-icon" aria-hidden="true"><use href="#i-chev-r"></use></svg></button>
          <button id="lbX" aria-label="Fechar"><svg className="location-icon" aria-hidden="true"><use href="#i-x"></use></svg></button>
        </div>
      </dialog>
      <dialog className="location-dialog" id="dlgRep">
        <form id="repForm" noValidate="">
          <h3><svg className="location-icon" aria-hidden="true"><use href="#i-flag"></use></svg>Reportar um problema</h3>
          <label>
            Motivo
            <select name="motivo">
              <option>Informação incorreta</option>
              <option>Local fechado ou mudou de endereço</option>
              <option>Conteúdo inadequado</option>
              <option>Outro</option>
            </select>
          </label>
          <label>
            Detalhes
            <textarea name="texto" maxLength="400" placeholder="Explique o que encontrou"></textarea>
            <span className="location-err" data-for="texto"></span>
          </label>
          <div className="location-row">
            <button className="location-button location-button--ghost" type="button" data-close="">Cancelar</button>
            <button className="location-button" type="submit">Enviar denúncia</button>
          </div>
        </form>
      </dialog>
      <dialog className="location-dialog" id="dlgFb">
        <form id="fbForm" noValidate="">
          <h3><svg className="location-icon" aria-hidden="true"><use href="#i-home"></use></svg>Escrever uma dica de morador</h3>
          <label>Seu nome<input name="autor" maxLength="40" /><span className="location-err" data-for="autor"></span></label>
          <label>
            Sua dica
            <textarea name="texto" maxLength="300" placeholder="O que quem mora aqui sabe e os guias não contam?"></textarea>
            <span className="location-err" data-for="texto"></span>
          </label>
          <div className="location-row">
            <button className="location-button location-button--ghost" type="button" data-close="">Cancelar</button>
            <button className="location-button" type="submit">Publicar dica</button>
          </div>
        </form>
      </dialog>
      <dialog className="location-dialog" id="dlgMan">
        <form id="manForm" noValidate="">
          <h3><svg className="location-icon" aria-hidden="true"><use href="#i-settings"></use></svg>Gerenciar local</h3>
          <label>
            Descrição
            <textarea name="desc" maxLength="500"></textarea>
          </label>
          <label>Informação de ingresso<input name="priceTxt" maxLength="120" /></label>
          <div className="location-row">
            <button className="location-button location-button--ghost" type="button" data-close="">Cancelar</button>
            <button className="location-button" type="submit">Salvar alterações</button>
          </div>
        </form>
      </dialog>
      <dialog className="location-drawer" id="drawer" aria-label="Minha conta">
        <aside className="location-account-drawer__sidebar">
          <div className="location-account-drawer__profile"><span className="location-account-drawer__avatar" id="drAv" aria-hidden="true"></span><b id="drT"></b><small id="drR"></small></div>
          <div className="location-account-drawer__tabs" id="drTabs" role="tablist"></div>
        </aside>
        <div className="location-account-drawer__main">
          <div className="location-account-drawer__heading">
            <h3 id="drH"></h3>
            <button className="location-account-drawer__close" type="button" aria-label="Fechar"><svg className="location-icon" aria-hidden="true"><use href="#i-x"></use></svg></button>
          </div>
          <div className="location-account-drawer__button" id="drB"></div>
        </div>
      </dialog>
      <dialog className="location-dialog location-dialog--large" id="dlgPlace" aria-label="Cadastrar local">
        <form id="fPlace" noValidate="">
          <h3 id="plT"><svg className="location-icon" aria-hidden="true"><use href="#i-plus"></use></svg>Cadastrar local</h3>
          <p className="location-hint" id="plNote"></p>
          <div className="location-pgrid">
            <h4>1. Informações</h4>
            <label className="location-button--full">Nome do local<input name="nome" maxLength="80" /><span className="location-err" data-for="nome"></span></label>
            <label>
              Estilo do local
              <select name="tema"></select>
              <span className="location-err" data-for="tema"></span>
            </label>
            <label>
              Entrada
              <select name="pago">
                <option value="0">Gratuita</option>
                <option value="1">Paga</option>
              </select>
            </label>
            <label className="location-button--full">Informações de ingresso (opcional)<input name="priceTxt" maxLength="120" placeholder="Ex.: Taxa simbólica de preservação" /></label>
            <label className="location-button--full">
              Descrição
              <textarea name="desc" maxLength="600" placeholder="O que torna este lugar especial?"></textarea>
              <span className="location-err" data-for="desc"></span>
            </label>
            <h4>2. Endereço e localização</h4>
            <label>CEP<input name="cep" inputMode="numeric" maxLength="9" placeholder="00000-000" /></label>
            <div className="location-form__actions-end">
              <button className="location-button location-button--ghost location-button--extra-small" type="button" id="plCep"><svg className="location-icon" aria-hidden="true"><use href="#i-pin"></use></svg>Buscar endereço</button>
            </div>
            <label className="location-button--full">Endereço (rua e número)<input name="end" maxLength="140" /><span className="location-err" data-for="end"></span></label>
            <label>Cidade<input name="cidade" /><span className="location-err" data-for="cidade"></span></label>
            <label>UF<input name="uf" maxLength="2" className="location-field--uppercase" /><span className="location-err" data-for="uf"></span></label>
            <label>Latitude (opcional)<input name="lat" inputMode="decimal" placeholder="-23.55052" /></label>
            <label>Longitude (opcional)<input name="lng" inputMode="decimal" placeholder="-46.63331" /></label>
            <div className="location-button--full">
              <button className="location-button location-button--ghost location-button--extra-small" type="button" id="plGeo"><svg className="location-icon" aria-hidden="true"><use href="#i-nav"></use></svg>Usar minha localização atual</button>
              <span className="location-hint" id="plGeoMsg"></span>
            </div>
            <h4>3. Horários</h4>
            <label className="location-ckl location-button--full"><input type="checkbox" name="h24" />Aberto 24 horas (todos os dias)</label>
            <div className="location-days location-button--full" id="plDays"></div>
            <div className="location-button--full">
              <button className="location-button location-button--ghost location-button--extra-small" type="button" id="plCopy">Copiar o horário de segunda para todos os dias</button>
              <span className="location-err location-err--visible" data-for="horarios"></span>
            </div>
            <h4>4. Destaques e detalhes (opcional)</h4>
            <label>Destaque 1<input name="d1" maxLength="40" /></label>
            <label>Destaque 2<input name="d2" maxLength="40" /></label>
            <label>Destaque 3<input name="d3" maxLength="40" /></label>
            <label>Melhor época<input name="melhor" maxLength="60" /></label>
            <label>Duração sugerida<input name="dur" maxLength="60" /></label>
            <label>Ideal para<input name="ideal" maxLength="80" /></label>
            <label className="location-button--full">Acessibilidade<input name="acess" maxLength="100" /></label>
            <h4>5. Fotos (até 4)</h4>
            <div className="location-button--full">
              <input type="file" id="plFotos" accept="image/*" multiple="" />
              <p className="location-hint">As imagens são reduzidas automaticamente. Use fotos suas ou com autorização.</p>
              <span className="location-err" data-for="fotos"></span>
              <div className="location-phs" id="plPhotos"></div>
            </div>
            <h4>6. Contato (opcional)</h4>
            <label>Telefone<input name="tel" inputMode="tel" maxLength="20" /></label>
            <label>E-mail<input name="email" type="email" /><span className="location-err" data-for="email"></span></label>
            <label className="location-button--full">Site (https://…)<input name="site" placeholder="https://" /><span className="location-err" data-for="site"></span></label>
          </div>
          <p className="location-err" id="plErr" role="alert"></p>
          <div className="location-row">
            <button className="location-button location-button--ghost" type="button" data-close="">Cancelar</button>
            <button className="location-button" type="submit" id="plSend">Enviar cadastro</button>
          </div>
        </form>
      </dialog>
      <dialog className="location-dialog location-dialog--large" id="dlgHelp" aria-label="Ajuda">
        <div className="location-account-drawer__heading location-account-drawer__heading--compact">
          <h3 id="hT">Ajuda</h3>
          <button className="location-account-drawer__close" type="button" data-close="" aria-label="Fechar"><svg className="location-icon" aria-hidden="true"><use href="#i-x"></use></svg></button>
        </div>
        <div className="location-htabs" id="hTabs" role="tablist"></div>
        <div className="location-hbody" id="hBody"></div>
      </dialog>
      <dialog className="location-pv" id="dlgView" aria-label="Detalhes do local"></dialog>
      <dialog className="location-dialog" id="dlgRot" aria-label="Criar roteiro">
        <form id="fRot" noValidate="">
          <h3><svg className="location-icon" aria-hidden="true"><use href="#i-map"></use></svg>Criar meu roteiro</h3>
          <p className="location-hint" id="rotFor"></p>
          <label>Título<input name="titulo" maxLength="70" placeholder="Ex.: Fim de semana nas cachoeiras" /><span className="location-err" data-for="titulo"></span></label>
          <div className="location-pgrid"><label>
              Duração
              <select name="dur">
                <option>Meio dia</option>
                <option>1 dia</option>
                <option>2 dias</option>
                <option>3 dias ou mais</option>
              </select>
            </label><label>
              Orçamento
              <select name="custo">
                <option>Econômico</option>
                <option>Moderado</option>
                <option>Confortável</option>
              </select>
            </label></div>
          <label>
            Paradas (uma por linha, até 8)
            <textarea name="paradas" placeholder="9h: chegada\n11h: trilha leve\n13h: almoço"></textarea>
            <span className="location-err" data-for="paradas"></span>
          </label>
          <label>Dica (opcional)<input name="dica" maxLength="140" /></label>
          <div className="location-row">
            <button className="location-button location-button--ghost" type="button" data-close="">Cancelar</button>
            <button className="location-button" type="submit">Publicar roteiro</button>
          </div>
        </form>
      </dialog>
      <div id="admArea" className="location-admin-overlay" hidden=""></div>
    </>
  );
}

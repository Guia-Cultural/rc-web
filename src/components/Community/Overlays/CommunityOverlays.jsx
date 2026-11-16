/* ==========================================================================
   COMPONENTE: Overlays
   Modais, painel de conta, diálogo de roteiro e notificações.
========================================================================== */

export default function Overlays() {
  return (
    <>
      <div className="community-modal-overlay" id="modal" role="dialog" aria-modal="true" aria-label="História" hidden="">
        <div className="community-hm" id="hm">
          <button className="community-hm__fechar" id="mx" aria-label="Fechar">✕</button>
          <div id="mc"></div>
        </div>
      </div>
      <div className="community-account-panel" id="conta" role="dialog" aria-modal="true" aria-label="Minha conta" hidden="">
        <div className="community-account-panel__box" id="cbox"></div>
      </div>
      <div className="community-modal-overlay" id="rmodal" role="dialog" aria-modal="true" aria-label="Escolher roteiro" hidden="">
        <div className="community-route-dialog">
          <button className="community-hm__fechar" id="rx" aria-label="Fechar">✕</button>
          <h3>Seus roteiros</h3>
          <div id="rlist"></div>
        </div>
      </div>
      <dialog className="community-dialog" id="dlg" aria-label="Janela">
        <div className="community-dialog__body" id="db"></div>
      </dialog>
      <div id="out">
        <div>
          <h2>Você saiu da conta</h2>
          <p>A comunidade é exclusiva para quem está logado.</p>
          <button className="community-button community-button--blue" id="login">Entrar novamente</button>
        </div>
      </div>
      <div className="community-toast" id="toast" role="status"></div>
    </>
  );
}

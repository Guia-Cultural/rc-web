/* ==========================================================================
   COMPONENTE COMPARTILHADO: OVERLAYS
   Centraliza o modal acessível e o toast global da aplicação.
========================================================================== */
import "./Overlays.css";

export default function Overlays() {
  return (
    <>
      <dialog id="dlg" className="rc-dialog" aria-label="Janela de interação">
        <button className="rc-dialog__close" type="button" data-close aria-label="Fechar">×</button>
        <div className="rc-dialog__body" />
      </dialog>
      <div id="gtoast" className="rc-toast" role="status" aria-live="polite" />
    </>
  );
}

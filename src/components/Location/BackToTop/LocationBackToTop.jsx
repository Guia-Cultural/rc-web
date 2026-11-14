/* ==========================================================================
   COMPONENTE: BackToTop
   Controle para voltar ao topo.
========================================================================== */

export default function BackToTop() {
  return (
    <>
      <button type="button" id="toTop" aria-label="Voltar ao topo"><svg className="location-icon" aria-hidden="true"><use href="#i-chev-r"></use></svg></button>
    </>
  );
}

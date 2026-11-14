/* ==========================================================================
   COMPONENTE: MarqueeBlue
   Faixa animada de transição azul.
========================================================================== */

export default function MarqueeBlue() {
  return (
    <>
      <div className="community-marquee community-marquee--reverse community-marquee--blue" aria-hidden="true">
        <div className="community-marquee__track">
          <span>Curta</span>
          <span>Comente</span>
          <span>Salve</span>
          <span>Compartilhe</span>
          <span>Descubra</span>
          <span>Volte</span>
          <span>Curta</span>
          <span>Comente</span>
          <span>Salve</span>
          <span>Compartilhe</span>
          <span>Descubra</span>
          <span>Volte</span>
        </div>
      </div>
    </>
  );
}

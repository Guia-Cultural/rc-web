import SectionHeader from "./SectionHeader";

export default function GallerySection({ place, onOpen }) {
  const photos = place.gallery || [];
  const hasUploaded = place.uploadedImages && place.uploadedImages.length > 0;

  return (
    <section className="lsec" id="fotos">
      <div className="wrap">
        <SectionHeader
          icon="image"
          badge="Fotos"
          lead={
            hasUploaded
              ? "Imagens enviadas para este local. Clique para ampliar."
              : "Galeria ilustrativa de apoio visual (sem fotos enviadas para este local ainda)."
          }
        >
          Veja como <em className="hl">é por lá</em>
        </SectionHeader>
        <div className="mosaic rv">
          {photos.map((photo, index) => (
            <button
              className="ph"
              type="button"
              key={photo.id || index}
              onClick={() => onOpen(index)}
              aria-label={`Ampliar foto ${index + 1}`}
            >
              <img src={photo.url} alt={`${place.name}, foto ${index + 1}`} />
              <span>{photo.name || `${place.name} (${index + 1})`}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

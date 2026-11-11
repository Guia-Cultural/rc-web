import { localImage } from "../data/images";
import { themes } from "../data/localData";
import SectionHeader from "./SectionHeader";

export default function GallerySection({ place, onOpen }) {
  const photos = themes[place.theme].gallery;
  return <section className="lsec" id="fotos"><div className="wrap"><SectionHeader icon="image" badge="Fotos" lead="Clique em uma foto para ampliar.">Veja como <em className="hl">é por lá</em></SectionHeader><div className="mosaic rv">{photos.map((photo, index) => <button className="ph" type="button" key={photo} onClick={() => onOpen(index)} aria-label={`Ampliar foto ${index + 1}`}><img src={localImage(photo)} alt={`${place.name}, foto ${index + 1}`} /><span>{index === 0 ? place.name : place.highlights[(index - 1) % place.highlights.length]}</span></button>)}</div></div></section>;
}

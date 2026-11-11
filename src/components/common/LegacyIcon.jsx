import sprite from "../../assets/icons/legacy-sprite.svg";

export default function LegacyIcon({ name, className = "", title }) {
  const id = name.startsWith("i-") || name.startsWith("r-") || name.startsWith("p-")
    ? name
    : `i-${name}`;

  return (
    <svg className={`i ${className}`.trim()} aria-hidden={title ? undefined : "true"} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <use href={`${sprite}#${id}`} />
    </svg>
  );
}

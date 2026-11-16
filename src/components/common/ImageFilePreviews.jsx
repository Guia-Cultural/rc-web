import { useEffect, useRef } from "react";

function FilePreview({ file, onRemove, disabled, buttonClassName }) {
  const imageRef = useRef(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    imageRef.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 110 }}>
      <img
        ref={imageRef}
        alt={`Prévia de ${file.name}`}
        style={{ width: 110, height: 75, objectFit: "cover", borderRadius: 8 }}
      />
      <button
        type="button"
        className={buttonClassName}
        disabled={disabled}
        aria-label={`Remover ${file.name}`}
        onClick={onRemove}
      >
        Remover
      </button>
    </div>
  );
}

export default function ImageFilePreviews({ files, onRemove, disabled = false, buttonClassName = "btn ghost xs" }) {
  if (!files.length) return null;
  return (
    <div aria-label="Prévia das imagens selecionadas" style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "8px 0" }}>
      {files.map((file, index) => (
        <FilePreview
          key={`${file.name}-${index}`}
          file={file}
          onRemove={() => onRemove(index)}
          disabled={disabled}
          buttonClassName={buttonClassName}
        />
      ))}
    </div>
  );
}

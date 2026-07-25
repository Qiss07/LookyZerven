import { useCallback, useState, useRef } from "react";
import { Upload, X } from "lucide-react";

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
  file: File | null;
  onClear: () => void;
  accept?: string;
}

export function ImageDropzone({ onFileSelect, file, onClear, accept = "image/png,image/jpeg" }: ImageDropzoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback(
    (f: File) => {
      onFileSelect(f);
      const url = URL.createObjectURL(f);
      setPreview(url);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f && f.type.startsWith("image/")) handleFile(f);
    },
    [handleFile]
  );

  const handleClear = () => {
    onClear();
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => !file && inputRef.current?.click()}
      className={`relative rounded-xl border-2 border-dashed transition-all cursor-pointer ${
        dragOver
          ? "border-primary bg-accent/50"
          : file
          ? "border-border bg-muted/30"
          : "border-border hover:border-primary/50 hover:bg-muted/30"
      } ${file ? "p-3" : "p-8"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      {file && preview ? (
        <div className="flex items-center gap-3">
          <img src={preview} alt="Dipilih" className="h-16 w-16 rounded-lg object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); handleClear(); }} className="p-1.5 rounded-lg hover:bg-muted">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Upload className="h-8 w-8" />
          <p className="text-sm font-medium">Seret gambar ke sini atau klik untuk memilih</p>
          <p className="text-xs">Format PNG atau JPG</p>
        </div>
      )}
    </div>
  );
}

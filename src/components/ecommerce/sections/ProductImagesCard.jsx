import { useEffect, useRef, useState } from "react";
import Icon from "../../template/Icon";
import { useProductForm } from "../../../context/ProductContext";

export default function ProductImagesCard() {
  const { images, setImages } = useProductForm();
  const fileInputRef = useRef(null);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    if (!images.length) {
      setPreviewUrls([]);
      return;
    }
    const urls = images.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []).slice(0, 5);
    setImages(files);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-white">Products Images</h2>
        <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/50">
          5 max
        </span>
      </div>
      <div className="mt-6 rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-sm text-white/60">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
        >
          {previewUrls.length ? (
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {previewUrls.map((url, index) => (
                <div
                  key={url}
                  className="overflow-hidden rounded-2xl border border-white/10"
                >
                  <img
                    src={url}
                    alt={`Product preview ${index + 1}`}
                    className="h-28 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-white/70">
                <Icon name="upload" className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-white/80">
                Click to upload or drag and drop
              </p>
              <p className="mt-1 text-xs text-white/50">
                SVG, PNG, JPG or GIF (MAX 800x400px)
              </p>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-white/20 hover:text-white"
        >
          {images.length ? "Change images" : "Choose images"}
        </button>
      </div>
    </div>
  );
}

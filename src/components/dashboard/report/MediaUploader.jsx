import React, { useRef } from "react";

export default function MediaUploader({ files, onChange }) {
  const fileInput = useRef();
  function handleFiles(e) {
    onChange(Array.from(e.target.files));
  }
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 mb-1">Upload Media</label>
      <input
        type="file"
        multiple
        ref={fileInput}
        className="w-full border rounded-lg px-3 py-2"
        onChange={handleFiles}
        accept="image/*,video/*"
      />
      {files && files.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2">
          {files.map((file, idx) => (
            <span key={idx} className="text-xs bg-slate-100 px-2 py-1 rounded">{file.name}</span>
          ))}
        </div>
      )}
    </div>
  );
}

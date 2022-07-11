import React, {useRef} from "react";

function ImageUpload({onChange, label, multiple, text, numberOfImages}) {
  const uploadInputRef = useRef(null);

  return (
    <div style={{cursor: "pointer"}} onClick={() => uploadInputRef.current.click()}>
      {multiple ? (
        <input
          ref={uploadInputRef}
          multiple
          accept="image/gif, image/jpeg, image/png, image/jpg"
          id="file-upload"
          onChange={onChange}
          name="file-upload"
          type="file"
          className="sr-only"
        />
      ) : (
        <input
          accept="image/gif, image/jpeg, image/png, image/jpg"
          ref={uploadInputRef}
          id="file-upload"
          onChange={onChange}
          name="file-upload"
          type="file"
          className="sr-only"
        />
      )}
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <span style={{marginLeft: "25px"}}>{text}</span>
            </label>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
          <p className="text-xs text-gray-800">Recomended 16 : 9 aspect ratio image</p>
          {numberOfImages > 0 ? (
            <p
              style={{fontWeight: "900", fontSize: "20px", color: "#B42B85"}}
              className="text-xs text-1xl"
            >{`${numberOfImages} images selected`}</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;

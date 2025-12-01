"use client";

import { ArrowUp, Upload } from "lucide-react";
import { useState } from "react";

function Mainchat() {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  function handleFiles(newFiles: FileList | null) {
    console.log("Handling files:", newFiles);
    if (!newFiles) return;
    const arr = Array.from(newFiles).filter(
      (f) => f.type === "application/pdf"
    );
    if (arr.length === 0) return;
    // Accept only first PDF (single file requirement)
    const first = arr[0];
    setFiles([first]);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragActive(false);
    handleFiles(e.dataTransfer.files);
  }

  function onDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragActive(true);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    // show copy cursor when dragging files
    try {
      e.dataTransfer.dropEffect = "copy";
    } catch {}
    setIsDragActive(true);
  }

  function onDragLeave() {
    setIsDragActive(false);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  const MIN_LEN = 10;
  const MAX_LEN = 1000;
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    // Validate: must have exactly one PDF and message length constraints
    const text = input.trim();
    if (files.length !== 1) {
      setError("Please attach exactly one PDF file.");
      return;
    }
    if (text.length < MIN_LEN) {
      setError(`Message must be at least ${MIN_LEN} characters.`);
      return;
    }
    if (text.length > MAX_LEN) {
      setError(`Message must be at most ${MAX_LEN} characters.`);
      return;
    }

    setError(null);

    // Replace with your upload / chat API integration.
    console.log("Sending message:", text);
    console.log("Sending files:", files);

    // clear input and files after send
    setInput("");
    setFiles([]);
    // Optionally show a toast or update chat UI
  }
  return (
    <div className="flex flex-col gap-6 w-full h-full justify-center items-center">
      <h1 className="text-3xl font-bold text-black">How can I help you?</h1>

      <div
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`w-1/2 p-4 rounded-lg border ${
          isDragActive
            ? "border-2 border-dashed border-blue-400 bg-blue-50"
            : "bg-white border border-gray-200"
        }`}
      >
        <div className="flex flex-col">
          <textarea
            className="w-full h-10 p-2 resize-none focus:outline-none"
            placeholder="Ask about your PDF or paste a question here..."
            value={input}
            onChange={(e) => {
              // enforce max length
              const v = e.target.value;
              if (v.length > MAX_LEN) {
                setInput(v.slice(0, MAX_LEN));
              } else {
                setInput(v);
              }
            }}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <div>
              {error ? (
                <span className="text-red-500">{error}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <div className="flex items-center gap-2">
              <label htmlFor="file-input" className="cursor-pointer">
                <Upload className="w-6 h-6 text-blue-500 cursor-pointer" />
              </label>
              <input
                id="file-input"
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFiles(e.currentTarget.files)}
                className="hidden"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={
                !(
                  files.length === 1 &&
                  input.trim().length >= MIN_LEN &&
                  input.trim().length <= MAX_LEN
                )
              }
              className={`flex items-center justify-center w-10 h-10 rounded-full p-2 ${
                files.length === 1 &&
                input.trim().length >= MIN_LEN &&
                input.trim().length <= MAX_LEN
                  ? "bg-blue-500 text-white"
                  : "bg-blue-200 text-white opacity-60 cursor-not-allowed"
              }`}
            >
              <ArrowUp />
            </button>
          </div>

          {files.length > 0 && (
            <div className="mt-2 max-h-32 overflow-y-auto border rounded p-2 bg-gray-50">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm mb-2"
                >
                  <div className="truncate max-w-[70%]">{f.name}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-500">
                      {(f.size / 1024).toFixed(1)} KB
                    </div>
                    <button
                      onClick={() => removeFile(i)}
                      className="text-red-500 text-xs cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mainchat;

import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [platforms, setPlatforms] = useState({
    twitter: false,
    instagram: false,
    facebook: false,
    linkedin: false,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    // Create preview URL for image files
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handlePlatformChange = (platform: keyof typeof platforms) => {
    setPlatforms({
      ...platforms,
      [platform]: !platforms[platform],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // Simulate API call
    setTimeout(() => {
      console.log({
        file,
        title,
        description,
        platforms,
      });
      setIsUploading(false);
      alert("Content scheduled for publishing!");

      // Reset form
      setFile(null);
      setTitle("");
      setDescription("");
      setPlatforms({
        twitter: false,
        instagram: false,
        facebook: false,
        linkedin: false,
      });
      setPreviewUrl(null);
    }, 1500);
  };

  const selectedPlatformCount = Object.values(platforms).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F2E5] to-[#f1e8d4]">
      <div className="max-w-[1200px] mx-auto p-8 md:p-6 sm:p-4">
        <header className="mb-10 pb-5 border-b-2 border-[#5A3921] flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#FFCF4D] rounded-full flex items-center justify-center border-2 border-[#5A3921]">
              <span className="text-[#5A3921] text-xl font-bold">SG</span>
            </div>
            <h1 className="text-[#2A1A0A] text-3xl md:text-2xl sm:text-xl font-bold">
              ScheduleGoose <span className="text-[#5ECEC6]">Dashboard</span>
            </h1>
          </div>
          <p className="text-[#5A3921] text-sm max-w-md text-center">
            Upload and schedule your content across multiple platforms with ease
          </p>
        </header>

        <main className="grid grid-cols-5 gap-8 md:grid-cols-2 md:gap-6 sm:grid-cols-1">
          <div className="col-span-3 md:col-span-2 sm:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-6 border-2 border-[#5A3921] transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-[#2A1A0A] text-2xl sm:text-xl font-semibold mb-6 flex items-center">
                <span className="w-8 h-8 bg-[#5ECEC6] rounded-lg flex items-center justify-center mr-3 shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#2A1A0A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </span>
                Upload Content
              </h2>

              <form onSubmit={handleSubmit} className="space-y-7 sm:space-y-5">
                <div className="mb-6 sm:mb-4 bg-[#F9F2E5] p-5 rounded-lg border border-[#E7B831]/30">
                  <label className="block mb-3 font-medium text-[#2A1A0A] text-sm">
                    Content File
                    <div className="mt-2 border-2 border-dashed border-[#5A3921]/40 rounded-lg p-6 text-center hover:border-[#5A3921] transition-colors duration-200">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        required
                        accept="image/*,video/*"
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-[#5A3921]/60 mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="text-sm font-medium text-[#5A3921]">
                          {file ? file.name : "Drag & drop or click to upload"}
                        </span>
                        <span className="text-xs text-[#5A3921]/70 mt-1">
                          Supports images and videos
                        </span>
                      </label>
                    </div>
                  </label>
                  {previewUrl && (
                    <div className="mt-4 flex justify-center">
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-h-[200px] rounded-md border-2 border-[#5A3921] shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewUrl(null);
                            setFile(null);
                          }}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-[#5A3921]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-[#5A3921]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-6 sm:mb-4 space-y-2">
                  <label className="block text-sm font-medium text-[#2A1A0A]">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter a catchy title for your content"
                    className="w-full p-3 sm:p-2.5 border-2 border-[#5A3921] rounded-lg bg-[#F9F2E5] text-[#2A1A0A] focus:border-[#FFCF4D] focus:outline-none focus:ring-2 focus:ring-[#FFCF4D]/30 transition-all duration-200 placeholder:text-[#5A3921]/40"
                  />
                </div>

                <div className="mb-6 sm:mb-4 space-y-2">
                  <label className="block text-sm font-medium text-[#2A1A0A]">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                    placeholder="Write a detailed description of your content"
                    className="w-full p-3 sm:p-2.5 border-2 border-[#5A3921] rounded-lg bg-[#F9F2E5] text-[#2A1A0A] focus:border-[#FFCF4D] focus:outline-none focus:ring-2 focus:ring-[#FFCF4D]/30 transition-all duration-200 placeholder:text-[#5A3921]/40"
                  />
                </div>

                <div className="mb-6 sm:mb-4 space-y-3">
                  <label className="block text-sm font-medium text-[#2A1A0A]">
                    Select platforms
                  </label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-3">
                    <label className="flex items-center gap-3 p-3.5 bg-white border-2 border-[#5A3921] rounded-lg cursor-pointer hover:bg-[#F9F2E5] hover:border-[#FFCF4D] transition-all duration-200 group">
                      <div
                        className={`w-5 h-5 flex items-center justify-center rounded border-2 ${
                          platforms.twitter
                            ? "bg-[#5ECEC6] border-[#5ECEC6]"
                            : "bg-white border-[#5A3921]"
                        } transition-colors duration-200`}
                      >
                        {platforms.twitter && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={platforms.twitter}
                        onChange={() => handlePlatformChange("twitter")}
                        className="sr-only"
                      />
                      <span className="font-medium group-hover:text-[#5A3921] transition-colors">
                        Twitter
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-3.5 bg-white border-2 border-[#5A3921] rounded-lg cursor-pointer hover:bg-[#F9F2E5] hover:border-[#FFCF4D] transition-all duration-200 group">
                      <div
                        className={`w-5 h-5 flex items-center justify-center rounded border-2 ${
                          platforms.instagram
                            ? "bg-[#5ECEC6] border-[#5ECEC6]"
                            : "bg-white border-[#5A3921]"
                        } transition-colors duration-200`}
                      >
                        {platforms.instagram && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={platforms.instagram}
                        onChange={() => handlePlatformChange("instagram")}
                        className="sr-only"
                      />
                      <span className="font-medium group-hover:text-[#5A3921] transition-colors">
                        Instagram
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-3.5 bg-white border-2 border-[#5A3921] rounded-lg cursor-pointer hover:bg-[#F9F2E5] hover:border-[#FFCF4D] transition-all duration-200 group">
                      <div
                        className={`w-5 h-5 flex items-center justify-center rounded border-2 ${
                          platforms.facebook
                            ? "bg-[#5ECEC6] border-[#5ECEC6]"
                            : "bg-white border-[#5A3921]"
                        } transition-colors duration-200`}
                      >
                        {platforms.facebook && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={platforms.facebook}
                        onChange={() => handlePlatformChange("facebook")}
                        className="sr-only"
                      />
                      <span className="font-medium group-hover:text-[#5A3921] transition-colors">
                        Facebook
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-3.5 bg-white border-2 border-[#5A3921] rounded-lg cursor-pointer hover:bg-[#F9F2E5] hover:border-[#FFCF4D] transition-all duration-200 group">
                      <div
                        className={`w-5 h-5 flex items-center justify-center rounded border-2 ${
                          platforms.linkedin
                            ? "bg-[#5ECEC6] border-[#5ECEC6]"
                            : "bg-white border-[#5A3921]"
                        } transition-colors duration-200`}
                      >
                        {platforms.linkedin && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={platforms.linkedin}
                        onChange={() => handlePlatformChange("linkedin")}
                        className="sr-only"
                      />
                      <span className="font-medium group-hover:text-[#5A3921] transition-colors">
                        LinkedIn
                      </span>
                    </label>
                  </div>
                  {selectedPlatformCount === 0 && (
                    <p className="text-sm text-[#E05D44] flex items-center gap-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      Please select at least one platform
                    </p>
                  )}
                </div>

                <div className="pt-3 flex justify-center">
                  <button
                    type="submit"
                    className={`
                      relative overflow-hidden ${
                        isUploading ? "bg-[#E7B831]" : "bg-[#5ECEC6]"
                      } text-[#2A1A0A] 
                      border-2 border-[#5A3921] rounded-lg px-8 py-3.5 font-bold text-sm
                      shadow-md hover:shadow-lg transform hover:-translate-y-0.5 
                      transition-all duration-200 hover:bg-[#FFCF4D] 
                      disabled:bg-gray-300 disabled:border-gray-600 disabled:text-gray-600 
                      disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none
                      min-w-[220px] sm:w-full
                    `}
                    disabled={
                      isUploading || !file || selectedPlatformCount === 0
                    }
                  >
                    {isUploading ? (
                      <>
                        <span className="inline-flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-[#2A1A0A]"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Publishing...
                        </span>
                      </>
                    ) : (
                      <>Schedule Content</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-span-2 md:col-span-2 sm:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-6 border-2 border-[#5A3921] h-full transform transition-all duration-300 hover:shadow-xl space-y-6">
              <h2 className="text-[#2A1A0A] text-2xl sm:text-xl font-semibold mb-6 flex items-center">
                <span className="w-8 h-8 bg-[#FFCF4D] rounded-lg flex items-center justify-center mr-3 shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#2A1A0A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </span>
                Dashboard Overview
              </h2>

              <div className="grid grid-cols-1 gap-5">
                <div className="bg-gradient-to-r from-[#FFCF4D]/90 to-[#FFCF4D] rounded-lg p-5 text-center border-2 border-[#5A3921] shadow-sm flex items-center gap-4">
                  <div className="bg-white/90 rounded-lg p-3 shadow-inner w-12 h-12 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#5A3921]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl text-[#2A1A0A] font-bold">0</h3>
                    <p className="text-sm text-[#5A3921] font-medium">
                      Scheduled Posts
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#FFCF4D]/90 to-[#FFCF4D] rounded-lg p-5 text-center border-2 border-[#5A3921] shadow-sm flex items-center gap-4">
                  <div className="bg-white/90 rounded-lg p-3 shadow-inner w-12 h-12 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#5A3921]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl text-[#2A1A0A] font-bold">0</h3>
                    <p className="text-sm text-[#5A3921] font-medium">
                      Published Posts
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#FFCF4D]/90 to-[#FFCF4D] rounded-lg p-5 text-center border-2 border-[#5A3921] shadow-sm flex items-center gap-4">
                  <div className="bg-white/90 rounded-lg p-3 shadow-inner w-12 h-12 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#5A3921]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl text-[#2A1A0A] font-bold">0</h3>
                    <p className="text-sm text-[#5A3921] font-medium">
                      Total Engagement
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-[#5A3921]/20">
                <div className="bg-[#F9F2E5] rounded-lg p-4 text-center">
                  <p className="text-sm text-[#5A3921]">
                    <span className="font-semibold">Coming Soon:</span>{" "}
                    Analytics, Content Calendar & Team Collaboration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-10 pt-5 border-t border-[#5A3921]/20 text-center text-sm text-[#5A3921]">
          <p>ScheduleGoose Dashboard • Made with 🦆 by ScheduleGoose Team</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

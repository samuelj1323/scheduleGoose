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
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>ScheduleGoose Content Dashboard</h1>
      </header>

      <main className="dashboard-main">
        <div className="upload-section">
          <h2>Upload Content</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Content File:
                <input
                  type="file"
                  onChange={handleFileChange}
                  required
                  accept="image/*,video/*"
                />
              </label>
              {previewUrl && (
                <div className="preview">
                  <img src={previewUrl} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>
                Title:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Description:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <p>Select platforms:</p>
              <div className="platforms-grid">
                <label className="platform-option">
                  <input
                    type="checkbox"
                    checked={platforms.twitter}
                    onChange={() => handlePlatformChange("twitter")}
                  />
                  Twitter
                </label>
                <label className="platform-option">
                  <input
                    type="checkbox"
                    checked={platforms.instagram}
                    onChange={() => handlePlatformChange("instagram")}
                  />
                  Instagram
                </label>
                <label className="platform-option">
                  <input
                    type="checkbox"
                    checked={platforms.facebook}
                    onChange={() => handlePlatformChange("facebook")}
                  />
                  Facebook
                </label>
                <label className="platform-option">
                  <input
                    type="checkbox"
                    checked={platforms.linkedin}
                    onChange={() => handlePlatformChange("linkedin")}
                  />
                  LinkedIn
                </label>
              </div>
              {selectedPlatformCount === 0 && (
                <p className="error-text">
                  Please select at least one platform
                </p>
              )}
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isUploading || !file || selectedPlatformCount === 0}
            >
              {isUploading ? "Publishing..." : "Schedule Content"}
            </button>
          </form>
        </div>

        <div className="info-section">
          <h2>Dashboard Overview</h2>
          <div className="stats">
            <div className="stat-card">
              <h3>0</h3>
              <p>Scheduled Posts</p>
            </div>
            <div className="stat-card">
              <h3>0</h3>
              <p>Published Posts</p>
            </div>
            <div className="stat-card">
              <h3>0</h3>
              <p>Total Engagement</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

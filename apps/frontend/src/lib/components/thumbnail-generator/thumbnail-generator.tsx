import { useState } from 'react';
import { hc } from 'hono/client';
import type { AppType } from '@schedulegoose/backend';
import styles from './thumbnailGenerator.module.css';

const client = hc<AppType>('/');

const ThumbnailGenerator = () => {
  const [title, setTitle] = useState('');
  const [style, setStyle] = useState('modern');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!title) return;
    setLoading(true);
    setGeneratedImage(null);
    
    try {
      const res = await client.api.thumbnail.generate.$post({
        json: { title, style }
      });
      const data = await res.json();
      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to generate thumbnail');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Thumbnail Generator</h2>
      <p className={styles.description}>Create engaging thumbnails for your videos.</p>
      
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Video Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter video title..."
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Style</label>
          <select value={style} onChange={(e) => setStyle(e.target.value)} className={styles.select}>
            <option value="modern">Modern Tech</option>
            <option value="vlog">Vlog / Lifestyle</option>
            <option value="minimal">Minimalist</option>
          </select>
        </div>

        <button onClick={handleGenerate} disabled={loading || !title} className={styles.button}>
          {loading ? 'Generating...' : 'Generate Thumbnail'}
        </button>
      </div>

      {generatedImage && (
        <div className={styles.result}>
          <h3>Generated Thumbnail</h3>
          <div className={styles.imageWrapper}>
            <img src={generatedImage} alt="Generated Thumbnail" className={styles.image} />
          </div>
          <div className={styles.actions}>
            <button className={styles.secondaryButton} onClick={() => window.open(generatedImage, '_blank')}>
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailGenerator;

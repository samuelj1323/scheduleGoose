import { useState } from 'react';
import { hc } from 'hono/client';
import type { AppType } from '@schedulegoose/backend';
import styles from './performancePredictor.module.css';

const client = hc<AppType>('/');

const PerformancePredictor = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'video' | 'text'>('video');
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!title) return;
    setLoading(true);
    try {
      const res = await client.api.analytics.predict.$post({
        json: { title, type },
      });
      const data = await res.json();
      setPrediction(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Performance Predictor</h2>
      <p className={styles.subtitle}>Analyze your content potential before you post.</p>
      
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Content Type</label>
          <select value={type} onChange={(e) => setType(e.target.value as any)} className={styles.select}>
            <option value="video">Video</option>
            <option value="text">Blog / Text</option>
          </select>
        </div>

        <div className={styles.inputGroup} style={{ flex: 1 }}>
          <label>Title / Headline</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How to build a SaaS in 7 days"
            className={styles.input}
          />
        </div>
        
        <button onClick={handlePredict} disabled={loading || !title} className={styles.button}>
          {loading ? 'Analyzing...' : 'Predict Score'}
        </button>
      </div>

      {prediction && (
        <div className={styles.result}>
          <div className={styles.scoreHeader}>
            <div className={styles.scoreBadge}>
              <span>Content Score</span>
              <strong>{prediction.contentScore.score}/100</strong>
            </div>
            <div className={styles.predictionBadge}>
              <span>Predicted Result</span>
              <strong>{prediction.outlierAnalysis.label}</strong>
            </div>
          </div>

          <div className={styles.details}>
            <p><strong>Projected Views:</strong> ~{prediction.predictedViews.toLocaleString()}</p>
            
            {prediction.contentScore.tips.length > 0 && (
              <div className={styles.tips}>
                <h4>Improvement Tips:</h4>
                <ul>
                  {prediction.contentScore.tips.map((tip: string, i: number) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformancePredictor;

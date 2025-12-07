import { IContentCard } from "@schedulegoose/types";
import styles from "./contentCard.module.css";
import { hc } from 'hono/client';
import type { AppType } from '@schedulegoose/backend';
import { useState } from 'react';

const client = hc<AppType>('/');

const ContentCard = (props: IContentCard) => {
  const [publishing, setPublishing] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeLabel = () => {
    return props.type.charAt(0).toUpperCase() + props.type.slice(1);
  };

  const getTypeColor = () => {
    switch (props.type) {
      case "video":
        return styles.typeVideo;
      case "audio":
        return styles.typeAudio;
      case "image":
        return styles.typeImage;
      case "text":
        return styles.typeText;
      default:
        return "";
    }
  };

  const handlePublish = async () => {
    if (!props.id) return;
    setPublishing(true);
    try {
        const res = await client.api.publish[':contentId'].$post({
            param: { contentId: props.id }
        });
        if (res.ok) {
            alert("Published successfully!");
            window.location.reload(); // Simple refresh to update status
        } else {
            const err = await res.json();
            alert("Failed to publish: " + (err as any).error);
        }
    } catch (e) {
        console.error(e);
        alert("Error publishing");
    } finally {
        setPublishing(false);
    }
  };

  const Media = () => {
    switch (props.type) {
      case "video":
        return (
          <div className={styles.mediaWrapper}>
            <video className={styles.media} controls poster={props.thumbnail}>
              <source src={props.href} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case "audio":
        return (
          <div className={styles.mediaWrapper}>
            <div className={styles.audioContainer}>
              <audio className={styles.audio} controls>
                <source src={props.href} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            </div>
          </div>
        );
      case "image":
        return (
          <div className={styles.mediaWrapper}>
            <img className={styles.media} src={props.href} alt={props.title} />
          </div>
        );
      case "text":
        return (
          <div className={styles.textContent}>
            <p>{props.type === "text" ? props.content : ""}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardMedia}>
          <Media />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <div className={styles.headerTop}>
              <span className={`${styles.typeBadge} ${getTypeColor()}`}>
                {getTypeLabel()}
              </span>
              {props.status && (
                 <span style={{ marginLeft: 'auto', fontSize: '0.8em', textTransform: 'uppercase', color: '#666' }}>
                    {props.status}
                 </span>
              )}
            </div>
            <h3 className={styles.title}>{props.title}</h3>
            <p className={styles.subtitle}>{props.subTitle}</p>
          </div>
          <div className={styles.cardMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Author</span>
              <span className={styles.metaValue}>{props.author}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Created</span>
              <span className={styles.metaValue}>
                {formatDate(props.createdTime)} at{" "}
                {formatTime(props.createdTime)}
              </span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Scheduled</span>
              <span className={styles.metaValue}>
                {formatDate(props.scheduledTime)} at{" "}
                {formatTime(props.scheduledTime)}
              </span>
            </div>

            {props.type === 'video' && props.views !== undefined && (
                 <div className={styles.metaItem} style={{ borderTop: '1px solid #eee', paddingTop: 8, marginTop: 8 }}>
                    <div style={{ display: 'flex', gap: 15, width: '100%', fontSize: '0.9em', color: '#555' }}>
                        <span>👁️ {props.views}</span>
                        <span>👍 {props.likes}</span>
                        <span>💬 {props.commentCount}</span>
                    </div>
                </div>
            )}
            
            {/* Publish Action */}
            {props.status !== 'published' && props.type === 'video' && props.id && (
                <div className={styles.metaItem} style={{ width: '100%', marginTop: 10 }}>
                    <button 
                        onClick={handlePublish} 
                        disabled={publishing}
                        style={{
                            width: '100%',
                            padding: '8px',
                            backgroundColor: '#ff0000',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        {publishing ? 'Uploading to YouTube...' : 'Publish to YouTube'}
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;

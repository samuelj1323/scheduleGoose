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

  const getTypeColorClass = () => {
    switch (props.type) {
      case "video": return styles.typeVideo;
      case "audio": return styles.typeAudio;
      case "image": return styles.typeImage;
      case "text": return styles.typeText;
      default: return "";
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
            window.location.reload(); 
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
              <span style={{fontSize: '3rem'}}>🎵</span>
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
          <div className={`${styles.typeBadge} ${getTypeColorClass()}`}>
            {getTypeLabel()}
          </div>
          <Media />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
             <div className={styles.statusRow}>
                {props.status && (
                    <span className={`${styles.statusBadge} ${props.status === 'published' ? styles.statusPublished : styles.statusScheduled}`}>
                        {props.status}
                    </span>
                )}
             </div>
            <h3 className={styles.title}>{props.title}</h3>
            {props.subTitle && <p className={styles.subtitle}>{props.subTitle}</p>}
          </div>
          
          <div className={styles.cardMeta}>
            <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Scheduled</span>
                <span className={styles.metaValue}>
                    {formatDate(props.scheduledTime)}
                </span>
                </div>
                <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Author</span>
                <span className={styles.metaValue}>{props.author}</span>
                </div>
            </div>

            {props.type === 'video' && props.views !== undefined && (
                 <div className={styles.statsRow}>
                    <div title="Views">👁️ {props.views}</div>
                    <div title="Likes">👍 {props.likes}</div>
                    <div title="Comments">💬 {props.commentCount}</div>
                </div>
            )}
            
            {/* Publish Action */}
            {props.status !== 'published' && props.type === 'video' && props.id && (
                <button 
                    onClick={handlePublish} 
                    disabled={publishing}
                    className={styles.publishButton}
                >
                    {publishing ? 'Uploading...' : '🚀 Publish to YouTube'}
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;

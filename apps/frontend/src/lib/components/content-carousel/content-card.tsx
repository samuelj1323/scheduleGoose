import { IContentCard } from "$lib/types";
import styles from "./contentCard.module.css";

const ContentCard = (props: IContentCard) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;

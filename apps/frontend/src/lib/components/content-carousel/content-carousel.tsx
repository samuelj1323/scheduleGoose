import ContentCard from "./content-card";
import { IContentCard } from "@schedulegoose/types";
import styles from "./contentCarousel.module.css";

type ContentCarouselProps = {
  scheduledContent: IContentCard[];
};

const ContentCarousel = ({ scheduledContent }: ContentCarouselProps) => {
  const groupByDate = (cards: IContentCard[]) => {
    const grouped = new Map<string, IContentCard[]>();

    cards.forEach((card) => {
      const dateKey = card.scheduledTime.toISOString().split("T")[0];
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)!.push(card);
    });

    return Array.from(grouped.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  };

  const groupedCards = groupByDate(scheduledContent);

  if (scheduledContent.length === 0) {
      return (
          <div className={styles.emptyState}>
              <h3>No content scheduled</h3>
              <p>Pick a date or import videos to get started!</p>
          </div>
      )
  }

  return (
    <div className={styles.wrapper}>
      {groupedCards.map(([dateKey, cards]) => {
          const dateObj = new Date(dateKey);
          return (
            <div key={dateKey} className={styles.dateRow}>
            <div className={styles.dateColumn}>
                <div className={styles.dateSticky}>
                    <div className={styles.dateMarker} />
                    <div className={styles.dateLabel}>
                        {dateObj.getDate()}
                    </div>
                    <div className={styles.dateSubLabel}>
                        {dateObj.toLocaleDateString(undefined, { month: 'short', weekday: 'short' })}
                    </div>
                </div>
            </div>
            <div className={styles.carouselContainer}>
                {cards.map((card, index) => (
                    <ContentCard key={`${dateKey}-${index}`} {...card} />
                ))}
            </div>
            </div>
        )
      })}
    </div>
  );
};

export default ContentCarousel;

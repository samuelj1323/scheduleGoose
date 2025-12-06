import ContentCard from "./content-card";
import { IContentCard } from "@schedulegoose/types";
import styles from "./contentCarousel.module.css";

type ContentCarouselProps = {
  scheduledContent: IContentCard[];
};

const ContentCarousel = ({ scheduledContent }: ContentCarouselProps) => {
  // Group cards by scheduled date (date only, ignoring time)
  const groupByDate = (cards: IContentCard[]) => {
    const grouped = new Map<string, IContentCard[]>();

    cards.forEach((card) => {
      // Get date string in YYYY-MM-DD format for grouping
      const dateKey = card.scheduledTime.toISOString().split("T")[0];

      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)!.push(card);
    });

    // Sort dates chronologically
    return Array.from(grouped.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  };

  const groupedCards = groupByDate(scheduledContent);

  return (
    <div className={styles.wrapper}>
      {groupedCards.map(([dateKey, cards]) => (
        <div key={dateKey} className={styles.dateRow}>
          <div className={styles.dateColumn}>
            <div className={styles.dateItem}>
              <div className={styles.dateLabel}>
                {new Date(dateKey).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
          <div className={styles.carouselContainer}>
            <div className={styles.dateGroup}>
              {cards.map((card, index) => (
                <ContentCard key={`${dateKey}-${index}`} {...card} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentCarousel;

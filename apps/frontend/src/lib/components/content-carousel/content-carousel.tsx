import ContentCard from "./content-card";
import { IContentCard } from "$lib/types";

type ContentCarouselProps = {
  scheduledContent: IContentCard[];
};

const ContentCarousel = ({ scheduledContent }: ContentCarouselProps) => {
  return (
    <div>
      {scheduledContent.map((card, index) => (
        <ContentCard key={index} {...card} />
      ))}
    </div>
  );
};

export default ContentCarousel;

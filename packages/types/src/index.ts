export type IContentCard =
  | ContentVideoCard
  | ContentAudioCard
  | ContentImageCard
  | ContentTextCard;

export type ContentCard = {
  title: string;
  subTitle: string;
  author: string;
  createdTime: Date;
  scheduledTime: Date;
};

export type ContentVideoCard = ContentCard & {
  type: "video";
  href: string;
  thumbnail: string;
};

export type ContentAudioCard = ContentCard & {
  type: "audio";
  href: string;
  thumbnail: string;
};

export type ContentImageCard = ContentCard & {
  type: "image";
  href: string;
};

export type ContentTextCard = ContentCard & {
  type: "text";
  content: string;
};


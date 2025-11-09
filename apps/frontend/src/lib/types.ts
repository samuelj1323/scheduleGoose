export type IContentCard =
  | contentVideoCard
  | contentAudioCard
  | contentImageCard
  | contentTextCard;

type contentCard = {
  title: string;
  subTitle: string;
  author: string;
  createdTime: Date;
  scheduledTime: Date;
};

export type contentVideoCard = contentCard & {
  type: "video";
  href: string;
  thumbnail: string;
};
export type contentAudioCard = contentCard & {
  type: "audio";
  href: string;
  thumbnail: string;
};
export type contentImageCard = contentCard & {
  type: "image";
  href: string;
};
export type contentTextCard = contentCard & {
  type: "text";
  content: string;
};

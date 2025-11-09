import { IContentCard } from "$lib/types";

const ContentCard = (props: IContentCard) => {
  const renderMedia = () => {
    switch (props.type) {
      case "video":
        return (
          <video controls poster={props.thumbnail}>
            <source src={props.href} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "audio":
        return (
          <div>
            <img src={props.thumbnail} alt={props.title} />
            <audio controls>
              <source src={props.href} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      case "image":
        return <img src={props.href} alt={props.title} />;
      case "text":
        return <p>{props.content}</p>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <h5>{props.subTitle}</h5>
      {renderMedia()}
      <p>created at: {props.createdTime.toLocaleString()}</p>
      <p>scheduled for: {props.scheduledTime.toLocaleString()}</p>
    </div>
  );
};

export default ContentCard;

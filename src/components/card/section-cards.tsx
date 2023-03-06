import Card from "./card";
import styles from "./section-cards.module.css";

type Props = {
  title: string;
  videos: {
    imgUrl: string;
  }[];
  size: string;
};

const SectionCards = (props: Props) => {
  const { title, videos = [], size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video: any, idx: number) => {
          return <Card key={idx} id={idx} imgUrl={video.imgUrl} size={size} />;
        })}
      </div>
    </section>
  );
};

export default SectionCards;

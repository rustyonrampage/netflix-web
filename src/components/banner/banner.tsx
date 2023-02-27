import Image from "next/image";
import React, { ReactEventHandler } from "react";
import styles from "./banner.module.css";


type Props = {
  title: string;
  subTitle: string;
  imgUrl: string;
};

export default function Banner(props: Props) {
  const { title, subTitle, imgUrl } = props;

  const handleOnPlay: ReactEventHandler = (e) => {
    console.log("handleOnPlay");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>

          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <span className={styles.playText}>
                <Image
                  src="/static/play_arrow.svg"
                  alt="Play icon"
                  width={32}
                  height={32}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      ></div>
    </div>
  );
}

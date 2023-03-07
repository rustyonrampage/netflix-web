import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/banner/banner";
import Navbar from "@/components/navbar/navbar";
import Card from "@/components/card/card";
import SectionCards from "@/components/card/section-cards";
import { getPopularVideos, getVideos } from "@/lib/videos";
import { magic } from "@/lib/magic-client";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context: any) {
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("Productivity");
  const popularVideos = await getPopularVideos();
  const travelVideos = await getVideos("indie music");
  return {
    props: { disneyVideos, travelVideos, productivityVideos, popularVideos }, // will be passed to the page component as props
  };
}
export default function Home({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}: any) {
  console.log({ magic });
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Navbar />
        <Banner
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}

import videoData from "../data/videos.json";

export const getCommonVideos = async (url: any) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = "youtube.googleapis.com/youtube/v3";
  try {
    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();
    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }
    console.log({ items: data.items });

    return data?.items.map((item: any) => {
      console.log({ id: item.id });
      const id = item.id?.videoId || item.id;
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
      };
    });
  } catch (error) {
    console.error("Something went wrong with video library", error);
    return [];
  }
};
export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return getCommonVideos(URL);
};
export const getVideos = (searchQuery: any) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

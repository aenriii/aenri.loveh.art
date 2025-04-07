import { TwitterApi } from "twitter-api-v2";

const Client = new TwitterApi({
    appKey: import.meta.env.VITE_TWITTER_API_KEY,
    appSecret: import.meta.env.VITE_TWITTER_API_SECRET,
    accessToken: import.meta.env.VITE_TWITTER_ACCESS_TOKEN,
    accessSecret: import.meta.env.VITE_TWITTER_ACCESS_SECRET
}).readOnly.v2


async function getMostRecentPosts() {

    let me = await Client.me();
    let data = await Client.userTimeline(me.data.id);
    let tweets = data.data.data; // what
    console.log(JSON.stringify(tweets))
}


export { getMostRecentPosts }

import createSession from "../session.js";
import chalk from "chalk";
import { getAllItemsFromFeed, wait_like_human } from "../util.js";

const list = async () => {
  const ig = await createSession();
  const followingFeed = ig.feed.accountFollowing(ig.state.cookieUserId);
  const following = await getAllItemsFromFeed(followingFeed);

  const headers = "Username  Mute Post  Mute Story";
  console.log(headers);

  for (const followee of following) {
    const followee_data = await ig.friendship.show(followee.pk);
    const mute_story = followee_data.is_muting_reel;
    const mute_post = followee_data.muting;
    const data = `${followee.username}  ${mute_post}  ${mute_story}`;
    console.log(data);
    await wait_like_human(6);
  }
};

export default list;

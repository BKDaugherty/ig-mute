import createSession from "../session.js";
import fs from "fs";
import { getAllItemsFromFeed, wait_like_human } from "../util.js";

const mute = async () => {
  const ig = await createSession();
  const rawdata = fs.readFileSync(0, "utf-8");
  let mute_set = new Set();

  for (const line of rawdata.split("\n")) {
    const username = line.split("  ")[0];
    mute_set.add(username);
  }

  const followingFeed = ig.feed.accountFollowing(ig.state.cookieUserId);
  const following = await getAllItemsFromFeed(followingFeed);

  const to_mute_users = following.filter(({ username }) =>
    mute_set.has(username)
  );
  const mute_user_ids = to_mute_users.map(({ pk }) => pk);
  for (const user_id of mute_user_ids) {
    await wait_like_human();
    await ig.friendship.mutePostsOrStoryFromFollow({
      mediaId: null,
      targetReelAuthorId: user_id,
      targetPostsAuthorId: user_id,
    });
  }
};

export default mute;

// Stolen from https://github.com/dilame/instagram-private-api/blob/master/examples/unfollow-users.example.ts#L44-50
export const getAllItemsFromFeed = async (feed) => {
  let items = [];
  do {
    items = items.concat(await feed.items());
  } while (feed.isMoreAvailable());
  return items;
};

export const wait_like_human = async (max_seconds) => {
  const time = Math.round(Math.random() * max_seconds * 1000) + 1000;
  await new Promise((resolve) => setTimeout(resolve, time));
};

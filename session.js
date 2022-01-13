import "dotenv/config";
import { IgApiClient } from "instagram-private-api";
import { writeFile, readFileSync, existsSync } from "fs";

async function saveData(data) {
  const path = process.env.IG_MUTE_ACCOUNT_PATH;
  // Save User account object to file
  await writeFile(path, JSON.stringify(data), (err) => {
    if (err) throw err;
  });
}

function dataExists() {
  return existsSync(process.env.IG_MUTE_ACCOUNT_PATH);
}

function loadData() {
  let rawdata = readFileSync(process.env.IG_MUTE_ACCOUNT_PATH, "utf-8");
  let account = JSON.parse(rawdata);
  return account;
}

const createSession = async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;

  ig.request.end$.subscribe(async () => {
    const serialized = await ig.state.serialize();
    delete serialized.constants;
    await saveData(serialized);
  });

  if (dataExists()) {
    const loadedData = loadData();
    await ig.state.deserialize(loadedData);
  } else {
    console.log("SOMETHING IS WRONG");
    return;
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  }
  return ig;
};

export default createSession;

#!/usr/bin/env node

import { program } from "commander";
import list from "./commands/list.js";
import mute from "./commands/mute.js";

program
  .command("list")
  .description(
    "List the accounts you are following with associated information"
  )
  .action(list);

program
  .command("mute")
  .description("Mute accounts associated with passed in usernames")
  .action(mute);

program.parse(process.argv);

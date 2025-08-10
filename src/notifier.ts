import axios from "axios";
import { getEmbed } from "./embed.js";
import { BuildEventParams, BuildStatus, Config } from "./types.js";

const getPayload = (status: BuildStatus, config: Config) => {
  const statusConfig = config[status];
  return {
    username: config.bot.username,
    avatar_url: config.bot.avatarUrl,
    embeds: [getEmbed(statusConfig)],
  };
};

const getWebhook = (status: BuildStatus, config: Config) => {
  const customWebhookKey = config[status].customWebhookKey;
  return process.env[customWebhookKey ?? "DISCORD_WEBHOOK_URL"];
};

export const notify = async (
  status: BuildStatus,
  params: BuildEventParams,
  config: Config,
) => {
  try {
    const webhook = getWebhook(status, config);
    if (!webhook) {
      console.log("No webhook set. Skipping.");
      return;
    }

    await axios.post(webhook, getPayload(status, config));

    console.log(`Build status "${status}" sent to Discord`);
  } catch (err) {
    console.error(err);
  }
};

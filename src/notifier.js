import axios from "axios";
import { getEmbed } from "./embed.js";

const getPayload = (buildStatus, config) => {
  const statusConfig = config[buildStatus];
  return {
    username: config.bot.username,
    avatar_url: config.bot.avatarUrl,
    embeds: [getEmbed(statusConfig)],
  };
};

const getWebhook = (buildStatus, config) => {
  const customWebhookKey = config[buildStatus].customWebhookKey;
  return process.env[customWebhookKey ?? "DISCORD_WEBHOOK_URL"];
};

export const notify = async (buildStatus, params, config) => {
  try {
    const webhook = getWebhook(buildStatus, config);
    if (!webhook) {
      console.log("No webhook set. Skipping.");
      return;
    }

    await axios.post(webhook, getPayload(buildStatus, config));

    console.log(`Build status "${buildStatus}" sent to Discord`);
  } catch (err) {
    console.error(err);
  }
};

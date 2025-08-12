import axios from "axios";
import { getEmbed } from "./embed";
import type {
  BuildEventParams,
  BuildStatus,
  Config,
  DiscordBody,
} from "./types";

const getPayload = (
  status: BuildStatus,
  params: BuildEventParams,
  config: Config,
): DiscordBody => {
  const statusConfig = config[status];
  return {
    username: config.bot.username,
    avatar_url: config.bot.avatarUrl,
    embeds: [getEmbed(params, statusConfig, config)],
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

    await axios.post(webhook, getPayload(status, params, config));

    console.log(`Build status "${status}" sent to Discord`);
  } catch (err) {
    console.error(err);
  }
};

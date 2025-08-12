import axios from "axios";
import { getEmbed } from "./embed";
import type {
  BuildEventParams,
  BuildStatus,
  Config,
  DiscordBody,
} from "./types";

const getPayload = (
  params: BuildEventParams,
  status: BuildStatus,
  config: Config,
): DiscordBody => {
  const statusConfig = config[status];

  return statusConfig.formatter
    ? statusConfig.formatter(params)
    : {
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
  params: BuildEventParams,
  status: BuildStatus,
  config: Config,
) => {
  try {
    const webhook = getWebhook(status, config);
    if (!webhook) {
      console.log("No webhook set. Skipping.");
      return;
    }

    await axios.post(webhook, getPayload(params, status, config));

    console.log(`Build status "${status}" sent to Discord`);
  } catch (err) {
    console.error(err);
  }
};

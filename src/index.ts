import { notify } from "./notifier.js";
import { getConfig } from "./config.js";
import {
  BuildEventHandler,
  BuildEventParams,
  BuildStatus,
  Inputs,
} from "./types.js";

const getEventFunction = (status: BuildStatus) => {
  return "on" + status.slice(0, 1).toUpperCase() + status.slice(1);
};

const discordNotifierPlugin = (inputs: Inputs) => {
  const config = getConfig(inputs);

  const notifier = (status: BuildStatus) => (params: BuildEventParams) =>
    notify(status, params, config);

  return Object.values(BuildStatus).reduce<Record<string, BuildEventHandler>>(
    (acc, status) => {
      if (!config.success.disabled) {
        acc[getEventFunction(status)] = notifier(status);
      }
      return acc;
    },
    {},
  );
};

export default discordNotifierPlugin;

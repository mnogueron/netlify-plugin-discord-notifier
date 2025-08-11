import { notify } from "./notifier";
import { getConfig } from "./config";
import type { BuildEventHandler, BuildEventParams, Inputs } from "./types";
import { BuildStatus } from "./types";

const getEventFunction = (status: BuildStatus) => {
  return "on" + status.slice(0, 1).toUpperCase() + status.slice(1);
};

export const discordNotifier = (inputs: Inputs) => {
  const config = getConfig(inputs);

  const notifier = (status: BuildStatus) => (params: BuildEventParams) =>
    notify(status, params, config);

  return Object.values(BuildStatus).reduce<Record<string, BuildEventHandler>>(
    (acc, status) => {
      if (!config[status].disabled) {
        acc[getEventFunction(status)] = notifier(status);
      }
      return acc;
    },
    {},
  );
};

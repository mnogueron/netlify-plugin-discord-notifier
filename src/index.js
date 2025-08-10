import { notify } from "./notifier.js";
import { getConfig } from "./config.js";

export const BuildStatus = {
  SUCCESS: "success",
  ERROR: "error",
  PRE_BUILD: "preBuild",
  BUILD: "build",
  POST_BUILD: "postBuild",
  END: "end",
  PRE_DEV: "preDev",
  DEV: "dev",
};

const getEventFunction = (eventType) => {
  return "on" + eventType.slice(0, 1).toUpperCase() + eventType.slice(1);
};

const discordNotifierPlugin = (inputs) => {
  const config = getConfig(inputs);

  const notifier = (buildStatus) => (params) =>
    notify(buildStatus, params, config);

  return Object.values(BuildStatus).reduce((acc, eventType) => {
    if (!config.success.disabled) {
      acc[getEventFunction(eventType)] = notifier(eventType);
    }
    return acc;
  }, {});
};

export default discordNotifierPlugin;

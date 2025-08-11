import { notify } from "./notifier";
import { getConfig } from "./config";
import { BuildStatus } from "./types";
import type {
  BuildEventParams,
  Inputs,
  PluginReturn,
  BuildEventHandler,
  EventHandlerKeys,
} from "./types";

export const discordNotifier = (inputs: Inputs): PluginReturn => {
  const config = getConfig(inputs);

  const notifier = (status: BuildStatus) => (params: BuildEventParams) =>
    notify(status, params, config);

  const handlers: Record<EventHandlerKeys, false | BuildEventHandler> = {
    onSuccess: !config.success.disabled && notifier(BuildStatus.SUCCESS),
    onError: !config.error.disabled && notifier(BuildStatus.ERROR),
    onPreBuild: !config.preBuild.disabled && notifier(BuildStatus.PRE_BUILD),
    onBuild: !config.build.disabled && notifier(BuildStatus.BUILD),
    onPostBuild: !config.postBuild.disabled && notifier(BuildStatus.POST_BUILD),
    onEnd: !config.end.disabled && notifier(BuildStatus.END),
    onPreDev: !config.preDev.disabled && notifier(BuildStatus.PRE_DEV),
    onDev: !config.dev.disabled && notifier(BuildStatus.DEV),
  };

  return Object.entries(handlers).reduce<PluginReturn>((acc, [key, func]) => {
    if (func) {
      acc[key as EventHandlerKeys] = func;
    }
    return acc;
  }, {});
};

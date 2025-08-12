import { notify } from "./notifier";
import { BuildStatus } from "./types";
import type {
  BuildEventParams,
  DiscordNotifierConfig,
  PluginReturn,
  BuildEventHandler,
  EventHandlerKeys,
} from "./types";
import { loadConfig } from "./config-loader";

export const discordNotifier = async (
  inputs: DiscordNotifierConfig,
): Promise<PluginReturn> => {
  const config = await loadConfig(inputs);
  console.log(config);

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

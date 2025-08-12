import { DiscordBody } from "./Discord";

export * from "./Discord";

export enum BuildStatus {
  SUCCESS = "success",
  ERROR = "error",
  PRE_BUILD = "preBuild",
  BUILD = "build",
  POST_BUILD = "postBuild",
  END = "end",
  PRE_DEV = "preDev",
  DEV = "dev",
}

export type Templates = {
  buildId: string;
  context: string;
  branch: string;
  commit: string;
  diff: string;
  logs: string;
};

type BaseEventConfig = {
  disabled: boolean;
  title: string;
  description: string;
  color: number;
  showBuildId: boolean;
  showContext: boolean;
  showBranch: boolean;
  showCommit: boolean;
  showDiff: boolean;
  showLogs: boolean;
  customWebhookKey?: string;
  formatter?: (params: BuildEventParams) => DiscordBody;
};

export type EventConfig = BaseEventConfig & {
  templates: Templates;
};

export type BotConfig = {
  username: string;
  avatarUrl: string;
};

export type Config = { bot: BotConfig } & Record<BuildStatus, EventConfig>;

export type DiscordNotifierConfig = Partial<{ bot: BotConfig }> &
  Partial<
    Record<
      BuildStatus,
      Partial<BaseEventConfig & { templates: Partial<Templates> }>
    >
  >;

export type BuildEventParams = {
  inputs: DiscordNotifierConfig;
  constants: Record<string, string>;
  netlifyConfig: Record<string, string>;
  packageJson: Record<string, string>;
};

export type TemplateParameters = {
  env: Record<string, unknown>;
  config: Config;
  statusConfig: EventConfig;
  meta: {
    appUrl: string;
    time: string;
    commitUrl: string;
    deployUrl?: string;
    diffUrl: string;
    logsUrl: string;
  };
} & BuildEventParams;

export type BuildEventHandler = (params: BuildEventParams) => void;

export type EventHandlerKeys =
  | "onPreBuild"
  | "onBuild"
  | "onPostBuild"
  | "onError"
  | "onSuccess"
  | "onEnd"
  | "onPreDev"
  | "onDev";

export type PluginReturn = Partial<Record<EventHandlerKeys, BuildEventHandler>>;

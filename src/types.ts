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

export type EventConfig = {
  disabled: boolean;
  title: string;
  status: string;
  color: number;
  showBuildId?: boolean;
  showContext?: boolean;
  showBranch?: boolean;
  showCommit?: boolean;
  showDiff?: boolean;
  showLogs?: boolean;
  customWebhookKey?: string;
};

export type Config = {
  bot: {
    username: string;
    avatarUrl: string;
  };
} & Record<BuildStatus, EventConfig>;

export type Inputs = Partial<Config>;

export type BuildEventParams = {
  inputs: Inputs;
};

export type BuildEventHandler = (params: BuildEventParams) => void;

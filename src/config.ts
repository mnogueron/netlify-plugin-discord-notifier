import type { BotConfig, Config, EventConfig, Templates } from "./types";

const DEFAULT_TEMPLATES: Templates = {
  buildId: '<%= it.env["BUILD_ID"] %>',
  context: '<%= it.env["CONTEXT"] %>',
  branch: '<%= it.env["BRANCH"] %>',
  commit: '[<%= it.env["COMMIT_REF"] %>](<%= it.meta.commitUrl %>)',
  diff: "<%= it.meta.diffUrl %>",
  logs: "<%= it.meta.logsUrl %>",
};

const BOT_DEFAULT_CONFIG: BotConfig = {
  username: "Netlify",
  avatarUrl: "https://www.netlify.com/v3/static/favicon/icon-512.png",
};

const SUCCESS_DEFAULT_CONFIG: EventConfig = {
  disabled: false,
  title: "Build deployed",
  description:
    '[<%= it.env["SITE_NAME"] %>](<%= it.meta.deployUrl  %>) deployed at <%= it.meta.time %>.',
  color: 0x1f8b4c,
  showBuildId: true,
  showContext: true,
  showBranch: true,
  showCommit: true,
  showDiff: true,
  showLogs: true,
  templates: DEFAULT_TEMPLATES,
};

const ERROR_DEFAULT_CONFIG: EventConfig = {
  disabled: false,
  title: "Build failed",
  description:
    '[<%= it.env["SITE_NAME"] %>](<%= it.meta.deployUrl  %>) failed to deploy at <%= it.meta.time %>.',
  color: 0x992d22,
  showBuildId: true,
  showContext: true,
  showBranch: true,
  showCommit: true,
  showDiff: true,
  showLogs: true,
  templates: DEFAULT_TEMPLATES,
};

const PRE_BUILD_DEFAULT_CONFIG: EventConfig = {
  disabled: true,
  title: "Build started",
  description:
    '[<%= it.env["SITE_NAME"] %>](<%= it.meta.deployUrl  %>) started building at <%= it.meta.time %>.',
  color: 0x3498db,
  showBuildId: false,
  showContext: false,
  showBranch: false,
  showCommit: false,
  showDiff: false,
  showLogs: false,
  templates: DEFAULT_TEMPLATES,
};

const BUILD_DEFAULT_CONFIG: EventConfig = {
  disabled: true,
  title: "Building",
  description:
    '[<%= it.env["SITE_NAME"] %>](<%= it.meta.deployUrl  %>) building at <%= it.meta.time %>.',
  color: 0x3498db,
  showBuildId: false,
  showContext: false,
  showBranch: false,
  showCommit: false,
  showDiff: false,
  showLogs: false,
  templates: DEFAULT_TEMPLATES,
};

const POST_BUILD_DEFAULT_CONFIG: EventConfig = {
  disabled: true,
  title: "Build finished",
  description:
    '[<%= it.env["SITE_NAME"] %>](<%= it.meta.deployUrl  %>) finished building at <%= it.meta.time %>.',
  color: 0x3498db,
  showBuildId: false,
  showContext: false,
  showBranch: false,
  showCommit: false,
  showDiff: false,
  showLogs: false,
  templates: DEFAULT_TEMPLATES,
};

const END_DEFAULT_CONFIG: EventConfig = {
  disabled: true,
  title: "Build ended",
  description:
    '[<%= it.env["SITE_NAME"] %>](<%= it.meta.deployUrl  %>) has finished at <%= it.meta.time %>.',
  color: 0x3498db,
  showBuildId: false,
  showContext: false,
  showBranch: false,
  showCommit: false,
  showDiff: false,
  showLogs: false,
  templates: DEFAULT_TEMPLATES,
};

const PRE_DEV_DEFAULT_CONFIG: EventConfig = {
  disabled: true,
  title: "Dev init",
  description:
    '[<%= it.env["SITE_NAME"] %>](<%= it.meta.deployUrl  %>) dev started at <%= it.meta.time %>.',
  color: 0x3498db,
  showBuildId: false,
  showContext: false,
  showBranch: false,
  showCommit: false,
  showDiff: false,
  showLogs: false,
  templates: DEFAULT_TEMPLATES,
};

const DEV_DEFAULT_CONFIG: EventConfig = {
  disabled: true,
  title: "Dev started",
  description:
    '[<%= it.env["SITE_NAME"] %>](<%= it.meta.deployUrl  %>) dev served at <%= it.meta.time %>.',
  color: 0x3498db,
  showBuildId: false,
  showContext: false,
  showBranch: false,
  showCommit: false,
  showDiff: false,
  showLogs: false,
  templates: DEFAULT_TEMPLATES,
};

export const DEFAULT_CONFIG: Config = {
  bot: BOT_DEFAULT_CONFIG,
  success: SUCCESS_DEFAULT_CONFIG,
  error: ERROR_DEFAULT_CONFIG,
  preBuild: PRE_BUILD_DEFAULT_CONFIG,
  build: BUILD_DEFAULT_CONFIG,
  postBuild: POST_BUILD_DEFAULT_CONFIG,
  end: END_DEFAULT_CONFIG,
  preDev: PRE_DEV_DEFAULT_CONFIG,
  dev: DEV_DEFAULT_CONFIG,
};

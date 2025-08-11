import type { Config, Inputs, Templates } from "./types";

const defaultTemplates: Templates = {
  buildId: '<%= it.env["BUILD_ID"] %>',
  context: '<%= it.env["CONTEXT"] %>',
  branch: '<%= it.env["BRANCH"] %>',
  commit: '[<%= it.env["COMMIT_REF"] %>](<%= it.meta.commitUrl %>)',
  diff: "<%= it.meta.diffUrl %>",
  logs: "<%= it.meta.logsUrl %>",
};

export const getConfig = (inputs: Inputs): Config => {
  return {
    bot: {
      username: "Netlify",
      avatarUrl: "https://www.netlify.com/v3/static/favicon/icon-512.png",
      ...inputs.bot,
    },
    success: {
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
      ...inputs.success,
      templates: {
        ...defaultTemplates,
        ...inputs.success?.templates,
      },
    },
    error: {
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
      ...inputs.error,
      templates: {
        ...defaultTemplates,
        ...inputs.error?.templates,
      },
    },
    preBuild: {
      disabled: true,
      title: "Build started",
      description:
        '[<%= it.env["SITE_NAME"] %>](<%= it.meta.deployUrl  %>) started building at <%= it.meta.time %>.',
      color: 0x3498db,
      ...inputs.preBuild,
      templates: {
        ...defaultTemplates,
        ...inputs.preBuild?.templates,
      },
    },
    build: {
      disabled: true,
      title: "Building",
      description:
        '[<%= it.env["SITE_NAME"] %>](<%= it.meta.deployUrl  %>) building at <%= it.meta.time %>.',
      color: 0x3498db,
      ...inputs.build,
      templates: {
        ...defaultTemplates,
        ...inputs.build?.templates,
      },
    },
    postBuild: {
      disabled: true,
      title: "Build finished",
      description:
        '[<%= it.env["SITE_NAME"] %>](<%= it.meta.deployUrl  %>) finished building at <%= it.meta.time %>.',
      color: 0x3498db,
      ...inputs.postBuild,
      templates: {
        ...defaultTemplates,
        ...inputs.postBuild?.templates,
      },
    },
    end: {
      disabled: true,
      title: "Build ended",
      description:
        '[<%= it.env["SITE_NAME"] %>](<%= it.meta.deployUrl  %>) has finished at <%= it.meta.time %>.',
      color: 0x3498db,
      ...inputs.end,
      templates: {
        ...defaultTemplates,
        ...inputs.end?.templates,
      },
    },
    preDev: {
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
      ...inputs.preDev,
      templates: {
        ...defaultTemplates,
        ...inputs.preDev?.templates,
      },
    },
    dev: {
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
      ...inputs.dev,
      templates: {
        ...defaultTemplates,
        ...inputs.dev?.templates,
      },
    },
  };
};

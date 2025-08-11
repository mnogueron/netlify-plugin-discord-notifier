import {
  type BuildEventParams,
  Config,
  EventConfig,
  TemplateParameters,
} from "./types";
import { getTemplateParameters, renderString } from "./templates";

const getFields = (
  statusConfig: EventConfig,
  templateParameters: TemplateParameters,
) => {
  return [
    statusConfig.showBuildId && {
      name: "Build ID",
      value: renderString(statusConfig.templates.buildId, templateParameters),
    },
    statusConfig.showContext && {
      name: "Context",
      value: renderString(statusConfig.templates.context, templateParameters),
    },
    statusConfig.showBranch && {
      name: "Branch",
      value: renderString(statusConfig.templates.branch, templateParameters),
    },
    statusConfig.showCommit && {
      name: "Deployed Commit",
      value: renderString(statusConfig.templates.commit, templateParameters),
    },
    statusConfig.showDiff && {
      name: "Diff",
      value: renderString(statusConfig.templates.diff, templateParameters),
    },
    statusConfig.showLogs && {
      name: "Logs",
      value: renderString(statusConfig.templates.logs, templateParameters),
    },
  ].filter(Boolean);
};

export const getEmbed = (
  params: BuildEventParams,
  statusConfig: EventConfig,
  config: Config,
) => {
  const templateParameters = getTemplateParameters(
    params,
    statusConfig,
    config,
  );

  console.log(templateParameters);

  return {
    url: templateParameters.meta.appUrl,
    color: statusConfig.color,
    title: renderString(statusConfig.title, templateParameters),
    description: renderString(statusConfig.description, templateParameters),
    fields: getFields(statusConfig, templateParameters),
  };
};

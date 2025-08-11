import { Eta } from "eta";
import {
  BuildEventParams,
  Config,
  EventConfig,
  TemplateParameters,
} from "./types";
import { format } from "date-fns";

const eta = new Eta();

const getRepositoryUrl = () =>
  process.env["REPOSITORY_URL"]?.replace(/git@(github.com):/, "https://$1/");

const getCommitUrl = (sha: string) => `${getRepositoryUrl()}/commit/${sha}`;

const getDiffUrl = (head: string, commitSha: string) =>
  `${getRepositoryUrl()}/compare/${head}...${commitSha}`;

const getAppUrl = () => {
  return `https://app.netlify.com/sites/${process.env["SITE_NAME"]}`;
};

const getDeployUrl = () => {
  return process.env["CONTEXT"] === "production"
    ? process.env["URL"]
    : process.env["DEPLOY_URL"];
};

export const getTemplateParameters = (
  params: BuildEventParams,
  statusConfig: EventConfig,
  config: Config,
): TemplateParameters => {
  return {
    env: process.env,
    inputs: params.inputs,
    constants: params.constants,
    netlifyConfig: params.netlifyConfig,
    packageJson: params.packageJson,
    config,
    statusConfig,
    meta: {
      appUrl: getAppUrl(),
      time: format(new Date(), "HH:mm:ss"),
      commitUrl: getCommitUrl(process.env["COMMIT_REF"] || ""),
      deployUrl: getDeployUrl(),
      diffUrl: getDiffUrl(
        process.env["CACHED_COMMIT_REF"] || "",
        process.env["COMMIT_REF"] || "",
      ),
      logsUrl: `${getAppUrl()}/deploys/${process.env["DEPLOY_ID"]}`,
    },
  };
};

export const renderString = (
  string: string,
  templateParameters: Record<string, unknown>,
) => eta.renderString(string, templateParameters);

import { format } from "date-fns";

const getRepositoryUrl = () =>
  process.env["REPOSITORY_URL"].replace(/git@(github.com):/, "https://$1/");

const getCommitUrl = (sha) => `${getRepositoryUrl()}/commit/${sha}`;

const getDiffUrl = (head, commitSha) =>
  `${getRepositoryUrl()}/compare/${head}...${commitSha}`;

const getAppUrl = () => {
  return `https://app.netlify.com/sites/${process.env["SITE_NAME"]}`;
};

const getDeployUrl = () => {
  return process.env["CONTEXT"] === "production"
    ? process.env["URL"]
    : process.env["DEPLOY_URL"];
};

// TODO add support for string templating in raw string config (variable injection)
const getDescription = (statusConfig) => {
  return `[${
    process.env["SITE_NAME"]
  }](${getDeployUrl()}) ${statusConfig.status} at ${format(new Date(), "HH:mm:ss")}.`;
};

const getFields = (statusConfig) => {
  return [
    statusConfig.showBuildId && {
      name: "Build ID",
      value: process.env["BUILD_ID"],
    },
    statusConfig.showContext && {
      name: "Context",
      value: process.env["CONTEXT"],
    },
    statusConfig.showBranch && {
      name: "Branch",
      value: process.env["BRANCH"],
    },
    statusConfig.showCommit && {
      name: "Deployed Commit",
      value: `[${process.env["COMMIT_REF"]}](${getCommitUrl(
        process.env["COMMIT_REF"],
      )})`,
    },
    statusConfig.showDiff && {
      name: "Diff",
      value: getDiffUrl(
        process.env["CACHED_COMMIT_REF"],
        process.env["COMMIT_REF"],
      ),
    },
    statusConfig.showLogs && {
      name: "Logs",
      value: `${getAppUrl()}/deploys/${process.env["DEPLOY_ID"]}`,
    },
  ].filter(Boolean);
};

export const getEmbed = (statusConfig) => {
  return {
    url: getAppUrl(),
    color: statusConfig.color,
    title: statusConfig.title,
    description: getDescription(statusConfig),
    fields: getFields(statusConfig),
  };
};

/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ["master", { name: "next", prerelease: true }],
};

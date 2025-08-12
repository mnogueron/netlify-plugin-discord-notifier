import path from "node:path";
import fs from "node:fs";
import { createJiti } from "jiti";
import { DEFAULT_CONFIG } from "./config";
import { deepmerge } from "deepmerge-ts";
import type { DiscordNotifierConfig } from "./types";
const jiti = createJiti(import.meta.url);

/**
 * This lib is inspired by eslint own way of loading configuration files
 */

const CONFIG_FILENAMES = [
  "discord-notifier.config.js",
  "discord-notifier.config.ts",
];

/**
 * Locate config file if available
 */
const locateConfigFile = () => {
  const configFilename = CONFIG_FILENAMES.find((f) => {
    const filePath = path.resolve(process.cwd(), f);
    return fs.existsSync(filePath);
  });

  if (configFilename) {
    return {
      filename: configFilename,
      basePath: process.cwd(),
    };
  }
};

/**
 * Import and return config object from filename and basePath if default export is an object
 * @param filename
 * @param basePath
 * @return config object
 */
const importConfigFile = async (filename: string, basePath: string) => {
  const configPath = path.resolve(basePath, filename);
  const config = await jiti.import(configPath, { default: true });
  if (typeof config === "object" && config) {
    return config;
  }

  return {};
};

/**
 * Load Discord Notifier config file if existing
 */
const loadConfigFile = async () => {
  const configFile = locateConfigFile();
  let config = {};
  if (configFile) {
    config = await importConfigFile(configFile.filename, configFile.basePath);
  }

  return config;
};

/**
 * Load config and merge to inputs and config file
 * @param inputs
 */
export const loadConfig = async (inputs: DiscordNotifierConfig) => {
  const configFile = await loadConfigFile();
  return deepmerge(DEFAULT_CONFIG, inputs, configFile);
};

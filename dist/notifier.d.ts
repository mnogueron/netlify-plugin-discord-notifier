import { BuildEventParams, BuildStatus, Config } from "./types.js";
export declare const notify: (buildStatus: BuildStatus, params: BuildEventParams, config: Config) => Promise<void>;

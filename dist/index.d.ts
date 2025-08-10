import { BuildEventHandler, Inputs } from "./types.js";
declare const discordNotifierPlugin: (inputs: Inputs) => Record<string, BuildEventHandler>;
export default discordNotifierPlugin;

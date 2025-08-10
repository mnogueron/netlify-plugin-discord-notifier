import { notify } from "./notifier.js";
import { getConfig } from "./config.js";
import { BuildStatus, } from "./types.js";
const getEventFunction = (eventType) => {
    return "on" + eventType.slice(0, 1).toUpperCase() + eventType.slice(1);
};
const discordNotifierPlugin = (inputs) => {
    const config = getConfig(inputs);
    const notifier = (buildStatus) => (params) => notify(buildStatus, params, config);
    return Object.values(BuildStatus).reduce((acc, eventType) => {
        if (!config.success.disabled) {
            acc[getEventFunction(eventType)] = notifier(eventType);
        }
        return acc;
    }, {});
};
export default discordNotifierPlugin;

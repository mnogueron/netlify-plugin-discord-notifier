import {Discord, BuildStatus} from './DiscordService';

export const onSuccess = async ({utils}) =>
    await Discord.sendBuildReport(BuildStatus.SUCCESS, utils)

export const onError = async ({utils}) =>
    await Discord.sendBuildReport(BuildStatus.ERROR, utils)

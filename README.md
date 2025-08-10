# netlify-plugin-discord-notifier

A Netlify build plugin to notify build statuses with Discord Webhook.

## Installation

Use npm, yarn or pnpm to add the plugin to the `devPendencies` in `package.json`.

`npm install -D netlify-plugin-discord-notifier`

Add the plugin to your `netlify.toml` configuration file:

```toml
# netlify.toml

[[plugins]]
package = "netlify-plugin-discord-notifier"
```

## Plugin configuration
#### Webhook
In order to send notifications to the right place, you first need to create a Discord Webhook to the channel in which you want to receive the build notifications, by following [Discord documentation](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

Once you have your webhook url, go to Netlify admin panel and add it as an [environment variable](https://docs.netlify.com/build/configure-builds/environment-variables/#declare-variables) as `DISCORD_WEBHOOK_URL`.

### Configure the events

This plugin support many configurations to tailor the notifications to your needs.

##### Bot

Add global bot configuration in your `netlify.toml` like following:

```toml
# netlify.toml

[[plugins]]
package = "netlify-plugin-discord-notifier"

    [plugins.inputs.bot]
    username = "My Bot"
```

| Key       | Type   | Default                                                |
|-----------|--------|--------------------------------------------------------|
| username  | String | Netlify                                                |
| avatarUrl | String | https://www.netlify.com/v3/static/favicon/icon-512.png |

#### Event bound configuration

Each build event has its own configuration key. To change its configuration, update your `netlify.toml` like following:

```toml
# netlify.toml

[[plugins]]
package = "netlify-plugin-discord-notifier"

    [plugins.inputs.preBuild]
    disabled = false
```

| Key         | Type      | Comment                                                                                                        |
|-------------|-----------|----------------------------------------------------------------------------------------------------------------|
| disabled    | Boolean   |                                                                                                                |
| title       | String    |                                                                                                                |
| status      | String    |                                                                                                                |
| color       | Hex color | Use [Discord.js doc](https://discord.js.org/docs/packages/discord.js/main/Colors:Variable) for color reference |
| showBuildId | Boolean   |                                                                                                                |
| showContext | Boolean   |                                                                                                                |
| showBranch  | Boolean   |                                                                                                                |
| showCommit  | Boolean   |                                                                                                                |
| showDiff    | Boolean   |                                                                                                                |
| showLogs    | Boolean   |                                                                                                                |

A default configuration is provided for each event (e.g. disabling notification for preDev and dev events) and available in [config.js](/src/config.js).
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


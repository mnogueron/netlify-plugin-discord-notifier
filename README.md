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

### Webhook
In order to send notifications to the right place, you first need to create a Discord Webhook to the channel in which you want to receive the build notifications, by following [Discord documentation](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

Once you have your webhook url, go to Netlify admin panel and add it as an [environment variable](https://docs.netlify.com/build/configure-builds/environment-variables/#declare-variables) as `DISCORD_WEBHOOK_URL`.

That's all you need to make this plugin work!

## Plugin configuration

### Bot

Add global bot configuration in your `netlify.toml` like so:

```toml
# netlify.toml

[[plugins]]
package = "netlify-plugin-discord-notifier"

    [plugins.inputs.bot]
    username = "My Bot"
```

| Key       | Type   | Default                                                  |
|-----------|--------|----------------------------------------------------------|
| username  | String | `Netlify`                                                |
| avatarUrl | String | `https://www.netlify.com/v3/static/favicon/icon-512.png` |

### Event bound configuration

Each build event has its own configuration key. To change its configuration, update your `netlify.toml`:

```toml
# netlify.toml

[[plugins]]
package = "netlify-plugin-discord-notifier"

    [plugins.inputs.preBuild]
    disabled = false
```

##### Supported event keys

```typescript
type SupportedEventKeys = 
  | "success" 
  | "error" 
  | "preBuild" 
  | "build" 
  | "postBuild" 
  | "end" 
  | "preDev" 
  | "dev";
```

##### Available attributes

| Key              | Type      | Comment                                                                                                        |
|------------------|-----------|----------------------------------------------------------------------------------------------------------------|
| disabled         | Boolean   |                                                                                                                |
| title            | Template  | See below on how to customise the title                                                                        |
| description      | Template  | See below on how to customise the description                                                                  |
| color            | Hex color | Use [Discord.js doc](https://discord.js.org/docs/packages/discord.js/main/Colors:Variable) for color reference |
| showBuildId      | Boolean   |                                                                                                                |
| showContext      | Boolean   |                                                                                                                |
| showBranch       | Boolean   |                                                                                                                |
| showCommit       | Boolean   |                                                                                                                |
| showDiff         | Boolean   |                                                                                                                |
| showLogs         | Boolean   |                                                                                                                |
| customWebhookKey | String    | Use it for custom env variable key (e.g. defining different webhook per event type)                            |
| templates        | Templates | See below on how to customise templates                                                                        |

A default configuration is provided for each event (e.g. disabling notification for `preDev` and `dev` events) and available in [config.ts](/src/config.ts).

### Custom messages

If the default messages do not fulfill your need, you can customise them using the `templates`, `title` and `description` attributes.

Templating is handle by [eta](https://eta.js.org/) and allows you to inject variables in your messages.

The `templates` object is as follows:

| Key              | Default                                                   |
|------------------|-----------------------------------------------------------|
| buildId          | `<%= it.env["BUILD_ID"] %>`                               |
| context          | `<%= it.env["CONTEXT"] %>`                                |
| branch           | `<%= it.env["BRANCH"] %>`                                 |
| commit           | `[<%= it.env["COMMIT_REF"] %>](<%= it.meta.commitUrl %>)` |
| diff             | `<%= it.meta.diffUrl %>`                                  |
| logs             | `<%= it.meta.logsUrl %>`                                  |

and supports the following values:

```typescript
type TemplateParameters = {
  // https://docs.netlify.com/extend/develop-and-share/develop-build-plugins/#environment-variables
  env: Record<string, unknown>;
  // https://docs.netlify.com/extend/develop-and-share/develop-build-plugins/#inputs
  inputs: Record<string, unknown>;
  // https://docs.netlify.com/extend/develop-and-share/develop-build-plugins/#constants
  constants: Record<string, unknown>;
  // https://docs.netlify.com/extend/develop-and-share/develop-build-plugins/#netlifyconfig
  netlifyConfig: Record<string, unknown>;
  // https://docs.netlify.com/extend/develop-and-share/develop-build-plugins/#packagejson
  packageJson: Record<string, unknown>;
  
  // The complete configuration object produced after inputs
  config: Config;
  // The event bound configuration
  statusConfig: EventConfig;
  
  // Metadata
  meta: {
    // Application url to Netlify (https://app.netlify.com/sites/XXX)
    appUrl: string;
    // Current server time as string
    time: string;
    // URL of the commit associated with the build
    commitUrl: string;
    // URL for the deployed artifact (production or preview)
    deployUrl: string;
    // URL for the git diff between current and previous build
    diffUrl: string;
    // URL for the build logs
    logsUrl: string;
  };
}
```

### Custom setup example

```toml
# netlify.toml

[[plugins]]
package = "netlify-plugin-discord-notifier"

    [plugins.inputs.postBuild]
    disabled = false
    title = 'Build passed flawlessly! 💯'
    description = '[<%= it.env["SITE_NAME"] %>](<%= it.meta.deployUrl  %>) has finished building at <%= it.meta.time %>. Ship it! 🚢'
    
    [plugins.inputs.preBuild]
    disabled = false
    title = 'A new build has been launched! 🚀'
    description = '[<%= it.env["SITE_NAME"] %>](<%= it.meta.deployUrl  %>) has started a new build at <%= it.meta.time %>. Let´s rock! 🤘🎸'
    showBranch = true

    [plugins.inputs.preBuild.templates]
    branch = '<%= it.env["BRANCH"] %> - <% if (it.env["PULL_REQUEST"] !== "false") { %> PR <% } else { %> Not a PR <% } %>'
```

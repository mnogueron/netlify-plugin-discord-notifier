import type { Embed } from "./Embed";
import type { Attachment } from "./Attachment";

export type * from "./Embed";
export type * from "./Attachment";

type Base = {
  /**
   * Override the default username of the webhook
   */
  username?: string;
  /**
   * Override the default avatar of the webhook
   */
  avatar_url?: string;
  /**
   * true if this is a TTS message (Text-to-Speech)
   */
  tts?: boolean;
};

type Content = {
  /**
   * The message contents
   * Up to 2000 characters
   */
  content: string;
};

type Embeds = {
  /**
   * Embedded `rich` content
   */
  embeds: Embed[];
};

type File = {
  file: string | Attachment;
};

/**
 * Discord Webhook Body structure
 *
 * @link https://discord.com/developers/docs/resources/webhook#execute-webhook
 */
export type DiscordBody = Base & (Content | Embeds | File);

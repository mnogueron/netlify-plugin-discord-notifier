import type { Attachment } from "../Attachment";

/**
 * Embed Footer Structure
 *
 * @link https://discord.com/developers/docs/resources/message#embed-object-embed-footer-structure
 */
export type EmbedFooter = {
  /**
   * Footer text
   * Up to 2048 characters
   */
  text: string;
  /**
   * URL of footer icon
   * (only supports http(s) and attachments)
   */
  icon_url?: string | Attachment;
  /**
   * A proxied URL of footer icon
   */
  proxy_icon_url?: string;
};

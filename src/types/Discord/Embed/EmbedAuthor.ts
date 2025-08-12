import type { Attachment } from "../Attachment";

/**
 * Embed Author Structure
 *
 * @link https://discord.com/developers/docs/resources/message#embed-object-embed-author-structure
 */
export type EmbedAuthor = {
  /**
   * Name of author
   * Up to 256 characters
   */
  name: string;
  /**
   * URL of author
   * (only supports http(s))
   */
  url?: string;
  /**
   * URL of author icon
   * (only supports http(s) and attachments)
   */
  icon_url?: string | Attachment;
  /**
   * A proxied URL of author icon
   */
  proxy_icon_url?: string;
};

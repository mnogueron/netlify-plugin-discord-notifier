import type { Attachment } from "../Attachment";

/**
 * Embed Thumbnail Structure
 *
 * @link https://discord.com/developers/docs/resources/message#embed-object-embed-thumbnail-structure
 */
export type EmbedThumbnail = {
  /**
   * Source URL of thumbnail
   * (only supports http(s) and attachments)
   */
  url: string | Attachment;
  /**
   * A proxied URL of the thumbnail
   */
  proxy_url?: string;
  /**
   * Height of thumbnail
   */
  height?: number;
  /**
   * Width of thumbnail
   */
  width?: number;
};

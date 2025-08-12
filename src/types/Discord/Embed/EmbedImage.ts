import type { Attachment } from "../Attachment";

/**
 * Embed Image Structure
 *
 * @link https://discord.com/developers/docs/resources/message#embed-object-embed-image-structure
 */
export type EmbedImage = {
  /**
   * Source URL of image
   * (only supports http(s) and attachments)
   */
  url: string | Attachment;
  /**
   * A proxied URL of the image
   */
  proxy_url?: string;
  /**
   * Height of image
   */
  height?: number;
  /**
   * Width of image
   */
  width?: number;
};

/**
 * Attachment Structure
 *
 * @link https://discord.com/developers/docs/resources/message#attachment-object-attachment-structure
 */
export type Attachment = {
  /**
   * Attachment id
   */
  id: string;
  /**
   * Name of file attached
   */
  filename: string;
  /**
   * The title of the file
   */
  title?: string;
  /**
   * Description for the file
   * Up to 1024 characters
   */
  description?: string;
  /**
   * The attachment's media type
   */
  content_type?: string;
  /**
   * Size of file in bytes
   */
  size: number;
  /**
   * Source URL of file
   */
  url: string;
  /**
   * A proxied URL of file
   */
  proxy_url: string;
  /**
   * Height of file (if image)
   */
  height?: number;
  /**
   * Width of file (if image)
   */
  width?: number;
  /**
   * Whether this attachment is ephemeral
   */
  ephemeral?: boolean;
};

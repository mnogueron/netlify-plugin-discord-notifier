/**
 * Embed Video Structure
 *
 * @link https://discord.com/developers/docs/resources/message#embed-object-embed-video-structure
 */
export type EmbedVideo = {
  /**
   * Source URL of video
   */
  url: string;
  /**
   * A proxied URL of the video
   */
  proxy_url?: string;
  /**
   * Height of video
   */
  height?: number;
  /**
   * Width of video
   */
  width?: number;
};

import type { EmbedFooter } from "./EmbedFooter";
import type { EmbedImage } from "./EmbedImage";
import type { EmbedThumbnail } from "./EmbedThumbnail";
import type { EmbedVideo } from "./EmbedVideo";
import type { EmbedProvider } from "./EmbedProvider";
import type { EmbedAuthor } from "./EmbedAuthor";
import type { EmbedField } from "./EmbedField";

export type * from "./EmbedFooter";
export type * from "./EmbedImage";
export type * from "./EmbedThumbnail";
export type * from "./EmbedVideo";
export type * from "./EmbedProvider";
export type * from "./EmbedAuthor";
export type * from "./EmbedField";

/**
 * Embed object.
 *
 * @link https://discord.com/developers/docs/resources/message#embed-object
 */
export type Embed = {
  /**
   * Title of embed
   * Up to 256 characters
   */
  title?: string;
  /**
   * Embed type.
   * (Always "rich" for webhook embeds)
   */
  type?: "rich";
  /**
   * Description of embed
   * Up to 4096 characters
   */
  description?: string;
  /**
   * URL of embed
   */
  url?: string;
  /**
   * ISO8601 timestamp of embed content
   */
  timestamp?: string;
  /**
   * Color code of the embed
   */
  color?: number;
  /**
   * Footer information
   */
  footer?: EmbedFooter;
  /**
   * Image information
   */
  image?: EmbedImage;
  /**
   * Thumbnail information
   */
  thumbnail?: EmbedThumbnail;
  /**
   * Video information
   */
  video?: EmbedVideo;
  /**
   * Provider information
   */
  provider?: EmbedProvider;
  /**
   * Author information
   */
  author?: EmbedAuthor;
  /**
   * Fields information
   * Up to 25 fields
   */
  fields?: EmbedField[];
};

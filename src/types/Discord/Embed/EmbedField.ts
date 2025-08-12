/**
 * Embed Field Structure
 *
 * @link https://discord.com/developers/docs/resources/message#embed-object-embed-field-structure
 */
export type EmbedField = {
  /**
   * Name of the field
   * Up to 256 characters
   */
  name: string;
  /**
   * Value of the field
   * Up to 1024 characters
   */
  value: string;
  /**
   * Whether this field should display inline
   */
  inline?: boolean;
};

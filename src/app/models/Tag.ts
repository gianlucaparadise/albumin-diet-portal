export const UntaggedName = 'Untagged';

export class Tag {
  // uniqueId: string;
  name: string;
  selected?: boolean;
  /**
   * this is `true` for a the 'Untagged' special tag
   */
  untaggedTag?: boolean;
}

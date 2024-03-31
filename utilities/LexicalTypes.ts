import type { BlockquoteNode } from "~/components/Lexical/Blockquote.server.vue";
import type { BookmarkNode } from "~/components/Lexical/Bookmark.server.vue";
import type { CodeNode } from "~/components/Lexical/Code.server.vue";
import type { GalleryNode } from "~/components/Lexical/Gallery.vue";
import type { HeadingNode } from "~/components/Lexical/Heading.server.vue";
import type { ImageNode } from "~/components/Lexical/Image.vue";
import type { LinkNode } from "~/components/Lexical/Link.server.vue";
import type { ListNode } from "~/components/Lexical/List.server.vue";
import type { ListItemNode } from "~/components/Lexical/ListItem.server.vue";
import type { ParagraphNode } from "~/components/Lexical/Paragraph.server.vue";
import type { TextNode } from "~/components/Lexical/Text.server.vue";

export enum CardWidth {
  Regular = "regular",
  Wide = "wide",
  Full = "full",
}

export type LexicalNode =
  | TextNode
  | HeadingNode
  | ParagraphNode
  | LinkNode
  | ListNode
  | ListItemNode
  | ImageNode
  | GalleryNode
  | BlockquoteNode
  | BookmarkNode
  | CodeNode;

export interface LexicalState {
  root: {
    children: LexicalNode[];
    version: number;
    type: string;
  };
}

import type { BlockquoteNode } from '~/components/Lexical/Blockquote.vue'
import type { BookmarkNode } from '~/components/Lexical/Bookmark.vue'
import type { CodeNode } from '~/components/Lexical/Code.server.vue'
import type { EmbedNode } from '~/components/Lexical/Embed.vue'
import type { GalleryNode } from '~/components/Lexical/Gallery.vue'
import type { HeadingNode } from '~/components/Lexical/Heading.vue'
import type { HRNode } from '~/components/Lexical/HorizontalRule.vue'
import type { ImageNode } from '~/components/Lexical/Image.vue'
import type { LinkNode } from '~/components/Lexical/Link.vue'
import type { ListNode } from '~/components/Lexical/List.vue'
import type { ListItemNode } from '~/components/Lexical/ListItem.vue'
import type { ParagraphNode } from '~/components/Lexical/Paragraph.vue'
import type { TextNode } from '~/components/Lexical/Text.vue'

export enum CardWidth {
  Regular = 'regular',
  Wide = 'wide',
  Full = 'full',
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
  | HRNode
  | EmbedNode
  | CodeNode

export interface LexicalState {
  root: {
    children: LexicalNode[]
    version: number
    type: string
  }
}

declare module 'react-syntax-highlighter' {
  import { FC, ReactNode } from 'react'
  
  export interface SyntaxHighlighterProps {
    language?: string
    style?: any
    customStyle?: any
    codeTagProps?: any
    useInlineStyles?: boolean
    showLineNumbers?: boolean
    startingLineNumber?: number
    lineNumberContainerStyle?: any
    lineNumberStyle?: any
    wrapLines?: boolean
    lineProps?: any
    renderer?: any
    PreTag?: any
    CodeTag?: any
    children: string
  }
  
  export const Prism: FC<SyntaxHighlighterProps>
  export const Light: FC<SyntaxHighlighterProps>
  export default FC<SyntaxHighlighterProps>
}

declare module 'react-syntax-highlighter/dist/cjs/styles/prism' {
  export const oneLight: any
  export const oneDark: any
} 
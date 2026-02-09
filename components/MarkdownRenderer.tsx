'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:underline-offset-2 prose-img:rounded-xl prose-blockquote:border-amber-500 prose-code:text-amber-700 dark:prose-code:text-amber-300">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
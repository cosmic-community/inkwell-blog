import Link from 'next/link'
import CategoryBadge from '@/components/CategoryBadge'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const excerpt = post.metadata?.excerpt
  const createdAt = post.created_at

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <article className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-700 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Featured Image */}
      {featuredImage && (
        <Link href={`/posts/${post.slug}`} className="block relative overflow-hidden aspect-[16/9]">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.title}
            width={800}
            height={450}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category + Date */}
        <div className="flex items-center gap-3 mb-3">
          {category && <CategoryBadge category={category} />}
          {formattedDate && (
            <time className="text-xs text-gray-400 dark:text-gray-500" dateTime={createdAt}>
              {formattedDate}
            </time>
          )}
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
          <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
            {excerpt}
          </p>
        )}

        {/* Author */}
        {author && (
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
                loading="lazy"
              />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {author.metadata.name}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
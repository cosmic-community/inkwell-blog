// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import CategoryBadge from '@/components/CategoryBadge'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} — Inkwell`,
    description: post.metadata?.excerpt || '',
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image
  const content = post.metadata?.content || ''

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  // Get related posts (same category, excluding current)
  const allPosts = await getPosts()
  const relatedPosts = category
    ? allPosts
        .filter((p) => p.slug !== post.slug && p.metadata?.category?.slug === category.slug)
        .slice(0, 2)
    : []

  return (
    <article>
      {/* Hero */}
      <header className="relative">
        {featuredImage && (
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              width={1600}
              height={600}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 via-white/50 dark:via-gray-950/50 to-transparent" />
          </div>
        )}

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 -mt-20 sm:-mt-24 pb-8">
          <div className="flex items-center gap-3 mb-4">
            {category && <CategoryBadge category={category} size="md" />}
            {formattedDate && (
              <time className="text-sm text-gray-500 dark:text-gray-400" dateTime={post.created_at}>
                {formattedDate}
              </time>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Author */}
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="inline-flex items-center gap-3 mt-6 group"
            >
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={author.metadata.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-200 dark:ring-amber-800"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {author.metadata.name}
                </p>
                {author.metadata?.bio && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                    {author.metadata.bio}
                  </p>
                )}
              </div>
            </Link>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <MarkdownRenderer content={content} />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              More in {category?.metadata.name}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/posts/${relatedPost.slug}`}
                  className="group block p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-700 transition-all"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2">
                    {relatedPost.title}
                  </h3>
                  {relatedPost.metadata?.excerpt && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {relatedPost.metadata.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
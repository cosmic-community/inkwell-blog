// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAuthorBySlug, getPostsByAuthor } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return { title: 'Author Not Found' }
  }

  return {
    title: `${author.metadata.name} — Inkwell`,
    description: author.metadata?.bio || `Articles by ${author.metadata.name}`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const profilePhoto = author.metadata?.profile_photo
  const socialLink = author.metadata?.social_link

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Author Header */}
      <header className="mb-12 text-center max-w-2xl mx-auto">
        {profilePhoto && (
          <img
            src={`${profilePhoto.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
            alt={author.metadata.name}
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-6 ring-4 ring-amber-200 dark:ring-amber-800"
          />
        )}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
          {author.metadata.name}
        </h1>
        {author.metadata?.bio && (
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {author.metadata.bio}
          </p>
        )}
        <div className="mt-4 flex items-center justify-center gap-4">
          {socialLink && (
            <a
              href={socialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Social
            </a>
          )}
          <span className="text-sm text-gray-400 dark:text-gray-500">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'}
          </span>
        </div>
      </header>

      {/* Author's Posts */}
      {posts.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Articles by {author.metadata.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No articles from this author yet.
          </p>
        </div>
      )}
    </div>
  )
}
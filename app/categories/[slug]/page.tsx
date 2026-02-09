// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPostsByCategory } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.metadata.name} — Inkwell`,
    description: category.metadata?.description || `Browse ${category.metadata.name} articles`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Category Header */}
      <header className="mb-12 text-center max-w-2xl mx-auto">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 mb-4">
          Category
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
          {category.metadata.name}
        </h1>
        {category.metadata?.description && (
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {category.metadata.description}
          </p>
        )}
        <p className="mt-3 text-sm text-gray-400 dark:text-gray-500">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </p>
      </header>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No articles in this category yet.
          </p>
        </div>
      )}
    </div>
  )
}
import Link from 'next/link'
import { getPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories(),
  ])

  // Sort posts by created_at descending
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.created_at || '').getTime()
    const dateB = new Date(b.created_at || '').getTime()
    return dateB - dateA
  })

  const featuredPost = sortedPosts[0]
  const remainingPosts = sortedPosts.slice(1)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-amber-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
              Stories that
              <span className="text-amber-500 dark:text-amber-400"> inspire</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Explore thoughtful articles on technology, travel, and lifestyle from writers who care about their craft.
            </p>

            {/* Category Pills */}
            {categories.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <CategoryBadge key={category.id} category={category} size="md" />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
          <div className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-700 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              {featuredPost.metadata?.featured_image && (
                <Link href={`/posts/${featuredPost.slug}`} className="block relative overflow-hidden aspect-[16/10] md:aspect-auto">
                  <img
                    src={`${featuredPost.metadata.featured_image.imgix_url}?w=1200&h=750&fit=crop&auto=format,compress`}
                    alt={featuredPost.title}
                    width={600}
                    height={375}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              )}

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white">
                    Featured
                  </span>
                  {featuredPost.metadata?.category && (
                    <CategoryBadge category={featuredPost.metadata.category} />
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  <Link href={`/posts/${featuredPost.slug}`} className="after:absolute after:inset-0">
                    {featuredPost.title}
                  </Link>
                </h2>

                {featuredPost.metadata?.excerpt && (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {featuredPost.metadata.excerpt}
                  </p>
                )}

                {featuredPost.metadata?.author && (
                  <div className="flex items-center gap-3">
                    {featuredPost.metadata.author.metadata?.profile_photo && (
                      <img
                        src={`${featuredPost.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt={featuredPost.metadata.author.metadata.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {featuredPost.metadata.author.metadata.name}
                      </p>
                      {featuredPost.created_at && (
                        <time className="text-xs text-gray-400 dark:text-gray-500" dateTime={featuredPost.created_at}>
                          {new Date(featuredPost.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Post Grid */}
      {remainingPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Latest Articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No posts yet. Add some content in your Cosmic dashboard to get started!
          </p>
        </section>
      )}
    </div>
  )
}
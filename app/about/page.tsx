import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPageBySlug, getAuthors } from '@/lib/cosmic'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Inkwell',
  description: 'Learn more about the Inkwell blog and the people behind it.',
}

export default async function AboutPage() {
  const [page, authors] = await Promise.all([
    getPageBySlug('about'),
    getAuthors(),
  ])

  if (!page) {
    notFound()
  }

  const heroImage = page.metadata?.hero_image
  const heading = page.metadata?.heading || page.title
  const content = page.metadata?.content || ''

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        {heroImage && (
          <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden">
            <img
              src={`${heroImage.imgix_url}?w=1600&h=500&fit=crop&auto=format,compress`}
              alt={heading}
              width={1600}
              height={500}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 via-white/60 dark:via-gray-950/60 to-transparent" />
          </div>
        )}

        <div className={`relative max-w-3xl mx-auto px-4 sm:px-6 ${heroImage ? '-mt-16 sm:-mt-20' : 'pt-12 sm:pt-16'} pb-8`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
            {heading}
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <MarkdownRenderer content={content} />
      </div>

      {/* Meet the Authors */}
      {authors.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Meet Our Writers
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {authors.map((author) => (
                <Link
                  key={author.id}
                  href={`/authors/${author.slug}`}
                  className="group block p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-700 transition-all"
                >
                  {author.metadata?.profile_photo && (
                    <img
                      src={`${author.metadata.profile_photo.imgix_url}?w=192&h=192&fit=crop&auto=format,compress`}
                      alt={author.metadata.name}
                      width={96}
                      height={96}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-2 ring-amber-200 dark:ring-amber-800"
                      loading="lazy"
                    />
                  )}
                  <h3 className="text-center font-semibold text-gray-900 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-1">
                    {author.metadata.name}
                  </h3>
                  {author.metadata?.bio && (
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {author.metadata.bio}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
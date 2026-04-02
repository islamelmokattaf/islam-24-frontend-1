import type { Metadata } from "next";
import Link from "next/link";
import { getPageBySlug, getArticles } from "@/lib/api";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import ArticleCard from "@/components/blog/ArticleCard";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("home");
  const seo = page?.seo;

  return {
    title: seo?.meta_title || "Home",
    description: seo?.meta_description || "Welcome to our website",
  };
}

export default async function HomePage() {
  const [page, { data: articles }] = await Promise.all([
    getPageBySlug("home"),
    getArticles({ pageSize: 6 }),
  ]);

  const featuredArticle = articles.find((a) => a.is_featured);
  const recentArticles = articles.filter((a) => a.id !== featuredArticle?.id).slice(0, 3);

  return (
    <>
      {page?.content && page.content.length > 0 ? (
        <BlockRenderer blocks={page.content} />
      ) : (
        <section className="relative isolate min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Welcome to Our Website
            </h1>
            <p className="mt-6 text-lg text-white/75">
              A modern, CMS-powered site built with Strapi and Next.js
            </p>
            <Link
              href="/blog"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow hover:bg-gray-100 transition-all"
            >
              Read our blog
            </Link>
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Latest Articles</h2>
                <p className="mt-2 text-gray-600">Fresh insights and updates from our blog</p>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                View all
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            {featuredArticle && (
              <div className="mb-12">
                <ArticleCard article={featuredArticle} featured />
              </div>
            )}
            {recentArticles.length > 0 && (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {recentArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

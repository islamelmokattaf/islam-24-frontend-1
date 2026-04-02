import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/strapi";
import { getStrapiMediaUrl } from "@/lib/api";

interface Props {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: Props) {
  const { title, slug, excerpt, featured_image, category, author_name, published_date, reading_time } = article;

  const imageUrl = featured_image?.url;
  const imageAlt = featured_image?.alternativeText || title;

  const formattedDate = new Date(published_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 transition-all duration-300 hover:shadow-xl lg:grid lg:grid-cols-2 lg:gap-0">
        <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
          {imageUrl && (
            <Image
              src={getStrapiMediaUrl(imageUrl)}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          )}
        </div>
        <div className="flex flex-col justify-center p-8 lg:p-12">
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="mb-3 inline-flex self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
            >
              {category.name}
            </Link>
          )}
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight lg:text-3xl">
            <Link href={`/article/${slug}`} className="hover:text-blue-600 transition-colors">
              {title}
            </Link>
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed line-clamp-3">{excerpt}</p>
          <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
            <span>{author_name}</span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <time dateTime={published_date}>{formattedDate}</time>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span>{reading_time} min read</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden">
        {imageUrl && (
          <Image
            src={getStrapiMediaUrl(imageUrl)}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {category && (
          <Link
            href={`/category/${category.slug}`}
            className="mb-2 inline-flex self-start rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
          >
            {category.name}
          </Link>
        )}
        <h3 className="text-lg font-semibold text-gray-900 tracking-tight line-clamp-2">
          <Link href={`/article/${slug}`} className="hover:text-blue-600 transition-colors">
            {title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm text-gray-600 leading-relaxed line-clamp-2">{excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
          <time dateTime={published_date}>{formattedDate}</time>
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          <span>{reading_time} min read</span>
        </div>
      </div>
    </article>
  );
}

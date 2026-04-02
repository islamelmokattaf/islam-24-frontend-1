import type { Article } from "@/types/strapi";
import { getStrapiMediaUrl } from "@/lib/api";

interface Props {
  article: Article;
  siteUrl: string;
}

export default function ArticleJsonLd({ article, siteUrl }: Props) {
  const { title, excerpt, featured_image, author_name, published_date, updatedAt, slug } = article;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    image: featured_image ? getStrapiMediaUrl(featured_image.url) : undefined,
    author: {
      "@type": "Person",
      name: author_name,
    },
    publisher: {
      "@type": "Organization",
      name: "MySite",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    datePublished: published_date,
    dateModified: updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/article/${slug}`,
    },
    url: `${siteUrl}/article/${slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

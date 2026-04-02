import type { TextBlockData } from "@/types/strapi";

interface Props {
  block: TextBlockData;
}

export default function TextBlock({ block }: Props) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        {block.heading && (
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
            {block.heading}
          </h2>
        )}

        <div
          className="prose prose-lg prose-gray max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-md
            prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      </div>
    </section>
  );
}

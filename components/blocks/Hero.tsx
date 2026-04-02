import Image from "next/image";
import Link from "next/link";
import type { HeroBlock } from "@/types/strapi";
import { getStrapiMediaUrl } from "@/lib/api";

interface Props {
  block: HeroBlock;
}

export default function Hero({ block }: Props) {
  const bgUrl = block.background_image?.url;

  return (
    <section className="relative isolate min-h-[70vh] flex items-center justify-center overflow-hidden">
      {bgUrl && (
        <Image
          src={getStrapiMediaUrl(bgUrl)}
          alt={block.background_image?.alternativeText || block.title}
          fill
          className="object-cover -z-10"
          priority
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="mx-auto max-w-4xl px-6 py-24 text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
          {block.title}
        </h1>
        {block.subtitle && (
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/85 max-w-2xl mx-auto">
            {block.subtitle}
          </p>
        )}
        {block.button_text && block.button_link && (
          <div className="mt-10">
            <Link
              href={block.button_link}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5"
            >
              {block.button_text}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

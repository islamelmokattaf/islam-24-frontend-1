import Link from "next/link";
import type { CTABlockData } from "@/types/strapi";

interface Props {
  block: CTABlockData;
}

export default function CTABlock({ block }: Props) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-16 sm:px-16 sm:py-20 text-center">
          {/* Decorative gradient */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {block.title}
            </h2>

            {block.description && (
              <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {block.description}
              </p>
            )}

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
          </div>
        </div>
      </div>
    </section>
  );
}

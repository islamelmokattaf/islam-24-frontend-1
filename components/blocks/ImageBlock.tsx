import Image from "next/image";
import type { ImageBlockData } from "@/types/strapi";
import { getStrapiMediaUrl } from "@/lib/api";

interface Props {
  block: ImageBlockData;
}

export default function ImageBlock({ block }: Props) {
  const img = block.image;
  if (!img) return null;

  return (
    <section className="py-12 sm:py-16">
      <figure className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gray-100">
          <Image
            src={getStrapiMediaUrl(img.url)}
            alt={img.alternativeText || block.caption || ""}
            width={img.width}
            height={img.height}
            className="w-full h-auto object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
          />
        </div>
        {block.caption && (
          <figcaption className="mt-4 text-center text-sm text-gray-500 italic">
            {block.caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
}

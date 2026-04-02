import type { DynamicZoneBlock } from "@/types/strapi";
import Hero from "./Hero";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import CTABlock from "./CTABlock";
import ServicesBlock from "./ServicesBlock";

interface Props {
  blocks: DynamicZoneBlock[];
}

export default function BlockRenderer({ blocks }: Props) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block) => {
        switch (block.__component) {
          case "blocks.hero":
            return <Hero key={block.id} block={block} />;

          case "blocks.text-block":
            return <TextBlock key={block.id} block={block} />;

          case "blocks.image-block":
            return <ImageBlock key={block.id} block={block} />;

          case "blocks.cta-block":
            return <CTABlock key={block.id} block={block} />;

          case "blocks.services-block":
            return <ServicesBlock key={block.id} block={block} />;

          default: {
            const exhaustive: never = block;
            console.warn(`Unknown block type: ${(exhaustive as DynamicZoneBlock).__component}`);
            return null;
          }
        }
      })}
    </>
  );
}

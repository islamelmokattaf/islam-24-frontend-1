import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getFeaturedArticles, getArticlesByCategory, getMostRead } from "@/lib/api";

export const dynamic = "force-dynamic";

function getStrapiMedia(url?: string) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL?.replace("/api","") || ""}${url}`;
}

export const metadata: Metadata = {
  title: "islam-24.com — قرآن، سنة، أدعية، أذكار، أسماء الله الحسنى",
  description: "موقع إسلامي شامل: القرآن، الحديث، الفقه، السيرة، أسماء الله الحسنى، الأدعية والأذكار",
};

export default async function HomePage() {
  const [categories, featured, mostRead] = await Promise.all([
    getCategories(),
    getFeaturedArticles(5),
    getMostRead(15),
  ]);

  const sections = await Promise.all(
    categories.slice(0, 14).map(async (cat) => ({
      category: cat,
      articles: await getArticlesByCategory(cat.slug, 7),
    }))
  );

  const activeSections = sections.filter((s) => s.articles.length > 0);
  const STRAPI_MEDIA = process.env.NEXT_PUBLIC_STRAPI_URL?.replace("/api","") || "";

  return (
    <main>
      {/* HERO */}
      {featured.length > 0 && (
        <section className="bg-gradient-to-bl from-emerald-900 to-emerald-950 text-white py-8 border-b-4 border-amber-600">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-amber-500 font-bold mb-4 text-lg">🔥 أحدث المواضيع</div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {featured.slice(0, 5).map((art) => {
                const img = getStrapiMedia(art.image_large?.url || art.image?.url);
                return (
                  <Link key={art.slug} href={`/article/${art.slug}`} className="group bg-white/10 rounded-xl overflow-hidden border border-white/10 hover:bg-white/20 transition-all hover:-translate-y-1">
                    {img ? (
                      <img src={img} alt={art.title} className="w-full h-32 object-cover" />
                    ) : (
                      <div className="w-full h-32 bg-emerald-800 flex items-center justify-center text-4xl">☪</div>
                    )}
                    <div className="p-3">
                      <span className="text-amber-500 text-xs font-bold">{art.category?.name || ""}</span>
                      <h2 className="text-sm font-bold mt-1 leading-snug line-clamp-2">{art.title}</h2>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* DAILY CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: "📖", title: "آية اليوم", text: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ", ref: "سورة القمر: ١٧" },
            { icon: "☪", title: "حديث اليوم", text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى", ref: "متفق عليه" },
            { icon: "💡", title: "حكمة اليوم", text: "من عرف الله أحبه، ومن أحبه أطاعه، ومن أطاعه سعد", ref: "— ابن القيم" },
            { icon: "🤲", title: "دعاء اليوم", text: "اللهم إني أسألك الهدى والتقى والعفاف والغنى", ref: "رواه مسلم" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border-r-4 border-emerald-600 shadow-sm">
              <h4 className="text-emerald-700 font-bold text-sm mb-2">{item.icon} {item.title}</h4>
              <p className="text-gray-800 text-sm leading-relaxed">{item.text}</p>
              <span className="text-gray-500 text-xs mt-2 block">{item.ref}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* CONTENT */}
          <div className="space-y-6">
            {activeSections.map(({ category, articles }, idx) => {
              const main = articles[0];
              const subs = articles.slice(1, 7);
              return (
                <section key={category.slug} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b-2 border-emerald-600">
                    <h2 className="text-lg font-bold text-emerald-800">
                      <Link href={`/category/${category.slug}`}>{category.name}</Link>
                    </h2>
                    <Link href={`/category/${category.slug}`} className="text-emerald-600 font-semibold text-sm border border-emerald-600 rounded-full px-4 py-1 hover:bg-emerald-600 hover:text-white transition-colors">المزيد ←</Link>
                  </div>
                  <div className="p-5">
                    {main && (
                      <div className="flex flex-col md:flex-row gap-4 mb-4 pb-4 border-b border-gray-100">
                        <Link href={`/article/${main.slug}`} className="shrink-0">
                          {getStrapiMedia(main.image_large?.url || main.image?.url) ? (
                            <img src={getStrapiMedia(main.image_large?.url || main.image?.url)} alt={main.title} className="w-full md:w-[380px] h-48 object-cover rounded-lg" />
                          ) : (
                            <div className="w-full md:w-[380px] h-48 bg-emerald-50 rounded-lg flex items-center justify-center text-5xl">📖</div>
                          )}
                        </Link>
                        <div>
                          <h3 className="text-lg font-bold leading-snug">
                            <Link href={`/article/${main.slug}`} className="hover:text-emerald-700">{main.title}</Link>
                          </h3>
                          <p className="text-gray-500 text-xs mt-1">
                            {main.publishedAt ? new Date(main.publishedAt).toLocaleDateString("ar-EG") : ""}
                          </p>
                        </div>
                      </div>
                    )}
                    {subs.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {subs.map((sub) => (
                          <div key={sub.slug} className="flex gap-3">
                            <Link href={`/article/${sub.slug}`} className="shrink-0">
                              {getStrapiMedia(sub.image_small?.url || sub.image?.url) ? (
                                <img src={getStrapiMedia(sub.image_small?.url || sub.image?.url)} alt={sub.title} className="w-[132px] h-[101px] object-cover rounded-lg" />
                              ) : (
                                <div className="w-[132px] h-[101px] bg-emerald-50 rounded-lg flex items-center justify-center text-3xl">📄</div>
                              )}
                            </Link>
                            <div className="min-w-0">
                              <h3 className="text-sm font-bold leading-snug line-clamp-2">
                                <Link href={`/article/${sub.slug}`} className="hover:text-emerald-700">{sub.title}</Link>
                              </h3>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-5">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <h2 className="px-5 py-4 font-bold text-emerald-800 border-b-2 border-emerald-600">📊 الأكثر قراءة</h2>
              <ol className="p-4 space-y-1">
                {mostRead.slice(0, 10).map((art, i) => (
                  <li key={art.slug}>
                    <Link href={`/article/${art.slug}`} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0 text-sm hover:text-emerald-700">
                      <span className="bg-emerald-600 text-white w-7 h-7 rounded flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                      {art.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-lg mb-2">🌟 أسماء الله الحسنى</h3>
              <p className="text-white/80 text-sm mb-3">تعرف على أسماء الله الحسنى الـ 99 ومعانيها وآثارها</p>
              <Link href="/category/asma-allah" className="block text-center bg-white text-amber-700 py-2 rounded-lg font-bold text-sm hover:bg-amber-50 transition-colors">تصفح الأسماء ←</Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

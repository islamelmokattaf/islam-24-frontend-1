import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getFeaturedArticles, getArticlesByCategory, getMostRead } from "@/lib/api";
import { getStrapiMedia } from "@/lib/utils";

export const dynamic = "force-dynamic";

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

  return (
    <main>
      {/* HERO BANNER */}
      {featured.length > 0 && (
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-label">🔥 أحدث المواضيع</div>
            <div className="hero-grid">
              {featured.slice(0, 5).map((art, i) => {
                const img = getStrapiMedia(art.image_large?.url || art.image?.url);
                return (
                  <Link key={art.slug} href={`/article/${art.slug}`} className="hero-card">
                    {img ? (
                      <img src={img} alt={art.title} className="hero-card-img" />
                    ) : (
                      <div className="hero-card-placeholder">☪</div>
                    )}
                    <div className="hero-card-body">
                      <span className="hero-card-cat">{art.category?.name}</span>
                      <h2 className="hero-card-title">{art.title}</h2>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* DAILY CONTENT */}
      <section className="daily">
        <div className="daily-inner">
          <div className="daily-grid">
            <div className="daily-card">
              <h4>📖 آية اليوم</h4>
              <p>وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ</p>
              <span className="daily-ref">سورة القمر: ١٧</span>
            </div>
            <div className="daily-card">
              <h4>☪ حديث اليوم</h4>
              <p>إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى</p>
              <span className="daily-ref">متفق عليه</span>
            </div>
            <div className="daily-card">
              <h4>💡 حكمة اليوم</h4>
              <p>من عرف الله أحبه، ومن أحبه أطاعه، ومن أطاعه سعد</p>
              <span className="daily-ref">— ابن القيم</span>
            </div>
            <div className="daily-card">
              <h4>🤲 دعاء اليوم</h4>
              <p>اللهم إني أسألك الهدى والتقى والعفاف والغنى</p>
              <span className="daily-ref">رواه مسلم</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <div className="main-layout">
        {/* CONTENT */}
        <div className="content-col">
          {activeSections.map(({ category, articles }, idx) => {
            const main = articles[0];
            const subs = articles.slice(1, 7);
            return (
              <section key={category.slug} className="section-block">
                <div className="section-head">
                  <h2>
                    <Link href={`/category/${category.slug}`}>{category.name}</Link>
                  </h2>
                  <Link href={`/category/${category.slug}`} className="section-more">المزيد ←</Link>
                </div>
                <div className="section-body">
                  {main && (
                    <div className="news-main">
                      <Link href={`/article/${main.slug}`}>
                        <img
                          src={getStrapiMedia(main.image_large?.url || main.image?.url) || "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='380' height='200'><rect fill='%23e0f2f1' width='380' height='200'/><text x='190' y='110' text-anchor='middle' font-size='40'>📖</text></svg>"}
                          alt={main.title}
                          className="news-main-img"
                        />
                      </Link>
                      <div className="news-main-text">
                        <h3><Link href={`/article/${main.slug}`}>{main.title}</Link></h3>
                        <span className="news-date">
                          {main.publishedAt ? new Date(main.publishedAt).toLocaleDateString("ar-EG") : ""}
                        </span>
                      </div>
                    </div>
                  )}
                  {subs.length > 0 && (
                    <div className="news-subs">
                      {subs.map((sub) => (
                        <div key={sub.slug} className="news-sub">
                          <Link href={`/article/${sub.slug}`}>
                            <img
                              src={getStrapiMedia(sub.image_small?.url || sub.image?.url) || "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='132' height='101'><rect fill='%23e0f2f1' width='132' height='101'/><text x='66' y='55' text-anchor='middle' font-size='24'>📄</text></svg>"}
                              alt={sub.title}
                              className="news-sub-img"
                            />
                          </Link>
                          <div className="news-sub-text">
                            <h3><Link href={`/article/${sub.slug}`}>{sub.title}</Link></h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {idx < activeSections.length - 1 && (
                  <div className="section-divider">
                    <div className="divider-card">
                      <h4>💡 حكمة</h4>
                      <p>من عرف الله أحبه، ومن أحبه أطاعه، ومن أطاعه سعد</p>
                    </div>
                    <div className="divider-card">
                      <h4>☪ حديث</h4>
                      <p>اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها</p>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* SIDEBAR */}
        <aside className="sidebar-col">
          <div className="most-read">
            <h2>📊 الأكثر قراءة</h2>
            <ol className="most-read-list">
              {mostRead.slice(0, 10).map((art, i) => (
                <li key={art.slug}>
                  <Link href={`/article/${art.slug}`}>
                    <span className="most-read-num">{i + 1}</span>
                    {art.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <div className="sidebar-box">
            <h3>🌟 أسماء الله الحسنى</h3>
            <p>تعرف على أسماء الله الحسنى الـ 99 ومعانيها</p>
            <Link href="/category/asma-allah" className="sidebar-btn">تصفح الأسماء ←</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}

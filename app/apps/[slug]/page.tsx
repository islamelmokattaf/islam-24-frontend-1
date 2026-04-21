import { notFound } from 'next/navigation'

const APPS: Record<string, { title: string; description: string }> = {
  sibaq: {
    title: 'سباق الفردوس الأعلى',
    description: 'تطبيق إسلامي لتتبع العبادات اليومية وأعمال القلوب والأذكار',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const app = APPS[params.slug]
  if (!app) return {}
  return { title: app.title, description: app.description }
}

export default function AppPage({
  params,
}: {
  params: { slug: string }
}) {
  if (!APPS[params.slug]) notFound()

  return (
    <iframe
      src={`/apps/${params.slug}/index.html`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
      }}
      title={APPS[params.slug].title}
    />
  )
}
// ادناه عشان لو حبيب اضيف تطبيق تاني 
//  const APPS: Record<string, { title: string; description: string }> = {
//   sibaq: {
//     title: 'سباق الفردوس الأعلى',
//     description: 'تطبيق إسلامي لتتبع العبادات اليومية وأعمال القلوب والأذكار',
//   },
//   adhkar: {                           // ← السطر الجديد
//     title: 'تطبيق الأذكار',           // ← اسمه
//     description: 'أذكار الصباح والمساء', // ← وصفه
//   },
// }
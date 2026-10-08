import { CommunitySection } from '@/components/CommunitySection'
import { Testimonials } from '@/components/Testimonials'
import { DEFAULTS, or } from '@/content/defaults'
import { getAboutPage, getSettings, getTestimonials } from '@/lib/queries'
import { globalMeta, pageMetadata } from '@/lib/seo'
import { mediaAlt, mediaUrl } from '@/lib/utils'

export const revalidate = 3600

export async function generateMetadata() {
  const meta = globalMeta((await getAboutPage()).meta, DEFAULTS.about.seo)
  return pageMetadata({ ...meta, path: '/about' })
}

export default async function AboutPage() {
  const [settings, people, page] = await Promise.all([getSettings(), getTestimonials(), getAboutPage()])
  const D = DEFAULTS.about
  const visionParagraphs = or(page.vision?.text, D.vision.text)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  const testimonials = people.map((person) => ({
    id: person.id,
    name: person.name,
    designation: person.designation,
    quote: person.testimonial ?? '',
    photo: mediaUrl(person.photo),
  }))

  return (
    <>
      {/* Hero */}
      <section className="px-4 pt-7 sm:px-[25px]">
        <div className="mx-auto grid max-w-[1230px] overflow-hidden rounded-[32px] bg-hero md:grid-cols-[470px_1fr]">
          <h1 className="p-8 text-[38px] leading-[1.2] font-semibold text-black sm:p-[45px] sm:text-[50px] md:py-[65px]">
            {or(page.hero?.title, D.hero.title)}
          </h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaUrl(page.hero?.image) ?? '/images/about-hero.png'}
            alt={mediaAlt(page.hero?.image, 'Tech leaders featured on DeskTalks')}
            className="h-full w-full self-end object-cover object-left-bottom md:mt-20"
          />
        </div>
      </section>

      {/* What we do */}
      <section className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 pt-20 sm:px-8 md:grid-cols-[566px_1fr] md:gap-[73px] lg:px-[135px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mediaUrl(page.whatWeDo?.image) ?? '/images/about-what-we-do.jpg'}
          alt={mediaAlt(page.whatWeDo?.image, 'A DeskTalks live session')}
          className="aspect-[566/288] w-full rounded-[20px] object-cover"
        />
        <div>
          <h2 className="text-[40px] font-semibold text-black sm:text-[50px]">
            {or(page.whatWeDo?.heading, D.whatWeDo.heading)}
          </h2>
          <p className="mt-6 max-w-[330px] text-[16px] leading-[1.4] text-ink-700">
            {or(page.whatWeDo?.text, D.whatWeDo.text)}
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="mx-auto grid max-w-[1280px] gap-6 px-4 py-16 sm:px-8 md:grid-cols-[260px_1fr] md:gap-[60px] lg:px-[183px] lg:py-[60px]">
        <h2 className="text-[40px] font-semibold text-black sm:text-[50px]">
          {or(page.vision?.heading, D.vision.heading)}
        </h2>
        <div className="max-w-[590px] space-y-5 text-[16px] leading-[1.4] text-ink-700">
          {visionParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <Testimonials items={testimonials} />

      <div className="pt-[56px] pb-[74px]">
        <CommunitySection settings={settings} variant="teal" />
      </div>
    </>
  )
}

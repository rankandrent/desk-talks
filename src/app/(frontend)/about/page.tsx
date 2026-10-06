import type { Metadata } from 'next'

import { CommunitySection } from '@/components/CommunitySection'
import { Testimonials } from '@/components/Testimonials'
import { getSettings, getTestimonials } from '@/lib/queries'
import { mediaUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'DeskTalks hosts technology leaders across startups and Fortune 500 companies as they share real-world experiences, bold ideas and insights.',
  alternates: { canonical: '/about' },
}

export default async function AboutPage() {
  const [settings, people] = await Promise.all([getSettings(), getTestimonials()])

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
            Where Tech Leaders Share How Technology Is Disrupting Business
          </h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about-hero.png"
            alt="Tech leaders featured on DeskTalks"
            className="h-full w-full self-end object-cover object-left-bottom md:mt-20"
          />
        </div>
      </section>

      {/* What we do */}
      <section className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 pt-20 sm:px-8 md:grid-cols-[566px_1fr] md:gap-[73px] lg:px-[135px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about-what-we-do.jpg"
          alt="A DeskTalks live session"
          className="aspect-[566/288] w-full rounded-[20px] object-cover"
        />
        <div>
          <h2 className="text-[40px] font-semibold text-black sm:text-[50px]">What We Do</h2>
          <p className="mt-6 max-w-[330px] text-[16px] leading-[1.4] text-ink-700">
            We host technology leaders across startups and Fortune 500 companies as they share real-world
            experiences, bold ideas, and insights on how technology is transforming industries, reshaping
            businesses, and creating what’s next.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="mx-auto grid max-w-[1280px] gap-6 px-4 py-16 sm:px-8 md:grid-cols-[260px_1fr] md:gap-[60px] lg:px-[183px] lg:py-[60px]">
        <h2 className="text-[40px] font-semibold text-black sm:text-[50px]">Our Vision</h2>
        <div className="max-w-[590px] space-y-5 text-[16px] leading-[1.4] text-ink-700">
          <p>Every transformation starts with a vision.</p>
          <p>
            At DeskTalks, we bring together the technology leaders behind those stories from ambitious startups to
            global Fortune 500 companies to share what they’ve learned, what they’re building, and what they believe
            comes next. Because technology isn’t just changing industries. It’s reshaping businesses, challenging the
            way we think, and creating possibilities that didn’t exist before.
          </p>
          <p>
            We’re here to explore those stories, one conversation at a time, and connect the people shaping the
            future of technology.
          </p>
        </div>
      </section>

      <Testimonials items={testimonials} />

      <div className="pt-[56px] pb-[74px]">
        <CommunitySection logos={settings.partnerLogos} variant="teal" />
      </div>
    </>
  )
}

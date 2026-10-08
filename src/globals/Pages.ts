import type { GlobalConfig } from 'payload'

import { anyone, isStaff } from '../access'
import { DEFAULTS } from '../content/defaults'
import { imageField } from '../fields/image'

const D = DEFAULTS

const pageGlobal = (slug: string, label: string, description: string, fields: GlobalConfig['fields']): GlobalConfig => ({
  slug,
  label,
  admin: { group: 'Pages', description },
  access: { read: anyone, update: isStaff },
  // Keep a short history so a bad edit can be restored from the Versions tab.
  versions: { max: 20 },
  fields,
})

export const HomePage = pageGlobal('home-page', 'Home Page', 'Homepage ka saara text. Podcasts aur blogs khud latest content se aate hain.', [
  {
    type: 'tabs',
    tabs: [
      {
        label: 'Hero',
        fields: [
          {
            name: 'hero',
            type: 'group',
            admin: { description: 'Right side par "Featured" podcast dikhta hai (Podcasts mein Featured tick karein).' },
            fields: [
              { name: 'title', type: 'text', defaultValue: D.home.hero.title },
              { name: 'text', type: 'textarea', defaultValue: D.home.hero.text },
              {
                type: 'row',
                fields: [
                  { name: 'hostButtonLabel', type: 'text', defaultValue: D.home.hero.hostButtonLabel },
                  { name: 'hostButtonLink', type: 'text', defaultValue: D.home.hero.hostButtonLink },
                ],
              },
              {
                type: 'row',
                fields: [
                  { name: 'guestButtonLabel', type: 'text', defaultValue: D.home.hero.guestButtonLabel },
                  { name: 'guestButtonLink', type: 'text', defaultValue: D.home.hero.guestButtonLink },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Sections',
        fields: [
          {
            name: 'podcasts',
            label: 'Podcasts Section',
            type: 'group',
            fields: [
              { name: 'heading', type: 'text', defaultValue: D.home.podcasts.heading },
              { name: 'buttonLabel', type: 'text', defaultValue: D.home.podcasts.buttonLabel },
            ],
          },
          {
            name: 'blogs',
            label: 'Blogs Section',
            type: 'group',
            fields: [
              {
                type: 'row',
                fields: [
                  { name: 'label', type: 'text', defaultValue: D.home.blogs.label },
                  { name: 'heading', type: 'text', defaultValue: D.home.blogs.heading },
                ],
              },
            ],
          },
          {
            name: 'contact',
            label: 'Contact Section',
            type: 'group',
            fields: [
              { name: 'heading', type: 'text', defaultValue: D.home.contact.heading },
              { name: 'text', type: 'textarea', defaultValue: D.home.contact.text },
              {
                type: 'row',
                fields: [
                  { name: 'joinPrompt', type: 'text', defaultValue: D.home.contact.joinPrompt },
                  { name: 'joinLinkLabel', type: 'text', defaultValue: D.home.contact.joinLinkLabel },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
])

export const AboutPage = pageGlobal('about-page', 'About Page', 'About Us page. Testimonials "Hosts & Guests" se aate hain (jin ka Testimonial bhara ho).', [
  {
    type: 'tabs',
    tabs: [
      {
        label: 'Content',
        fields: [
          {
            name: 'hero',
            type: 'group',
            fields: [
              { name: 'title', type: 'text', defaultValue: D.about.hero.title },
              imageField({
                name: 'image',
                size: [1424, 688],
                minWidth: 712,
                hint: 'Optional. Yellow hero ka right hissa (guests ki photos). Khali ho to default image.',
              }),
            ],
          },
          {
            name: 'whatWeDo',
            label: 'What We Do',
            type: 'group',
            fields: [
              { name: 'heading', type: 'text', defaultValue: D.about.whatWeDo.heading },
              { name: 'text', type: 'textarea', defaultValue: D.about.whatWeDo.text },
              imageField({
                name: 'image',
                size: [1132, 576],
                minWidth: 566,
                hint: 'Optional. Event / stage ki landscape photo. Khali ho to default image.',
              }),
            ],
          },
          {
            name: 'vision',
            label: 'Our Vision',
            type: 'group',
            fields: [
              { name: 'heading', type: 'text', defaultValue: D.about.vision.heading },
              {
                name: 'text',
                type: 'textarea',
                defaultValue: D.about.vision.text,
                admin: { description: 'Khali line chhorne se naya paragraph banta hai.', rows: 10 },
              },
            ],
          },
        ],
      },
    ],
  },
])

const listingTabs = (d: typeof D.podcasts | typeof D.blogs) => [
  {
    type: 'tabs' as const,
    tabs: [
      {
        label: 'Content',
        fields: [
          {
            name: 'hero',
            type: 'group' as const,
            fields: [
              { name: 'title', type: 'text' as const, defaultValue: d.hero.title },
              { name: 'description', type: 'textarea' as const, defaultValue: d.hero.description },
            ],
          },
          {
            type: 'row' as const,
            fields: [
              {
                name: 'moreHeading',
                label: '"Explore more" heading (detail page)',
                type: 'text' as const,
                defaultValue: d.moreHeading,
              },
              { name: 'loadMoreLabel', label: 'Load more button', type: 'text' as const, defaultValue: d.loadMoreLabel },
            ],
          },
        ],
      },
    ],
  },
]

export const PodcastsPage = pageGlobal(
  'podcasts-page',
  'Podcasts Page',
  'Podcasts listing page (/podcasts) ka text. Episodes "Podcasts" collection se aate hain.',
  listingTabs(D.podcasts),
)

export const BlogsPage = pageGlobal(
  'blogs-page',
  'Blogs Page',
  'Blogs listing page (/blogs) ka text. Articles "Blogs" collection se aate hain.',
  listingTabs(D.blogs),
)

const joinGroup = (name: 'guest' | 'host', label: string) => ({
  name,
  label,
  type: 'group' as const,
  fields: [
    {
      type: 'row' as const,
      fields: [
        { name: 'tab', label: 'Tab label', type: 'text' as const, defaultValue: D.join[name].tab },
        { name: 'title', type: 'text' as const, defaultValue: D.join[name].title },
      ],
    },
    { name: 'text', type: 'textarea' as const, defaultValue: D.join[name].text },
    {
      type: 'row' as const,
      fields: [
        { name: 'seoTitle', label: 'SEO title', type: 'text' as const, defaultValue: D.join[name].seoTitle },
        {
          name: 'seoDescription',
          label: 'SEO description',
          type: 'textarea' as const,
          defaultValue: D.join[name].seoDescription,
        },
      ],
    },
  ],
})

export const JoinPages = pageGlobal('join-pages', 'Join Pages', '/join-as-guest aur /join-as-host pages ka text.', [
  { name: 'banner', label: 'Top banner text', type: 'textarea', defaultValue: D.join.banner },
  joinGroup('guest', 'Join as Guest page'),
  joinGroup('host', 'Join as Host page'),
])

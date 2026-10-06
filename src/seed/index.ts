/**
 * Seeds the local database with the content from the Figma design.
 * Run with: pnpm seed
 * Safe to re-run: it skips seeding when podcasts already exist.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import config from '@payload-config'
import { getPayload } from 'payload'

import { doc, h2, image, p } from './lexical'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const asset = (file: string) => path.resolve(dirname, 'assets', file)

const payload = await getPayload({ config })

const existing = await payload.count({ collection: 'podcasts' })
if (existing.totalDocs > 0) {
  payload.logger.info('Seed skipped: podcasts already exist.')
  process.exit(0)
}

const upload = async (file: string, alt: string) =>
  (await payload.create({ collection: 'media', data: { alt }, filePath: asset(file) })).id

payload.logger.info('Seeding admin user…')
const adminEmail = process.env.SEED_ADMIN_EMAIL
const adminPassword = process.env.SEED_ADMIN_PASSWORD
if (adminEmail && adminPassword) {
  const users = await payload.count({ collection: 'users' })
  if (!users.totalDocs) {
    await payload.create({
      collection: 'users',
      data: { name: 'DeskTalks Admin', email: adminEmail, password: adminPassword, role: 'admin' },
    })
  }
}

payload.logger.info('Seeding media…')
const media = {
  thumb1: await upload('podcast-thumb-1.jpg', 'Proving Business Value in the Age of AI episode cover'),
  thumb2: await upload('podcast-thumb-2.jpg', 'Building a Foresight or Future Research Practice episode cover'),
  thumb3: await upload('podcast-thumb-3.jpg', 'Why Market Research & UX Research Are Finally Converging episode cover'),
  hero1: await upload('podcast-hero-1.jpg', 'Umer Khan and Hamaad Chippa'),
  servicenow: await upload('company-servicenow.png', 'ServiceNow logo'),
  insightsDesk: await upload('company-insights-desk.png', 'The Insights Desk logo'),
  hamaad: await upload('person-hamaad.jpg', 'Hamaad Chippa'),
  vidhya: await upload('person-vidhya.jpg', 'Vidhya Ravi'),
  michael: await upload('person-michael.jpg', 'Michael John'),
  blogIiex: await upload('blog-iiex.jpg', 'IIEX Europe 2026 stage session'),
  blogBars: await upload('blog-bars.jpg', 'Rising bar chart illustration'),
  blogInline: await upload('blog-inline.jpg', 'Researchers reviewing AI output together'),
}

const partnerLogos = []
for (const [name, file] of [
  ['Google', 'logo-google.png'],
  ['Microsoft', 'logo-microsoft.png'],
  ['ServiceNow', 'logo-servicenow.png'],
  ['Martec', 'logo-martec.png'],
  ['Adobe', 'logo-adobe.png'],
  ['IBM', 'logo-ibm.png'],
  ['Walmart', 'logo-walmart.png'],
  ['Gallagher', 'logo-gallagher.png'],
]) {
  partnerLogos.push({ name, logo: await upload(file, `${name} logo`) })
}

payload.logger.info('Seeding categories…')
const category: Record<string, number> = {}
for (const name of ['AI Research', 'Global Networks', 'Technology', 'Design', 'Social']) {
  category[name] = (await payload.create({ collection: 'categories', data: { name } })).id
}

payload.logger.info('Seeding people…')
const umer = await payload.create({
  collection: 'people',
  data: {
    name: 'Umer Khan',
    designation: 'Co-founder & CEO',
    company: 'The Insights Desk',
    linkedin: 'https://www.linkedin.com/',
    companyLogo: media.insightsDesk,
  },
})
const hamaad = await payload.create({
  collection: 'people',
  data: {
    name: 'Hamaad Chippa',
    designation: 'Senior Director, Business Value & Insights',
    company: 'ServiceNow',
    linkedin: 'https://www.linkedin.com/',
    photo: media.hamaad,
    companyLogo: media.servicenow,
    testimonial:
      'I had a great and very timely conversation with Umer of DeskTalks on how to measure the real business value of AI. The DeskTalks team was thorough, well-prepared, and allowed the discussion to flow naturally from strategy to execution. Given how quickly AI is evolving and being adopted across organizations, this conversation will be especially helpful for leaders focused on outcome-driven success.',
  },
})
const vidhya = await payload.create({
  collection: 'people',
  data: {
    name: 'Vidhya Ravi',
    designation: 'Principal UX Director',
    company: 'ServiceNow',
    linkedin: 'https://www.linkedin.com/',
    photo: media.vidhya,
    companyLogo: media.servicenow,
    testimonial:
      'Building any new function from the ground up is hard. Building one focused on the future, while most companies are still figuring out the present, comes with a special set of challenges.\n\nI loved having the opportunity to share what I’ve learned building a foresight function within strategic research at a company on the front lines of AI. Thank you, Insights Desk, for including me in this special series!',
  },
})
const peter = await payload.create({
  collection: 'people',
  data: {
    name: 'Peter Thompson',
    designation: 'Head of Research Operations',
    company: 'ServiceNow',
    linkedin: 'https://www.linkedin.com/',
    companyLogo: media.servicenow,
  },
})
const michael = await payload.create({
  collection: 'people',
  data: {
    name: 'Michael John',
    designation: 'Director AI Research',
    company: 'Confiz',
    linkedin: 'https://www.linkedin.com/',
    photo: media.michael,
  },
})

payload.logger.info('Seeding podcasts…')
const day = 24 * 60 * 60 * 1000
const links = {
  youtube: 'https://www.youtube.com/',
  spotify: 'https://open.spotify.com/',
  soundcloud: 'https://soundcloud.com/',
}

await payload.create({
  collection: 'podcasts',
  data: {
    _status: 'published',
    title: 'Proving Business Value in the Age of AI',
    excerpt:
      'How can organizations move beyond AI experimentation and turn technology investments into measurable business value?',
    summary: doc(
      p(
        'How can organizations move beyond AI experimentation and turn technology investments into measurable business value?',
      ),
      p(
        'In this episode of Desk Talks, Umer Khan speaks with Hamaad Chippa, Senior Director of Business Value & Insights at ServiceNow, about outcome-driven AI adoption, ROI, workflow transformation, human judgment, and the shift toward agentic AI.',
      ),
      p(
        'From avoiding AI hype and FOMO to measuring impact from day one, this conversation offers a practical perspective on building AI strategies that deliver real business outcomes.',
      ),
    ),
    host: umer.id,
    guests: [hamaad.id],
    thumbnail: media.thumb1,
    heroImage: media.hero1,
    links,
    category: category['AI Research'],
    releaseDate: new Date(Date.now() - 5 * day).toISOString(),
    duration: '42 min',
    featured: true,
  },
})

await payload.create({
  collection: 'podcasts',
  data: {
    _status: 'published',
    title: 'Building a Foresight or Future Research Practice',
    excerpt: 'What it takes to build a foresight function while most companies are still figuring out the present.',
    summary: doc(
      p(
        'Vidhya Ravi, Principal UX Director at ServiceNow, joins Umer Khan to talk about building a foresight function within strategic research at a company on the front lines of AI.',
      ),
      p('They cover how to earn stakeholder trust, which signals matter, and how foresight turns into product decisions.'),
    ),
    host: umer.id,
    guests: [vidhya.id],
    thumbnail: media.thumb2,
    links,
    category: category['Technology'],
    releaseDate: new Date(Date.now() - 12 * day).toISOString(),
    duration: '38 min',
  },
})

await payload.create({
  collection: 'podcasts',
  data: {
    _status: 'published',
    title: 'Why Market Research & UX Research Are Finally Converging',
    excerpt: 'Two disciplines, one question: what do customers really need? A conversation on where research is heading.',
    summary: doc(
      p(
        'Market research and UX research have long lived in separate teams. In this episode we explore why the lines are blurring, and what that means for insight leaders.',
      ),
    ),
    host: umer.id,
    guests: [peter.id],
    thumbnail: media.thumb3,
    links,
    category: category['AI Research'],
    releaseDate: new Date(Date.now() - 20 * day).toISOString(),
    duration: '45 min',
  },
})

// Scheduled episode: appears as "Next Episode" until its release date.
await payload.create({
  collection: 'podcasts',
  data: {
    _status: 'published',
    title: 'Agentic AI and the Future of Enterprise Workflows',
    excerpt: 'What changes when AI stops assisting and starts acting on our behalf?',
    summary: doc(p('A look at how agentic AI is reshaping enterprise workflows, governance and the role of people.')),
    host: umer.id,
    guests: [hamaad.id],
    thumbnail: media.thumb1,
    links: {},
    category: category['AI Research'],
    releaseDate: new Date(Date.now() + 6 * day).toISOString(),
    duration: '40 min',
  },
})

payload.logger.info('Seeding blogs…')
const longParagraph =
  "AI has dramatically reduced the time it takes to process information, but speed alone doesn't create value. Several speakers emphasized that AI-generated insights still require human validation. Without careful review, AI can present incomplete or misleading conclusions. As organizations adopt AI at scale, the advantage won't come from getting answers first. It will come from knowing which answers can actually be trusted."

const faqs = [
  {
    question: 'How is AI changing market research?',
    answer:
      'AI is speeding up tasks like data analysis, reporting, and insight generation, allowing researchers to deliver findings much faster.',
  },
  {
    question: 'Will AI replace researchers?',
    answer:
      'No. AI handles repetitive work so researchers can focus on asking better questions, understanding context and interpreting results.',
  },
  {
    question: 'Why is trust important when using AI in research?',
    answer:
      'AI can produce confident but incomplete answers. Human validation keeps insights reliable enough to act on.',
  },
]

const articleBody = doc(
  p(
    "At IIEX Europe 2026, AI wasn't the future of market research. It was the present. From keynote sessions to conversations across the exhibition floor, one thing became clear: the industry has moved beyond asking whether AI belongs in research. The focus has shifted to a much bigger question.",
  ),
  p('How do we use AI to produce research that is not only faster, but more meaningful, reliable, and actionable?'),
  p("Here are five key takeaways from this year's event."),
  h2("The Future Isn't AI vs. Researchers. It's AI with Researchers."),
  p(
    'One of the strongest messages throughout IIEX Europe was that AI works best when it complements human expertise. Researchers are using AI to summarize interviews, analyze large datasets, identify patterns, and automate repetitive tasks. This creates more time for what technology cannot replicate: asking better questions, understanding context, challenging assumptions, and uncovering the "why" behind consumer behavior.',
  ),
  h2("Faster Insights Don't Always Mean Better Insights"),
  p(longParagraph),
  h2('Responsible AI Is Becoming a Business Requirement'),
  image(media.blogInline),
  p(longParagraph),
  h2('Looking Ahead'),
  p(longParagraph),
)

const post1 = await payload.create({
  collection: 'posts',
  data: {
    _status: 'published',
    title: 'AI Is Transforming Research Faster Than Ever: 5 Key Takeaways from IIEX Europe 2026',
    excerpt:
      "At IIEX Europe 2026, AI wasn't the future of market research. It was the present. From keynote sessions to conversations across the exhibition floor, one thing became clear.",
    featuredImage: media.blogIiex,
    content: articleBody,
    faqs,
    category: category['AI Research'],
    author: michael.id,
    publishedAt: new Date(Date.now() - 14 * day).toISOString(),
  },
})

await payload.create({
  collection: 'posts',
  data: {
    _status: 'published',
    title: 'What Research Leaders Learned About AI Governance This Year',
    excerpt:
      'Governance moved from a compliance checkbox to a competitive advantage. Here is what leading research teams are doing differently.',
    featuredImage: media.blogIiex,
    content: doc(
      p('Governance moved from a compliance checkbox to a competitive advantage this year.'),
      h2('Start With the Decisions, Not the Tools'),
      p(longParagraph),
      h2('Make Validation Part of the Workflow'),
      p(longParagraph),
    ),
    category: category['AI Research'],
    author: michael.id,
    publishedAt: new Date(Date.now() - 9 * day).toISOString(),
  },
})

await payload.create({
  collection: 'posts',
  data: {
    _status: 'published',
    title: 'Beyond Dashboards - Why Research Is More Than Metrics',
    excerpt:
      'Dashboards tell you what happened. Research tells you why. Here is how teams are bringing the two together.',
    featuredImage: media.blogBars,
    content: doc(
      p('Dashboards tell you what happened. Research tells you why.'),
      h2('Metrics Without Context'),
      p(longParagraph),
      h2('Pairing Numbers With Stories'),
      p(longParagraph),
    ),
    category: category['Global Networks'],
    author: michael.id,
    publishedAt: new Date(Date.now() - 3 * day).toISOString(),
  },
})

payload.logger.info('Seeding legal pages…')
await payload.create({
  collection: 'pages',
  data: {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: doc(
      p(
        'Welcome to Desk Talks, operated by The Insights Desk ("us", "we", or "our"). Desk Talks operates as a podcast and related content platform under The Insights Desk (the "Service").',
      ),
      p(
        'This Privacy Policy explains our practices concerning the collection, use, and disclosure of personal information when you use our Service, as well as the choices available to you regarding your information.',
      ),
      h2('Information We Collect'),
      p(
        'We may collect information you provide directly, such as your name, title, contact details and email address, as well as information collected automatically when you use our Services, such as browser type, pages viewed and access times.',
      ),
      h2('How We Use Your Information'),
      p('We use your information to operate the Service, respond to enquiries, send newsletters you subscribe to, and improve our content.'),
      h2('Contact Us'),
      p('If you have any questions about this Privacy Policy, please contact us through the contact form on our website.'),
    ),
  },
})
await payload.create({
  collection: 'pages',
  data: {
    title: 'Terms & Conditions',
    slug: 'terms-and-conditions',
    content: doc(
      p('By accessing or using Desk Talks you agree to these Terms & Conditions.'),
      h2('Use of Content'),
      p('All podcasts, articles and media on Desk Talks are provided for informational purposes and may not be republished without permission.'),
      h2('Changes'),
      p('We may update these terms from time to time. Continued use of the Service means you accept the updated terms.'),
    ),
  },
})

payload.logger.info('Seeding site settings…')
await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    partnerLogos,
    social: {
      youtube: 'https://www.youtube.com/',
      linkedin: 'https://www.linkedin.com/',
      instagram: 'https://www.instagram.com/',
      soundcloud: 'https://soundcloud.com/',
      spotify: 'https://open.spotify.com/',
    },
  },
})

payload.logger.info(`Seed complete. Example blog: /blogs/${post1.slug}`)
process.exit(0)

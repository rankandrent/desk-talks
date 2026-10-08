/**
 * Default copy for every editable page section. Used twice:
 * - as `defaultValue` in the dashboard, so fields start filled with the current text
 * - as the fallback on the website when a field is left empty
 */
export const DEFAULTS = {
  header: {
    nav: [
      { label: 'Home', link: '/' },
      { label: 'About Us', link: '/about' },
      { label: 'Podcasts', link: '/podcasts' },
      { label: 'Blogs', link: '/blogs' },
    ],
    ctaLabel: 'Contact Us',
    ctaLink: '/#contact',
  },
  footer: {
    links: [
      { label: 'Join as Guest', link: '/join-as-guest' },
      { label: 'Join as Host', link: '/join-as-host' },
    ],
    bottomLinks: [
      { label: 'Terms & Conditions', link: '/terms-and-conditions' },
      { label: 'Contact Us', link: '/#contact' },
      { label: 'Privacy Policy', link: '/privacy-policy' },
    ],
    copyright: 'All rights reserved.',
  },
  community: {
    title: 'The DeskTalk community is growing!',
    text: 'We bring together founders, business leaders, and innovators who are building what’s next and transforming industries along the way.',
    buttonLabel: 'Join Our Community',
    buttonLink: '/join-as-guest',
  },
  subscribe: {
    heading: 'Subscribe to get the latest news, trends, and expert insights in AI, tech, and leadership.',
    placeholder: 'Enter Email...',
    buttonLabel: 'Subscribe',
    successMessage: 'You are subscribed. Welcome to DeskTalks!',
  },
  blogCta: {
    heading: 'Looking for the Right Experts for Your Project?',
    text: 'Access a global network of industry specialists and tailored primary research services to uncover the insights needed to move your project forward.',
    buttonLabel: 'Launch a project',
    buttonUrl: '/#contact',
  },
  seo: {
    siteName: 'DeskTalks',
    defaultDescription:
      'Discover expert insights through podcasts, connect with a global community, and join conversations with the leaders shaping the future of tech.',
  },
  home: {
    hero: {
      title: 'Where Expert Conversations Become Community',
      text: 'Discover expert insights through podcasts, connect with a global community, and join events that inspire meaningful conversations and lasting connections.',
      hostButtonLabel: 'Join as Host',
      hostButtonLink: '/join-as-host',
      guestButtonLabel: 'Join as Guest',
      guestButtonLink: '/join-as-guest',
    },
    podcasts: {
      heading: 'Listen to the voices shaping the Future of Tech & leadership',
      buttonLabel: 'View All Podcasts',
    },
    blogs: { label: 'Our Blogs', heading: 'Explore Blogs from experts' },
    contact: {
      heading: 'How can we help you today?',
      text: 'Have a question, partnership idea, or just want to learn more? Send us a message and our team will get back to you.',
      joinPrompt: 'Wants to join as Host/Guest in our podcast?',
      joinLinkLabel: 'Click Here',
    },
    seo: {
      title: 'DeskTalks | Where Expert Conversations Become Community',
      description:
        'DeskTalks podcast: conversations with tech leaders from startups to Fortune 500 companies on AI, research, technology and leadership. Listen, read and join.',
    },
  },
  about: {
    hero: { title: 'Where Tech Leaders Share How Technology Is Disrupting Business' },
    whatWeDo: {
      heading: 'What We Do',
      text: 'We host technology leaders across startups and Fortune 500 companies as they share real-world experiences, bold ideas, and insights on how technology is transforming industries, reshaping businesses, and creating what’s next.',
    },
    vision: {
      heading: 'Our Vision',
      text: 'Every transformation starts with a vision.\n\nAt DeskTalks, we bring together the technology leaders behind those stories from ambitious startups to global Fortune 500 companies to share what they’ve learned, what they’re building, and what they believe comes next. Because technology isn’t just changing industries. It’s reshaping businesses, challenging the way we think, and creating possibilities that didn’t exist before.\n\nWe’re here to explore those stories, one conversation at a time, and connect the people shaping the future of technology.',
    },
    seo: {
      title: 'About Us',
      description:
        'DeskTalks hosts technology leaders across startups and Fortune 500 companies as they share real-world experiences, bold ideas and insights on how technology is reshaping business.',
    },
  },
  podcasts: {
    hero: {
      title: 'Listen to the voices shaping the Future of Tech & leadership',
      description:
        'Featuring insights from experienced experts, research best practices and companies gain clarity and act with confidence.',
    },
    moreHeading: 'Explore More Podcast',
    loadMoreLabel: 'View More',
    seo: {
      title: 'Podcasts',
      description:
        'Listen to the voices shaping the future of tech & leadership. Insights from experienced experts, research best practices and more.',
    },
  },
  blogs: {
    hero: {
      title: 'Desktalks Blogs',
      description:
        'Featuring insights from experienced experts, research best practices and articles showing how we help companies gain clarity and act with confidence.',
    },
    moreHeading: 'Explore More Blogs',
    loadMoreLabel: 'Load More..',
    seo: {
      title: 'Blogs',
      description:
        'Insights from experienced experts, research best practices and articles showing how companies gain clarity and act with confidence.',
    },
  },
  join: {
    banner: 'Whether you’re here to host or share your expertise, we’d love to hear from you.',
    guest: {
      tab: 'Join as Guest',
      title: 'Join Us as a Podcast Guest',
      text: 'Have expertise, experience, or a story worth sharing? We’re always looking for industry leaders, specialists, founders, and change-makers to join our conversations.',
      seoTitle: 'Join as a Podcast Guest',
      seoDescription:
        'Share your expertise on DeskTalks. We invite industry leaders, specialists, founders and change-makers to join our podcast conversations on tech and leadership.',
    },
    host: {
      tab: 'Join as Host',
      title: 'Become a Podcast Host',
      text: 'Have a perspective worth sharing and a passion for meaningful conversations? Join our podcast community as a host and help bring expert voices and ideas to the forefront.',
      seoTitle: 'Become a Podcast Host',
      seoDescription:
        'Become a DeskTalks podcast host. Lead meaningful conversations with tech leaders and bring expert voices and ideas to the forefront.',
    },
  },
} as const

/** Empty strings from the dashboard fall back to the default text. */
export const or = <T>(value: T | null | undefined | '', fallback: T): T =>
  value === null || value === undefined || value === '' ? fallback : value

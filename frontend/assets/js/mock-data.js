// Mock data for the News Portal
// Exports: categories, articles, userProfile

export const categories = [
  { id: 1, name: 'World', slug: 'world' },
  { id: 2, name: 'Technology', slug: 'technology' },
  { id: 3, name: 'Business', slug: 'business' },
  { id: 4, name: 'Sports', slug: 'sports' },
  { id: 5, name: 'Entertainment', slug: 'entertainment' }
];

export const articles = [
  {
    id: 101,
    title: 'Global Markets Rally After Trade Talks',
    excerpt: 'Stocks rise as negotiators report progress; analysts remain cautious.',
    content: `Negotiators from major economies reported meaningful progress today. Markets reacted positively to indications that tariffs and barriers may be lowered in phased agreements. Investors cautioned that implementation details still need to be worked out and timelines remain unclear.`,
    image: 'https://picsum.photos/800/450?random=1',
    category_slug: 'business',
    author: 'Ayesha Khan',
    date: '2026-02-20T10:15:00Z',
    views: 1245,
    is_trending: true,
    is_breaking: false
  },
  {
    id: 102,
    title: 'Breakthrough in Quantum Networking Announced',
    excerpt: 'Researchers demonstrate a new method for entangling network nodes.',
    content: `A collaborative team from universities released a paper describing a robust method for entangling distant nodes using photonic links. The approach could enable low-latency quantum communication across metropolitan scales and simplify existing hardware requirements.`,
    image: 'https://picsum.photos/800/450?random=2',
    category_slug: 'technology',
    author: 'Ravi Patel',
    date: '2026-02-19T08:30:00Z',
    views: 3421,
    is_trending: true,
    is_breaking: true
  },
  {
    id: 103,
    title: 'Local Team Wins Championship',
    excerpt: 'A thrilling overtime victory crowns the season.',
    content: `In front of a sold-out stadium, the underdogs pulled away in overtime after a tense back-and-forth. Fans celebrated long into the night with a parade planned for next week.`,
    image: 'https://picsum.photos/800/450?random=3',
    category_slug: 'sports',
    author: 'Maria Lopez',
    date: '2026-02-18T20:00:00Z',
    views: 987,
    is_trending: false,
    is_breaking: false
  },
  {
    id: 104,
    title: 'Streaming Service Announces New Originals Lineup',
    excerpt: 'The slate includes thrillers, comedies, and a returning hit.',
    content: `The streaming giant revealed its production calendar, highlighting an emphasis on high-concept dramas and returning fan-favorites. Production schedules aim to prioritize diverse storytellers and international co-productions.`,
    image: 'https://picsum.photos/800/450?random=4',
    category_slug: 'entertainment',
    author: 'Liam O’Connor',
    date: '2026-02-17T14:50:00Z',
    views: 1560,
    is_trending: true,
    is_breaking: false
  },
  {
    id: 105,
    title: 'New Renewable Projects Announced in Coastal Regions',
    excerpt: 'Wind and solar projects aim to add 2GW capacity this year.',
    content: `The government approved several projects after an environmental review, focusing on local labor and marine wildlife protections. Developers said the projects will create hundreds of jobs during construction.`,
    image: 'https://picsum.photos/800/450?random=5',
    category_slug: 'world',
    author: 'Chen Wei',
    date: '2026-02-16T09:10:00Z',
    views: 640,
    is_trending: false,
    is_breaking: false
  },
  {
    id: 106,
    title: 'Startups Pivot to Greener Supply Chains',
    excerpt: 'Innovations in materials and logistics reduce carbon footprints.',
    content: `Small and mid-size startups are testing lower-emission supply models, including recycled inputs and micro-distribution hubs to shorten delivery routes. Early pilots show cost parity in several categories.`,
    image: 'https://picsum.photos/800/450?random=6',
    category_slug: 'business',
    author: 'Noor Ahmed',
    date: '2026-02-15T11:05:00Z',
    views: 420,
    is_trending: false,
    is_breaking: false
  },
  {
    id: 107,
    title: 'AI Tool Helps Doctors Triage Cases Faster',
    excerpt: 'Early trials show improved throughput with similar accuracy.',
    content: `Hospitals integrated the AI assistant and reported reductions in wait times and faster prioritization of urgent cases. Physicians emphasize it as a decision-support tool rather than a replacement.`,
    image: 'https://picsum.photos/800/450?random=7',
    category_slug: 'technology',
    author: 'Samira Rahman',
    date: '2026-02-14T07:40:00Z',
    views: 1980,
    is_trending: true,
    is_breaking: false
  }
];

export const userProfile = {
  name: 'Md Helal Uddin',
  email: 'helal@example.com',
  saved_articles: [101, 107],
  role: 'reader'
};

// Site-level stats and team used by About/Contact pages
export const siteStats = {
  years: 25,
  countries: 150,
  journalists: 500,
  monthly_readers: '50M+'
};

export const teamMembers = [
  {
    id: 1,
    name: 'Robert Chen',
    title: 'Editor-in-Chief',
    bio: 'With over 30 years in journalism, Robert leads our editorial vision and ensures the highest standards in all our reporting.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    social: { twitter: '#', linkedin: '#', email: '#' }
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    title: 'Managing Editor',
    bio: 'Sarah oversees day-to-day news operations and leads our award-winning team of reporters and editors.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    social: { twitter: '#', linkedin: '#', email: '#' }
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    title: 'Director of International News',
    bio: 'Michael manages our global network of correspondents and ensures comprehensive international coverage.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    social: { twitter: '#', linkedin: '#', email: '#' }
  },
  {
    id: 4,
    name: 'Dr. Elena Kowalski',
    title: 'Director of Fact-Checking & Research',
    bio: 'Elena leads our fact-checking division, ensuring accuracy and credibility in all our published content.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b786d4d9?auto=format&fit=crop&w=400&q=80',
    social: { twitter: '#', linkedin: '#', email: '#' }
  }
];

export const contactInfo = {
  headquarters: '123 News Street, Media City, MC 10001, United States',
  phones: ['+1 (555) 123-4567', '+1 (555) 123-4568', '+1 (555) 123-4569'],
  emails: ['info@globalnewsnetwork.com', 'news@globalnewsnetwork.com', 'ads@globalnewsnetwork.com'],
  hours: 'Mon-Fri: 8:00 AM - 8:00 PM EST'
};

export const offices = [
  {
    id: 'ny',
    city: 'New York',
    address: '123 News Street, Media City, NY 10001',
    phone: '+1 (555) 123-4567',
    hours: 'Mon-Fri: 8AM-8PM EST',
    image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ldn',
    city: 'London',
    address: '45 Media Lane, London EC1A 1BB, UK',
    phone: '+44 20 7946 0958',
    hours: 'Mon-Fri: 9AM-7PM GMT',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tok',
    city: 'Tokyo',
    address: 'Shinjuku Media Tower, Tokyo 160-0022, Japan',
    phone: '+81 3-1234-5678',
    hours: 'Mon-Fri: 9AM-6PM JST',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80'
  }
];

// Simple comments store for articles
export const comments = [
  {
    id: 1001,
    article_id: 101,
    author: 'Michael Rodriguez',
    email: 'michael@example.com',
    text: "This is both exciting and terrifying. As a software engineer, I've seen how AI can augment our capabilities, but the idea that it might surpass us in creative domains raises profound questions about what makes us human.",
    date: '2026-02-20T09:42:00Z'
  },
  {
    id: 1002,
    article_id: 101,
    author: 'Dr. Elena Chen',
    email: 'elena@example.com',
    text: "Thank you for the thoughtful article. Our goal isn't to replace human creativity but to enhance it. The best results come from human-AI teams.",
    date: '2026-02-20T10:15:00Z'
  }
];

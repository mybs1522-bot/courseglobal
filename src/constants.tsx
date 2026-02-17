
import React from 'react';
import { Course, Feature, Testimonial, FaqItem, PricingPlan } from './types';
import { Download, MonitorPlay, Infinity, LifeBuoy, Users, Package, Layers } from 'lucide-react';

const RAW_COURSES: Course[] = [
  {
    id: '1',
    title: 'AutoCAD Mastery',
    software: 'AutoCAD',
    description: 'Stop wasting 4 hours on a floor plan that should take 40 minutes. Master the exact shortcuts, workflows, and drafting secrets that top firms use—so your plans come out construction-ready on the first try.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1fV5bz4JDugh8HxLMJ0fXu5K5sDj3qlSR',
    color: 'from-indigo-500 to-violet-400',
    students: '42.5k',
    learningPoints: [
      'Draft precision plans builders actually love',
      'Speed shortcuts that cut work time by 60%',
      'Professional detailing that wins bids'
    ],
    workflowImpact: 'Get your weekends back—permanently.'
  },
  {
    id: '3',
    title: 'SketchUp 3D',
    software: 'SketchUp',
    description: 'Watch your flat, lifeless sketches transform into jaw-dropping 3D models that clients beg to approve. Build complex interiors and exteriors in hours, not days—with zero crashes.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1wl6by5AO5MiPeoYsZ8F6Zi5AJahoeTQo',
    color: 'from-cyan-500 to-blue-400',
    students: '55k',
    learningPoints: [
      'Model 5x faster than your peers',
      'Organize scenes so they never crash',
      'Render-ready models with one click'
    ],
    workflowImpact: 'Build in hours what others take days.'
  },
  {
    id: '5',
    title: 'V-Ray Realism',
    software: 'V-Ray',
    description: 'Turn your models into photographs so realistic that clients can\'t tell the difference. Master the lighting, materials, and post-production secrets that agencies charge $120 per image for.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1aHEt_z78tYD_0Cn66DiduAnhwn-o8El8',
    color: 'from-amber-500 to-orange-400',
    students: '48k',
    learningPoints: [
      'Lighting that looks like a $5k photoshoot',
      'Materials indistinguishable from real life',
      'Post-production secrets of top studios'
    ],
    workflowImpact: 'Charge $40–$120 per render image.'
  },
  {
    id: '6',
    title: 'Lumion Cinema',
    software: 'Lumion',
    description: 'Static images bore clients. Cinematic video walkthroughs sell projects in 60 seconds flat. Create emotional, movie-quality tours that make clients fall in love with the design before it\'s built.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1XW2DDHVa1Qc15NcZ3wUKMFRT7LkyZMCt',
    color: 'from-emerald-500 to-teal-400',
    students: '31k',
    learningPoints: [
      'Cinematic camera moves that sell',
      'Add life: people, trees, weather, cars',
      'Render 60fps walkthroughs fast'
    ],
    workflowImpact: 'Close clients in 60 seconds.'
  },
  {
    id: '7',
    title: 'D5 Render',
    software: 'D5 Render',
    description: 'Real-time rendering changes the game. See every material, lighting, and angle change instantly—no waiting, no render queue. Present live to clients and close deals in the meeting room.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1vbV4j6K9sgzbbZ7qlRdgqPTXWiHBPLsr',
    color: 'from-purple-500 to-pink-500',
    students: '19k',
    learningPoints: [
      'Zero render wait time—see changes live',
      'Drag-and-drop asset workflow',
      '4K cinematic images in seconds'
    ],
    workflowImpact: 'Change designs live in client meetings.'
  },
  {
    id: '9',
    title: 'AI Advantage',
    software: 'AI Architecture',
    description: 'Generate stunning design concepts before you finish your coffee. Use the AI tricks that top studios guard like trade secrets—concept generation, instant style transfer, and renders that look 100% real using free tools.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1s-HzZVKpc9F92mLW2gMOPk0kVrKAqUIS',
    color: 'from-fuchsia-600 to-purple-600',
    students: '75k',
    learningPoints: [
      'Generate 10 concepts in 10 minutes',
      'Fix renders with AI—no re-rendering',
      'Free tools that replace $500/mo software'
    ],
    workflowImpact: 'Never start from a blank page again.'
  }
];

export const COURSES = RAW_COURSES;

export const FEATURES: Feature[] = [
  { icon: <MonitorPlay />, title: '6 Courses', description: 'Everything you need.' },
  { icon: <Package />, title: '10,000+ Assets', description: 'Stop searching Google.' },
  { icon: <Download />, title: 'Software Links', description: 'Get set up for free.' },
  { icon: <Infinity />, title: 'Lifetime Access', description: 'Watch anytime.' },
  { icon: <Users />, title: 'Mentor Help', description: 'Get unstuck fast.' }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'lifetime-all-access',
    duration: 'Complete Bundle',
    period: 'One-time payment',
    price: '$49',
    originalPrice: '$199',
    label: 'CLOSING SOON',
    features: [
      'All 6 Courses (AutoCAD to AI)',
      'The 10,000+ Texture Library',
      'The AI Prompt Vault',
      'Software Installation Guides',
      'Certified Digital Diploma',
      'Lifetime Access'
    ],
    accentColor: 'border-brand-primary shadow-glow'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah J.',
    role: 'Freelancer',
    location: 'London, UK',
    content: 'I was charging $300 per project and pulling all-nighters. After this course, I raised my rate to $1,200 and clients didn\'t even flinch. My income literally tripled in 3 months.'
  },
  {
    name: 'Michael C.',
    role: 'Studio Owner',
    location: 'Toronto, CA',
    content: 'I was about to fire my team because projects took 3 weeks. Now we finish in 4 days. Best $49 I\'ve ever spent—it saved my business.'
  },
  {
    name: 'David R.',
    role: 'Architect',
    location: 'Milan, IT',
    content: 'As a solo architect, I thought I couldn\'t compete with big firms. The AI workflow changed everything. Clients now choose ME over agencies. Still feels unreal.'
  },
  {
    name: 'Amara O.',
    role: '3D Visualizer',
    location: 'Lagos, NG',
    content: 'The 10,000 textures and 2,000 models alone saved me $500+ in downloads I used to buy monthly. I just drag, drop, and render. My output tripled.'
  },
  {
    name: 'James W.',
    role: 'Architecture Student',
    location: 'Sydney, AU',
    content: 'My professors now ask ME how I render so fast. Finished my final thesis project in 3 days—everyone else took 3 weeks. Got offers before graduation.'
  },
  {
    name: 'Sophie L.',
    role: 'Interior Designer',
    location: 'Paris, FR',
    content: 'I pitched a client on Monday with a cinematic Lumion video I made on Sunday night. Closed a €18,000 project on the spot. D5 and Lumion changed my career.'
  },
  {
    name: 'Carlos M.',
    role: 'Real Estate Developer',
    location: 'Mexico City, MX',
    content: 'I was paying agencies $3,000 per rendered image. My team does it in-house now. We saved $36,000 this year alone. The ROI is insane.'
  },
  {
    name: 'Fatima A.',
    role: 'Junior Architect',
    location: 'Dubai, UAE',
    content: 'Applied to 40 jobs: silence. Learned this workflow, rebuilt my portfolio in 2 weeks. Got 3 offers. They hired me specifically for the AI + rendering skills.'
  },
  {
    name: 'Kenji T.',
    role: 'Freelance Visualizer',
    location: 'Tokyo, JP',
    content: 'I went from $800/month freelancing to consistent $6,000+ months. The V-Ray module alone was worth 100x the price. Clients now come to me.'
  },
  {
    name: 'Elena V.',
    role: 'Interior Studio Lead',
    location: 'Barcelona, ES',
    content: 'My team of 4 now produces what used to take 8 people. We stopped outsourcing renders completely. Our profit margin doubled this quarter.'
  },
  {
    name: 'Aiden K.',
    role: 'Design Student',
    location: 'Cape Town, ZA',
    content: 'Started with zero experience. Literally didn\'t know what SketchUp was. 15 days later I had a portfolio that got me my first paid gig ($400!). Life-changing.'
  },
  {
    name: 'Nadia P.',
    role: 'Architect & Educator',
    location: 'Berlin, DE',
    content: 'I teach at a university and I recommend this to ALL my students now. The curriculum is more practical and up-to-date than most 4-year programs. Embarrassingly good.'
  },
  {
    name: 'Robert H.',
    role: 'Interior Architect',
    location: 'Chicago, US',
    content: 'The D5 Render and Lumion courses are game-changers. I can now produce high-end animations in a fraction of the time. My clients are absolutely loving the new workflow.'
  },
  {
    name: 'Priya S.',
    role: 'Freelance Designer',
    location: 'Mumbai, IN',
    content: 'From AutoCAD to AI, this bundle covers everything. The texture library is a goldmine. I used to spend hours searching for the right materials, now I have them all.'
  },
  {
    name: 'Marco G.',
    role: 'Visualization Artist',
    location: 'Madrid, ES',
    content: 'V-Ray realism is what I was missing. The step-by-step lighting guide is incredible. My renders now have that "professional" look that wins high-ticket clients.'
  },
  {
    name: 'Yuki M.',
    role: 'Architectural Student',
    location: 'Osaka, JP',
    content: 'AI koncept generation is so fast. I can explore 20 different design ideas in one morning. This course gave me a huge advantage in my studio projects.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is this really just $49? What's the catch?",
    answer: "No catch. No subscription. No hidden fees. No upsells. We believe everyone deserves access to world-class design education, not just people at expensive firms. We keep it affordable by teaching at scale—50,000+ students and counting."
  },
  {
    question: "Do I need an expensive computer?",
    answer: "Nope. A decent laptop with a basic graphics card works perfectly. We also teach you cloud rendering tricks for slower machines, so even a $500 laptop can produce stunning results. We've got you covered."
  },
  {
    question: "I'm a complete beginner with zero experience. Will I get lost?",
    answer: "Absolutely not. We literally start from 'how to download and open the software.' Every module builds step-by-step, and you have mentor support if you ever feel stuck. Several of our top students started knowing nothing—now they run their own studios."
  },
  {
    question: "How fast will I actually see results?",
    answer: "Give it 15 focused days (1–2 hours per day). By day 5, you'll create your first photorealistic render. By day 15, you'll have a portfolio piece that looks like it came from a professional studio. If you don't feel dramatically more confident and capable, we'll refund every penny."
  },
  {
    question: "Do I get the actual software included?",
    answer: "We provide direct links to official free/student/trial versions of every software (SketchUp, V-Ray, Lumion, D5, AutoCAD). You do NOT need expensive licenses to learn. Many of these tools are completely free for students."
  },
  {
    question: "What if I don't like it? Can I get a refund?",
    answer: "100%. We have a no-questions-asked 7-day refund policy. Email us, and you get your money back within 48 hours. We don't want your $49 if you're not blown away by the value. Simple as that."
  },
  {
    question: "Is this just theory or will I build real projects?",
    answer: "Every module is project-based. You won't just watch—you'll build real interiors, exteriors, renders, and walkthroughs alongside the instructor. By the end, you'll have 6+ portfolio-ready projects, not just certificates."
  },
  {
    question: "How is this different from free YouTube tutorials?",
    answer: "YouTube gives you random fragments. This gives you a complete, structured system—from zero to professional—in a specific order that builds skills properly. Plus you get 10,000+ assets, mentor support, and a certification. There's a reason 50,000+ students chose this over free content."
  },
  {
    question: "Will these skills actually help me earn more money?",
    answer: "Our students report earning $40–$120 per rendered image, $600+ per 1,000 sq.ft. of design, and $1,000–$5,000 per cinematic walkthrough video. The ROI on $49 is absurd. Many students earn back the cost on their first freelance gig within the first week."
  },
  {
    question: "Can I access the courses on mobile?",
    answer: "Yes! All courses are hosted online and work on any device—laptop, tablet, or phone. Watch at your own pace, anytime, anywhere. Your access never expires."
  }
];

export const VALUE_STACK_ITEMS = [
  { name: 'AutoCAD Precision Drafting', value: '$199' },
  { name: 'SketchUp 3D Modeling', value: '$249' },
  { name: 'V-Ray Photo-Realism Masterclass', value: '$349' },
  { name: 'Lumion Cinematic Walkthroughs', value: '$299' },
  { name: 'D5 Real-Time Rendering', value: '$249' },
  { name: 'AI Design & Rendering Course', value: '$499' },
  { name: '10,000+ Premium Texture Library', value: '$499' },
  { name: '2,000+ Drag-and-Drop 3D Models', value: '$399' },
  { name: 'Software Installation Hub', value: '$99' },
  { name: 'Private Mentor Access & Portfolio Review', value: '$299' },
  { name: 'Freelancing Pricing Playbook', value: '$149' },
  { name: 'Certified Digital Diploma', value: '$49' },
];

export const WHO_IS_THIS_FOR = [
  'You want a portfolio that actually gets you hired',
  'You want to charge $1,000+ per render and feel confident doing it',
  'You want to stop pulling all-nighters and go home at 5pm',
  'You need photorealistic visuals to sell your design ideas',
  'You\'re ready to stop struggling and start earning what you deserve',
  'You want to freelance globally and work from anywhere'
];

export const WHO_IS_THIS_NOT_FOR = [
  'You\'re looking for a \"magic button\" that does the work for you',
  'You\'re not willing to dedicate 1–2 hours a day for 15 days',
  'You refuse to learn new tools or adapt to modern workflows',
  'You want to stay stuck doing things the old way',
  'You expect overnight millions without any effort'
];

/* ─── NEW DATA: MENTORS ─── */
export const MENTORS = [
  {
    name: 'Marcus Reid',
    title: 'Lead Instructor — SketchUp, V-Ray, Lumion',
    bio: '12+ years in architectural visualization. Trained 50,000+ students across 42 countries. Former visualization lead at a top Sydney firm.',
    specialties: ['SketchUp', 'V-Ray', 'Lumion', 'AI Rendering'],
    students: '50,000+',
    rating: 4.8,
  },
  {
    name: 'Lucas Ferreira',
    title: 'Instructor — AutoCAD, D5 Render, Revit',
    bio: '10+ years of industry experience. Specialist in BIM workflows and real-time rendering. Has worked on 200+ commercial projects across Europe and South America.',
    specialties: ['AutoCAD', 'D5 Render', 'Revit', 'BIM'],
    students: '35,000+',
    rating: 4.9,
  }
];

/* ─── NEW DATA: RATINGS ─── */
export const RATINGS = [
  { platform: 'Trustpilot', rating: '4.8', reviews: '2,134', color: '#00B67A' },
  { platform: 'Google Reviews', rating: '4.7', reviews: '1,980', color: '#4285F4' },
  { platform: 'G2', rating: '4.8', reviews: '540', color: '#FF492C' },
];

/* ─── NEW DATA: INCOME TIERS ─── */
export const INCOME_TIERS = [
  { label: 'Single Render Image', before: '$5–$15', after: '$40–$120', icon: '🖼️' },
  { label: 'Interior Design (1000 sq.ft)', before: '$100–$300', after: '$600–$1,500', icon: '🏠' },
  { label: 'Cinematic Walkthrough', before: '$0', after: '$1,000–$5,000', icon: '🎬' },
  { label: 'Monthly Freelance Income', before: '$500–$1,500', after: '$4,000–$12,000', icon: '💰' },
];

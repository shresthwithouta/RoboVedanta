/**
 * Navigation Links Configuration
 */
export const NAV_LINKS = {
  student: [
    { label: 'Programs', href: '/students' },
    { label: 'Curriculum', href: '/curriculum' },
    { label: 'About', href: '/about' }
  ],
  school: [
    { label: 'For Schools', href: '/schools' },
    { label: 'Curriculum', href: '/curriculum' },
    { label: 'About', href: '/about' }
  ],
  default: [
    { label: 'Programs', href: '/programs' },
    { label: 'Curriculum', href: '/curriculum' },
    { label: 'For Schools', href: '/schools' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ]
};

/**
 * Curriculum Levels
 */
export const CURRICULUM_LEVELS = [
  {
    id: 1,
    name: 'Jigyasa',
    grade: '6-7',
    description: 'Foundation in robotics and computational thinking',
    theme: 'Curiosity & Exploration'
  },
  {
    id: 2,
    name: 'Samvedana',
    grade: '7-8',
    description: 'Understanding sensors and real-world applications',
    theme: 'Awareness & Sensing'
  },
  {
    id: 3,
    name: 'Rachana',
    grade: '8-9',
    description: 'Building complex systems and automation',
    theme: 'Creation & Construction'
  },
  {
    id: 4,
    name: 'Bodh',
    grade: '9-10',
    description: 'AI fundamentals and machine learning concepts',
    theme: 'Knowledge & Intelligence'
  },
  {
    id: 5,
    name: 'Udaan',
    grade: '11-12',
    description: 'Advanced projects and innovation',
    theme: 'Flight & Achievement'
  }
];

/**
 * Program Categories
 */
export const PROGRAMS = {
  student: [
    {
      id: 'robotics-sim',
      name: 'Simulation-based Robotics',
      description: 'Learn robotics fundamentals through virtual simulations',
      grades: '6-12',
      icon: 'robot'
    },
    {
      id: 'robotics-hardware',
      name: 'Robotics + Hardware Kits',
      description: 'Hands-on learning with physical robotics kits',
      grades: '6-12',
      icon: 'cpu'
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      description: 'Introduction to artificial intelligence concepts',
      grades: '9-12',
      icon: 'brain'
    }
  ],
  school: [
    {
      id: 'cbse-aligned',
      name: 'CBSE Aligned Program',
      description: 'Complete curriculum aligned with CBSE standards',
      boards: ['CBSE'],
      grades: '6-12'
    },
    {
      id: 'icse-aligned',
      name: 'ICSE Aligned Program',
      description: 'Complete curriculum aligned with ICSE standards',
      boards: ['ICSE'],
      grades: '6-12'
    }
  ]
};

/**
 * Contact Information
 */
export const CONTACT_INFO = {
  email: 'info@robovedanta.com',
  phone: '+91 XXXXX XXXXX',
  whatsapp: '+91 XXXXX XXXXX',
  address: 'Address will be added'
};

/**
 * Animation Variants (for Framer Motion)
 */
export const FADE_IN_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const SCALE_ON_HOVER = {
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

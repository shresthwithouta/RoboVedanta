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
    { label: 'Trainers', href: '/trainers' },
    { label: 'For Schools', href: '/schools' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ]
};

export const CURRICULUM_LEVELS = [
  {
    id: 1,
    name: 'Jigyasa',
    grade: '1-3',
    description: 'STEM projects with LEDs, buzzers, and more. Basics of electronics, wiring, and safety. Boosting confidence and curiosity. Creativity and discovery for young innovators.',
    theme: 'Curiosity & Exploration',
    projects: ['LED Flashlights', 'Simple Buzzers', 'Conductive Dough', 'Optical Illusions']
  },
  {
    id: 2,
    name: 'Khoj',
    grade: '4-5',
    description: 'Explore robotics basics: motors, wheels, drivers, and sensors. Build simple robots hands-on. Connect and control motors with microcontrollers. Use sensors for obstacle detection and line following.',
    theme: 'Awareness & Sensing',
    projects: ['Line Follower', 'Obstacle Avoider', 'Remote Control Car', 'Smart Fan']
  },
  {
    id: 3,
    name: 'Nirmaan',
    grade: '6-8',
    description: 'Master IoT and ESP32 with coding and sensors. Program robots for wireless and Bluetooth control. Work on projects like flood warning systems and Bluetooth robots. Enhance coding skills to drive innovation.',
    theme: 'Creation & Construction',
    projects: ['IoT Weather Station', 'Bluetooth Controlled Robot', 'Flood Warning System', 'Smart Irrigation']
  },
  {
    id: 4,
    name: 'Pragati',
    grade: '9-10',
    description: 'AI-powered robots and ESP32-CAM modules. Object recognition and automation. Real-world AI applications. Machines that perceive and interact with their environment.',
    theme: 'Knowledge & Intelligence',
    projects: ['Facial Recognition Bot', 'Object Sorting Arm', 'AI Traffic System', 'Self-Driving Cart']
  },
  {
    id: 5,
    name: 'Udaan',
    grade: '11-12',
    description: 'Becoming creators and innovators. Integrating electronics, robotics, coding, IoT, and AI. Creativity, research, and practical application. Preparing for future technology challenges.',
    theme: 'Flight & Achievement',
    projects: ['Advanced Humanoid', 'Industry 4.0 Automation', 'Research-led Innovation', 'Social Impact AI']
  }
];

export const PROGRAMS = {
  student: [
    {
      id: 'robotics-sim',
      name: 'Simulation-based Robotics',
      description: 'Learn robotics fundamentals through virtual simulations',
      grades: '1-12',
      icon: 'robot'
    },
    {
      id: 'robotics-hardware',
      name: 'Robotics + Hardware Kits',
      description: 'Hands-on learning with physical robotics kits',
      grades: '1-12',
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
      grades: '1-12'
    },
    {
      id: 'icse-aligned',
      name: 'ICSE Aligned Program',
      description: 'Complete curriculum aligned with ICSE standards',
      boards: ['ICSE'],
      grades: '1-12'
    }
  ]
};

export const CONTACT_INFO = {
  email: 'info@robovedanta.com',
  phone: '+91 98XXX XXXXX',
  whatsapp: '+91 98XXX XXXXX',
  address: 'Bengaluru, Karnataka, India'
};

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

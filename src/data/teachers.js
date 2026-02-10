// Hardcoded teacher data
// This structure matches what a database would return,
// making it easy to upgrade later without changing components

export const teachersData = [
  {
    id: 'rajesh-kumar',
    name: 'Dr. Rajesh Kumar',
    title: 'Senior Robotics Educator',
    imageUrl: '/teachers/rajesh-kumar.jpg',
    bio: 'Dr. Rajesh Kumar brings over 15 years of experience in robotics education and has mentored more than 500 students in building real-world robotic systems. With a passion for making complex concepts accessible, Dr. Kumar specializes in Arduino-based projects and AI integration in robotics. His teaching approach focuses on hands-on learning and encourages students to think creatively while solving real-world challenges.',
    specialties: [
      'Arduino & Microcontrollers',
      'AI & Machine Learning Integration',
      'Sensor Systems & IoT',
      'Competition Preparation'
    ],
    qualifications: [
      'Ph.D. in Robotics Engineering, IIT Delhi',
      'M.Tech in Computer Science',
      'CBSE Certified Robotics Trainer',
      'International Robotics Competition Judge'
    ],
    experience: '15+ years',
    grades: ['6-8', '9-10', '11-12'],
    availability: 'Weekdays & Weekends',
    email: 'rajesh.kumar@robovedanta.com',
    featured: true,
    active: true
  },
  {
    id: 'priya-sharma',
    name: 'Ms. Priya Sharma',
    title: 'Robotics & Automation Specialist',
    imageUrl: '/teachers/priya-sharma.jpg',
    bio: 'Ms. Priya Sharma is an accomplished robotics educator with 10 years of experience in teaching students from diverse backgrounds. She has a special talent for breaking down complex automation concepts into engaging, easy-to-understand lessons. Her students consistently excel in national-level robotics competitions, and she is known for her innovative project-based teaching methods that emphasize creativity and critical thinking.',
    specialties: [
      'Automation & Control Systems',
      'Python Programming for Robotics',
      'Mechanical Design',
      'Project-Based Learning'
    ],
    qualifications: [
      'M.Tech in Mechatronics Engineering',
      'B.E. in Mechanical Engineering',
      'Certified Automation Professional',
      'National Innovation Award Recipient'
    ],
    experience: '10+ years',
    grades: ['6-8', '9-10', '11-12'],
    availability: 'Weekdays',
    email: 'priya.sharma@robovedanta.com',
    featured: true,
    active: true
  },
  {
    id: 'anil-verma',
    name: 'Mr. Anil Verma',
    title: 'Competitive Robotics Coach',
    imageUrl: '/teachers/anil-verma.jpg',
    bio: 'Mr. Anil Verma is a passionate robotics coach who has trained multiple teams to victory in national and international robotics competitions. With 12 years of hands-on experience, he excels at teaching students to work under pressure, think strategically, and build competition-ready robots. His coaching style combines technical excellence with team-building skills, preparing students not just for competitions but for future careers in engineering.',
    specialties: [
      'Competition Strategy & Training',
      'Advanced Robot Design',
      'Team Leadership & Collaboration',
      'Real-Time Problem Solving'
    ],
    qualifications: [
      'B.Tech in Electronics & Communication',
      'International Robotics Coach Certification',
      'Winner - National Robotics Championship 2018',
      '10+ Competition Awards as Coach'
    ],
    experience: '12+ years',
    grades: ['9-10', '11-12'],
    availability: 'Weekends & Evenings',
    email: 'anil.verma@robovedanta.com',
    featured: true,
    active: true
  },
  {
    id: 'sneha-patel',
    name: 'Dr. Sneha Patel',
    title: 'AI & Robotics Researcher',
    imageUrl: '/teachers/sneha-patel.jpg',
    bio: 'Dr. Sneha Patel is a researcher and educator specializing in artificial intelligence applications in robotics. With a background in cutting-edge AI research, she brings the latest developments in machine learning and computer vision to her classroom. Dr. Patel is passionate about inspiring young minds to explore the intersection of AI and robotics, making her classes both intellectually stimulating and practically valuable for students interested in future technologies.',
    specialties: [
      'Artificial Intelligence & ML',
      'Computer Vision',
      'Deep Learning Applications',
      'Research Methodology'
    ],
    qualifications: [
      'Ph.D. in Artificial Intelligence, Stanford University',
      'M.S. in Robotics, Carnegie Mellon',
      'Published 15+ Research Papers',
      'AI Innovation Award 2022'
    ],
    experience: '8+ years',
    grades: ['9-10', '11-12'],
    availability: 'Weekdays',
    email: 'sneha.patel@robovedanta.com',
    featured: false,
    active: true
  },
  {
    id: 'vikram-singh',
    name: 'Mr. Vikram Singh',
    title: 'Beginner Robotics Instructor',
    imageUrl: '/teachers/vikram-singh.jpg',
    bio: 'Mr. Vikram Singh specializes in introducing young students to the exciting world of robotics. With a gentle teaching approach and exceptional patience, he makes robotics accessible to beginners of all ages. His classes focus on building fundamental skills in a fun, engaging environment where students learn by doing. Vikram believes that every child can become a young engineer with the right guidance and encouragement.',
    specialties: [
      'Beginner Robotics Fundamentals',
      'Block-Based Programming',
      'Basic Electronics',
      'Age-Appropriate Learning'
    ],
    qualifications: [
      'B.E. in Electronics',
      'Certified Child Education Specialist',
      'Robotics for Kids Trainer',
      '5 Years Teaching Experience'
    ],
    experience: '6+ years',
    grades: ['1-3', '4-5', '6-8'],
    availability: 'Weekdays & Weekends',
    email: 'vikram.singh@robovedanta.com',
    featured: false,
    active: true
  },
  {
    id: 'meera-nair',
    name: 'Ms. Meera Nair',
    title: 'Electronics & Circuit Design Expert',
    imageUrl: '/teachers/meera-nair.jpg',
    bio: 'Ms. Meera Nair is an electronics engineer with a deep understanding of circuit design and embedded systems. She has 9 years of experience teaching students how to design, build, and troubleshoot electronic circuits for robotics applications. Her methodical approach helps students develop strong problem-solving skills and a solid foundation in electronics principles that serve them throughout their engineering journey.',
    specialties: [
      'Circuit Design & Analysis',
      'Embedded Systems Programming',
      'PCB Design',
      'Hardware Troubleshooting'
    ],
    qualifications: [
      'M.Tech in VLSI Design',
      'B.E. in Electronics Engineering',
      'Embedded Systems Certification',
      'Industry Experience - 3 Years'
    ],
    experience: '9+ years',
    grades: ['9-10', '11-12'],
    availability: 'Weekdays',
    email: 'meera.nair@robovedanta.com',
    featured: false,
    active: true
  }
];

// Helper functions to filter and retrieve teachers
export const getAllTeachers = () => teachersData;

export const getActiveTeachers = () => teachersData.filter(t => t.active);

export const getFeaturedTeachers = () => teachersData.filter(t => t.featured && t.active);

export const getTeacherById = (id) => teachersData.find(t => t.id === id);

export const getTeachersByGrade = (grade) => teachersData.filter(t => t.grades.includes(grade));

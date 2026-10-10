export const initialProjectsData = [
  {
    _id: "wanderlust",
    title: "Wanderlust",
    slug: "wanderlust",
    category: "Full Stack",
    shortDescription: "Developed a full-stack property listing application using MVC architecture, with CRUD operations, image uploads, authentication, authorization, ownership-based access control, server-side validation, and error handling.",
    technologies: ["Node.js", "Express.js", "MongoDB", "EJS", "Multer", "Cloudinary", "Passport.js", "JavaScript", "Bootstrap"],
    image: "/wanderlust.jpg",
    githubUrl: "https://github.com/lokeshrathore1509",
    liveUrl: "https://github.com/lokeshrathore1509",
    featured: true,
    isPublished: true,
    displayOrder: 1,
    details: {
      overview: "A full-featured property listing and travel rental platform engineered with the Model-View-Controller architecture. It enables users to browse, publish, review, and manage destinations worldwide.",
      problem: "Vacation seekers and property hosts need a reliable platform to exchange rental opportunities with guaranteed ownership protection, media management, and verified community reviews.",
      solution: "Architected a scalable server-rendered web application with Express.js and MongoDB. Integrated Cloudinary for media storage, implemented Passport.js session authentication, and built fine-grained ownership authorization.",
      features: [
        "Full CRUD operations for property listings with Cloudinary media storage",
        "Secure user authentication, registration, and authorization with Passport.js",
        "Ownership-based access controls preventing unauthorized listing edits",
        "Interactive reviews and rating system with server-side validation",
        "Responsive, mobile-first design with clean flash notification feedback"
      ],
      role: "Full-Stack Developer",
      timeline: "2025"
    }
  },
  {
    _id: "novafood",
    title: "NovaFood",
    slug: "novafood",
    category: "React",
    shortDescription: "Built a responsive food ordering application with reusable React components, cart management, favorites, search, checkout, and order-related features.",
    technologies: ["React.js", "JavaScript", "React Router", "Context API", "Tailwind CSS", "LocalStorage", "Vite"],
    image: "/novafood.jpg",
    githubUrl: "https://github.com/lokeshrathore1509",
    liveUrl: "https://github.com/lokeshrathore1509",
    featured: true,
    isPublished: true,
    displayOrder: 2,
    details: {
      overview: "NovaFood is an ultra-fast, responsive online food ordering interface featuring a modern dark aesthetic, instant dish categorization, and seamless cart state synchronization.",
      problem: "Traditional restaurant apps often feature slow page transitions, disjointed cart experiences, and inconsistent mobile layouts.",
      solution: "Developed an optimized single page application using React Context for global cart management and LocalStorage for persistent user state across sessions.",
      features: [
        "Real-time cart addition, quantity updates, and dynamic price totals",
        "Wishlist / favorites system saved locally for quick re-ordering",
        "Instant category filtering (Burgers, Ramen, Sushi, Healthy)",
        "Search bar with live filtering across dishes and cuisines",
        "Interactive checkout drawer with delivery calculations and order summary"
      ],
      role: "Frontend Developer",
      timeline: "2025"
    }
  },
  {
    _id: "recipe-finder",
    title: "Dynamic Recipe Finder",
    slug: "recipe-finder",
    category: "Frontend",
    shortDescription: "Interactive culinary discovery web app fetching thousands of global recipes, step-by-step cooking instructions, and ingredient breakdowns.",
    technologies: ["JavaScript (ES6+)", "Recipe API", "HTML5", "CSS3", "GitHub Pages"],
    image: "/project-recipe.png",
    githubUrl: "https://github.com/lokeshrathore1509/recipie-project-.git",
    liveUrl: "https://lokeshrathore1509.github.io/recipie-project-/",
    featured: true,
    isPublished: true,
    displayOrder: 3,
    details: {
      overview: "A responsive culinary web application that connects with a public recipe database to help food enthusiasts discover new meal inspirations based on available ingredients.",
      problem: "Finding quick recipes online often leads to ad-heavy pages without structured ingredient lists or direct preparation steps.",
      solution: "Created a pure JavaScript application that executes asynchronous API queries, rendering formatted recipe cards with ingredients, images, and cooking guides dynamically in the DOM.",
      features: [
        "Real-time search query matching with debounced input",
        "Dynamic modal popup with full ingredient checklists and instructions",
        "Zero external runtime framework dependencies for maximum performance",
        "Graceful fallback screens when no recipes match search criteria",
        "Mobile-first responsive flexbox and grid styling"
      ],
      role: "Frontend Developer",
      timeline: "2025"
    }
  }
];

export const skillsData = [
  {
    category: "Frontend",
    title: "Frontend Development",
    description: "Building responsive, accessible, pixel-perfect user interfaces with modern component architectures.",
    skills: [
      { name: "HTML5", icon: "html5", tag: "Semantic Markup" },
      { name: "CSS3", icon: "css3", tag: "Modern Styling" },
      { name: "JavaScript", icon: "javascript", tag: "ES6+ Core" },
      { name: "React.js", icon: "react", tag: "Hooks & Architecture" },
      { name: "React Router", icon: "reactrouter", tag: "Client Routing" },
      { name: "Redux Toolkit", icon: "redux", tag: "Global State" },
      { name: "Tailwind CSS", icon: "tailwindcss", tag: "Utility First" },
      { name: "Bootstrap", icon: "bootstrap", tag: "Responsive UI" },
      { name: "Responsive Web Design", icon: "chrome", tag: "Cross-Device" },
      { name: "Flexbox & CSS Grid", icon: "layout", tag: "Advanced Layouts" },
    ]
  },
  {
    category: "Backend",
    title: "Backend Development",
    description: "Architecting modular server-side applications, REST APIs, and authentication mechanisms.",
    skills: [
      { name: "Node.js", icon: "nodejs", tag: "Runtime" },
      { name: "Express.js", icon: "express", tag: "Web Framework" },
      { name: "REST API Development", icon: "server", tag: "API Design" },
      { name: "Authentication & Authorization", icon: "shield", tag: "Security" },
      { name: "JWT", icon: "key", tag: "Token Security" },
      { name: "HTTP-only Cookies", icon: "cookie", tag: "Session Guard" },
      { name: "Passport.js", icon: "usercheck", tag: "Auth Strategies" },
      { name: "MVC Architecture", icon: "layers", tag: "Design Pattern" },
    ]
  },
  {
    category: "Database",
    title: "Database Management",
    description: "Modeling performant document schemas, relational structures, and persistent data layers.",
    skills: [
      { name: "MongoDB", icon: "mongodb", tag: "NoSQL Database" },
      { name: "Mongoose", icon: "database", tag: "Schema & ODM" },
      { name: "SQL", icon: "mysql", tag: "Relational Queries" },
    ]
  },
  {
    category: "Tools",
    title: "Tools & Workflow",
    description: "Leveraging modern developer tools, version control, and cloud media services for efficient delivery.",
    skills: [
      { name: "Git", icon: "git", tag: "Version Control" },
      { name: "GitHub", icon: "github", tag: "Collaboration & CI" },
      { name: "VS Code", icon: "vscode", tag: "Development IDE" },
      { name: "Cloudinary", icon: "cloud", tag: "Media Management" },
      { name: "Postman", icon: "postman", tag: "API Verification" },
    ]
  }
];

export const experienceData = [
  {
    id: "edunet",
    role: "Frontend Web Development Intern",
    company: "Edunet Foundation (AICTE Collaboration)",
    duration: "August 2025 – September 2025",
    type: "Internship",
    description: "Completed an intensive 6-week technical internship focused on modern Front-End Web Development and industry best practices.",
    highlights: [
      "Built responsive, mobile-first web interfaces utilizing HTML5, CSS3, and modern JavaScript.",
      "Implemented modern UI design principles, flexible grid systems, and accessible components.",
      "Optimized website loading speeds and enhanced user experience through clean, well-documented code."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Bootstrap", "Git"]
  },
  {
    id: "codsoft",
    role: "Web Development Intern",
    company: "CodSoft",
    duration: "July 2025 – August 2025",
    type: "Internship",
    description: "Completed a 4-week virtual development internship delivering real-world web development tasks and interactive web modules.",
    highlights: [
      "Developed interactive, responsive web interfaces with custom layout animations.",
      "Deepened understanding of DOM manipulation, asynchronous JavaScript, and cross-browser testing.",
      "Practiced version control workflows and feature branching with Git and GitHub."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "UI Design", "GitHub"]
  }
];

export const educationData = [
  {
    id: "btech-iimt",
    degree: "B.Tech in Artificial Intelligence and Data Science",
    institution: "IIMT College of Engineering",
    location: "Greater Noida, Uttar Pradesh",
    duration: "August 2022 – May 2026",
    status: "Graduation: May 2026",
    details: [
      "Core Foundations: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Web Technologies.",
      "Applied AI & Analytical Thinking: Machine Learning Foundations, Data Analytics, and Intelligent Web Applications.",
      "Active participation in campus coding challenges, technical seminars, and collaborative software projects."
    ]
  }
];

export const personalInfo = {
  name: "Lokesh Kumar Rathore",
  title: "Frontend Developer | React.js | Full-Stack Web Development",
  headline: "Building Modern Web Experiences That Make an Impact.",
  shortDescription: "I build responsive, interactive, and user-focused web applications using modern frontend technologies and full-stack tools.",
  email: "lokeshrathore1509@gmail.com",
  phone: "+91 8318585916",
  location: "Greater Noida, India",
  degree: "B.Tech in Artificial Intelligence and Data Science",
  college: "IIMT College of Engineering, Greater Noida",
  graduation: "May 2026",
  resumePath: "/assets/Lokesh_Kumar_Rathore_Resume.pdf",
  resumeDownloadName: "Lokesh_Kumar_Rathore_Resume.pdf",
  socialLinks: {
    github: "https://github.com/lokeshrathore1509",
    linkedin: "https://www.linkedin.com/in/lokesh-rathore-220lr4644",
    email: "mailto:lokeshrathore1509@gmail.com",
  },
  availabilityText: "Available for new opportunities",
  isAvailable: true,
};

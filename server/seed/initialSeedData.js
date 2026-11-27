const initialProjects = [
  {
    title: "Vedio confrencing",
    slug: "vedio-confrencing-3631",
    shortDescription: "Full-Stack Video Conferencing Web Application\r\nDeveloped a real-time, peer-to-peer video conferencing application inspired by Zoom. Built with React.js, Node.js, Express, MongoDB, Socket.io, and WebRTC, it supports multi-user video/audio calls, screen sharing, in-meeting live chat, and meeting history tracking. Implemented secure user authentication and deployed the full-stack service on Render.",
    category: "Full Stack",
    technologies: ["html", "css", "js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://res.cloudinary.com/du0oppigx/image/upload/v1791567843/portfolio_projects/vag7msbavsaamauodldn.png",
    imagePublicId: "portfolio_projects/vag7msbavsaamauodldn",
    liveUrl: "https://vedio-confrencing-1.onrender.com",
    githubUrl: "https://github.com/lokeshrathore1509/VEDIO-CONFRENCING.git",
    featured: false,
    isPublished: true,
    displayOrder: 1,
    details: {
      overview: "Full-Stack Video Conferencing Web Application inspired by Zoom. Built with React.js, Node.js, Express, MongoDB, Socket.io, and WebRTC.",
      problem: "Remote teams and individuals need lightweight, secure, and instant video conferencing without mandatory hefty software downloads.",
      solution: "Integrated WebRTC mesh peer-to-peer audio/video streaming backed by a Socket.io signaling server and MongoDB for user sessions.",
      features: [
        "Multi-user video/audio calls with low-latency streaming",
        "Screen sharing capability during active calls",
        "In-meeting live chat and messaging",
        "Meeting history tracking and user authentication",
        "Fully deployed full-stack service on Render"
      ],
      role: "Full-Stack Developer",
      timeline: "2025 - 2026"
    }
  },
  {
    title: "Weather App",
    slug: "weather-app-0154",
    shortDescription: "🌦️ Excited to share my new project: SkyPulse — Real-time Weather App!\r\nBuilt using React & Vite with a sleek glassmorphic dark UI.\r\n✨ Highlights:\r\n• Live weather data (Temp, Feels like, Humidity, Wind speed)\r\n• Global city search via Open-Meteo API\r\n• Dynamic Day/Night weather icons & smooth animations\r\n• Fully responsive with instant refresh",
    category: "React",
    technologies: ["React.js", "Vite", "Tailwind CSS", "Open-Meteo API"],
    image: "https://res.cloudinary.com/du0oppigx/image/upload/v1791565889/portfolio_projects/gfly0tazgcc2ltykd52i.png",
    imagePublicId: "portfolio_projects/gfly0tazgcc2ltykd52i",
    liveUrl: "https://weather-app-6war.onrender.com",
    githubUrl: "https://github.com/lokeshrathore1509/Weather--app.git",
    featured: false,
    isPublished: true,
    displayOrder: 2,
    details: {
      overview: "SkyPulse is a real-time weather application built using React & Vite with a sleek glassmorphic dark UI.",
      problem: "Users require quick, aesthetic, and accurate atmospheric metrics without slow loading times or cluttered advertising.",
      solution: "Connected with Open-Meteo API to fetch instant forecasts, temperature, humidity, and wind conditions with responsive visual elements.",
      features: [
        "Live weather metrics (Temp, Feels like, Humidity, Wind speed)",
        "Global city search with real-time autocompletion",
        "Dynamic Day/Night weather icons & smooth animations",
        "Fully responsive glassmorphism UI with instant data refresh"
      ],
      role: "Frontend Developer",
      timeline: "2025 - 2026"
    }
  },
  {
    title: "Wanderlust",
    slug: "wanderlust",
    shortDescription: "Developed a full-stack property listing application using MVC architecture, with CRUD operations, image uploads, authentication, authorization, ownership-based access control, server-side validation, and error handling.",
    category: "Full Stack",
    technologies: ["Node.js", "Express.js", "MongoDB", "EJS", "Multer", "Cloudinary", "Passport.js", "JavaScript", "Bootstrap"],
    image: "https://res.cloudinary.com/du0oppigx/image/upload/v1791615179/portfolio_projects/r9zllmhpkqrxbump9eac.png",
    imagePublicId: "portfolio_projects/r9zllmhpkqrxbump9eac",
    liveUrl: "https://airnbn-clone-2okz.onrender.com",
    githubUrl: "https://github.com/lokeshrathore1509/airnbn-clone.git",
    featured: true,
    isPublished: true,
    displayOrder: 3,
    details: {
      overview: "A comprehensive vacation rental marketplace built with the MVC (Model-View-Controller) architecture. It allows users to explore, create, and review destinations worldwide with cloud media management.",
      problem: "Users seeking vacation rentals require an intuitive platform with real-time property photos, accurate geographical details, and verified host reviews, while property owners need secure listing controls.",
      solution: "Engineered a scalable full-stack application leveraging Express.js and MongoDB. Integrated Cloudinary for media storage, implemented Passport.js session authentication, and built fine-grained ownership authorization.",
      features: [
        "Full CRUD operations for property listings with Cloudinary media storage",
        "Secure user authentication, registration, and authorization with Passport.js",
        "Ownership-based access controls preventing unauthorized listing edits",
        "Interactive reviews and rating system with server-side validation",
        "Responsive, mobile-first design with clean flash notification feedback"
      ],
      role: "Full Stack Developer",
      timeline: "2025"
    }
  },
  {
    title: "NovaFood",
    slug: "novafood",
    shortDescription: "Built a responsive food ordering application with reusable React components, cart management, favorites, search, checkout, and order-related features.",
    category: "React",
    technologies: ["React.js", "JavaScript", "React Router", "Context API", "Tailwind CSS", "LocalStorage", "Vite"],
    image: "/novafood.jpg",
    imagePublicId: null,
    liveUrl: "https://nova-food-1.onrender.com/",
    githubUrl: "https://github.com/lokeshrathore1509/nova-food.git",
    featured: true,
    isPublished: true,
    displayOrder: 4,
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
    title: "Dynamic Recipe Finder",
    slug: "recipe-finder",
    shortDescription: "Interactive culinary discovery web app fetching thousands of global recipes, step-by-step cooking instructions, and ingredient breakdowns.",
    category: "Frontend",
    technologies: ["JavaScript (ES6+)", "Recipe API", "HTML5", "CSS3", "GitHub Pages"],
    image: "/project-recipe.png",
    imagePublicId: null,
    liveUrl: "https://lokeshrathore1509.github.io/recipie-project-/",
    githubUrl: "https://github.com/lokeshrathore1509/recipie-project-.git",
    featured: false,
    isPublished: true,
    displayOrder: 5,
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

const defaultSettings = {
  availabilityText: "Available for new opportunities",
  isAvailable: true,
  headline: "Building Modern Web Experiences That Make an Impact.",
  supportingText: "Frontend Developer | React.js | Full-Stack Web Development",
  shortBio: "I build responsive, interactive, and user-focused web applications using modern frontend technologies and full-stack tools.",
  email: "lokeshrathore1509@gmail.com",
  githubUrl: "https://github.com/lokeshrathore1509",
  linkedinUrl: "https://www.linkedin.com/in/lokesh-rathore-220lr4644",
  phone: "+91 8318585916",
  resumes: {
    frontend: { url: "", publicId: null, originalName: "", updatedAt: null },
    fullstack: { url: "", publicId: null, originalName: "", updatedAt: null },
  },
};

module.exports = { initialProjects, defaultSettings };

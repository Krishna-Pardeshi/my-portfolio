import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);

  // Create interactive particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.vy + window.innerHeight) % window.innerHeight
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking
  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Scroll handling
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
    
    // Update active section
    const sections = ['home', 'about', 'experience','projects', 'skills',  'contact'];
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    if (current) setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Loading simulation
    setTimeout(() => setIsLoading(false), 2000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  // Skills data
  const skills = [
    { name: "React.js", level: 95, category: "Frontend", icon: "⚛️", color: "#61DAFB" },
    { name: "Node.js", level: 90, category: "Backend", icon: "🟢", color: "#68A063" },
    { name: "JavaScript", level: 98, category: "Language", icon: "🟨", color: "#F7DF1E" },
    // { name: "Python", level: 80, category: "Language", icon: "🐍", color: "#3776AB" },
    { name: "HTML5", level: 95, category: "Markup", icon: "📄", color: "#E34F26" },
    { name: "CSS3", level: 90, category: "Style", icon: "🎨", color: "#1572B6" },
    { name: "Bootstrap", level: 85, category: "Framework", icon: "🛠️", color: "#563D7C" },
    { name: "Tailwind CSS", level: 80, category: "Style", icon: "🌊", color: "#06B6D4" },
    { name: "Redux", level: 85, category: "State Management", icon: "🔄", color: "#764ABC" },
    
    { name: "MySQL", level: 88, category: "Database", icon: "🗄️", color: "#4479A1" },

    // { name: "MongoDB", level: 85, category: "Database", icon: "🍃", color: "#47A248" },
    { name: "AWS", level: 75, category: "Cloud", icon: "☁️", color: "#FF9900" },
    { name: "TypeScript", level: 75, category: "Language", icon: "🔷", color: "#3178C6" },
    { name: "PHP", level: 82, category: "Backend", icon: "🐘", color: "#777BB4" }
    // { name: "Docker", level: 78, category: "DevOps", icon: "🐳", color: "#2496ED" }
  ];

  // Projects data with anime images
  const projects = [
    
    {
      id: 1,
      title: "Hospital Management System",
      description: "Complete healthcare management solution with patient records and appointment scheduling",
      technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
      image: "https://iihmrdelhi.edu.in/blog/wp-content/uploads/2020/01/Hospital-Management.jpg",
      status: "Completed",
      metrics: { efficiency: "+80%", modules: "15" },
      github: "#",
      demo: "#"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with advanced features and admin dashboard",
      technologies: ["React.js", "Redux", "Node.js", "Stripe"],
      image: "https://nomadicsoft.io/wp-content/uploads/2023/07/2.png",
      status: "Completed",
      metrics: { products: "10K+", revenue: "$50K+" },
      github: "#",
      live: "#"
    },
    {
      id: 3,
      title: "AI Resume Builder",
      description: "Intelligent resume builder with AI-powered content suggestions and ATS optimization",
      technologies: ["React.js", "Python", "OpenAI API", "MongoDB"],
      image: "https://instaresume.io/section_1.webp",
      status: "Beta",
      metrics: { success: "+45%", templates: "25+" },
      github: "#",
      live: "#"
    },
    
    {
      id: 4,
      title: "Smart Inventory System",
      description: "IoT-enabled inventory management with predictive analytics and automation",
      technologies: ["Python", "Django", "IoT", "Machine Learning"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwUvps3j2hWIPNr7WPLnrXVV-gVAJ1j9QdBsdQdQVw-3RDeTC-pjvMy62DcrzuGk4vgHU&usqp=CAU",
      status: "Production",
      metrics: { savings: "30%", accuracy: "99%" },
      github: "#",
      demo: "#"
    },
    {
      id: 5,
      title: "College Information Portal",
      description: "Modern responsive college website with student management and academic resources",
      technologies: ["React.js", "Node.js", "MySQL", "Express.js"],
      image: "https://www.euroschoolindia.com/blogs/wp-content/uploads/2023/08/good-colleges.jpg",
      status: "Live",
      metrics: { users: "500+", uptime: "99.9%" },
      github: "#",
      live: "#"
    },
    {
      id: 6,
      title: "DROP ME - Ride Sharing Platform",
      description: "Comprehensive passenger and driver management system with real-time GPS tracking and payment integration",
      technologies: ["React Native", "Node.js", "MongoDB", "Socket.io"],
      image: "https://shyamfuture.com/wp-content/uploads/2024/07/ride-sharing-app-development-company-.jpg",
      status: "Live",
      metrics: { users: "1000+", rating: "4.8★" },
      github: "#",
      live: "#"
    }

  ];

  // Experience data
  const experience = [
    {
      id: 1,
      title: "Software Developer",
      company: "Paarsh Infotech Pvt. Ltd.",
      period: "Apr 2024 - July 2025",
      type: "Full-time",
      location: "Nashik, Maharashtra",
      description: "Leading full-stack development projects and mentoring junior developers",
      achievements: [
        "Built 15+ responsive web applications",
        "Improved performance by 40%",
        "Led architecture for 5 enterprise modules",
        "Mentored 2 junior developers"
      ],
      technologies: ["React.js", "Node.js", "PHP", "MySQL"]
    },
    {
      id: 2,
      title: "Web Developer Intern",
      company: "Paarsh Infotech Pvt. Ltd.",
      period: "Jan 2024 - Mar 2024",
      type: "Internship",
      location: "Nashik, Maharashtra",
      description: "Contributed to enterprise management system development",
      achievements: [
        "Contributed to 8 key modules",
        "Optimized queries by 35%",
        "95% sprint completion rate",
        "Outstanding intern recognition"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "PHP"]
    }
  ];

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Krishna Pardeshi</h2>
          <p>Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Interactive Particle Background */}
      <div className="particles-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity
            }}
          />
        ))}
      </div>

      {/* Cursor Glow Effect */}
      <div 
        className="cursor-glow"
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150
        }}
      />

      {/* Navigation */}
      <nav className={`navbar ${scrollY > 50 ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-icon">KP</div>
            <span>Krishna Pardeshi</span>
          </div>
          <div className="nav-menu">
            {['Home', 'About', 'Experience','Projects', 'Skills',  'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="status-badge">
                <div className="status-dot"></div>
                Available for hire
              </div>
              
              <h1 className="hero-title">
                <span className="title-line">Hello, I'm</span>
                <span className="title-main">Krishna Pardeshi</span>
                <span className="title-subtitle">Full-Stack Developer</span>
              </h1>
              
              <p className="hero-description">
                I craft exceptional digital experiences with modern technologies. 
                Specialized in React.js, Node.js, and building scalable web applications 
                that make a difference.
              </p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">8.18</div>
                  <div className="stat-label">CGPA</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Projects</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">1.5+</div>
                  <div className="stat-label">Years Exp</div>
                </div>
              </div>
              
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => document.getElementById('projects').scrollIntoView({behavior: 'smooth'})}>
                  <span>View My Work</span>
                  <div className="btn-icon">🚀</div>
                </button>
                <button className="btn btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})}>
                  <span>Get In Touch</span>
                  <div className="btn-icon">💬</div>
                </button>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="code-window">
                <div className="window-header">
                  <div className="window-controls">
                    <span className="control red"></span>
                    <span className="control yellow"></span>
                    <span className="control green"></span>
                  </div>
                  <div className="window-title">portfolio.js</div>
                </div>
                <div className="code-content">
                  <div className="code-line">
                    <span className="code-keyword">const</span> <span className="code-variable">developer</span> = {'{'}
                  </div>
                  <div className="code-line">
                    &nbsp;&nbsp;<span className="code-property">name</span>: <span className="code-string">"Krishna Pardeshi"</span>,
                  </div>
                  <div className="code-line">
                    &nbsp;&nbsp;<span className="code-property">skills</span>: [<span className="code-string">"React"</span>, <span className="code-string">"Node.js"</span>],
                  </div>
                  <div className="code-line">
                    &nbsp;&nbsp;<span className="code-property">passion</span>: <span className="code-string">"Building amazing apps"</span>,
                  </div>
                  <div className="code-line">
                    &nbsp;&nbsp;<span className="code-property">available</span>: <span className="code-boolean">true</span>
                  </div>
                  <div className="code-line">{'}'}</div>
                </div>
              </div>
              
              <div className="floating-elements">
                <div className="float-item float-1">⚛️</div>
                <div className="float-item float-2">🚀</div>
                <div className="float-item float-3">💻</div>
                <div className="float-item float-4">⚡</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-text">Scroll to explore</div>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">Passionate developer crafting digital solutions</p>
          </div>
          
          <div className="about-content">
            <div className="about-text">
              <h3>Building the Future, One Line at a Time</h3>
              <p>
                I'm a passionate full-stack developer with a strong academic foundation (8.18 CGPA) 
                and hands-on professional experience. My journey in technology is driven by curiosity 
                and the desire to create meaningful digital experiences.
              </p>
              <p>
                From mobile applications to enterprise systems, I've worked on diverse projects 
                that have impacted thousands of users. I believe in writing clean, maintainable 
                code and staying updated with the latest technologies.
              </p>
              
              <div className="about-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">🎯</div>
                  <div className="highlight-text">
                    <h4>Problem Solver</h4>
                    <p>Creative solutions for complex challenges</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">⚡</div>
                  <div className="highlight-text">
                    <h4>Fast Learner</h4>
                    <p>Quick adaptation to new technologies</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">🤝</div>
                  <div className="highlight-text">
                    <h4>Team Player</h4>
                    <p>Collaborative development approach</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="about-image">
              <div className="image-container">
                <img src="https://images.stockcake.com/public/5/e/6/5e6fb906-70e0-4ec9-9df9-fb564a8fec74_large/coder-at-work-stockcake.jpg" alt="Krishna Pardeshi" />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h4>Currently Learning</h4>
                    <div className="learning-tags">
                      <span>AI/ML</span>
                      <span>Cloud Architecture</span>
                      <span>Web3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Fixed to show both at same level */}
      <section id="experience" className="experience-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Experience</h2>
            <p className="section-subtitle">Professional journey and achievements</p>
          </div>
          
          <div className="experience-grid">
            {experience.map((exp, index) => (
              <div key={exp.id} className="experience-card">
                <div className="exp-header">
                  <div className="exp-period">{exp.period}</div>
                  <div className="exp-type">{exp.type}</div>
                </div>
                
                <h3 className="exp-title">{exp.title}</h3>
                <h4 className="exp-company">{exp.company}</h4>
                <p className="exp-location">📍 {exp.location}</p>
                <p className="exp-description">{exp.description}</p>
                
                <div className="exp-achievements">
                  <h5>Key Achievements:</h5>
                  <ul>
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="exp-technologies">
                  {exp.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      
      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Showcasing my best work</p>
          </div>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={project.id} className="project-card" style={{'--delay': `${index * 0.1}s`}}>
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.github && (
                        <a href={project.github} className="project-link">
                          <span>GitHub</span>
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} className="project-link">
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} className="project-link">
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className={`project-status ${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-technologies">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                  
                  <div className="project-metrics">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="metric">
                        <span className="metric-value">{value}</span>
                        <span className="metric-label">{key}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Skills & Expertise</h2>
            <p className="section-subtitle">Technologies I work with</p>
          </div>
          
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card" style={{'--skill-color': skill.color}}>
                <div className="skill-header">
                  <div className="skill-icon">{skill.icon}</div>
                  <div className="skill-info">
                    <h4>{skill.name}</h4>
                    <span className="skill-category">{skill.category}</span>
                  </div>
                  <div className="skill-level">{skill.level}%</div>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{width: `${skill.level}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Let's Work Together</h2>
            <p className="section-subtitle">Ready to bring your ideas to life</p>
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <a href="mailto:krishnapardeshi.official@gmail.com">krishnapardeshi.official@gmail.com</a>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">📱</div>
                <div className="contact-details">
                  <h4>Phone</h4>
                  <a href="tel:+919876543210">+91 95119 29393</a>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h4>Location</h4>
                  <span>Nashik, Maharashtra, India</span>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">💼</div>
                <div className="contact-details">
                  <h4>LinkedIn</h4>
                  <a href="www.linkedin.com/in/krishna-pardeshi-a779ba267" target="_blank" rel="noopener noreferrer">
                    www.linkedin.com/in/krishna-pardeshi-a779ba267
                  </a>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <h3>Send me a message</h3>
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Subject" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message" rows="6" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  <span>Send Message</span>
                  <div className="btn-icon">🚀</div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="brand-icon">KP</div>
              <div className="footer-text">
                <p>&copy;2025 Krishna Pardeshi</p>
                <p>Crafted with passion & modern technology</p>
              </div>
            </div>
            
            <div className="footer-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="mailto:krishna.pardeshi@example.com">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

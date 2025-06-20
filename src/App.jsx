import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Palette,
  // Smartphone,
} from "lucide-react";
import Mypicture from "./assets/mypicture.jpeg";
import Beaconhealth from "./assets/beaconhealth.png";
import Creatr from "./assets/creatr.png";
import Portfolio from "./assets/portfolio.png";
import Pious from "./assets/piousclock.png";
import Center from "./assets/center.png";
import "./index.css";

function App() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const cubesRef = useRef([]);
  const [currentSection, setCurrentSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create floating cubes
    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const materials = [
      new THREE.MeshLambertMaterial({ color: 0x61dafb }), // React blue
      new THREE.MeshLambertMaterial({ color: 0xf7df1e }), // JS yellow
      new THREE.MeshLambertMaterial({ color: 0x06b6d4 }), // Tailwind cyan
      new THREE.MeshLambertMaterial({ color: 0x38b2ac }), // Teal
      new THREE.MeshLambertMaterial({ color: 0x9f7aea }), // Purple
    ];

    for (let i = 0; i < 20; i++) {
      const cube = new THREE.Mesh(
        cubeGeometry,
        materials[i % materials.length]
      );
      cube.position.x = (Math.random() - 0.5) * 20;
      cube.position.y = (Math.random() - 0.5) * 20;
      cube.position.z = (Math.random() - 0.5) * 20;
      cube.rotation.x = Math.random() * 2 * Math.PI;
      cube.rotation.y = Math.random() * 2 * Math.PI;
      cube.castShadow = true;
      scene.add(cube);
      cubesRef.current.push(cube);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate cubes
      cubesRef.current.forEach((cube, i) => {
        cube.rotation.x += 0.005 + i * 0.0002;
        cube.rotation.y += 0.005 + i * 0.0002;
        cube.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    setIsLoaded(true);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const skills = [
    { name: "React", level: 90, icon: <Code className="w-6 h-6" /> },
    { name: "JavaScript", level: 85, icon: <Code className="w-6 h-6" /> },
    { name: "TypeScript", level: 80, icon: <Code className="w-6 h-6" /> },
    { name: "CSS/SCSS", level: 88, icon: <Palette className="w-6 h-6" /> },
    { name: "Tailwind CSS", level: 85, icon: <Palette className="w-6 h-6" /> },
    { name: "Node.js", level: 75, icon: <Code className="w-6 h-6" /> },
    { name: "Next.js", level: 82, icon: <Code className="w-6 h-6" /> },
    // {
    //   name: "Mobile First",
    //   level: 90,
    //   icon: <Smartphone className="w-6 h-6" />,
    // },
  ];

  const projects = [
    {
      title: "BeaconHealth",
      description:
        "A responsive web application that allows patients to easily book medical tests online. Users can select a test type, choose a nearby diagnostic center, schedule appointments, and receive confirmation instantly. The project focuses on user-friendly design, accessibility, and smooth booking workflows",
      tech: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
      image: Beaconhealth,
      github: "",
      live: "https://www.beaconhealth.io/",
    },
    {
      title: "Creatr",
      description:
        "Creatr is a web-based application that helps content creators and brands manage their social media presence from one place. It allows users to schedule posts, track engagement, and analyze performance across multiple platforms.",
      tech: ["React", "Redux", "Node.js", "MongoDB"],
      image: Creatr,
      github: "https://github.com/AdeyoolaIyanuoluwa/Creatr",
      live: "https://creatr.aeone.co",
    },
    {
      title: "Portfolio Website",
      description:
        "Responsive portfolio site with 3D animations and smooth scrolling",
      tech: ["React", "Three.js", "GSAP", "Tailwind CSS"],
      image: Portfolio,
      github: "https://github.com/AdeyoolaIyanuoluwa/My-portfolio",
      live: "https://adeyoolaiyanuoluwas-portfolio.vercel.app/",
    },
    {
      title: "Pious clock",
      description:
        "A web-based application that allows users (e.g., staff, visitors, or assets) to check in and check out of a facility with real-time tracking and management. Built with React js and Node.js, it features role-based access, dashboard reporting, and a clean user experience",
      tech: ["React", "TypeScript", "SCSS", "Node js"],
      image: Pious,
      github: "https://github.com/AdeyoolaIyanuoluwa/piousClock",
      live: "https://pious-clock.vercel.app",
    },
    {
      title: "Beacon Health – Multi-Center Medical Lab Application",
      description:
        "A full-featured web application built for Beacon Health that enables multiple diagnostic centers to track patient activities and maintain accurate medical records. The system provides visibility into operations across all branches, helping staff manage appointments, view patient histories, and streamline lab workflows",
      tech: ["React", "TypeScript", "SCSS", "Node js"],
      image: Center,
      github: "",
      live: "",
    },
  ];

  const scrollToSection = (section) => {
    setCurrentSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* 3D Background */}
      <div ref={mountRef} className="fixed inset-0 z-0" />

      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 bg-gray-900 flex items-center justify-center">
          <div className="text-2xl font-bold text-cyan-400 animate-pulse">
            Loading...
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 ">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-cyan-400">
              IyanuPortfolio
            </div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize transition-colors hover:text-cyan-400 ${
                      currentSection === item
                        ? "text-cyan-400"
                        : "text-gray-300"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex items-center justify-center px-6"
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-cyan-400 shadow-2xl shadow-cyan-400/20">
                <img
                  src={Mypicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur opacity-30 animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
            Frontend Dev
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Crafting beautiful, interactive web experiences with modern
            technologies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 border border-cyan-400 rounded-full font-semibold hover:bg-cyan-400 hover:text-gray-900 transition-colors"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">
            About Me
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I'm a passionate Frontend Developer with 3-4 years of experience
              creating engaging, user-friendly web applications. I specialize in
              React ecosystems and modern JavaScript, with a keen eye for design
              and performance optimization.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open-source projects, or mentoring fellow
              developers. I believe in writing clean, maintainable code and
              creating experiences that users love.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="text-cyan-400 mr-3">{skill.icon}</div>
                  <span className="text-xl font-semibold">{skill.name}</span>
                  <span className="ml-auto text-cyan-400 font-bold">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">
            Featured Projects
          </h2>
          <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-cyan-400">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-400 transition-all duration-300 group hover:scale-105 flex-shrink-0 w-full min-w-80 max-w-sm"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Overlay Links */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.github}
                      className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:text-cyan-400 transition-colors"
                      title="View Code"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.live}
                      className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:text-cyan-400 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  </div>
                </div>
                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-700 rounded-md text-xs text-cyan-400 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {/* Bottom Links */}
                  <div className="flex gap-4 pt-2 border-t border-gray-700">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.github}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.live}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-cyan-400">
            Let's Work Together
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Ready to bring your ideas to life? I'm always excited to work on
              new projects and collaborate with fellow developers and designers.
            </p>
            <div className="flex justify-center gap-8">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:adeyoolaiyanuoluwa@gmail.com"
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                <Mail className="w-5 h-5" />
                Email Me
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/AdeyoolaIyanuoluwa/"
                className="flex items-center gap-3 px-6 py-3 border border-cyan-400 rounded-full font-semibold hover:bg-cyan-400 hover:text-gray-900 transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a href="http://" target="_blank" rel="noopener noreferrer"></a>
              <a
                ttarget="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/adeyoola-iyanuoluwa/"
                className="flex items-center gap-3 px-6 py-3 border border-cyan-400 rounded-full font-semibold hover:bg-cyan-400 hover:text-gray-900 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2025 Iyanuoluwa Adeyoola Portfolio.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

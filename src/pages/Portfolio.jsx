import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  X, 
  Play, 
  ArrowUpRight, 
  Bot, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Maximize2
} from 'lucide-react';

/* --- Configuration (Unchanged Data) --- */
const projectData = [
  {
    id: 'sushi',
    title: "ZenDining AI",
    category: "Hospitality",
    client: "Sakura Sushi",
    year: "2024",
    shortDesc: "Culinary platform with embedded concierge AI.",
    fullDesc: "Redefining the digital hospitality experience. We created a serene, visually immersive platform for Sakura Sushi that doesn't just display a menu—it converses. 'Saki', the custom AI agent, guides users through flavor profiles, manages real-time reservations, and handles dietary complexities with natural language understanding.",
    aiFeatures: [
      "Conversational Reservation System",
      "Context-Aware Menu Recommendations",
      "Allergen Safety Analysis Engine",
      "Multi-lingual Guest Support"
    ],
    techStack: ["React", "OpenAI API", "Tailwind", "Node.js"],
    coverImage: "/assets/projects/sushi/cover.jpg", 
    galleryImages: [
      "/assets/projects/sushi/detail-1.jpg",
      "/assets/projects/sushi/detail-2.jpg",
      "/assets/projects/sushi/detail-3.jpg",
      "/assets/projects/sushi/detail-4.jpg"
    ],
    videoPath: "/assets/projects/sushi/demo.mp4",
    liveLink: "https://example.com"
  },
  {
    id: 'optician',
    title: "ClearView Optics",
    category: "Retail",
    client: "Lumina Vision",
    year: "2024",
    shortDesc: "Intelligent vision assistant for frame selection.",
    fullDesc: "Bridging high-fashion eyewear with clinical precision. The Lumina Vision platform introduces 'Iris', an AI stylistic consultant that analyzes user preferences to suggest frames. This seamless integration of commerce and care resulted in a 40% increase in online appointment bookings.",
    aiFeatures: [
      "Computer Vision Face Analysis",
      "Smart Appointment Sync",
      "Insurance Eligibility Bot",
      "Lens Tech Explainer Agent"
    ],
    techStack: ["Next.js", "Vercel AI SDK", "Framer Motion", "Supabase"],
    coverImage: "/assets/projects/optician/cover.jpg",
    galleryImages: [
      "/assets/projects/optician/detail-1.jpg",
      "/assets/projects/optician/detail-2.jpg",
      "/assets/projects/optician/detail-3.jpg",
      "/assets/projects/optician/detail-4.jpg"
    ],
    videoPath: "/assets/projects/optician/demo.mp4",
    liveLink: "https://example.com"
  },
  {
    id: 'dentist',
    title: "Apex Dental",
    category: "Healthcare",
    client: "Dr. A. Smith",
    year: "2023",
    shortDesc: "Trust-centered medical UI with HIPAA-compliant intake.",
    fullDesc: "Trust is the currency of healthcare. We designed Apex Dental's digital presence to exude calm professionalism. The integrated 'DentaBot' handles sensitive patient intake, symptom triage, and scheduling, significantly reducing administrative overhead while maintaining strict data privacy.",
    aiFeatures: [
      "Symptom Triage System",
      "Automated Post-op Care Guide",
      "Secure Patient Portal Sync",
      "Smart Reminders"
    ],
    techStack: ["React", "Python", "TensorFlow", "PostgreSQL"],
    coverImage: "/assets/projects/dentist/cover.jpg",
    galleryImages: [
      "/assets/projects/dentist/detail-1.jpg",
      "/assets/projects/dentist/detail-2.jpg",
      "/assets/projects/dentist/detail-3.jpg",
      "/assets/projects/dentist/detail-4.jpg"
    ],
    videoPath: "/assets/projects/dentist/demo.mp4",
    liveLink: "https://example.com"
  }
];

/* --- Animations & Utilities --- */
const transition = { duration: 0.8, ease: [0.25, 1, 0.5, 1] };
const simpleFade = { duration: 0.4, ease: "easeInOut" };

/* --- Sub-Components --- */

// 1. Video Overlay - Cinematic Reveal
const VideoOverlay = ({ videoPath, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={simpleFade}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={transition}
        className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mx-4 md:mx-0 border border-white/10"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 group flex items-center justify-center w-12 h-12 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <X className="w-5 h-5" />
        </button>
        
        <video
          src={videoPath}
          autoPlay
          controls
          className="w-full h-full object-cover"
          poster="https://placehold.co/1920x1080/1a1a1a/FFF?text=Loading+Video..."
        />
      </motion.div>
    </motion.div>
  );
};

// 2. Project Modal - Agency Style
const ProjectModal = ({ project, onClose }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  if (!project) return null;

  return (
    <>
      <AnimatePresence>
        {isVideoOpen && (
          <VideoOverlay 
            videoPath={project.videoPath} 
            onClose={() => setIsVideoOpen(false)} 
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center pointer-events-none">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-lg pointer-events-auto"
        />
        
        {/* Modal Container */}
        <motion.div 
          layoutId={`card-container-${project.id}`}
          className="pointer-events-auto relative w-full h-[90vh] md:h-[95vh] md:w-[95vw] md:max-w-[1400px] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:border md:border-white/50"
        >
          {/* Progress Bar */}
          <motion.div style={{ scaleX }} className="absolute top-0 left-0 right-0 h-1 bg-violet-600 origin-left z-50" />

          {/* Floating Close Button */}
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-4 bg-white/90 backdrop-blur-xl rounded-full hover:bg-black hover:text-white transition-all duration-300 border border-gray-100 shadow-lg group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </motion.button>

          <div ref={containerRef} className="flex-1 overflow-y-auto custom-scrollbar bg-white">
            
            {/* Cinematic Hero Header */}
            <div className="relative w-full h-[60vh] md:h-[75vh]">
              <div className="absolute inset-0">
                 <motion.img 
                   layoutId={`image-${project.id}`}
                   src={project.coverImage} 
                   alt={project.title}
                   className="w-full h-full object-cover"
                   onError={(e) => {
                     e.target.onerror = null;
                     e.target.src = "https://placehold.co/1920x1080/1a1a1a/FFF?text=Video+Placeholder";
                   }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  initial={{ scale: 0.8, opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ scale: 1, opacity: 1, backdropFilter: "blur(8px)" }}
                  transition={{ delay: 0.4, ...transition }}
                  onClick={() => setIsVideoOpen(true)}
                  className="group relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 border border-white/30 text-white overflow-hidden hover:bg-white hover:text-black transition-colors duration-500"
                >
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.25,1,0.5,1]" />
                  <Play className="relative w-10 h-10 fill-current z-10 ml-1" />
                </motion.button>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                 <motion.h2 
                   initial={{ y: 50, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.2, ...transition }}
                   className="text-5xl md:text-8xl font-bold text-white tracking-tight leading-[0.9] mb-4"
                 >
                   {project.title}
                 </motion.h2>
                 <motion.div 
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.3, ...transition }}
                   className="flex items-center gap-6 text-white/90"
                 >
                   <span className="text-lg md:text-xl font-light tracking-wide">{project.category}</span>
                   <span className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
                   <span className="text-lg md:text-xl font-light tracking-wide">{project.year}</span>
                 </motion.div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-[1400px] mx-auto px-6 py-20 md:px-16 md:py-32">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                
                {/* Main Article */}
                <div className="lg:col-span-7 space-y-24">
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={transition}
                  >
                    <div className="flex items-center gap-3 mb-8">
                       <div className="w-8 h-[1px] bg-violet-600" />
                       <h3 className="text-xs font-bold text-violet-600 uppercase tracking-[0.2em]">The Challenge</h3>
                    </div>
                    <p className="text-2xl md:text-4xl text-gray-900 leading-[1.4] font-light">
                      {project.fullDesc}
                    </p>
                  </motion.section>

                  {/* Gallery */}
                  <section className="space-y-8">
                    {project.galleryImages.map((img, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: idx * 0.1, ...transition }}
                        className="w-full bg-gray-100 overflow-hidden group"
                      >
                        <img 
                          src={img} 
                          alt={`Detail ${idx}`} 
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.25,1,0.5,1]"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/1200x800/f3f4f6/d4d4d8?text=Gallery+Image+${idx+1}`;
                          }}
                        />
                      </motion.div>
                    ))}
                  </section>
                </div>

                {/* Sticky Sidebar */}
                <div className="lg:col-span-5 relative">
                   <div className="sticky top-12 space-y-12">
                      
                      {/* AI Module */}
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={transition}
                        className="bg-gray-50 p-8 md:p-10 rounded-3xl border border-gray-100"
                      >
                         <h4 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-8">
                           <Bot className="w-6 h-6 text-violet-600" />
                           Intelligence Stack
                         </h4>
                         <ul className="space-y-5">
                           {project.aiFeatures.map((feature, idx) => (
                             <li key={idx} className="flex items-start gap-4 group">
                               <div className="mt-1 w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-violet-600 group-hover:bg-violet-50 transition-colors">
                                 <div className="w-2 h-2 bg-violet-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                               </div>
                               <span className="text-gray-600 text-base leading-relaxed group-hover:text-gray-900 transition-colors">{feature}</span>
                             </li>
                           ))}
                         </ul>
                      </motion.div>

                      {/* Tech & Link */}
                      <motion.div
                         initial={{ opacity: 0, x: 20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.1, ...transition }} 
                         className="space-y-8"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <span key={tech} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-violet-200 transition-colors">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <a 
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer" 
                          className="group block w-full bg-gray-900 text-white p-6 rounded-2xl hover:bg-violet-600 transition-all duration-300 shadow-lg hover:shadow-violet-500/30 overflow-hidden relative"
                        >
                          <div className="relative z-10 flex items-center justify-between">
                            <span className="font-bold text-lg">Visit Live Site</span>
                            <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                          </div>
                          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </a>
                      </motion.div>
                   </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

// 3. Project Card - Premium Lift & Depth
const ProjectCard = ({ project, onClick }) => (
  <motion.div 
    layoutId={`card-container-${project.id}`}
    onClick={() => onClick(project)}
    initial="rest"
    whileHover="hover"
    animate="rest"
    className="group cursor-pointer w-full"
  >
    {/* Image Container */}
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl group-hover:shadow-violet-900/10 transition-shadow duration-500">
      
      {/* 3D Lift Wrapper */}
      <motion.div
        className="w-full h-full bg-gray-100"
        variants={{
          rest: { scale: 1, y: 0 },
          hover: { scale: 1.02, y: -5 }
        }}
        transition={transition}
      >
        <motion.img 
          layoutId={`image-${project.id}`}
          src={project.coverImage} 
          alt={project.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
             e.target.onerror = null;
             e.target.src = "https://placehold.co/800x600/e2e8f0/94a3b8?text=Project+Cover";
          }}
        />
        
        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors duration-500" />
        
        {/* Hover Details Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/60 to-transparent">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
             <div className="flex items-center gap-2 text-white/90 text-sm font-medium mb-2">
                <Maximize2 className="w-4 h-4" />
                <span>View Case Study</span>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-2 shadow-sm border border-white/50">
          <Sparkles className="w-3.5 h-3.5 text-violet-600 fill-violet-600" />
          <span className="text-[10px] font-bold text-gray-900 tracking-widest uppercase">AI Core</span>
        </div>
      </div>
    </div>

    {/* Clean Typography Info */}
    <div className="flex justify-between items-end border-b border-gray-100 pb-6 group-hover:border-violet-200 transition-colors duration-500">
      <div className="space-y-2">
        <h3 className="text-3xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-500 text-base font-medium flex items-center gap-3">
          {project.category} 
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          {project.year}
        </p>
      </div>
      <motion.div 
        variants={{
          rest: { x: 0, opacity: 0.3 },
          hover: { x: 5, opacity: 1 }
        }}
        className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 text-violet-600"
      >
        <ArrowRight className="w-5 h-5" />
      </motion.div>
    </div>
  </motion.div>
);

/* --- Main Page Component --- */

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-violet-200 selection:text-violet-900 overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-violet-100/50 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-pulse" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] mix-blend-multiply opacity-70" />
      </div>

      <div className="relative z-10">
        {/* Navigation / Header Placeholder */}
        <header className="absolute top-0 w-full px-8 py-8 md:px-16 flex justify-between items-center z-50 mix-blend-difference text-white">
           <span className="text-xl font-bold tracking-tighter">AGENCY®</span>
           <span className="text-sm font-medium tracking-widest uppercase opacity-70">Portfolio 2024</span>
        </header>

        {/* Agency Hero Section */}
        <section className="pt-40 md:pt-60 pb-32 px-6 md:px-16 max-w-[1600px] mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Spark Line Animation */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-12 opacity-50" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
               <div>
                  <motion.div className="overflow-hidden">
                    <motion.h1 
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ ...transition, delay: 0.1 }}
                      className="text-6xl md:text-9xl font-bold tracking-tighter text-gray-900 leading-[0.85] mb-2 md:mb-4"
                    >
                      Digital
                    </motion.h1>
                  </motion.div>
                  <motion.div className="overflow-hidden">
                    <motion.h1 
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ ...transition, delay: 0.2 }}
                      className="text-6xl md:text-9xl font-bold tracking-tighter text-gray-900 leading-[0.85] flex items-center gap-4"
                    >
                      Intelligence<span className="text-violet-600">.</span>
                    </motion.h1>
                  </motion.div>
               </div>
               
               <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...transition, delay: 0.5 }}
                  className="max-w-md"
               >
                 <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
                   We architect intelligent digital ecosystems. Embedding AI agents into immersive interfaces to turn static websites into active business partners.
                 </p>
               </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Gallery Grid */}
        <section id="work" className="pb-32 px-6 md:px-16 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="w-3 h-3 bg-violet-600 rounded-full animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase text-gray-400">Selected Works</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {projectData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
              >
                <ProjectCard 
                  project={project} 
                  onClick={setSelectedProject} 
                />
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-40 border-t border-gray-200 pt-24"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
               <h2 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">
                 Have a vision? <br />
                 <span className="text-gray-400">Let's build it.</span>
               </h2>
               <a 
                 href="https://wa.me/212717837586" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="group relative px-10 py-6 bg-gray-900 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-900/20 inline-block"
               >
                 <span className="relative z-10 flex items-center gap-4">
                   Start a Project
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </span>
                 <div className="absolute inset-0 bg-violet-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[0.25,1,0.5,1]" />
               </a>
            </div>
          </motion.div>
        </section>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
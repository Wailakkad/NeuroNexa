import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Bot, 
  Zap, 
  BarChart3,  
  Globe, 
  Cpu, 
  Layers, 
  MessageSquare, 
  Check, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  Workflow,
  MessageCircle, Send, Loader
} from 'lucide-react';
import PortfolioPage from './pages/Portfolio.jsx';
import { Routes, Route } from 'react-router-dom';



const PRIMARY_COLOR = '#000000'; // Near-black text
const ACCENT_COLOR = '#5a189a'; // Muted deep red / terracotta
const BG_COLOR = '#ffffff'; // Warm light beige / off-white
const FOOTER_BG_COLOR = '#e9e6ff'; // Slightly darker beige

const AI_ASSISTANT_WEBHOOK = 'https://neronexaai2025.app.n8n.cloud/webhook/neuronexa-chatbot';

// --- Utility Components ---

const Section = ({ id, className, children }) => (
  <section id={id} className={`py-20 lg:py-32 overflow-hidden ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = "" }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 mb-6">
    {children}
  </span>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "border-transparent text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-indigo-500/30 ",
    secondary: "border-slate-300 text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 backdrop-blur-sm",
    outline: "border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900 bg-transparent"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(99, 102, 241, 0.2)" }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// --- Preloader Component ---

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 35); // Approx 3.5-4s

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 mb-2 flex items-center justify-center gap-3">
          <img src="logo.png" alt="Neuronexa Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
          <span>Neuronexa<span className="text-indigo-600">.ai</span></span>
        </h1>
        <p className="text-slate-500 text-sm tracking-widest uppercase">Designing AI-Native Experiences</p>
      </motion.div>

      <div className="w-64 h-1 bg-slate-200 rounded-full mt-12 overflow-hidden relative">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-indigo-500"
          style={{ width: `${progress}%` }}
        />
        {/* Animated sheen */}
        <motion.div 
          className="absolute top-0 left-0 h-full w-20 bg-white/50 blur-md"
          animate={{ x: [-100, 300] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

// --- Navbar Component ---

const Navbar = ({ handleWhatsApp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Capabilities', id: 'capabilities' },
    { name: 'Solutions', id: 'solutions' },
    { name: 'Automations', id: 'automations' },
    { name: 'Work', id: 'work' },
    { name: 'Process', id: 'process' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="logo.png" alt="Neuronexa Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold tracking-tight text-slate-900 transition-colors">
              Neuronexa<span className="text-indigo-600">.ai</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {link.name}
              </button>
            ))}
            
            <a
                href="/portfolio"
                className="block w-full text-left  py-3 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-md transition-colors"
              >
                Portfolio
              </a>
            <Button 
              variant="primary" 
              className="px-4 py-2 text-sm"
              onClick={handleWhatsApp} // Updated to WhatsApp
            >
              Start
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-md transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <a
                href="/portfolio"
                className="block w-full text-left px-3 py-3 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-md transition-colors"
              >
                Portfolio
              </a>
              <div className="pt-4">
                <Button onClick={handleWhatsApp} className="w-full"> {/* Updated to WhatsApp */}
                  Start
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// --- Hero Section ---

const Hero = ({ handleWhatsApp }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 transition-colors duration-500">
      {/* Professional Gradient Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-100/60 rounded-full blur-[120px] -z-10 opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-100/40 rounded-full blur-[100px] -z-10 opacity-50 pointer-events-none" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Badge>Next-Gen Agency</Badge>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6 transition-colors">
              AI websites that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                outgrow templates.
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed transition-colors">
              We build intelligent marketing sites and applications for teams that refuse to compromise. Launch faster with automated workflows and research-grade design.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button onClick={handleWhatsApp}> {/* Updated to WhatsApp */}
                Book a strategy call
              </Button>
              <Button variant="secondary" onClick={() => document.getElementById('process').scrollIntoView({behavior: 'smooth'})}>
                How it works
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-600 font-medium transition-colors">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-500" />
                <span>Launch in weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-500" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-500" />
                <span>24/7 AI Support</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            {/* Abstract Tech Visual */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-indigo-500/10 bg-white/80 backdrop-blur-sm transition-colors duration-500"
            >
              <img 
                src="hero2.png" 
                alt="AI Neural Network Abstract Art" 
                className="w-full h-auto object-cover opacity-90"
                onError={(e) => e.target.src = 'https://placehold.co/1000x600/f8fafc/1e293b?text=AI+Mockup'}
              />
              
              {/* Floating UI Card Overlay */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl shadow-lg transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-slate-500 font-mono">system_status: active</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-slate-200 rounded w-3/4" />
                  <div className="h-2 bg-slate-200 rounded w-1/2" />
                </div>
              </motion.div>
            </motion.div>
            
            {/* Background decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-10 -z-10" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

// --- Logo Strip ---

const LogoStrip = () => {
  const logos = ["Acme AI", "Novalabs", "Hyperion", "Vertex", "Onyx Data", "Stratos"];
  return (
    <div className="py-10 border-y border-slate-200 bg-white transition-colors duration-500">
      <Container>
        <p className="text-center text-sm font-medium text-slate-500 mb-8 tracking-wider uppercase">Trusted by teams building the future</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
          {logos.map((logo, index) => (
            <span key={index} className="text-xl font-bold text-slate-600 tracking-tight flex items-center gap-2 transition-colors">
              <div className="w-4 h-4 rounded-sm bg-slate-400" /> {logo}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
};

// --- Capabilities Section ---

const Capabilities = () => {
  const items = [
    {
      icon: <Globe className="w-6 h-6 text-indigo-500" />,
      title: "AI-Native Web",
      desc: "Marketing sites that adapt to visitor behavior in real-time. Fast, accessible, and SEO-optimized by default."
    },
    {
      icon: <Bot className="w-6 h-6 text-purple-500" />,
      title: "Intelligent Chatbots",
      desc: "Custom LLM integrations that handle support, lead qualification, and booking without human intervention."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
      title: "Data Workflows",
      desc: "Automated pipelines connecting your CRM, analytics, and marketing tools for a unified truth."
    },
    {
      icon: <Cpu className="w-6 h-6 text-emerald-500" />,
      title: "Product Engineering",
      desc: "Full-stack web applications built with React, Next.js, and Python backends designed for scale."
    }
  ];

  return (
    <Section id="capabilities" className="bg-white transition-colors duration-500">
      <Container>
        <div className="mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 transition-colors"
          >
            What we build.
          </motion.h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div className="mb-6 p-3 bg-white w-fit rounded-lg group-hover:bg-indigo-500/10 transition-colors shadow-sm border border-slate-100">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 transition-colors">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed transition-colors">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

const SolutionsSlider = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // ADDED real image URLs for each solution
  const solutions = [
    { 
      title: "E-commerce", 
      desc: "High-conversion funnels with AI product recommendations.", 
      color: "from-purple-500 to-pink-500",
      image: "https://i.pinimg.com/1200x/b7/9d/cc/b79dcc004d7918b24e6d5d744afa3d72.jpg" // Online shopping/products
    },
    { 
      title: "Venture Capital", 
      desc: "Portfolio showcases and data-driven deal flow engines.", 
      color: "from-emerald-500 to-teal-500",
      image: "https://i.pinimg.com/1200x/73/04/c9/7304c9c13186762bc2c6a983700d84f6.jpg" // Financial Chart/Graph
    },
    { 
      title: "Creator Economy", 
      desc: "Personal branding sites that capture and monetize audiences.", 
      color: "from-indigo-500 to-violet-500",
      image: "https://i.pinimg.com/1200x/5b/0f/17/5b0f175b32244ffbfbec63ed6856c88f.jpg" // Video/Content Creation Setup
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % solutions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [solutions.length]);

  const activeSolution = solutions[activeTab];

  return (
    <Section id="solutions" className="bg-slate-50 transition-colors duration-500">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 transition-colors">Tailored to your growth stage.</h2>
            <p className="text-slate-600 mb-8 transition-colors">
              We don't do one-size-fits-all. Our architecture adapts to your specific business model and customer journey.
            </p>
            
            <div className="space-y-2">
              {solutions.map((sol, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-between ${
                    activeTab === idx 
                      ? "bg-white text-slate-900 border border-slate-200 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                  }`}
                >
                  <span className="font-medium">{sol.title}</span>
                  {activeTab === idx && <ArrowRight className="w-4 h-4 text-indigo-500" />}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3 w-full h-[600px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                // Added group and cursor-pointer for hover effect
                className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-indigo-500/5 group cursor-pointer"
              >
                {/* Image Background */}
                <img 
                    src={activeSolution.image}
                    alt={activeSolution.title}
                    // Added hover scale effect
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    // Fallback placeholder
                    onError={(e) => e.target.src = `https://placehold.co/800x600/f3f4f6/1f2937?text=${encodeURIComponent(activeSolution.title)}`}
                />

                {/* Content Overlay - MODIFIED: Added bg-black/50 for initial dark overlay, and ensured hover uses white/95 */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-white/95 p-8 flex flex-col items-center justify-center text-center transition-all duration-500">
                    
                    {/* Decorative gradient element maintained */}
                    <div className={`w-32 h-32 rounded-full blur-3xl bg-gradient-to-r ${activeSolution.color} opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-0 transition-opacity duration-500`} />
                    
                    {/* Title MODIFIED: Changed text-transparent to text-white for initial readability */}
                    <h3 className="text-4xl font-bold text-white group-hover:text-slate-900 mb-6 relative z-10 transition-colors duration-500">{activeSolution.title}</h3>
                    
                    {/* Description and Button appear on hover using utility classes */}
                    <p className="text-xl text-white group-hover:text-slate-600 max-w-md relative z-10 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 delay-150">
                      {activeSolution.desc}
                    </p>
                    <div className="mt-8 relative z-10 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 delay-300">
                      <Button variant="outline" className="rounded-full group-hover:shadow-md">View Examples</Button>
                    </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
};

// --- Automations Section ---

const Automations = () => {
  return (
    <Section id="automations" className="bg-white transition-colors duration-500">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <Badge>System Integration</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 transition-colors">
              Connect your entire <br/> tech stack.
            </h2>
            <p className="text-slate-600 mb-8 text-lg transition-colors">
              We build the invisible infrastructure that powers your visible success. Seamlessly sync data between your marketing site and operations.
            </p>
            
            <ul className="space-y-6">
              {[
                "CRM Integration (Salesforce, HubSpot)", 
                "Automated Email Sequences", 
                "Real-time Analytics Dashboards",
                "Lead Scoring & Qualification"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 text-indigo-600 transition-colors">
                    <Workflow size={14} />
                  </div>
                  <span className="text-slate-700 font-medium transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-purple-900/10 border border-slate-200 bg-white transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
                alt="Data Dashboard Integration" 
                className="w-full h-auto opacity-90 transition-opacity"
                onError={(e) => e.target.src = 'https://placehold.co/1000x600/f8fafc/1e293b?text=Integration+Dashboard'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-50" />
            </div>
            {/* Floating connecting line decoration */}
            <svg className="absolute -left-12 top-12 w-24 h-full pointer-events-none hidden lg:block" viewBox="0 0 100 400">
              <path d="M 100 0 C 20 50 20 150 100 200 C 20 250 20 350 100 400" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4 4" />
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

// --- Case Studies Slider ---

const CaseStudies = () => {
  const [index, setIndex] = useState(0);
  const cases = [
    {
      client: "HealthAI",
      title: "Patient-first digital intake",
      metric: "3.5x Faster Onboarding",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      client: "Lumina",
      title: "E-commerce architecture redesign",
      metric: "99.99% Uptime Scale",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const nextSlide = () => setIndex((prev) => (prev + 1) % cases.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + cases.length) % cases.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section id="work" className="bg-slate-50 border-y border-slate-200 transition-colors duration-500">
      <Container>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2 transition-colors">Selected Work</h2>
            <p className="text-slate-600 transition-colors">Impact where it matters.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={prevSlide} className="p-3 rounded-full border border-slate-200 hover:bg-slate-200 text-slate-600 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextSlide} className="p-3 rounded-full border border-slate-200 hover:bg-slate-200 text-slate-600 transition-colors">
              <ChevronRight size={20} />
            </button>
        </div>
        </div>

        <div className="relative h-[500px] overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-xl transition-colors">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 grid lg:grid-cols-2"
            >
              <div className="p-10 lg:p-16 flex flex-col justify-center order-2 lg:order-1 relative z-10 bg-white/95 lg:bg-white transition-colors">
                <span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm mb-4 transition-colors">{cases[index].client}</span>
                <h3 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight transition-colors">{cases[index].title}</h3>
                <div className="inline-block px-4 py-2 bg-slate-100 rounded-lg border border-slate-200 mb-8 w-fit transition-colors">
                  <span className="text-2xl font-bold text-slate-900 transition-colors">{cases[index].metric}</span>
                </div>
                <Button variant="outline" className="w-fit">View Case Study</Button>
              </div>
              
              <div className="relative h-full order-1 lg:order-2">
                <img 
                  src={cases[index].image} 
                  alt={cases[index].title} 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => e.target.src = 'https://placehold.co/1000x600/f8fafc/1e293b?text=Case+Study+Image'}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/70 lg:via-transparent lg:to-transparent" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
};

// --- Process Section ---

const Process = () => {
  const steps = [
    { num: "01", title: "Discover", desc: "We map your goals, audience, and technical constraints." },
    { num: "02", title: "Design", desc: "High-fidelity prototypes focusing on UX and brand motion." },
    { num: "03", title: "Build", desc: "Clean, modular code with automated testing pipelines." },
    { num: "04", title: "Scale", desc: "Launch support and continuous data-driven optimization." }
  ];

  return (
    <Section id="process" className="bg-white transition-colors duration-500">
      <Container>
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 transition-colors">How we work</h2>
          <p className="text-slate-600 transition-colors">A rigorous methodology for predictable excellence.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-slate-200 -z-10 transition-colors" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative"
            >
              <div className="w-24 h-24 bg-white border border-slate-200 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0 z-10 shadow-xl transition-colors">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 transition-colors">{step.num}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center md:text-left transition-colors">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed text-center md:text-left transition-colors">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// --- Testimonials Section ---

const Testimonials = () => {
  return (
    <Section id="testimonials" className="bg-gradient-to-b from-slate-50 to-white transition-colors duration-500">
      <Container>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 lg:p-12 rounded-2xl bg-white border border-slate-200 relative shadow-lg transition-all duration-500"
          >
            <MessageSquare className="w-8 h-8 text-slate-400 mb-6" />
            <p className="text-lg lg:text-xl text-slate-700 leading-relaxed mb-8 transition-colors">
              "Neuronexa didn't just build a website; they built a growth engine. Our lead quality improved overnight thanks to the AI qualification flows they implemented."
            </p>
            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" 
                alt="User" 
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
              />
              <div>
                <h4 className="text-slate-900 font-medium transition-colors">David Chen</h4>
                <p className="text-sm text-slate-500 transition-colors">CTO, Vertex Financial</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 lg:p-12 rounded-2xl bg-white border border-slate-200 relative shadow-lg transition-all duration-500"
          >
            <MessageSquare className="w-8 h-8 text-slate-400 mb-6" />
            <p className="text-lg lg:text-xl text-slate-700 leading-relaxed mb-8 transition-colors">
              "The level of technical polish is unlike anything I've seen in the agency world. They understand both modern design and complex engineering."
            </p>
            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" 
                alt="User" 
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
              />
              <div>
                <h4 className="text-slate-900 font-medium transition-colors">Sarah Miller</h4>
                <p className="text-sm text-slate-500 transition-colors">VP Marketing, Acme AI</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

// // --- Pricing Section ---

// const Pricing = () => {
//   return (
//     <Section id="pricing" className="bg-white transition-colors duration-500">
//       <Container>
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 transition-colors">Engagement Models</h2>
//           <p className="text-slate-600 transition-colors">Flexible options for startups and enterprises.</p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {/* Tier 1 */}
//           <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-500/20 transition-all duration-300">
//             <h3 className="text-xl font-bold text-slate-900 mb-2 transition-colors">Launch</h3>
//             <p className="text-slate-500 text-sm mb-6 transition-colors">For early-stage startups.</p>
//             <div className="mb-8">
//               <span className="text-3xl font-bold text-slate-900 transition-colors">From $15k</span>
//             </div>
//             <ul className="space-y-4 mb-8 text-sm text-slate-600">
//               <li className="flex items-center gap-3"><Check size={16} className="text-indigo-500"/> Landing Page Strategy</li>
//               <li className="flex items-center gap-3"><Check size={16} className="text-indigo-500"/> Custom Design System</li>
//               <li className="flex items-center gap-3"><Check size={16} className="text-indigo-500"/> React/Next.js Build</li>
//               <li className="flex items-center gap-3"><Check size={16} className="text-indigo-500"/> CMS Integration</li>
//             </ul>
//             <Button variant="outline" className="w-full">Book Call</Button>
//           </div>

//           {/* Tier 2 - Featured (Gradient Focus) */}
//           <div className="p-8 rounded-2xl bg-gradient-to-br from-white to-indigo-50 border border-indigo-400/50 relative shadow-2xl shadow-indigo-500/20 transform md:-translate-y-4 transition-all duration-300">
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
//               MOST POPULAR
//             </div>
//             <h3 className="text-xl font-bold text-slate-900 mb-2 transition-colors">Growth</h3>
//             <p className="text-slate-500 text-sm mb-6 transition-colors">For scaling companies.</p>
//             <div className="mb-8">
//               <span className="text-3xl font-bold text-slate-900 transition-colors">From $45k</span>
//             </div>
//             <ul className="space-y-4 mb-8 text-sm text-slate-700">
//               <li className="flex items-center gap-3"><Check size={16} className="text-indigo-600"/> Full Site Architecture</li>
//               <li className="flex items-center gap-3"><Check size={16} className="text-indigo-600"/> Advanced Animations</li>
//               <li className="flex items-center gap-3"><Check size={16} className="text-indigo-600"/> CRM & Analytics Setup</li>
//               <li className="flex items-center gap-3"><Check size={16} className="text-indigo-600"/> AI Chatbot Integration</li>
//               <li className="flex items-center gap-3"><Check size={16} className="text-indigo-600"/> SEO Optimization</li>
//             </ul>
//             <Button variant="primary" className="w-full">Book Call</Button>
//           </div>

//           {/* Tier 3 */}
//           <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-500/20 transition-all duration-300">
//             <h3 className="text-xl font-bold text-slate-900 mb-2 transition-colors">Partner</h3>
//             <p className="text-slate-500 text-sm mb-6 transition-colors">For continuous innovation.</p>
//             <div className="mb-8">
//               <span className="text-3xl font-bold text-slate-900 transition-colors">Custom</span>
//             </div>
//             <ul className="space-y-4 mb-8 text-sm text-slate-600">
//               <li className="flex items-center gap-3"><Check size={16} className="text-indigo-500"/> Dedicated Product Team</li>
//               <li className="flex items-center gap-3"><Check size={16} className="text-indigo-500"/> Custom Web App Dev</li>
//               <li className="flex items-center gap-3"><Check size={16} className="text-indigo-500"/> LLM Fine-tuning</li>
//               <li className="flex items-center gap-3"><Check size={16} className="text-indigo-500"/> 24/7 SLA Support</li>
//             </ul>
//             <Button variant="outline" className="w-full">Contact Sales</Button>
//           </div>
//         </div>
//       </Container>
//     </Section>
//   );
// };

// --- Footer Component ---

const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-50 pt-20 pb-10 border-t border-slate-200 transition-colors duration-500">
      <Container>
        {/* CTA Section (Gradient Focus) */}
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-slate-200 p-8 md:p-16 text-center overflow-hidden mb-20 transition-colors shadow-xl shadow-indigo-100">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 transition-colors">Ready to build the extraordinary?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-10 text-lg transition-colors">
              Stop relying on templates. Start building an intelligent web experience that converts.
            </p>
            <Button variant="primary" className="text-lg px-8 py-4">Book a free strategy call</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mb-16 border-b border-slate-200 pb-16 transition-colors">
          <div className="md:col-span-1">
            <span className="text-xl font-bold tracking-tight text-slate-900 block mb-4 flex items-center gap-2 transition-colors">
              <img src="logo.png" alt="Neuronexa Logo" className="w-8 h-8 object-contain" />
              <span>Neuronexa<span className="text-indigo-600">.ai</span></span>
            </span>
            <p className="text-slate-500 text-sm transition-colors">
              The agency for AI-native companies. We design, build, and scale world-class web experiences.
            </p>
          </div>
          
          {[
            { header: "Company", links: ["About", "Careers", "Blog", "Contact"] },
            { header: "Services", links: ["Web Design", "Development", "AI Integration", "Audits"] },
            { header: "Socials", links: ["Twitter", "LinkedIn", "Instagram", "GitHub"] },
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="text-slate-900 font-semibold mb-4 transition-colors">{col.header}</h4>
              <ul className="space-y-2">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a href="#" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 transition-colors">
          <p>© 2025 Neuronexa Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-700 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-700 transition-colors">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

const Message = ({ role, text }) => {
  const isUser = role === 'user';
  return (
    <motion.div
      className={`flex mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`max-w-[80%] px-4 py-2 rounded-xl text-sm shadow-md ${
          isUser
            ? 'rounded-br-none text-white'
            : 'rounded-tl-none'
        }`}
        style={{
          backgroundColor: isUser ? ACCENT_COLOR : FOOTER_BG_COLOR,
          color: isUser ? BG_COLOR : PRIMARY_COLOR,
        }}
      >
        {text}
      </div>
    </motion.div>
  );
};

const TypingIndicator = () => (
  <motion.div
    className="flex items-center px-4 py-2 rounded-xl text-sm shadow-md rounded-tl-none w-fit"
    style={{ backgroundColor: FOOTER_BG_COLOR, color: PRIMARY_COLOR }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <Loader size={16} className="animate-spin mr-2" style={{ color: ACCENT_COLOR }} />
    Assistant is replying...
  </motion.div>
);

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        text: 'Hi, I’m the Neuronexa assistant. I can help with our services, pricing, and scheduling a strategy call.',
      }]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

    // Find this section around line 2429 and replace it:

const sendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        const payload = {
          text: userMessage.text,
          history: messages.map(m => ({ role: m.role, text: m.text })),
          sessionId: 'user-' + Date.now(), // Add session tracking
        };

        console.log('Sending payload:', payload); // Debug log
        
        const response = await fetch(AI_ASSISTANT_WEBHOOK, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        console.log('Response status:', response.status); // Debug log
        console.log('Response headers:', response.headers); // Debug log

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // FIX: Get the raw text first
        const responseText = await response.text();
        
        console.log('Raw response text:', responseText); // Debug log
        
        if (!responseText || responseText.trim() === '') {
          throw new Error('Webhook returned empty response body');
        }

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse JSON response:', parseError);
          console.error('Response was:', responseText);
          throw parseError;
        }

        // Get response text from various possible fields
        const assistantResponse = data?.reply 
          || data?.answer 
          || data?.message 
          || data?.text 
          || data?.output
          || "I received your message but couldn't generate a response.";
        
        setMessages(prev => [...prev, { role: 'assistant', text: assistantResponse }]);
        setIsLoading(false);
        return;

      } catch (error) {
        console.error(`Attempt ${retries + 1}/${maxRetries} - Error:`, error.message);
        retries++;
        
        if (retries < maxRetries) {
          const delay = Math.pow(2, retries) * 1000;
          console.log(`Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          const errorMessage = error.message.includes('empty') 
            ? "The AI service returned no response. Please check your n8n webhook configuration."
            : "Unable to reach the AI assistant. Please try again or contact support.";
          
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            text: errorMessage 
          }]);
          setIsLoading(false);
        }
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* 1. Floating Chat Button */}
      <motion.button
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 z-[60] p-4 rounded-full shadow-2xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2"
        style={{
          backgroundColor: ACCENT_COLOR,
          color: BG_COLOR
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>

      {/* 2. Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-[96px] right-6 z-[60] w-[360px] max-w-[95vw] h-[480px] lg:h-[480px] flex flex-col rounded-2xl shadow-2xl overflow-hidden border"
            style={{
              backgroundColor: BG_COLOR,
              borderColor: PRIMARY_COLOR + '20',
              boxShadow: `0 10px 20px rgba(0,0,0,0.2)`
            }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b" style={{ backgroundColor: FOOTER_BG_COLOR, borderColor: PRIMARY_COLOR + '10' }}>
              <div>
                <div className="flex-shrink-0 cursor-pointer flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="logo.png" alt="Neuronexa Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold tracking-tight text-slate-900 transition-colors">
              Neuronexa<span className="text-indigo-600">.ai</span> <span className='text-indigo-500'>assistant</span>
            </span>
          </div>
                {/* <p className="text-xs" style={{ color: "#3c096c" + '80' }}>
                  Ask about hours, menu, or reservations
                </p> */}
              </div>
              <button
                onClick={handleToggleChat}
                className="p-1 rounded-full transition duration-200 hover:bg-black/5"
                aria-label="Close chat"
              >
                <X size={20} style={{ color: PRIMARY_COLOR }} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg, index) => (
                <Message key={index} role={msg.role} text={msg.text} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t flex items-center" style={{ borderColor: PRIMARY_COLOR + '10' }}>
              <input
                type="text"
                placeholder="Ask a question or request a table..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 p-3 text-sm rounded-lg mr-2 focus:ring-1 focus:ring-red-300 focus:outline-none"
                style={{ backgroundColor: BG_COLOR, color: PRIMARY_COLOR, borderWidth: '1px', borderColor: PRIMARY_COLOR + '20' }}
              />
              <motion.button
                onClick={sendMessage}
                disabled={input.trim() === '' || isLoading}
                className="p-3 rounded-full transition duration-200"
                style={{ backgroundColor: ACCENT_COLOR, color: BG_COLOR }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send message"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Main App Component ---

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    // --- CONTACT LOGIC ---
    // Your number, used for all contact/book/call actions
    const CONTACT_NUMBER = "+212717837586";
    const WHATSAPP_URL = `https://wa.me/${CONTACT_NUMBER}`;
    const PHONE_CALL_URL = `tel:${CONTACT_NUMBER}`;

    const handleWhatsApp = () => {
        // Opens WhatsApp chat in a new tab
        window.open(WHATSAPP_URL, '_blank');
    };

    const handleCall = () => {
        // Initiates a direct phone call (primarily for mobile devices)
        window.location.href = PHONE_CALL_URL;
    };
    // -----------------------

    // Simulate preloader completion
    const handlePreloaderComplete = () => {
        setIsLoading(false);
    };

     return (
        <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
            <AnimatePresence>
                {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
            </AnimatePresence>

            {!isLoading && (
                <>
                    <Navbar handleWhatsApp={handleWhatsApp} />
                    <main>
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <Hero handleWhatsApp={handleWhatsApp} />
                                    <LogoStrip />
                                    <Capabilities />
                                    <SolutionsSlider />
                                    <Automations />
                                    <Process />
                                    <CaseStudies />
                                    <Testimonials />
                                </>
                            } />
                            <Route path="/portfolio" element={<PortfolioPage />} />
                        </Routes>
                    </main>
                    <Footer />
                    <AIChatAssistant />
                </>
            )}
        </div>
    );
}






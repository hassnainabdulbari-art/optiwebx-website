"use client";

import { motion } from "framer-motion";
import HeroScene from "@/components/HeroScene";
import OpeningAnimation from "@/components/OpeningAnimation";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      <OpeningAnimation />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-4 sm:px-6 py-3 sm:py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 sm:px-8 py-3 sm:py-4">

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xl sm:text-2xl shadow-lg">
              O
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">
              Opti<span className="text-blue-500">webx</span>
            </h1>
          </div>

          <div className="hidden md:flex gap-6 lg:gap-8 text-gray-300">
            <a href="/" className="text-white transition">Home</a>
            <a href="/services" className="hover:text-white transition">Services</a>
            <a href="/projects" className="hover:text-white transition">Projects</a>
            <a href="/pricing" className="hover:text-white transition">Pricing</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
          </div>

          <a
            href="/contact"
            className="hidden md:block px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition shadow-lg text-sm sm:text-base"
          >
            Get Started
          </a>

          {/* Hamburger Button */}
          <button
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              menu?.classList.toggle('hidden');
            }}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
          </button>

          {/* Mobile Menu */}
          <div id="mobile-menu" className="hidden md:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden">
            <div className="flex flex-col p-4 space-y-3 text-gray-300">
              <a href="/" className="hover:text-white transition py-2 px-3 rounded-lg hover:bg-white/5">Home</a>
              <a href="/services" className="hover:text-white transition py-2 px-3 rounded-lg hover:bg-white/5">Services</a>
              <a href="/projects" className="hover:text-white transition py-2 px-3 rounded-lg hover:bg-white/5">Projects</a>
              <a href="/pricing" className="hover:text-white transition py-2 px-3 rounded-lg hover:bg-white/5">Pricing</a>
              <a href="/contact" className="hover:text-white transition py-2 px-3 rounded-lg hover:bg-white/5">Contact</a>
              <a
                href="/contact"
                className="text-center py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition text-white font-semibold"
              >
                Get Started
              </a>
            </div>
          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className="min-h-screen flex items-center relative pt-28 sm:pt-32 overflow-hidden"
      >
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute z-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-600/50 blur-[80px] sm:blur-[120px] rounded-full top-20 left-20"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/30 blur-[80px] sm:blur-[120px] rounded-full bottom-20 right-20"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 sm:gap-14 items-center">
          <motion.div
            initial={{ opacity:0, x:-50 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm mb-6 sm:mb-8">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-400 rounded-full animate-pulse"/>
              AI Automation Online
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight">
              Build
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                {" "}Future Ready
              </span>
              <br/>
              Digital Solutions
            </h1>

            <p className="mt-4 sm:mt-8 text-gray-400 text-sm sm:text-lg max-w-xl">
              Optiwebx helps businesses grow with AI automation,
              websites, marketing systems and creative digital solutions.
            </p>

            <div className="mt-6 sm:mt-10 flex gap-3 sm:gap-5 flex-wrap">
              <a
                href="/contact"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:scale-105 transition text-sm sm:text-base"
              >
                Start Project 🚀
              </a>
              <a
                href="/services"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition text-sm sm:text-base"
              >
                Our Services
              </a>
            </div>
          </motion.div>

          {/* AI Dashboard */}
          <motion.div
            initial={{ opacity:0, x:50 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.7 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex justify-between mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold">
                AI Agent Dashboard
              </h2>
              <div className="text-green-400 flex items-center gap-2 text-sm sm:text-base">
                <span className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-green-400 animate-pulse"/>
                Live
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="bg-black/40 rounded-2xl p-4 sm:p-5 border border-white/10">
                <p className="text-gray-400 text-sm sm:text-base">Customer Support AI</p>
                <h3 className="text-2xl sm:text-3xl font-bold mt-2">24/7 Active</h3>
              </div>
              <div className="bg-black/40 rounded-2xl p-4 sm:p-5 border border-white/10">
                <p className="text-gray-400 text-sm sm:text-base">Automated Tasks</p>
                <h3 className="text-2xl sm:text-3xl font-bold mt-2">150+ Done</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{opacity:0,y:40}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.7}}
            viewport={{once:true}}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Our Premium Services
            </h2>
            <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base">
              Powerful digital solutions designed to grow your business
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-14">
            {[
              {
                icon:"🤖",
                title:"AI Automation",
                desc:"Build intelligent AI agents, chatbots and automated workflows.",
                features:["AI Agents","n8n Automation","Business Workflows"]
              },
              {
                icon:"💻",
                title:"Web Development",
                desc:"Modern fast websites and custom web applications.",
                features:["Next.js Websites","Shopify Stores","Custom Apps"]
              },
              {
                icon:"📈",
                title:"Digital Marketing",
                desc:"Grow your brand with smart marketing strategies.",
                features:["Meta Ads","SEO","Social Growth"]
              },
              {
                icon:"🎬",
                title:"Video Editing",
                desc:"Professional videos that increase engagement.",
                features:["Reels Editing","YouTube Videos","Brand Ads"]
              },
              {
                icon:"🎨",
                title:"Graphic Design",
                desc:"Creative designs that make your brand stand out.",
                features:["Thumbnails","Posters","Brand Designs"]
              }
            ].map((service,index)=>(
              <motion.div
                key={index}
                initial={{ opacity:0, y:50 }}
                whileInView={{ opacity:1, y:0 }}
                transition={{ duration:0.5, delay:index*0.1 }}
                viewport={{ once:true }}
                whileHover={{ y:-10 }}
                className="group p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition duration-500"
              >
                <div className="text-4xl sm:text-5xl group-hover:scale-110 transition">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-6">{service.title}</h3>
                <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base">{service.desc}</p>
                <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                  {service.features.map((item,i)=>(
                    <li key={i}>✓ {item}</li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="inline-block mt-6 sm:mt-8 text-blue-400 hover:text-blue-300 transition text-sm sm:text-base"
                >
                  Start Similar Project →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Automation Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Automate Your Business With
              <span className="text-blue-500"> AI Agents</span>
            </h2>
            <p className="text-gray-400 mt-4 sm:mt-6 text-base sm:text-lg">
              From customer support to workflow automation,
              we build intelligent systems that work 24/7.
            </p>
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-sm sm:text-base">
                🤖 AI Customer Support Agent
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-sm sm:text-base">
                ⚡ Business Workflow Automation
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-sm sm:text-base">
                📊 Smart Data Processing
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 p-6 sm:p-10">
            <div className="rounded-2xl bg-black/50 p-6 sm:p-8">
              <p className="text-gray-400 text-sm sm:text-base">AI System Status</p>
              <h3 className="text-4xl sm:text-5xl font-bold mt-4">99.9%</h3>
              <p className="text-green-400 mt-3 text-sm sm:text-base">● System Running</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            Recent Projects
          </h2>
          <p className="text-gray-400 text-center mt-3 sm:mt-4 text-sm sm:text-base">
            Real digital solutions built for modern businesses
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-14">
            {[
              {
                title:"AI Automation System",
                category:"🤖 AI Solutions",
                image:"/projects/ai-automation.jpg.png",
                desc:"Smart AI agents and automated workflows that save time and improve business efficiency."
              },
              {
                title:"Web Development Platform",
                category:"💻 Web Development",
                image:"/projects/web-development.jpg.png",
                desc:"Modern responsive websites built with powerful technologies and premium UI."
              },
              {
                title:"Digital Marketing Campaign",
                category:"📈 Marketing",
                image:"/projects/digital-marketing.jpg.png",
                desc:"Data-driven marketing strategies to increase brand growth and online presence."
              },
              {
                title:"Video Editing Portfolio",
                category:"🎬 Video Production",
                image:"/projects/video-editing.jpg.png",
                desc:"Creative video editing solutions for social media and business promotion."
              },
              {
                title:"Brand Design & Posters",
                category:"🎨 Creative Design",
                image:"/projects/graphic-design.jpg.png",
                desc:"Professional graphics, thumbnails and branding designs that stand out."
              }
            ].map((project,index)=>(
              <motion.div
                key={index}
                initial={{ opacity:0, y:50 }}
                whileInView={{ opacity:1, y:0 }}
                transition={{ duration:0.5 }}
                viewport={{ once:true }}
                className="rounded-3xl overflow-hidden border border-white/10 bg-black/40 hover:-translate-y-3 transition duration-500"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="p-5 sm:p-6">
                  <span className="text-blue-400 text-xs sm:text-sm">{project.category}</span>
                  <h3 className="text-lg sm:text-xl font-bold mt-2 sm:mt-3">{project.title}</h3>
                  <p className="text-gray-400 mt-2 sm:mt-3 text-sm">{project.desc}</p>
                  <a
                    href="/contact"
                    className="inline-block mt-4 sm:mt-6 text-blue-400 hover:text-blue-300 transition text-sm sm:text-base"
                  >
                    Start Similar Project →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Why Choose <span className="text-gray-400">Optiwebx?</span>
            </h2>
            <p className="text-gray-400 mt-3 sm:mt-5 text-sm sm:text-base">
              Modern technology, creative solutions and AI-powered growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-14">
            {[
              ["🤖","AI Powered Solutions"],
              ["🎨","Premium Design"],
              ["⚡","Fast Delivery"],
              ["📈","Business Growth"],
              ["🚀","Latest Technology"],
              ["💬","Client Support"]
            ].map((item,index)=>(
              <motion.div
                initial={{ opacity:0, y:40 }}
                whileInView={{ opacity:1, y:0 }}
                transition={{ duration:0.5, delay:index*0.1 }}
                viewport={{ once:true }}
                key={index}
                className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:-translate-y-3 transition"
              >
                <div className="text-4xl sm:text-5xl">{item[0]}</div>
                <h3 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-5">{item[1]}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Choose Your <span className="text-gray-400">Growth Plan</span>
            </h2>
            <p className="text-gray-400 mt-3 sm:mt-5 text-sm sm:text-base">
              Flexible solutions designed for every business size.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-14">
            {[
              {
                title:"Starter",
                price:"₨15,000+",
                desc:"Perfect for small businesses.",
                features:[
                  "Responsive Website",
                  "3-5 Pages Website",
                  "Mobile Friendly Design",
                  "Basic SEO Setup"
                ]
              },
              {
                title:"Business",
                price:"₨40,000+",
                desc:"Best for growing businesses.",
                popular:true,
                features:[
                  "AI Chatbot Integration",
                  "n8n Automation",
                  "API Integrations",
                  "Shopify Setup",
                  "Marketing Support"
                ]
              },
              {
                title:"Premium",
                price:"Custom",
                desc:"Complete digital growth solution.",
                features:[
                  "Custom Website",
                  "AI Automation System",
                  "Digital Marketing",
                  "Brand Design",
                  "Monthly Support"
                ]
              }
            ].map((plan,index)=>(
              <motion.div
                initial={{ opacity:0, y:40 }}
                whileInView={{ opacity:1, y:0 }}
                transition={{ duration:0.5 }}
                viewport={{ once:true }}
                key={index}
                className={`relative p-6 sm:p-8 rounded-3xl bg-white/5 border hover:-translate-y-3 transition
                  ${plan.popular ? "border-blue-500 shadow-xl shadow-blue-500/20" : "border-white/10"}
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-xs sm:text-sm whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl sm:text-3xl font-bold">{plan.title}</h3>
                <p className="text-gray-400 mt-2 sm:mt-3 text-sm">{plan.desc}</p>
                <h4 className="text-3xl sm:text-4xl font-bold mt-4 sm:mt-6">{plan.price}</h4>
                <ul className="mt-6 sm:mt-8 space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                  {plan.features.map((feature,i)=>(
                    <li key={i}>✓ {feature}</li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="block text-center mt-6 sm:mt-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition text-sm sm:text-base"
                >
                  {plan.title==="Premium" ? "Contact Us 🚀" : "Get Started 🚀"}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-10">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Let's Build Something
              <span className="text-blue-500"> Amazing</span>
            </h2>
            <p className="text-gray-400 mt-4 sm:mt-6 text-base sm:text-lg">
              Have a project idea? Contact Optiwebx and let's create AI-powered digital solutions for your business.
            </p>
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              <a
                href="https://wa.me/923374866459"
                target="_blank"
                className="block p-4 sm:p-5 rounded-2xl bg-green-500/10 border border-green-500/30 hover:scale-105 transition"
              >
                💬 Chat on WhatsApp
                <p className="text-gray-400 text-xs sm:text-sm mt-2">0337 4866459</p>
              </a>
              <a
                href="mailto:hassnainabdulbari@gmail.com"
                className="block p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:scale-105 transition"
              >
                📧 Email Us
                <p className="text-gray-400 text-xs sm:text-sm mt-2">hassnainabdulbari@gmail.com</p>
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send Message</h3>
            <div className="space-y-4 sm:space-y-5">
              <input
                placeholder="Your Name"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-white/10 text-sm sm:text-base"
              />
              <input
                placeholder="Your Email"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-white/10 text-sm sm:text-base"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-white/10 text-sm sm:text-base"
              />
              <a
                href="https://wa.me/923374866459"
                target="_blank"
                className="block text-center py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-sm sm:text-base"
              >
                Send Inquiry 🚀
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 sm:py-8 text-center text-gray-400">
        <h3 className="text-xl font-bold text-white">Optiwebx</h3>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base">
          AI Automation • Web Development • Digital Marketing • Design
        </p>
        <p className="mt-4 sm:mt-5 text-xs sm:text-sm">
          © 2026 Optiwebx. All rights reserved.
        </p>
      </footer>

    </main>
  );
}
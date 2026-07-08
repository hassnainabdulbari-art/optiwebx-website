"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "AI Automation System",
    category: "AI Solutions",
    image: "/projects/ai-automation.jpg.png",
    description:
      "Intelligent AI agents and automated workflows that help businesses reduce manual work and improve productivity.",
    technologies: [
      "OpenAI",
      "n8n",
      "API Integration",
      "Automation",
    ],
  },

  {
    title: "Modern Business Website",
    category: "Web Development",
    image: "/projects/web-development.jpg.png",
    description:
      "High performance websites built with modern technologies and premium user experience.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },

  {
    title: "Shopify E-Commerce Store",
    category: "E-Commerce",
    image: "/projects/shopify-store.jpg.png",
    description:
      "Conversion-focused Shopify stores designed for online brands and businesses.",
    technologies: [
      "Shopify",
      "Liquid",
      "Payment Integration",
      "SEO",
    ],
  },

  {
    title: "Digital Marketing Campaign",
    category: "Marketing",
    image: "/projects/marketing.jpg.png",
    description:
      "Data-driven marketing campaigns focused on brand growth and customer acquisition.",
    technologies: [
      "Meta Ads",
      "SEO",
      "Analytics",
      "Content Strategy",
    ],
  },

  {
    title: "AI Customer Support Agent",
    category: "AI Agents",
    image: "/projects/ai-agent.jpg.png",
    description:
      "24/7 AI customer support system that automatically handles customer queries.",
    technologies: [
      "LLM",
      "Chatbot",
      "Automation",
      "CRM Integration",
    ],
  },

  {
    title: "Brand Identity Design",
    category: "Creative Design",
    image: "/projects/design.jpg.png",
    description:
      "Premium visual identity and creative designs that make brands stand out.",
    technologies: [
      "Figma",
      "Canva",
      "Brand Strategy",
      "Graphics",
    ],
  },
];


export default function ProjectsPage() {

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">


      {/* Background Glow */}

      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/30 blur-[140px] rounded-full" />

      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/30 blur-[140px] rounded-full" />



      {/* Navbar */}

      <nav className="fixed top-0 w-full z-50 px-6 py-5">

        <div className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-4">


          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold">

              O

            </div>


            <h1 className="text-2xl font-bold">

              Opti<span className="text-blue-500">webx</span>

            </h1>


          </div>



          <div className="hidden md:flex gap-8 text-gray-300">

            <a href="/" className="hover:text-white transition">
              Home
            </a>

            <a href="/services" className="hover:text-white transition">
              Services
            </a>

            <a href="/projects" className="text-white">
              Projects
            </a>

            <a href="/#pricing" className="hover:text-white transition">
              Pricing
            </a>

            <a href="/#contact" className="hover:text-white transition">
              Contact
            </a>

          </div>



          <a
            href="/#contact"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition"
          >
            Get Started
          </a>


        </div>

      </nav>
            {/* Hero Section */}

      <section className="min-h-[75vh] flex items-center pt-32 px-6 relative">

        <div className="max-w-7xl mx-auto w-full text-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8">

              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              Our Portfolio

            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">

              Projects That

              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">

                Deliver Results

              </span>

            </h1>

            <p className="max-w-3xl mx-auto mt-8 text-gray-400 text-lg">

              Explore our latest AI automation systems, modern websites,
              Shopify stores, digital marketing campaigns and creative
              design projects built for business growth.

            </p>

          </motion.div>

        </div>

      </section>



      {/* Projects Grid */}

      <section className="py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {projects.map((project, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-blue-500/40 transition"
              >

                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-60 object-cover"
                />

                <div className="p-7">

                  <span className="text-blue-400 text-sm">

                    {project.category}

                  </span>

                  <h3 className="text-2xl font-bold mt-3">

                    {project.title}

                  </h3>

                  <p className="text-gray-400 mt-4 leading-relaxed">

                    {project.description}

                  </p>

                  <div className="flex flex-wrap gap-2 mt-6">

                    {project.technologies.map((tech, i) => (

                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/10 text-sm text-gray-300"
                      >
                        {tech}
                      </span>

                    ))}

                  </div>

                  <a
                    href="/contact"
                    className="inline-block mt-8 text-blue-400 hover:text-blue-300 transition"
                  >
                    Start Similar Project →
                  </a>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>
            {/* Technology Stack */}

      <section className="py-24 px-6 bg-white/5">

        <div className="max-w-7xl mx-auto">


          <motion.div
            initial={{opacity:0,y:40}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            transition={{duration:0.7}}
            className="text-center"
          >

            <h2 className="text-4xl md:text-5xl font-bold">

              Technologies We

              <span className="text-blue-500">
                {" "}Use
              </span>

            </h2>


            <p className="text-gray-400 mt-5">

              Powerful modern technologies to build scalable digital solutions.

            </p>


          </motion.div>



          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">


            {[
              "Next.js",
              "React",
              "Tailwind CSS",
              "Framer Motion",
              "OpenAI",
              "n8n Automation",
              "Shopify",
              "WordPress",
            ].map((tech,index)=>(


              <motion.div

                key={index}

                whileHover={{
                  y:-8,
                  scale:1.05
                }}

                className="p-6 rounded-2xl bg-black/40 border border-white/10 text-center text-lg font-semibold"

              >

                {tech}

              </motion.div>


            ))}


          </div>


        </div>


      </section>





      {/* Case Study Section */}


      <section className="py-24 px-6">


        <div className="max-w-6xl mx-auto">


          <motion.div

          initial={{opacity:0,y:40}}

          whileInView={{opacity:1,y:0}}

          viewport={{once:true}}

          className="rounded-3xl p-12 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/10 text-center"

          >


            <h2 className="text-4xl md:text-5xl font-bold">


              Have A Project Idea?


              <span className="text-blue-400">

                Let's Build It

              </span>


            </h2>



            <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">


              From AI automation to websites and digital growth systems,
              we help businesses turn ideas into powerful solutions.


            </p>




            <a

            href="/contact"

            className="inline-block mt-10 px-10 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:scale-105 transition"

            >

              Start Your Project 🚀

            </a>



          </motion.div>


        </div>


      </section>







      {/* Footer */}


      <footer className="border-t border-white/10 py-10 text-center">


        <h3 className="text-2xl font-bold">

          Opti<span className="text-blue-500">
            webx
          </span>

        </h3>



        <p className="text-gray-400 mt-3">

          AI Automation • Web Development • Digital Growth

        </p>



        <div className="flex justify-center gap-6 mt-6 text-gray-400">


          <a href="/" className="hover:text-white transition">
            Home
          </a>


          <a href="/services" className="hover:text-white transition">
            Services
          </a>


          <a href="/contact" className="hover:text-white transition">
            Contact
          </a>


        </div>



        <p className="text-gray-500 text-sm mt-6">

          © 2026 Optiwebx. All rights reserved.

        </p>


      </footer>



    </main>

  );

}
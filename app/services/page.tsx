"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const services = [
  {
    icon: "🤖",
    title: "AI Automation",
    description:
      "Build intelligent AI systems that automate your business operations and improve productivity.",
    features: [
      "AI Agents",
      "n8n Workflow Automation",
      "AI Chatbots",
      "Business Process Automation",
      "API Integrations",
    ],
  },

  {
    icon: "💻",
    title: "Web Development",
    description:
      "Modern, fast and scalable websites built with the latest technologies.",
    features: [
      "Next.js Websites",
      "Custom Web Applications",
      "Landing Pages",
      "SaaS Platforms",
      "Responsive Design",
    ],
  },

  {
    icon: "🛒",
    title: "Shopify Development",
    description:
      "Create high-converting Shopify stores designed for online business growth.",
    features: [
      "Shopify Store Setup",
      "Custom Theme Design",
      "Product Optimization",
      "Payment Integration",
      "Store Performance",
    ],
  },

  {
    icon: "🌐",
    title: "WordPress Development",
    description:
      "Professional WordPress websites for businesses and brands.",
    features: [
      "Business Websites",
      "WooCommerce Stores",
      "Elementor Design",
      "Custom Plugins",
      "Website Maintenance",
    ],
  },

  {
    icon: "📈",
    title: "Digital Marketing",
    description:
      "Grow your online presence with data-driven marketing strategies.",
    features: [
      "Meta Ads",
      "SEO Optimization",
      "Social Media Growth",
      "Marketing Strategy",
      "Analytics Tracking",
    ],
  },

  {
    icon: "🎨",
    title: "Creative Design",
    description:
      "Creative visuals that help your brand stand out from competitors.",
    features: [
      "Graphic Design",
      "YouTube Thumbnails",
      "Brand Identity",
      "Social Media Posts",
      "Video Editing",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* ✅ Navbar Added */}
      <Navbar />

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/30 blur-[140px] rounded-full" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/30 blur-[140px] rounded-full" />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center px-6 pt-32">
        <div className="max-w-7xl mx-auto w-full text-center">
          <motion.div
            initial={{
              opacity:0,
              y:40
            }}
            animate={{
              opacity:1,
              y:0
            }}
            transition={{
              duration:0.8
            }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
              AI Powered Digital Solutions
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Transform Your Business With
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Next Generation Services
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mt-8 text-gray-400 text-lg">
              We build AI automation systems, modern websites,
              marketing solutions and creative digital experiences
              that help businesses grow.
            </p>

            <div className="mt-10 flex justify-center gap-5 flex-wrap">
              <a
                href="#services"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:scale-105 transition"
              >
                Explore Services 🚀
              </a>
              <a
                href="/contact"
                className="px-8 py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition"
              >
                Start Project
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section
        id="services"
        className="py-24 px-6 relative"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{
              opacity:0,
              y:40
            }}
            whileInView={{
              opacity:1,
              y:0
            }}
            viewport={{
              once:true
            }}
            transition={{
              duration:0.7
            }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Our Premium <span className="text-blue-500">
              Services
              </span>
            </h2>
            <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
              Powerful digital solutions designed to automate,
              build and grow modern businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
            {services.map((service,index)=>(
              <motion.div
                key={index}
                initial={{
                  opacity:0,
                  y:50
                }}
                whileInView={{
                  opacity:1,
                  y:0
                }}
                viewport={{
                  once:true
                }}
                transition={{
                  duration:0.5,
                  delay:index * 0.1
                }}
                whileHover={{
                  y:-10,
                  scale:1.03
                }}
                className="group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-blue-500/50 transition duration-500"
              >
                <div className="text-6xl group-hover:scale-110 transition duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mt-6">
                  {service.title}
                </h3>
                <p className="text-gray-400 mt-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-3 text-gray-300">
                  {service.features.map((feature,i)=>(
                    <li
                      key={i}
                      className="flex items-center gap-3"
                    >
                      <span className="text-blue-400">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="inline-block mt-8 text-blue-400 hover:text-blue-300 transition"
                >
                  Learn More →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Automation Highlight Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{
              opacity:0,
              x:-50
            }}
            whileInView={{
              opacity:1,
              x:0
            }}
            viewport={{
              once:true
            }}
            transition={{
              duration:0.7
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Build Smarter Business With
              <span className="text-blue-500">
                AI Automation
              </span>
            </h2>
            <p className="text-gray-400 mt-6 text-lg">
              Our AI solutions help businesses reduce manual work,
              improve customer experience and operate 24/7.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "AI Customer Support Agents",
                "Automated Business Workflows",
                "Smart Data Processing",
                "Custom AI Solutions"
              ].map((item,index)=>(
                <motion.div
                  key={index}
                  whileHover={{
                    x:10
                  }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10"
                >
                  🤖 {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity:0,
              x:50
            }}
            whileInView={{
              opacity:1,
              x:0
            }}
            viewport={{
              once:true
            }}
            transition={{
              duration:0.7
            }}
            className="rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 p-10"
          >
            <div className="rounded-2xl bg-black/50 border border-white/10 p-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  AI System Dashboard
                </h3>
                <span className="flex items-center gap-2 text-green-400 text-sm">
                  <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"/>
                  Online
                </span>
              </div>

              <div className="mt-8 space-y-5">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 text-sm">
                    Automated Tasks
                  </p>
                  <h4 className="text-4xl font-bold mt-2">
                    500+
                  </h4>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 text-sm">
                    Customer Support
                  </p>
                  <h4 className="text-4xl font-bold mt-2">
                    24/7
                  </h4>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 text-sm">
                    Business Efficiency
                  </p>
                  <h4 className="text-4xl font-bold mt-2 text-blue-400">
                    +90%
                  </h4>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{
              opacity:0,
              y:40
            }}
            whileInView={{
              opacity:1,
              y:0
            }}
            viewport={{
              once:true
            }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Why Choose
              <span className="text-blue-500">
                Optiwebx?
              </span>
            </h2>
            <p className="text-gray-400 mt-5">
              Technology, creativity and AI-powered solutions
              built for business growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              ["🤖","AI First Approach"],
              ["⚡","Fast & Reliable Delivery"],
              ["🎨","Premium Design"],
              ["🚀","Latest Technology"],
              ["📈","Growth Focused"],
              ["💬","Dedicated Support"]
            ].map((item,index)=>(
              <motion.div
                key={index}
                initial={{
                  opacity:0,
                  y:40
                }}
                whileInView={{
                  opacity:1,
                  y:0
                }}
                viewport={{
                  once:true
                }}
                transition={{
                  delay:index*0.1
                }}
                whileHover={{
                  y:-8
                }}
                className="p-8 rounded-3xl bg-black/40 border border-white/10 text-center"
              >
                <div className="text-5xl">
                  {item[0]}
                </div>
                <h3 className="text-xl font-bold mt-5">
                  {item[1]}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Our Working
            <span className="text-blue-500">
              Process
            </span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-14">
            {[
              ["01","Discovery","Understand your business goals"],
              ["02","Planning","Create the right strategy"],
              ["03","Development","Build powerful solutions"],
              ["04","Launch","Grow and optimize"]
            ].map((step,index)=>(
              <motion.div
                key={index}
                whileHover={{
                  scale:1.05
                }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10"
              >
                <span className="text-blue-400 text-xl font-bold">
                  {step[0]}
                </span>
                <h3 className="text-2xl font-bold mt-4">
                  {step[1]}
                </h3>
                <p className="text-gray-400 mt-3">
                  {step[2]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{
              opacity:0,
              y:40
            }}
            whileInView={{
              opacity:1,
              y:0
            }}
            viewport={{
              once:true
            }}
            className="rounded-3xl p-12 text-center bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/10"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready To Build Your
              <span className="text-blue-400">
                Digital Future?
              </span>
            </h2>
            <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
              Let's create powerful websites, AI automation
              systems and digital solutions that grow your business.
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
        <h3 className="text-2xl font-bold text-white">
          Optiwebx
        </h3>
        <p className="text-gray-400 mt-3">
          AI Automation • Web Development • Digital Growth
        </p>
        <div className="flex justify-center gap-6 mt-6 text-gray-400">
          <a
            href="#"
            className="hover:text-white transition"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-white transition"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-white transition"
          >
            Support
          </a>
        </div>
        <p className="text-gray-500 text-sm mt-6">
          © 2026 Optiwebx. All rights reserved.
        </p>
      </footer>

    </main>
  );
}
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const pricingPlans = [
    {
      title: "Starter",
      price: "₨15,000+",
      description: "Perfect for small businesses starting their digital journey.",
      features: [
        "Responsive Website",
        "3-5 Pages",
        "Mobile Friendly Design",
        "Basic SEO Setup",
        "Contact Form Integration",
      ],
      popular: false,
      buttonText: "Get Started",
    },
    {
      title: "Business",
      price: "₨40,000+",
      description: "Best for growing businesses needing advanced solutions.",
      features: [
        "Custom Website",
        "AI Chatbot Integration",
        "n8n Automation",
        "API Integrations",
        "Shopify Setup",
        "Marketing Support",
      ],
      popular: true,
      buttonText: "Get Started",
    },
    {
      title: "Premium",
      price: "Custom",
      description: "Complete digital growth solution for established businesses.",
      features: [
        "Complete AI Automation System",
        "Custom Web Applications",
        "Advanced Marketing",
        "Brand Design",
        "Monthly Support",
      ],
      popular: false,
      buttonText: "Contact Us",
    },
  ];

  const features = [
    { feature: "Website Development", starter: true, business: true, premium: true },
    { feature: "AI Automation", starter: false, business: true, premium: true },
    { feature: "Digital Marketing", starter: false, business: true, premium: true },
    { feature: "Dedicated Support", starter: false, business: true, premium: true },
    { feature: "Custom Solutions", starter: false, business: false, premium: true },
  ];

  const faqs = [
    {
      question: "How long does a project take?",
      answer:
        "Project timelines vary based on complexity. A standard website takes 2-4 weeks, while AI automation projects take 4-8 weeks. We provide detailed timelines during consultation.",
    },
    {
      question: "Do you provide custom solutions?",
      answer:
        "Yes! We specialize in custom solutions tailored to your specific business needs. From custom web applications to unique AI automation workflows, we build exactly what you need.",
    },
    {
      question: "Can you integrate AI into existing businesses?",
      answer:
        "Absolutely! We can integrate AI chatbots, automation workflows, and data processing systems into your existing business infrastructure without disrupting your current operations.",
    },
    {
      question: "Do you provide monthly support?",
      answer:
        "Yes, we offer monthly support and maintenance packages to ensure your systems run smoothly. Our team is available for updates, troubleshooting, and optimization.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      {/* Background Glow Effects */}
      <div className="fixed top-20 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-blue-600/20 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/20 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-500/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6 sm:mb-8 text-xs sm:text-sm">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-400 animate-pulse" />
              Transparent Pricing
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              Choose The Right Plan For Your
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Digital Growth
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mt-4 sm:mt-8 text-gray-400 text-base sm:text-lg">
              Flexible solutions designed for businesses that want to grow with
              AI automation, modern websites and digital solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative p-6 sm:p-8 rounded-3xl border ${
                  plan.popular
                    ? "border-blue-500/50 bg-gradient-to-b from-blue-500/10 to-purple-500/10 shadow-2xl shadow-blue-500/20"
                    : "border-white/10 bg-white/5"
                } backdrop-blur-xl hover:border-blue-500/30 transition duration-500`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-[10px] sm:text-sm font-semibold shadow-lg shadow-blue-500/30 whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl sm:text-2xl font-bold">{plan.title}</h3>
                <p className="text-gray-400 mt-2 sm:mt-3 text-xs sm:text-sm">{plan.description}</p>

                <div className="mt-4 sm:mt-6">
                  <span className="text-3xl sm:text-5xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-gray-400 ml-1 sm:ml-2 text-sm sm:text-base">/ project</span>
                  )}
                </div>

                <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-center gap-2 sm:gap-3 text-gray-300 text-sm sm:text-base"
                    >
                      <span className="text-blue-400">✓</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  href={plan.price === "Custom" ? "/contact" : "#contact"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`block text-center mt-6 sm:mt-8 py-3 sm:py-4 rounded-xl font-semibold transition text-sm sm:text-base ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30"
                      : "border border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {plan.buttonText} 🚀
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Feature <span className="text-blue-500">Comparison</span>
            </h2>
            <p className="text-gray-400 mt-3 sm:mt-5 text-sm sm:text-base">
              See what's included in each plan
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 sm:mt-14 overflow-x-auto"
          >
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-gray-400 font-medium text-xs sm:text-sm">
                    Feature
                  </th>
                  <th className="text-center py-3 sm:py-4 px-3 sm:px-6 text-gray-400 font-medium text-xs sm:text-sm">
                    Starter
                  </th>
                  <th className="text-center py-3 sm:py-4 px-3 sm:px-6 text-gray-400 font-medium text-xs sm:text-sm">
                    Business
                  </th>
                  <th className="text-center py-3 sm:py-4 px-3 sm:px-6 text-gray-400 font-medium text-xs sm:text-sm">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-300 text-xs sm:text-sm">{item.feature}</td>
                    <td className="text-center py-3 sm:py-4 px-3 sm:px-6">
                      {item.starter ? (
                        <span className="text-green-400 text-lg sm:text-xl">✓</span>
                      ) : (
                        <span className="text-gray-600 text-lg sm:text-xl">✗</span>
                      )}
                    </td>
                    <td className="text-center py-3 sm:py-4 px-3 sm:px-6">
                      {item.business ? (
                        <span className="text-green-400 text-lg sm:text-xl">✓</span>
                      ) : (
                        <span className="text-gray-600 text-lg sm:text-xl">✗</span>
                      )}
                    </td>
                    <td className="text-center py-3 sm:py-4 px-3 sm:px-6">
                      {item.premium ? (
                        <span className="text-green-400 text-lg sm:text-xl">✓</span>
                      ) : (
                        <span className="text-gray-600 text-lg sm:text-xl">✗</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Frequently Asked <span className="text-blue-500">Questions</span>
            </h2>
            <p className="text-gray-400 mt-3 sm:mt-5 text-sm sm:text-base">
              Everything you need to know about our services
            </p>
          </motion.div>

          <div className="mt-10 sm:mt-14 space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-white/5 transition"
                >
                  <span className="text-sm sm:text-lg font-semibold">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl sm:text-2xl text-blue-400 ml-4"
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-400 leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl p-6 sm:p-12 text-center bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/10 backdrop-blur-xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Ready To Build Your
              <span className="text-blue-400"> Digital Future?</span>
            </h2>
            <p className="text-gray-400 mt-4 sm:mt-6 text-base sm:text-lg max-w-2xl mx-auto">
              Let's create powerful websites, AI automation systems and digital
              solutions that grow your business.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-6 sm:mt-10 px-8 sm:px-10 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition text-sm sm:text-base"
            >
              Start Your Project 🚀
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 sm:py-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white">Optiwebx</h3>
          <p className="text-gray-400 mt-2 sm:mt-3 text-sm sm:text-base">
            AI Automation • Web Development • Digital Growth
          </p>
          <div className="flex justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 text-gray-400 text-sm sm:text-base">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Support</a>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm mt-4 sm:mt-6">
            © 2026 Optiwebx. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </main>
  );
}
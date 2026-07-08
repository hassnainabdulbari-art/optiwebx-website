"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from("contacts")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company || null,
            service: formData.service,
            message: formData.message,
          },
        ]);

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email notification");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
      
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: "💬",
      title: "WhatsApp",
      detail: "0337 4866459",
      link: "https://wa.me/923374866459",
      color: "green",
    },
    {
      icon: "📧",
      title: "Email",
      detail: "hassnainabdulbari@gmail.com",
      link: "mailto:hassnainabdulbari@gmail.com",
      color: "blue",
    },
    {
      icon: "📍",
      title: "Location",
      detail: "Pakistan",
      link: "#",
      color: "purple",
    },
    {
      icon: "🕐",
      title: "Working Hours",
      detail: "Mon-Fri: 9AM - 6PM",
      link: "#",
      color: "pink",
    },
  ];

  const services = [
    "Select a Service",
    "AI Automation",
    "Web Development",
    "Shopify Development",
    "WordPress Development",
    "Digital Marketing",
    "Creative Design",
    "Other",
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Background Glows */}
      <div className="fixed top-20 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-blue-600/20 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/20 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />

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
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/services" className="hover:text-white transition">Services</a>
            <a href="/projects" className="hover:text-white transition">Projects</a>
            <a href="/pricing" className="hover:text-white transition">Pricing</a>
            <a href="/contact" className="text-white transition">Contact</a>
          </div>

          <a
            href="/contact"
            className="hidden md:block px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition shadow-lg text-sm sm:text-base"
          >
            Get Started
          </a>

          <button
            onClick={() => {
              const menu = document.getElementById('mobile-menu-contact');
              menu?.classList.toggle('hidden');
            }}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
          </button>

          <div id="mobile-menu-contact" className="hidden md:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden">
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
      <section className="relative pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6 sm:mb-8 text-xs sm:text-sm">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-400 animate-pulse" />
              Get In Touch
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              Let's Build Something
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Amazing
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mt-4 sm:mt-8 text-gray-400 text-base sm:text-lg">
              Have a project idea? Contact Optiwebx and let's create AI-powered
              digital solutions for your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
            
            {/* Contact Information Cards - Left Side */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target={info.link.startsWith("http") ? "_blank" : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="block p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-blue-500/50 transition duration-300 group"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-3xl sm:text-4xl group-hover:scale-110 transition">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm text-gray-400">{info.title}</h3>
                      <p className="text-base sm:text-lg font-semibold">{info.detail}</p>
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* WhatsApp CTA Button */}
              <motion.a
                href="https://wa.me/923374866459"
                target="_blank"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="block p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 backdrop-blur-xl text-center group"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl">💬</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">Chat on WhatsApp</h3>
                    <p className="text-xs sm:text-sm text-gray-400">Quick response within 24 hours</p>
                  </div>
                </div>
              </motion.a>
            </div>

            {/* Contact Form - Right Side */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8"
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                  Send Us a <span className="text-blue-500">Message</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-white/10 focus:border-blue-500/50 focus:outline-none transition text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-white/10 focus:border-blue-500/50 focus:outline-none transition text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company Name"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-white/10 focus:border-blue-500/50 focus:outline-none transition text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                      Service Required *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-white/10 focus:border-blue-500/50 focus:outline-none transition text-gray-300 text-sm sm:text-base"
                    >
                      {services.map((service, index) => (
                        <option key={index} value={service} className="bg-black">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us about your project..."
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-white/10 focus:border-blue-500/50 focus:outline-none transition resize-none text-sm sm:text-base"
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 sm:p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-center text-sm"
                    >
                      ❌ {error}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className={`w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold transition text-sm sm:text-base ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:shadow-blue-500/30"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 sm:h-5 w-4 sm:w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Inquiry 🚀"
                    )}
                  </motion.button>

                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 sm:p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-center text-sm"
                    >
                      ✅ Thank you! We'll get back to you soon.
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
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
              href="https://wa.me/923374866459"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-6 sm:mt-10 px-8 sm:px-10 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 font-semibold hover:shadow-lg hover:shadow-green-500/30 transition text-sm sm:text-base"
            >
              Chat on WhatsApp 💬
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
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Contact {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  service: string;
  message: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/login");
        return;
      }

      setUser(session.user);
      await fetchContacts();
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push("/login");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching contacts:", error);
        return;
      }

      setContacts(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/login");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-12 w-12 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Background Glows */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-blue-600/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-purple-600/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Admin Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 px-6 py-5 bg-black/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-2xl shadow-lg">
              O
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Admin <span className="text-blue-500">Dashboard</span>
              </h1>
              <p className="text-xs text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition text-gray-300 hover:text-white flex items-center gap-2 ${
              isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoggingOut ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Logging out...
              </>
            ) : (
              "Logout →"
            )}
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <section className="px-6 pt-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <p className="text-sm text-gray-400">Total Inquiries</p>
              <h3 className="text-4xl font-bold mt-2 text-blue-400">
                {contacts.length}
              </h3>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <p className="text-sm text-gray-400">AI Automation</p>
              <h3 className="text-4xl font-bold mt-2 text-purple-400">
                {contacts.filter(c => c.service === "AI Automation").length}
              </h3>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <p className="text-sm text-gray-400">Web Development</p>
              <h3 className="text-4xl font-bold mt-2 text-pink-400">
                {contacts.filter(c => c.service === "Web Development").length}
              </h3>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <p className="text-sm text-gray-400">Other Services</p>
              <h3 className="text-4xl font-bold mt-2 text-green-400">
                {contacts.filter(c => 
                  c.service !== "AI Automation" && 
                  c.service !== "Web Development"
                ).length}
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contacts Table */}
      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold">
                Recent <span className="text-blue-500">Inquiries</span>
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {contacts.length} contact{contacts.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {contacts.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-2xl font-bold text-gray-400">No Inquiries Yet</h3>
                <p className="text-gray-500 mt-2">
                  When customers contact you, their inquiries will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Name</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Email</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Company</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Service</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Message</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact, index) => (
                      <motion.tr
                        key={contact.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="py-4 px-6 font-medium">
                          {contact.name}
                        </td>
                        <td className="py-4 px-6 text-gray-300">
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-blue-400 hover:text-blue-300 transition"
                          >
                            {contact.email}
                          </a>
                        </td>
                        <td className="py-4 px-6 text-gray-300">
                          {contact.company || "—"}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            contact.service === "AI Automation"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : contact.service === "Web Development"
                              ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                              : contact.service === "Shopify Development"
                              ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                              : contact.service === "Digital Marketing"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                          }`}>
                            {contact.service}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-300 max-w-xs truncate">
                          {contact.message.length > 50
                            ? contact.message.substring(0, 50) + "..."
                            : contact.message}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-400 whitespace-nowrap">
                          {formatDate(contact.created_at)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        <p>© 2026 Optiwebx Admin Dashboard. All rights reserved.</p>
      </footer>

    </main>
  );
}
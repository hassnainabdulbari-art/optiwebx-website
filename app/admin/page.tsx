"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
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

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image_url: "",
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/login");
        return;
      }

      setUser(session.user);
      await Promise.all([fetchContacts(), fetchProjects()]);
      setLoading(false);
    };

    checkUser();

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

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeletingProjectId(projectId);
    try {
      // Get the project to delete its image
      const projectToDelete = projects.find(p => p.id === projectId);
      
      // Delete from database
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again.");
        return;
      }

      // Delete image from storage if exists
      if (projectToDelete?.image_url) {
        const imagePath = projectToDelete.image_url.split('/').pop();
        if (imagePath) {
          await supabase.storage
            .from("projects")
            .remove([imagePath]);
        }
      }

      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the project.");
    } finally {
      setDeletingProjectId(null);
    }
  };

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setIsEditing(true);
      setEditingProjectId(project.id);
      setFormData({
        title: project.title,
        category: project.category,
        description: project.description,
        image_url: project.image_url,
      });
      if (project.image_url) {
        setImagePreview(project.image_url);
      }
    } else {
      setIsEditing(false);
      setEditingProjectId(null);
      setFormData({
        title: "",
        category: "",
        description: "",
        image_url: "",
      });
      setImagePreview(null);
      setImageFile(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from("projects")
      .upload(filePath, file);

    if (uploadError) {
      throw new Error("Failed to upload image");
    }

    const { data: { publicUrl } } = supabase.storage
      .from("projects")
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = formData.image_url;

      // Upload new image if selected
      if (imageFile) {
        // Delete old image if editing
        if (isEditing && formData.image_url) {
          const oldImagePath = formData.image_url.split('/').pop();
          if (oldImagePath) {
            await supabase.storage
              .from("projects")
              .remove([oldImagePath]);
          }
        }
        imageUrl = await uploadImage(imageFile);
      }

      if (isEditing && editingProjectId) {
        // Update existing project
        const { error } = await supabase
          .from("projects")
          .update({
            title: formData.title,
            category: formData.category,
            description: formData.description,
            image_url: imageUrl,
          })
          .eq("id", editingProjectId);

        if (error) throw error;

        setProjects(projects.map(p => 
          p.id === editingProjectId 
            ? { ...p, ...formData, image_url: imageUrl }
            : p
        ));
      } else {
        // Create new project
        const { data, error } = await supabase
          .from("projects")
          .insert([{
            title: formData.title,
            category: formData.category,
            description: formData.description,
            image_url: imageUrl,
          }])
          .select();

        if (error) throw error;

        if (data) {
          setProjects([data[0], ...projects]);
        }
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project. Please try again.");
    } finally {
      setIsSubmitting(false);
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
              <p className="text-sm text-gray-400">Total Projects</p>
              <h3 className="text-4xl font-bold mt-2 text-green-400">
                {projects.length}
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

      {/* Projects Management Section */}
      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">
                  Projects <span className="text-purple-500">Management</span>
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {projects.length} project{projects.length !== 1 ? "s" : ""} in portfolio
                </p>
              </div>
              <button
                onClick={() => handleOpenModal()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium text-white shadow-lg shadow-purple-500/25 flex items-center gap-2"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add New Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">📂</div>
                <h3 className="text-2xl font-bold text-gray-400">No Projects Yet</h3>
                <p className="text-gray-500 mt-2">
                  Click "Add New Project" to create your first project.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/20 transition-all duration-300"
                  >
                    {/* Project Image */}
                    {project.image_url ? (
                      <div className="relative h-48 overflow-hidden bg-gray-800">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=No+Image";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <span className="text-4xl">🚀</span>
                      </div>
                    )}

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg truncate">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              project.category === "AI Automation"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : project.category === "Web Development"
                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                : project.category === "Shopify Development"
                                ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                                : project.category === "Digital Marketing"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                            }`}>
                              {project.category}
                            </span>
                          </p>
                        </div>
                        
                        <div className="flex gap-2 flex-shrink-0">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleOpenModal(project)}
                            className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 transition text-blue-400 hover:text-blue-300"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            disabled={deletingProjectId === project.id}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 transition text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingProjectId === project.id ? (
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            ) : (
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 mt-3 line-clamp-3">
                        {project.description}
                      </p>

                      <p className="text-xs text-gray-500 mt-4">
                        {formatDate(project.created_at)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Add/Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-black/90 backdrop-blur-xl p-6 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition text-gray-400 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-6">
              {isEditing ? "Edit" : "Add New"} <span className="text-purple-500">Project</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition text-white placeholder-gray-500"
                  placeholder="Enter project title"
                />
              </div>

              {/* Category - FIXED */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition text-white appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 1rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="" className="bg-gray-900 text-white">Select category</option>
                  <option value="AI Automation" className="bg-gray-900 text-white">AI Automation</option>
                  <option value="Web Development" className="bg-gray-900 text-white">Web Development</option>
                  <option value="Shopify Development" className="bg-gray-900 text-white">Shopify Development</option>
                  <option value="Digital Marketing" className="bg-gray-900 text-white">Digital Marketing</option>
                  <option value="Other" className="bg-gray-900 text-white">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition text-white placeholder-gray-500 resize-none"
                  placeholder="Enter project description"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Image
                </label>
                <div className="flex flex-col gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white file:font-medium hover:file:shadow-lg hover:file:shadow-purple-500/25 transition-all"
                  />
                  
                  {imagePreview && (
                    <div className="relative rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setImageFile(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/80 hover:bg-red-500 transition text-white"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {isEditing ? "Leave empty to keep current image" : "Upload a project image (optional)"}
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium text-white shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    isEditing ? "Update Project" : "Create Project"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        <p>© 2026 Optiwebx Admin Dashboard. All rights reserved.</p>
      </footer>

    </main>
  );
}
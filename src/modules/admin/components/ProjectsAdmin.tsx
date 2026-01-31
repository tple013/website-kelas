"use client";

import { useState } from "react";
import { useProjectsSupabase } from "@/lib/hooks";
import type { DbProject } from "@/lib/types";

export function ProjectsAdmin() {
  const { projects, isLoading, error, addProject, updateProject, deleteProject } = useProjectsSupabase();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<DbProject | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    status: "ongoing",
    start_date: "",
    end_date: "",
    team_members: "",
    technologies: "",
    link: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      status: "ongoing",
      start_date: "",
      end_date: "",
      team_members: "",
      technologies: "",
      link: "",
    });
    setEditingProject(null);
    setIsFormOpen(false);
  };

  const handleEdit = (project: DbProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || "",
      image: project.image || "",
      status: project.status,
      start_date: project.start_date || "",
      end_date: project.end_date || "",
      team_members: project.team_members?.join(", ") || "",
      technologies: project.technologies?.join(", ") || "",
      link: project.link || "",
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = {
        title: formData.title,
        description: formData.description || null,
        image: formData.image || null,
        status: formData.status as "completed" | "in-progress" | "planned",
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
        team_members: formData.team_members ? formData.team_members.split(",").map(s => s.trim()) : null,
        technologies: formData.technologies ? formData.technologies.split(",").map(s => s.trim()) : null,
        link: formData.link || null,
      };

      if (editingProject) {
        await updateProject(editingProject.id, data);
      } else {
        await addProject(data);
      }
      resetForm();
    } catch (err) {
      alert("Gagal menyimpan: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Yakin ingin menghapus proyek "${title}"?`)) return;
    
    try {
      await deleteProject(id);
    } catch (err) {
      alert("Gagal menghapus: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  const statusOptions = [
    { value: "ongoing", label: "Sedang Berjalan", color: "bg-blue-100 text-blue-700" },
    { value: "completed", label: "Selesai", color: "bg-green-100 text-green-700" },
    { value: "planned", label: "Direncanakan", color: "bg-yellow-100 text-yellow-700" },
    { value: "cancelled", label: "Dibatalkan", color: "bg-red-100 text-red-700" },
  ];

  const getStatusStyle = (status: string) => {
    return statusOptions.find(s => s.value === status)?.color || "bg-slate-100 text-slate-600";
  };

  const getStatusLabel = (status: string) => {
    return statusOptions.find(s => s.value === status)?.label || status;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Memuat data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <i className="bi bi-exclamation-triangle mr-2"></i>
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Daftar Proyek</h2>
          <p className="text-sm text-slate-500">{projects.length} proyek terdaftar</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="bi bi-plus-lg mr-2"></i>
          Tambah Proyek
        </button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">
                {editingProject ? "Edit Proyek" : "Tambah Proyek Baru"}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Proyek *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nama proyek"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Deskripsi proyek"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL Gambar</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Selesai</label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tim (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={formData.team_members}
                  onChange={(e) => setFormData({ ...formData, team_members: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John, Jane, Bob"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Teknologi (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="React, Node.js, PostgreSQL"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Link Proyek</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Menyimpan..." : editingProject ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-slate-900">{project.title}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(project.status)}`}>
                {getStatusLabel(project.status)}
              </span>
            </div>
            {project.description && (
              <p className="text-sm text-slate-500 mb-3 line-clamp-2">{project.description}</p>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs text-slate-400">+{project.technologies.length - 3}</span>
                )}
              </div>
            )}
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => handleEdit(project)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                <i className="bi bi-pencil mr-1"></i>Edit
              </button>
              <button
                onClick={() => handleDelete(project.id, project.title)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                <i className="bi bi-trash mr-1"></i>Hapus
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500">
            Belum ada proyek. Klik &ldquo;Tambah Proyek&rdquo; untuk memulai.
          </div>
        )}
      </div>
    </div>
  );
}

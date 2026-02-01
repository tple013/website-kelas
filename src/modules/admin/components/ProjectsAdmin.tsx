"use client";

import { useState } from "react";
import { useProjectsSupabase } from "@/lib/hooks";
import { projectSchema, validateForm } from "@/lib/validations";
import { Button, Modal, Input, Textarea, Select } from "@/shared/components/ui";
import type { DbProject } from "@/lib/types";

interface FormData {
  title: string;
  description: string;
  image: string;
  status: string;
  start_date: string;
  end_date: string;
  team_members: string;
  technologies: string;
  link: string;
}

const initialFormData: FormData = {
  title: "",
  description: "",
  image: "",
  status: "ongoing",
  start_date: "",
  end_date: "",
  team_members: "",
  technologies: "",
  link: "",
};

export function ProjectsAdmin() {
  const { projects, isLoading, error, addProject, updateProject, deleteProject } = useProjectsSupabase();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<DbProject | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData(initialFormData);
    setFormErrors({});
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
    
    // Validate with Zod
    const validationData = {
      title: formData.title,
      description: formData.description || undefined,
      image: formData.image || undefined,
      status: formData.status,
      start_date: formData.start_date || undefined,
      end_date: formData.end_date || undefined,
      team_members: formData.team_members ? formData.team_members.split(",").map(s => s.trim()) : undefined,
      technologies: formData.technologies ? formData.technologies.split(",").map(s => s.trim()) : undefined,
      link: formData.link || undefined,
    };

    const validation = validateForm(projectSchema, validationData);
    if (!validation.success) {
      setFormErrors(validation.errors);
      return;
    }
    
    setFormErrors({});
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
      setFormErrors({ submit: err instanceof Error ? err.message : "Gagal menyimpan data" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Yakin ingin menghapus proyek "${title}"?`)) return;
    
    try {
      await deleteProject(id);
    } catch (err) {
      setFormErrors({ delete: err instanceof Error ? err.message : "Gagal menghapus" });
    }
  };

  const statusOptions = [
    { value: "ongoing", label: "Sedang Berjalan" },
    { value: "completed", label: "Selesai" },
    { value: "planned", label: "Direncanakan" },
    { value: "cancelled", label: "Dibatalkan" },
  ];

  const statusColors: Record<string, string> = {
    ongoing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    planned: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const getStatusStyle = (status: string) => statusColors[status] || "bg-slate-100 text-slate-600";
  const getStatusLabel = (status: string) => statusOptions.find(s => s.value === status)?.label || status;

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
        <Button onClick={() => setIsFormOpen(true)} icon={<i className="bi bi-plus-lg" />}>
          Tambah Proyek
        </Button>
      </div>

      {/* Error Alert */}
      {(formErrors.delete || formErrors.submit) && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
          <i className="bi bi-exclamation-triangle mr-2" />
          {formErrors.delete || formErrors.submit}
        </div>
      )}

      {/* Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={resetForm}
        title={editingProject ? "Edit Proyek" : "Tambah Proyek Baru"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Judul Proyek"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Nama proyek"
            error={formErrors.title}
          />

          <Textarea
            label="Deskripsi"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Deskripsi proyek"
            rows={3}
            error={formErrors.description}
          />

          <Input
            label="URL Gambar"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://..."
            error={formErrors.image}
          />

          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={statusOptions}
            error={formErrors.status}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Tanggal Mulai"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              error={formErrors.start_date}
            />
            <Input
              label="Tanggal Selesai"
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              error={formErrors.end_date}
            />
          </div>

          <Input
            label="Tim (pisahkan dengan koma)"
            value={formData.team_members}
            onChange={(e) => setFormData({ ...formData, team_members: e.target.value })}
            placeholder="John, Jane, Bob"
            error={formErrors.team_members}
          />

          <Input
            label="Teknologi (pisahkan dengan koma)"
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            placeholder="React, Node.js, PostgreSQL"
            error={formErrors.technologies}
          />

          <Input
            label="Link Proyek"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            placeholder="https://github.com/..."
            error={formErrors.link}
          />

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={resetForm} className="flex-1">
              Batal
            </Button>
            <Button type="submit" isLoading={isSubmitting} className="flex-1">
              {editingProject ? "Update" : "Simpan"}
            </Button>
          </div>
        </form>
      </Modal>

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

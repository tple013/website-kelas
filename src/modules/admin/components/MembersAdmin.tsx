"use client";

import { useState } from "react";
import Image from "next/image";
import { useMembersSupabase } from "@/lib/hooks";
import { storageService } from "@/lib/services";
import { memberSchema, validateFile, validateForm } from "@/lib/validations";
import { Button, Modal, Input, Textarea, Checkbox, FileInput } from "@/shared/components/ui";
import type { DbMember } from "@/lib/types";

export function MembersAdmin() {
  const { members, isLoading, error, addMember, updateMember, deleteMember } = useMembersSupabase();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<DbMember | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    description: "",
    role: "",
    is_officer: false,
    instagram: "",
    linkedin: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");

  const resetForm = () => {
    setFormData({
      name: "",
      photo: "",
      description: "",
      role: "",
      is_officer: false,
      instagram: "",
      linkedin: "",
    });
    setSelectedFile(null);
    setPhotoPreview("");
    setEditingMember(null);
    setIsFormOpen(false);
    setFormError("");
    setFileError("");
  };

  const handleEdit = (member: DbMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      photo: member.photo || "",
      description: member.description || "",
      role: member.role || "",
      is_officer: member.is_officer,
      instagram: member.instagram || "",
      linkedin: member.linkedin || "",
    });
    setPhotoPreview(member.photo || "");
    setSelectedFile(null);
    setFormError("");
    setFileError("");
    setIsFormOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError("");
    
    if (file) {
      // Validate file
      const validation = validateFile(file);
      if (!validation.valid) {
        setFileError(validation.error || "File tidak valid");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    // Validate form data
    const validation = validateForm(memberSchema, formData);
    if (!validation.success) {
      const firstError = Object.values(validation.errors)[0];
      setFormError(firstError || "Form tidak valid");
      return;
    }

    setIsSubmitting(true);

    try {
      let photoUrl = formData.photo;

      // Upload file jika ada file baru dipilih
      if (selectedFile) {
        const fileName = `${Date.now()}-${selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        photoUrl = await storageService.uploadAvatar(selectedFile, fileName);
      }

      const memberData = {
        ...formData,
        photo: photoUrl,
      };

      if (editingMember) {
        await updateMember(editingMember.id, memberData);
      } else {
        await addMember(memberData);
      }
      resetForm();
    } catch (err) {
      setFormError("Gagal menyimpan: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Yakin ingin menghapus "${name}"?`)) return;
    
    try {
      // Cari member untuk dapatkan URL foto
      const member = members.find(m => m.id === id);
      if (member?.photo) {
        await storageService.deleteAvatar(member.photo);
      }
      
      await deleteMember(id);
    } catch (err) {
      setFormError("Gagal menghapus: " + (err instanceof Error ? err.message : "Unknown error"));
    }
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
          <h2 className="text-lg font-semibold text-slate-900">Daftar Anggota</h2>
          <p className="text-sm text-slate-500">{members.length} anggota terdaftar</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} icon={<i className="bi bi-plus-lg" />}>
          Tambah Anggota
        </Button>
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={resetForm}
        title={editingMember ? "Edit Anggota" : "Tambah Anggota Baru"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              <i className="bi bi-exclamation-circle mr-2"></i>
              {formError}
            </div>
          )}

          <Input
            label="Nama *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nama lengkap"
            required
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Foto</label>
            <div className="space-y-3">
              {photoPreview && (
                <div className="flex items-center gap-3">
                  <Image
                    src={photoPreview}
                    alt="Preview"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div className="text-sm text-slate-600">
                    {selectedFile ? selectedFile.name : "Foto saat ini"}
                  </div>
                </div>
              )}

              <FileInput
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileSelect}
                error={fileError}
                hint="Maksimal 5MB. Format: JPG, PNG, WebP, GIF"
              />

              <Input
                label="Atau masukkan URL foto"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <Textarea
            label="Deskripsi"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Deskripsi singkat"
            rows={2}
          />

          <Checkbox
            label="Pengurus"
            checked={formData.is_officer}
            onChange={(e) => setFormData({ ...formData, is_officer: e.target.checked })}
          />

          {formData.is_officer && (
            <Input
              label="Jabatan"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Ketua, Wakil Ketua, dll"
            />
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Instagram"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              placeholder="https://instagram.com/..."
            />
            <Input
              label="LinkedIn"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={resetForm} className="flex-1">
              Batal
            </Button>
            <Button type="submit" isLoading={isSubmitting} className="flex-1">
              {editingMember ? "Update" : "Simpan"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Table Desktop / Cards Mobile */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Desktop Table */}
        <table className="w-full hidden md:table">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Nama</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Jabatan</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Status</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{member.name}</div>
                      {member.description && (
                        <div className="text-xs text-slate-500 truncate max-w-[200px]">{member.description}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{member.role || "-"}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    member.is_officer 
                      ? "bg-blue-100 text-blue-700" 
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {member.is_officer ? "Pengurus" : "Anggota"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleEdit(member)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                    title="Edit"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(member.id, member.name)}
                    className="text-red-600 hover:text-red-800"
                    title="Hapus"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  Belum ada anggota. Klik &ldquo;Tambah Anggota&rdquo; untuk memulai.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y">
          {members.map((member) => (
            <div key={member.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{member.name}</div>
                    <div className="text-sm text-slate-500">{member.role || "Anggota"}</div>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  member.is_officer 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {member.is_officer ? "Pengurus" : "Anggota"}
                </span>
              </div>
              {member.description && (
                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{member.description}</p>
              )}
              <div className="flex justify-end gap-4 mt-3 pt-3 border-t">
                <button
                  onClick={() => handleEdit(member)}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <i className="bi bi-pencil"></i> Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id, member.name)}
                  className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <i className="bi bi-trash"></i> Hapus
                </button>
              </div>
            </div>
          ))}
          {members.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              Belum ada anggota. Klik &ldquo;Tambah Anggota&rdquo; untuk memulai.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

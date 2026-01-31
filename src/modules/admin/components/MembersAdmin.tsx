"use client";

import { useState } from "react";
import { useMembersSupabase } from "@/lib/hooks";
import { storageService } from "@/lib/services";
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
    setIsFormOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      alert("Gagal menyimpan: " + (err instanceof Error ? err.message : "Unknown error"));
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
      alert("Gagal menghapus: " + (err instanceof Error ? err.message : "Unknown error"));
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
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="bi bi-plus-lg mr-2"></i>
          Tambah Anggota
        </button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">
                {editingMember ? "Edit Anggota" : "Tambah Anggota Baru"}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Foto</label>
                <div className="space-y-3">
                  {/* Preview */}
                  {photoPreview && (
                    <div className="flex items-center gap-3">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-16 h-16 rounded-full object-cover border"
                      />
                      <div className="text-sm text-slate-600">
                        {selectedFile ? selectedFile.name : "Foto saat ini"}
                      </div>
                    </div>
                  )}

                  {/* File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />

                  {/* URL Input (fallback) */}
                  <div className="text-xs text-slate-500">
                    Atau masukkan URL foto langsung:
                    <input
                      type="text"
                      value={formData.photo}
                      onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder="Deskripsi singkat"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_officer}
                    onChange={(e) => setFormData({ ...formData, is_officer: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Pengurus</span>
                </label>
              </div>

              {formData.is_officer && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jabatan</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ketua, Wakil Ketua, dll"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Instagram</label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
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
                  {isSubmitting ? "Menyimpan..." : editingMember ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
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
      </div>
    </div>
  );
}

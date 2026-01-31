"use client";

import { useState } from "react";
import { useSchedulesSupabase } from "@/lib/hooks";
import type { DbSchedule } from "@/lib/types";

export function SchedulesAdmin() {
  const { schedules, isLoading, error, addSchedule, updateSchedule, deleteSchedule } = useSchedulesSupabase();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<DbSchedule | null>(null);
  const [formData, setFormData] = useState({
    day: "Senin",
    subject: "",
    time_start: "",
    time_end: "",
    room: "",
    lecturer: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const resetForm = () => {
    setFormData({
      day: "Senin",
      subject: "",
      time_start: "",
      time_end: "",
      room: "",
      lecturer: "",
    });
    setEditingSchedule(null);
    setIsFormOpen(false);
  };

  const handleEdit = (schedule: DbSchedule) => {
    setEditingSchedule(schedule);
    setFormData({
      day: schedule.day,
      subject: schedule.subject,
      time_start: schedule.time_start,
      time_end: schedule.time_end,
      room: schedule.room || "",
      lecturer: schedule.lecturer || "",
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = {
        day: formData.day,
        subject: formData.subject,
        time_start: formData.time_start,
        time_end: formData.time_end,
        room: formData.room || null,
        lecturer: formData.lecturer || null,
      };

      if (editingSchedule) {
        await updateSchedule(editingSchedule.id, data);
      } else {
        await addSchedule(data);
      }
      resetForm();
    } catch (err) {
      alert("Gagal menyimpan: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, subject: string) => {
    if (!confirm(`Yakin ingin menghapus jadwal "${subject}"?`)) return;
    
    try {
      await deleteSchedule(id);
    } catch (err) {
      alert("Gagal menghapus: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  // Group schedules by day
  const groupedSchedules = schedules.reduce((acc, schedule) => {
    if (!acc[schedule.day]) {
      acc[schedule.day] = [];
    }
    acc[schedule.day].push(schedule);
    return acc;
  }, {} as Record<string, DbSchedule[]>);

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
          <h2 className="text-lg font-semibold text-slate-900">Jadwal Kuliah</h2>
          <p className="text-sm text-slate-500">{schedules.length} jadwal terdaftar</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="bi bi-plus-lg mr-2"></i>
          Tambah Jadwal
        </button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">
                {editingSchedule ? "Edit Jadwal" : "Tambah Jadwal Baru"}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hari *</label>
                <select
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mata Kuliah *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nama mata kuliah"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jam Mulai *</label>
                  <input
                    type="time"
                    required
                    value={formData.time_start}
                    onChange={(e) => setFormData({ ...formData, time_start: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jam Selesai *</label>
                  <input
                    type="time"
                    required
                    value={formData.time_end}
                    onChange={(e) => setFormData({ ...formData, time_end: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ruangan</label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: Lab 1, Ruang 201"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dosen</label>
                <input
                  type="text"
                  value={formData.lecturer}
                  onChange={(e) => setFormData({ ...formData, lecturer: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nama dosen pengajar"
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
                  {isSubmitting ? "Menyimpan..." : editingSchedule ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule by Day */}
      <div className="space-y-6">
        {days.map((day) => {
          const daySchedules = groupedSchedules[day] || [];
          return (
            <div key={day} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b">
                <h3 className="font-semibold text-slate-900">
                  <i className="bi bi-calendar3 mr-2 text-blue-600"></i>
                  {day}
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    ({daySchedules.length} mata kuliah)
                  </span>
                </h3>
              </div>
              {daySchedules.length > 0 ? (
                <div className="divide-y">
                  {daySchedules.map((schedule) => (
                    <div key={schedule.id} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50">
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-mono text-slate-500">
                          {schedule.time_start} - {schedule.time_end}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{schedule.subject}</div>
                          <div className="text-sm text-slate-500">
                            {schedule.room && <span className="mr-3"><i className="bi bi-geo-alt mr-1"></i>{schedule.room}</span>}
                            {schedule.lecturer && <span><i className="bi bi-person mr-1"></i>{schedule.lecturer}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(schedule)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(schedule.id, schedule.subject)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Hapus"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-6 text-center text-slate-400">
                  Tidak ada jadwal untuk hari {day}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

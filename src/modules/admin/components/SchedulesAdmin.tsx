"use client";

import { useState } from "react";
import { useSchedulesSupabase } from "@/lib/hooks";
import { scheduleSchema, validateForm } from "@/lib/validations";
import { Button, Modal, Input, Select } from "@/shared/components/ui";
import type { DbSchedule } from "@/lib/types";

interface FormData {
  day: string;
  subject: string;
  time_start: string;
  time_end: string;
  room: string;
  lecturer: string;
}

const initialFormData: FormData = {
  day: "Senin",
  subject: "",
  time_start: "",
  time_end: "",
  room: "",
  lecturer: "",
};

const dayOptions = [
  { value: "Senin", label: "Senin" },
  { value: "Selasa", label: "Selasa" },
  { value: "Rabu", label: "Rabu" },
  { value: "Kamis", label: "Kamis" },
  { value: "Jumat", label: "Jumat" },
  { value: "Sabtu", label: "Sabtu" },
];

export function SchedulesAdmin() {
  const { schedules, isLoading, error, addSchedule, updateSchedule, deleteSchedule } = useSchedulesSupabase();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<DbSchedule | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const resetForm = () => {
    setFormData(initialFormData);
    setFormErrors({});
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
    
    // Validate with Zod
    const validationData = {
      day: formData.day,
      subject: formData.subject,
      time_start: formData.time_start,
      time_end: formData.time_end,
      room: formData.room || undefined,
      lecturer: formData.lecturer || undefined,
    };

    const validation = validateForm(scheduleSchema, validationData);
    if (!validation.success) {
      setFormErrors(validation.errors);
      return;
    }
    
    setFormErrors({});
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
      setFormErrors({ submit: err instanceof Error ? err.message : "Gagal menyimpan data" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, subject: string) => {
    if (!confirm(`Yakin ingin menghapus jadwal "${subject}"?`)) return;
    
    try {
      await deleteSchedule(id);
    } catch (err) {
      setFormErrors({ delete: err instanceof Error ? err.message : "Gagal menghapus" });
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
        <span className="ml-3 text-slate-600 dark:text-slate-400">Memuat jadwal...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
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
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Jadwal Kuliah</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{schedules.length} jadwal terdaftar</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} icon={<i className="bi bi-plus-lg" />}>
          Tambah Jadwal
        </Button>
      </div>

      {/* Error Alert */}
      {(formErrors.delete || formErrors.submit) && (
        <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-400 text-sm">
          <i className="bi bi-exclamation-triangle mr-2" />
          {formErrors.delete || formErrors.submit}
        </div>
      )}

      {/* Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={resetForm}
        title={editingSchedule ? "Edit Jadwal" : "Tambah Jadwal Baru"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Hari"
            required
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
            options={dayOptions}
            error={formErrors.day}
          />

          <Input
            label="Mata Kuliah"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Nama mata kuliah"
            error={formErrors.subject}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Jam Mulai"
              type="time"
              required
              value={formData.time_start}
              onChange={(e) => setFormData({ ...formData, time_start: e.target.value })}
              error={formErrors.time_start}
            />
            <Input
              label="Jam Selesai"
              type="time"
              required
              value={formData.time_end}
              onChange={(e) => setFormData({ ...formData, time_end: e.target.value })}
              error={formErrors.time_end}
            />
          </div>

          <Input
            label="Ruangan"
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            placeholder="Contoh: Lab 1, Ruang 201"
            error={formErrors.room}
          />

          <Input
            label="Dosen"
            value={formData.lecturer}
            onChange={(e) => setFormData({ ...formData, lecturer: e.target.value })}
            placeholder="Nama dosen pengajar"
            error={formErrors.lecturer}
          />

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={resetForm} className="flex-1">
              Batal
            </Button>
            <Button type="submit" isLoading={isSubmitting} className="flex-1">
              {editingSchedule ? "Update" : "Simpan"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Schedule by Day */}
      <div className="space-y-6">
        {days.map((day) => {
          const daySchedules = groupedSchedules[day] || [];
          return (
            <div key={day} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-700 px-4 py-3 border-b dark:border-slate-600">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  <i className="bi bi-calendar3 mr-2 text-blue-600 dark:text-blue-400"></i>
                  {day}
                  <span className="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400">
                    ({daySchedules.length} mata kuliah)
                  </span>
                </h3>
              </div>
              {daySchedules.length > 0 ? (
                <div className="divide-y dark:divide-slate-700">
                  {daySchedules.map((schedule) => (
                    <div key={schedule.id} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700">
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-mono text-slate-500 dark:text-slate-400">
                          {schedule.time_start} - {schedule.time_end}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">{schedule.subject}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {schedule.room && <span className="mr-3"><i className="bi bi-geo-alt mr-1"></i>{schedule.room}</span>}
                            {schedule.lecturer && <span><i className="bi bi-person mr-1"></i>{schedule.lecturer}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(schedule)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(schedule.id, schedule.subject)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
                          title="Hapus"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-6 text-center text-slate-400 dark:text-slate-500">
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

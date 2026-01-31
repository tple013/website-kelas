import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Website Kelas TPLE013",
    description: "Website resmi kelas TPLE013 yang menampilkan informasi anggota, proyek, jadwal kuliah, dan profil kelas. Dibangun dengan arsitektur modular monolith untuk kemudahan maintenance.",
    technologies: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    status: "completed",
    teamMembers: ["Pasya Albanna (Paii)", "Tim Web Dev TPLE013"],
    githubUrl: "https://github.com/tple013/website-kelas"
  },
  {
    id: "2",
    title: "E-Learning Platform Fullstack",
    description: "Platform pembelajaran online lengkap dengan fitur video streaming, quiz interaktif, progress tracking, dan dashboard admin. Mendukung multi-role (student, instructor, admin).",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Redis"],
    status: "in-progress",
    teamMembers: ["Pasya Albanna (Paii)", "Tim Backend", "Tim Frontend"],
    githubUrl: "https://github.com/tple013/e-learning-fullstack"
  },
  {
    id: "3",
    title: "E-Commerce Platform",
    description: "Platform e-commerce modern dengan fitur keranjang belanja, payment gateway integration, inventory management, dan dashboard seller. Dilengkapi sistem review dan wishlist.",
    technologies: ["React", "Express.js", "MongoDB", "Stripe", "Docker"],
    status: "in-progress",
    teamMembers: ["Pasya Albanna (paii) & Tim project E-Commerce TPLE013"],
    githubUrl: "https://github.com/tple013/ecommerce-platform"
  },
  {
    id: "4",
    title: "AI Agent Assistant",
    description: "Agen AI cerdas yang dapat membantu otomasi tugas, menjawab pertanyaan, dan melakukan analisis data. Menggunakan LLM dengan kemampuan tool-calling dan memory management.",
    technologies: ["Python", "LangChain", "OpenAI API", "FastAPI", "ChromaDB"],
    status: "planned",
    teamMembers: ["Tim AI Research & AI Enthusiast TPLE013"],
    githubUrl: "https://github.com/tple013/ai-agent"
  },
  {
    id: "5",
    title: "Industrial IoT Automation",
    description: "Sistem otomasi level industri untuk monitoring dan kontrol mesin produksi. Dilengkapi real-time dashboard, predictive maintenance, dan alert system untuk efisiensi operasional.",
    technologies: ["Python", "MQTT", "InfluxDB", "Grafana", "PLC", "Raspberry Pi"],
    status: "planned",
    teamMembers: ["Pasya Albanna (paii) & Tim IoT TPLE013"],
    githubUrl: "https://github.com/tple013/industrial-iot"
  }
];
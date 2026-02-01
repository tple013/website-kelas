import { Badge } from "@/shared/components/ui/Badge";
import { ValueCard } from "./components/ValueCard";
import { ConnectSection } from "./components/ConnectionSection";

const values = [
  { title: "Inovasi", description: "Kami mendorong pemikiran kreatif dan solusi teknologi terbaru untuk memecahkan masalah kompleks.", icon: "bi-lightning-charge-fill", color: "text-amber-500", bg: "bg-amber-50" },
  { title: "Kolaborasi", description: "Kerja sama tim yang solid dan berbagi pengetahuan adalah fondasi utama komunitas kami.", icon: "bi-people-fill", color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Pembelajaran", description: "Mengutamakan continuous learning untuk meningkatkan skill teknis maupun soft skill.", icon: "bi-book-half", color: "text-sky-500", bg: "bg-sky-50" },
];

export function AboutView() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* Introduction */}
        <section className="text-center max-w-4xl mx-auto">
          <Badge variant="info" className="mb-4 uppercase tracking-wide">Profil Kelas</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-400 mb-6 leading-tight">
            Mengenal Lebih Dekat <span className="text-blue-600">TPLE013</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            TPLE013 bukan sekadar kelas, melainkan inkubator bagi talenta digital masa depan yang berkomitmen pada inovasi dan kompetensi.
          </p>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            Melalui proyek kolaboratif dan kurikulum yang relevan dengan industri (Web Dev, Mobile Apps, Cybersecurity), kami mempersiapkan setiap anggota untuk bersaing di era digital global.
          </p>
        </section>

        {/* Values */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, index) => <ValueCard key={index} {...item} />)}
          </div>
        </section>

        {/* Connect */}
        <ConnectSection />
      </div>
    </div>
  );
}
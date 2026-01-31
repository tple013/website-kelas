export function VisionMission() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Visi & Misi Kami</h2>
            <div className="h-1.5 w-20 bg-blue-600 rounded-full"></div>
          </div>

          {/* Visi Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                <i className="bi bi-eye text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Visi</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Menjadi pusat unggulan pendidikan teknologi yang menghasilkan talenta digital berkualitas tinggi, adaptif, dan berkarakter untuk kemajuan bangsa.
            </p>
          </div>

          {/* Misi Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-sky-100 rounded-lg text-sky-700">
                <i className="bi bi-bullseye text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Misi</h3>
            </div>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start">
                <i className="bi bi-check-circle-fill text-blue-500 mt-1 mr-3 text-sm"></i>
                <span>Mengembangkan kompetensi teknis yang relevan dengan industri.</span>
              </li>
              <li className="flex items-start">
                <i className="bi bi-check-circle-fill text-blue-500 mt-1 mr-3 text-sm"></i>
                <span>Mendorong inovasi melalui kolaborasi proyek nyata.</span>
              </li>
              <li className="flex items-start">
                <i className="bi bi-check-circle-fill text-blue-500 mt-1 mr-3 text-sm"></i>
                <span>Membina etika profesional dan soft skill anggota.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Highlight Box */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 transform rotate-3 rounded-3xl"></div>
          <div className="relative bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-10 text-center shadow-xl text-white">
            <div className="text-6xl mb-6 inline-block filter drop-shadow-lg">🚀</div>
            <h3 className="text-2xl font-bold mb-4 tracking-wide">Komitmen Kami</h3>
            <p className="text-blue-100 leading-relaxed mb-8">
              "Bersama-sama kami berkomitmen untuk terus belajar, berinovasi, dan berkontribusi dalam membangun solusi teknologi yang berdampak positif."
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-blue-800 pt-8">
              <div>
                <div className="text-3xl font-bold text-sky-400">28</div>
                <div className="text-sm text-blue-300">Anggota Aktif</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sky-400">∞</div>
                <div className="text-sm text-blue-300">Semangat Belajar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
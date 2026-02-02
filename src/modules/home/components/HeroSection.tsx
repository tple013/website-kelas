import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-900">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-sky-100 dark:bg-sky-900/30 rounded-full blur-3xl opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 text-sm font-medium mb-8">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
          Teknik Informatika Universitas Pamulang
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
          Yo, Welcome to <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-500">TPLE013!</span> 👋
        </h1>

        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Ini dia kelas paling seru di kampus! Mau tau siapa aja yang ada di sini? Atau penasaran project keren yang udah kita garap? Langsung cek aja!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/projects" className="bg-blue-800 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1">
            Jelajahi Proyek
          </Link>
          <Link href="/members" className="border border-slate-300 dark:border-slate-600 hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-400 text-slate-600 dark:text-slate-400 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/30">
            Kenali Tim Kami
          </Link>
        </div>
      </div>
    </section>
  );
}
export function ConnectSection() {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-3xl p-10 md:p-16 shadow-lg border border-slate-100 dark:border-slate-700 text-center relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-50 dark:bg-blue-900/30 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-sky-50 dark:bg-sky-900/30 opacity-50 blur-3xl"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Ingin Berkolaborasi?</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Ikuti perjalanan kami di media sosial atau lihat kode sumber proyek kami di GitHub. Mari tumbuh bersama.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="https://github.com/tple013"
            target="_blank"
            className="flex items-center space-x-3 bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto justify-center"
          >
            <i className="bi bi-github text-xl"></i>
            <span>Lihat GitHub</span>
          </a>
          <a
            href="https://www.instagram.com/013promax_tics/"
            target="_blank"
            className="flex items-center space-x-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto justify-center"
          >
            <i className="bi bi-instagram text-xl"></i>
            <span>Follow Instagram</span>
          </a>
          <a
            href="https://discord.gg/2FqK8dyGAC"
            target="_blank"
            className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto justify-center"
          >
            <i className="bi bi-discord text-xl"></i>
            <span>Join Our Discord</span>
          </a>
        </div>
      </div>
    </section>
  );
}
export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Data Kontak
  const contactInfo = [
    { text: "akun.tple013@gmail.com", icon: "bi-envelope" },
    { text: "+62 823-2312-4365 (Ketua Kelas)", icon: "bi-telephone" },
    { text: "Universitas Pamulang, Kampus Viktor", icon: "bi-geo-alt" },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-6">
          
          {/* KOLOM 1: BRANDING */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2 shadow-lg shadow-blue-500/20">
                <i className="bi bi-code-slash text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold tracking-wider bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent  dark:from-blue-500 dark:to-sky-300">
                TPLE<span className="text-blue-500 dark:text-sky-600">013</span>
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-md text-sm">
              Kelas teknologi dan programming yang berkomitmen untuk mencetak generasi muda yang inovatif dan kompeten di bidang digital.
            </p>
            <div className="flex space-x-4 pt-1">
              {/* Social Media Icons */}
              <a href="https://github.com/tple013" target="_blank" rel="noopener noreferrer" 
                 className="bg-slate-200 dark:bg-gray-900 hover:bg-gray-900 text-slate-700 dark:text-white hover:text-white p-2 rounded-full transition-all duration-300 hover:-translate-y-1">
                <i className="bi bi-github text-base"></i>
              </a>
              <a href="https://www.instagram.com/013promax_tics/" target="_blank" rel="noopener noreferrer" 
                 className="bg-slate-200 dark:bg-gray-900 hover:bg-pink-600 text-slate-700 dark:text-white hover:text-white p-2 rounded-full transition-all duration-300 hover:-translate-y-1">
                <i className="bi bi-instagram text-base"></i>
              </a>
              <a href="https://discord.gg/2FqK8dyGAC" target="_blank" rel="noopener noreferrer" 
                 className="bg-slate-200 dark:bg-gray-900 hover:bg-blue-700 text-slate-700 dark:text-white hover:text-white p-2 rounded-full transition-all duration-300 hover:-translate-y-1">
                <i className="bi bi-discord text-base"></i>
              </a>
            </div>
          </div>

          {/* KOLOM 2: KONTAK (RATA KANAN) */}
          <div className="flex flex-col items-start md:items-center">
            <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-4 border-b border-blue-500/30 pb-2">
              Hubungi Kami
            </h4>
            <ul className="space-y-2">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <i className={`bi ${info.icon} text-blue-500`}></i>
                  <span className="text-sm text-slate-600 dark:text-slate-300">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* COPYRIGHT SECTION */}
        <div className="border-t border-slate-200 dark:border-slate-700 mt-6 pt-6 flex justify-center items-center text-sm text-slate-500">
          <p> {currentYear} TPLE013. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

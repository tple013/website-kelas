import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Data untuk Link Cepat (Memudahkan jika ingin tambah menu)
  const quickLinks = [
    { label: "Beranda", href: "/", icon: "bi-house-door" },
    { label: "Anggota", href: "/members", icon: "bi-people" },
    { label: "Proyek", href: "/projects", icon: "bi-folder" },
    { label: "Jadwal", href: "/schedule", icon: "bi-calendar-event" },
    { label: "Tentang", href: "/about", icon: "bi-info-circle" },
  ];

  // Data Kontak
  const contactInfo = [
    { text: "tple@unpam.ac.id", icon: "bi-envelope" },
    { text: "+62 123 456 789", icon: "bi-telephone" },
    { text: "Universitas Pamulang", icon: "bi-geo-alt" },
  ];

  return (
    <footer className="bg-slate-900 backdrop-blur-md border-t border-blue-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* KOLOM 1: BRANDING */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2 shadow-lg shadow-blue-500/20">
                <i className="bi bi-code-slash text-white text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-stone-700 tracking-wide">
                TPLE<span className="text-blue-500">013</span>
              </h3>
            </div>
            <p className="text-slate-900 leading-relaxed max-w-sm">
              Kelas teknologi dan programming yang berkomitmen untuk mencetak generasi muda yang inovatif dan kompeten di bidang digital.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Social Media Icons */}
              <a href="https://github.com/tple013" target="_blank" rel="noopener noreferrer" 
                 className="bg-slate-800 hover:bg-blue-600 text-white p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1">
                <i className="bi bi-github text-lg"></i>
              </a>
              <a href="https://www.instagram.com/013promax_tics/" target="_blank" rel="noopener noreferrer" 
                 className="bg-slate-800 hover:bg-pink-600 text-white p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1">
                <i className="bi bi-instagram text-lg"></i>
              </a>
            </div>
          </div>

          {/* KOLOM 2: LINK CEPAT */}
          <div>
            <h4 className="text-black font-bold text-lg mb-6 border-b border-blue-500/30 pb-2 inline-block">
              Navigasi
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center space-x-2 hover:text-sky-400 transition-colors duration-200"
                  >
                    <i className={`bi ${link.icon} text-blue-700 group-hover:text-sky-400 transition-colors`}></i>
                    <span className="text-md text-black">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 3: KONTAK */}
          <div>
            <h4 className="text-black font-bold text-lg mb-6 border-b border-blue-500/30 pb-2 inline-block">
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <i className={`bi ${info.icon} text-blue-700 mt-1`}></i>
                  <span className="text-sm text-black">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* COPYRIGHT SECTION */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {currentYear} TPLE013. Hak cipta dilindungi.</p>
          <p className="mt-2 md:mt-0">
            Dibuat dengan <i className="bi bi-heart-fill text-red-500 mx-1"></i> oleh Tim Web Dev
          </p>
        </div>
      </div>
    </footer>
  );
}
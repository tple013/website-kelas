import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  

  // Data Kontak
  const contactInfo = [
    { text: "akun.tple013@gmail.com", icon: "bi-envelope" },
    { text: "+62 823-2312-4365 (Ketua Kelas)", icon: "bi-telephone" },
    { text: "Universitas Pamulang, Kampus Viktor", icon: "bi-geo-alt" },
  ];

  return (
<footer
  className="backdrop-blur-md border-t shadow-sm
/* LIGHT MODE (GLASS) */
    bg-gray-200 border-black-200
/* DARK MODE (SOLID) */
    dark:bg-slate-800 dark:border-blue-700">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
     
      {/* footer content */}
          
          {/* KOLOM 1: BRANDING */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2 shadow-lg shadow-blue-500/20">
                <i className="bi bi-code-slash text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold tracking-wider bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-500 dark:to-sky-300">
                TPLE<span className="text-blue-500">013</span>
              </h3>
            </div>
            <p className="text-black dark:text-white leading-relaxed max-w-sm">
              Kelas teknologi dan programming yang berkomitmen untuk mencetak generasi muda yang inovatif dan kompeten di bidang digital.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Social Media Icons */}
              <a href="https://github.com/tple013" target="_blank" rel="noopener noreferrer" 
                 className="bg-gray-900 hover:bg-blue-600 text-white p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1">
                <i className="bi bi-github text-lg"></i>
              </a>
              <a href="https://www.instagram.com/013promax_tics/" target="_blank" rel="noopener noreferrer" 
                 className="bg-gray-900 hover:bg-pink-600 text-white p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1">
                <i className="bi bi-instagram text-lg"></i>
              </a>
            </div>
          </div>

          {/* KOLOM 3: KONTAK */}
          <div>
            <h4 className="text-black  dark:text-white font-bold text-lg mb-6 border-b border-blue-700 pb-2 inline-block">
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <i className={`bi ${info.icon} text-blue-700 mt-1`}></i>
                  <span className="text-md dark:text-white text-black">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* COPYRIGHT SECTION */}
        <div className="border-t dark:border-white border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-center items-center text-sm text-black dark:text-white">
          <p>© {currentYear} TPLE013. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
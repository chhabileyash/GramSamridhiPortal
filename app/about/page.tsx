import Header from "../../components/Header";
import Footer from "../../components/Footer";
export default function AboutPage() {
  return (
    <>
      <div className="font-sans bg-[#F5F6F7] text-[#1F2933] min-h-screen">
        {/* BEGIN: Top Header */}
        {/* BEGIN: Navigation Bar */}
        {/* <Header /> */}
        <main className="py-[40px] flex-grow bg-surface border-b border-[#E0E0E0]">
          <div className="max-w-[1200px] mx-auto px-4">
            {/* Page Title */}
            <header className="mb-[40px] text-center max-w-3xl mx-auto pt-8">
              <h1 className="text-[36px] text-[#1F3A5A] font-bold mb-4">
                About The Digital Portal
              </h1>
              <p className="text-[16px] text-[#4B5563] leading-relaxed">
                Welcome to the Gram Samriddhi Portal, the official digital
                gateway designed to bring administration closer to our citizens.
                This platform is a unified initiative to ensure transparency,
                accessibility, and efficiency in the delivery of rural services.
              </p>
            </header>

            {/* Mission & Vision Grid */}
            <div className="grid md:grid-cols-2 gap-[16px] mb-[40px]">
              {/* Mission */}
              <article className="bg-[#FFFFFF] p-4 rounded-[10px] shadow-[0px_2px_6px_rgba(0,0,0,0.08)] border border-[#E0E0E0] flex flex-col items-start relative overflow-hidden group hover:shadow-[0px_4px_12px_rgba(0,0,0,0.12)] transition-shadow">
                <div className="w-14 h-14 bg-[#E8F2E3] text-[#2E7D32] rounded-[999px] flex items-center justify-center mb-6">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h2 className="text-[#1F3A5A] text-[28px] font-bold mb-4">
                  Our Mission
                </h2>
                <p className="text-[#4B5563] font-medium leading-[1.6]">
                  To empower rural administration through digital
                  transformation, making government services instantly
                  accessible to every citizen. We strive to provide a seamless
                  interface that reduces administrative delays and strengthens
                  grassroots democracy.
                </p>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#E8F2E3] to-transparent rounded-bl-full opacity-50 -z-10 translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500"></div>
              </article>

              {/* Vision */}
              <article className="bg-[#FFFFFF] p-4 rounded-[10px] shadow-[0px_2px_6px_rgba(0,0,0,0.08)] border border-[#E0E0E0] flex flex-col items-start relative overflow-hidden group hover:shadow-[0px_4px_12px_rgba(0,0,0,0.12)] transition-shadow">
                <div className="w-14 h-14 bg-[#FFF0E5] text-accent rounded-[999px] flex items-center justify-center mb-6">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                </div>
                <h2 className="text-[#1F3A5A] text-[28px] font-bold mb-4">
                  Our Vision
                </h2>
                <p className="text-[#4B5563] font-medium leading-[1.6]">
                  To build a self-reliant and digitally informed rural India
                  where every citizen has equal access to opportunities,
                  socio-economic welfare schemes, and modern governance
                  infrastructure from the comfort of their homes.
                </p>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FFF0E5] to-transparent rounded-bl-full opacity-50 -z-10 translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500"></div>
              </article>
            </div>

            {/* Objectives Section */}
            <section className="mb-[40px]">
              <header className="mb-[32px] border-b border-[#E0E0E0] pb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-accent rounded-[999px] block"></span>
                <h2 className="text-[#1F3A5A] text-[28px] font-bold m-0">
                  Our Objectives
                </h2>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
                {/* Obj 1 */}
                <div className="bg-[#FFFFFF] p-4 rounded-[10px] border border-[#E0E0E0] shadow-[0px_2px_6px_rgba(0,0,0,0.08)] flex flex-col hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-[#D0E1F9] text-[#1E3A5F] rounded-[10px] mb-5 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                    </svg>
                  </div>
                  <h3 className="text-[#1F3A5A] font-bold text-[22px] mb-3">
                    E-Governance
                  </h3>
                  <p className="text-[#4B5563] text-[16px] m-0 leading-relaxed">
                    To digitize panchayat records and service applications for
                    faster processing.
                  </p>
                </div>
                {/* Obj 2 */}
                <div className="bg-[#FFFFFF] p-4 rounded-[10px] border border-[#E0E0E0] shadow-[0px_2px_6px_rgba(0,0,0,0.08)] flex flex-col hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-[#D4EDDA] text-[#2E7D32] rounded-[10px] mb-5 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                  <h3 className="text-[#1F3A5A] font-bold text-[22px] mb-3">
                    Transparency
                  </h3>
                  <p className="text-[#4B5563] text-[16px] m-0 leading-relaxed">
                    To offer open access to information regarding village funds
                    and projects.
                  </p>
                </div>
                {/* Obj 3 */}
                <div className="bg-[#FFFFFF] p-4 rounded-[10px] border border-[#E0E0E0] shadow-[0px_2px_6px_rgba(0,0,0,0.08)] flex flex-col hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-[#FDE9BD] text-[#D36C21] rounded-[10px] mb-5 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <h3 className="text-[#1F3A5A] font-bold text-[22px] mb-3">
                    Accessibility
                  </h3>
                  <p className="text-[#4B5563] text-[16px] m-0 leading-relaxed">
                    To serve as a single online window for certificates, taxes,
                    utilities.
                  </p>
                </div>
                {/* Obj 4 */}
                <div className="bg-[#FFFFFF] p-4 rounded-[10px] border border-[#E0E0E0] shadow-[0px_2px_6px_rgba(0,0,0,0.08)] flex flex-col hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-[#F4F6F0] text-[#2E7D32] rounded-[10px] mb-5 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-[#1F3A5A] font-bold text-[22px] mb-3">
                    Empowerment
                  </h3>
                  <p className="text-[#4B5563] text-[16px] m-0 leading-relaxed">
                    To educate rural populations about newly enacted welfare
                    schemes.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
        {/* BEGIN: Footer */}
        <Footer />
      </div>
    </>
  );
}

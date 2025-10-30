import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import Offers from "../component/Offers";

function Layout({ children }) {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050505]">
      {/* Top green gradient that stops mid-way */}
      <div className="absolute top-0 right-0 w-2/3 h-[50vh] bg-[radial-gradient(ellipse_at_top,rgba(0,255,0,0.25)_0%,transparent_80%)] pointer-events-none" />

      {/* Subtle bottom glow for depth */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-[radial-gradient(ellipse_at_bottom,rgba(0,255,120,0.1)_0%,transparent_80%)] pointer-events-none" />
      
      <Navbar />
      <div className="relative z-10">{children}</div>
      <Offers />
      <Footer />
    </main>
  );
}

export default Layout;

import Footer from "../component/Footer";
import Navbar from "../component/Navbar";


function Layout({ children }) {
  

 
  return (
    <main className="">
      <Navbar/>
      {children}
      <Footer/>
    
    </main>
  );
}

export default Layout;

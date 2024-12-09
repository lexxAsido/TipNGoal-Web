import Navbar from "../component/Navbar";


function Layout({ children }) {
  

 
  return (
    <main className="">
      <Navbar/>
      {children}
    
    </main>
  );
}

export default Layout;

import BranchSelectModal from "./BranchSelectModal";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
        <BranchSelectModal />
        <Header/>
        <main className="">
            <Outlet />
        </main>
        <Footer/>        
    </>
  )
}

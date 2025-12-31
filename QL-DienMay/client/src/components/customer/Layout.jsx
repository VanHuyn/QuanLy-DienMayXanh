import BranchSelectModal from "./BranchSelectModal";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from 'react-router-dom';
import ChatWidget from "../../components/customer/ChatWidget";
export default function Layout() {
  return (
    <>
        <BranchSelectModal />
        <Header/>
        <main className="">
            <Outlet />
        </main>
        <ChatWidget />
        <Footer/>        
    </>
  )
}

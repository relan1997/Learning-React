import Head from "./components/Head/Head";
import Footer from "./components/footer/Footer";
import { Outlet  } from "react-router-dom"; // Outlet uses the Layout.jsx as a base and naye cheezon ko jahan chaho wahan paas karega keeping the rest of the components fixed

export default function Layout(){
    return(
        <>
            <Head/>
            <Outlet/> 
            <Footer/>
        </>
    )
}
//Head will remain the same Footer will remain the same lekin naye naye content pieces will be added to the Oultet Tag that has been declared
import LoggedOutTopMenu from "./includes/LoggedOutTopMenu";
import MainHeader from "./includes/MainHeader";
import SubMenu from "./includes/SubMenu";
import Footer from "./includes/Footer"; 

export default function LoggedOutLayout({children}){

    return(
        <>
            <div id="LoggedOutLayout" className="min-w-[1050px] max-w-[1300px] mx-auto">
                <div>
                    <LoggedOutTopMenu />
                    <MainHeader /> 
                    <SubMenu /> 
                </div>

                <div>{children}</div>

                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
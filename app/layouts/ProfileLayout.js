"use client"; 
import TopMenu from "./includes/ProfileTopMenu";
import MainHeader from "./includes/MainHeader";
import SubMenu from "./includes/SubMenu";
import Footer from "./includes/Footer"; 

export default function MainLayout({children}){

    return(
        <>
            <div id="MainLayout" className="min-w-[1050px] max-w-[1300px] mx-auto">
                <div>
                    <TopMenu /> 
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
import {Outlet} from "react-router-dom";
import Header from "./header.tsx";

export default function Layout(){

    const styles ={
        contianer:{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            border: "1px solid black",
        }
    }

    return (
        <div>
            <Header/>
            <div style={styles.contianer}>
                <>Sidebar</>
                <Outlet/>
            </div>
        </div>
    );

}
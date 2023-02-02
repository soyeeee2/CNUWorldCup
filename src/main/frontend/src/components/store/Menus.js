import styles from "./menus.module.css"
import axios from "axios";
import React, {useEffect, useState} from "react";

function Menus(props) {

    const [menu, setMenu] = useState([]);
    useEffect(() => {
        axios.get(`/Menu/${props.store}`)
            .then(response => {
                setMenu(response.data);
                console.log("Menu: ", response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div style={{width: "100%"}}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div style={{fontSize: "25px", padding: "10px", color: "#754878"}}>메뉴</div>
                </div>
                <div>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                        <tr>
                            <th className={styles.th} style={{width: "10px"}}>번호</th>
                            <th className={styles.th} style={{width: "80px"}}>사진</th>
                            <th className={styles.th} style={{width: "80px"}}>메뉴</th>
                            <th className={styles.th} style={{width: "80px"}}>가격</th>
                        </tr>
                        </thead>
                        <tbody>
                        {menu && menu.map(v => <tr>
                            <td className={styles.td}>0</td>
                            <td className={styles.td}>사진</td>
                            <td className={styles.td}>{v.menu_name}</td>
                            <td className={styles.td}>{v.price}</td>
                        </tr>,)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


        // <table className={styles.table} style={{width:"620px"}}>
        //     <thead className={styles.thead}>
        //     <tr>
        //         <th className={styles.th}>메뉴명</th>
        //         <th className={styles.th}>가격</th>
        //     </tr>
        //     </thead>
        //     <tbody>
        //     {menu && menu.map(v => <tr>
        //         <td className={styles.td}>{v.menu_name}</td>
        //         <td className={styles.td}>{v.price}</td>
        //     </tr>,)}
        //     </tbody>
        // </table>
    );
}

export default Menus;

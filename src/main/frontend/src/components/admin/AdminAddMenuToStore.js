import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {Form, Table} from "react-bootstrap";
import styles from "../table.module.css";
import {Checkbox} from "antd";

function AdminAddMenuToStore(props) {

    const [store, setStore] = useState([]);
    const [storeId, setStoreId] = useState("");
    const [storeName, setStoreName] = useState("");
    const [menu, setMenu] = useState([]);

    const [isMenuLoaded, setIsMenuLoaded] = useState(0);

    const [selected, setSelected] = useState([]);

    const [menuName, setMenuName] = useState("");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const fileInput = useRef();

    const updateStoreId = e => {
        setStoreId(e.target.value)
    };

    function updateStoreInfo(e, storeName) {
        setStoreId(e.target.value);
        setStoreName(storeName);
    }

    const updateMenuName = e => setMenuName(e.target.value);
    const updatePrice = e => setPrice(e.target.value);
    const handleChangeFile = e => setFile(e.target.files);

    const onChangeEach = (e, id) => {
        // 체크할 시 CheckList에 id값 넣기
        if (e.target.checked) {
            setSelected([...selected, id]);
            // 체크 해제할 시 CheckList에서 해당 id값이 `아닌` 값만 배열에 넣기
        } else {
            setSelected(selected.filter((checkedId) => checkedId !== id));
        }
    }

    useEffect(() => {
            axios.get('/AllStore')
                .then(response => {
                    setStore(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);

    function showStoreList() {

        return (
            <div>
                <Table id={"storeTable"} className={styles.table}>
                    <thead>
                    <tr>
                        <th className={styles.thead}>선택</th>
                        <th className={styles.thead}>가게</th>
                        <th className={styles.thead}>주소</th>
                    </tr>
                    </thead>
                    <tbody className={styles.body}>
                    {store.map(s => (
                        <tr key={s.store_id}>
                            <td className={styles.td}><input type={"radio"} name={"selectedStore"} value={s.store_id}
                                       onChange={e => updateStoreInfo(e, s.store_name)}/></td>
                            <td className={styles.td}><img width={100} src={`/img/${s.store_id}.jpg`}/><br></br>{s.store_name}</td>
                            <td className={styles.td}>{s.address}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }

    function showStoreListAgain() {
        setStoreId("");
        setStoreName("");
        setMenu([]);
        setIsMenuLoaded(0);
    }

    function showStoreMenuList() {
        if (!menu.length && !isMenuLoaded) {
            axios.get(`http://localhost:8080/StoreMenusInfo/${storeId}`)
                .then(response => {
                    setMenu(response.data);
                    setIsMenuLoaded(1);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }

        return (
            <div>
                <Form className={styles.left}>
                    <h2>{storeName} 메뉴</h2>
                    <Table id={"menuTable"} className={styles.table}>
                        <thead>
                        <tr>
                            <th className={styles.thead}>선택</th>
                            <th className={styles.thead}>메뉴</th>
                            <th className={styles.thead}>가격</th>
                            <th className={styles.thead}>이미지</th>
                        </tr>
                        </thead>
                        <tbody className={styles.body}>
                        {menu.filter(m => !selected.includes(m.menu_id)).map(m => (
                            <tr key={m.menu_id}>
                                <td className={styles.td}><Checkbox onChange={(e) => onChangeEach(e, m.menu_id)}
                                              checked={selected.includes(m.menu_id)}/></td>
                                <td className={styles.td}>{m.menu_name}</td>
                                <td className={styles.td}>{m.price}</td>
                                <td className={styles.td}><img width={200} height={100} src={`/img/${m.menu_id}.jpg`}/></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Form>
            </div>
        );
    }

    function showSelectedMenuList() {

        return (
            <div>
                <Form className={styles.left}>
                    <h2>선택한 메뉴</h2>
                    <Table id={"menuTable"} className={styles.table}>
                        <thead>
                        <tr>
                            <th className={styles.thead}>선택</th>
                            <th className={styles.thead}>메뉴</th>
                            <th className={styles.thead}>가격</th>
                            <th className={styles.thead}>이미지</th>
                        </tr>
                        </thead>
                        <tbody className={styles.body}>
                        {menu.filter(m => selected.includes(m.menu_id)).map(m => (
                            <tr key={m.menu_id}>
                                <td className={styles.td}><Checkbox onChange={(e) => onChangeEach(e, m.menu_id)}
                                                                    checked={selected.includes(m.menu_id)}/></td>
                                <td className={styles.td}>{m.menu_name}</td>
                                <td className={styles.td}>{m.price}</td>
                                <td className={styles.td}><img width={200} height={100} src={`/img/${m.menu_id}.jpg`}/></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    {selected.length ? <button onClick={() => removeMenu()}>메뉴 삭제하기</button> : ""}
                </Form>
            </div>
        );
    }

    function formAddMenu() {
        return (
            <div>
                <Form className={styles.top}>
                    <h3>메뉴 추가하기</h3>
                    <Table className={styles.table}>
                        <tbody>
                        <tr>
                            <td>메뉴 이름 :</td>
                            <td><input id={"menuName"} onChange={updateMenuName}/></td>
                        </tr>
                        <tr>
                            <td>가격 :</td>
                            <td><input id={"price"} type={"number"} onChange={updatePrice}/></td>
                        </tr>
                        <tr>
                            <td><input type={"file"} ref={fileInput} onChange={handleChangeFile}/></td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={(event) => addMenu(event)}>메뉴 추가하기</button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Form>
            </div>
        );
    }

    function addMenu() {

        if(alertBlankInput() != 1) {
            return;
        }

        const menuDto = {
            menu_name: menuName, price: price,
            store_id: storeId
        }
        console.log(menuDto);
        console.log(file[0]);

        const fd = new FormData();
        fd.append("file", file[0]);
        fd.append("menuDto", JSON.stringify(menuDto));

        axios.post('http://localhost:8080/admin/requestMenuAdd', fd)
            .then((response) => {alert(response.data);})

        resetInput();
    }

    function removeMenu() {

        const fd = new FormData();
        selected.forEach(s => fd.append("selectedMenuId", s));

        axios.post('http://localhost:8080/requestMenuRemove', fd)
            .then((response) => {alert(response.data);})

    }
    function alertBlankInput() {
        if(!menuName) {alert("메뉴 이름을 입력해주세요");return -1;}
        else if(!price) {alert("가격을 입력해주세요");return -1;}
        else if(!file) { alert("가게의 이미지를 업로드해주세요"); return -1;}
        return 1;
    }

    function resetInput() {
        const menuName = document.getElementById("menuName");
        const price = document.getElementById("price");

        menuName.value = "";
        price.value = null;
        fileInput.current.value = "";
    }

    return (
        <div>
            <h1>Hello Menu</h1>
            {storeId ? <button onClick={showStoreListAgain}>가게 변경</button> : showStoreList()}
            {storeId ? formAddMenu() : ""}
            {!storeId ? "" : showStoreMenuList()}
            {!storeId ? "" : showSelectedMenuList()}
        </div>
    );
}

export default AdminAddMenuToStore;
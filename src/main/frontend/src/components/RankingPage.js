/*global kakao*/
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import RankingTable from "./worldcup/RankingTable";

function RankingPage() {
    const [store, setStore] = useState([]);

    const [category, setCategory] = useState([]);
    let { categoryId } = useParams();

    useEffect(() => {

            axios.get(`/AllCategory/${categoryId}`)
                .then(response => {
                    setCategory(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);

    return (
        <div className="wrapper">
            <div className="main">
                <h1>{category && category.category_name} 월드컵 순위</h1>
                <div>
                    <div>
                        <div>
                            <h1>Top2!</h1>
                            {store[1] && <img src={`/image/${store[1].store_id}`}/>}
                        </div>
                        <div>
                            <h1>Top1!</h1>
                            {store[0] && <img src={`/image/${store[0].store_id}`}/>}
                        </div>
                        <div>
                            <h1>Top3!</h1>
                            {store[2] && <img src={`/image/${store[2].store_id}`}/>}
                        </div>
                        {/*{store[1] && <img src={`/image/${store[1].store_id}`}/>}*/}
                        {/*{store[0] && <img src={`/image/${store[0].store_id}`}/>}*/}
                        {/*{store[2] && <img src={`/image/${store[2].store_id}`}/>}*/}
                    </div>
                        <RankingTable category={categoryId} setStore={setStore}/>
                    </div>
            </div>



        </div>

    );
}

export default RankingPage;


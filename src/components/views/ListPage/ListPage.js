import { useEffect, useState } from "react";
import db from "../../firebase";
import firebase from 'firebase';

function ListPage(){
    const[foods, setFoods] = useState([]);
    useEffect(() => {
        db.collection('food')
        .orderBy('name', 'desc')
        .onSnapshot(data => {
            // setMessages(data.docs.map(doc => ({id: doc.id, message: doc.data() })))
            // setFoods(data.docs.map(doc => ({name: doc.name, location: doc.location, price: doc.price, type: doc.type})))
            setFoods(data.docs.map(doc => ({id: doc.id, data: doc.data() })))
        })
    }, [])

    return(
        <>
        <div>test</div>
        <a href="/upload"><button>만들기</button></a>
        <a href="/detail"><button>목록</button></a>
        <div>
            {foods[0].data.name}
        </div>
        {foods.map(item => {
            <>
            <div>{item.data.name}</div>
            <div>{item.data.location}</div>
            <div>{item.data.price}</div>
            <div>{item.data.type}</div>
            <div>테스트</div>
            </>
        })}
        </>
    )
}

export default ListPage;
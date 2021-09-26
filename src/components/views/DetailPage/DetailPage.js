import { useEffect, useState } from "react";
import db from "../../firebase";
import firebase from 'firebase';

function DetailPage(props){
    // console.log(props.match.params.foodid);
    const [food, setFood] = useState();
    useEffect(() => {
        db.collection('food')
        .orderBy('name', 'desc')
        .onSnapshot(data => {
            // setMessages(data.docs.map(doc => ({id: doc.id, message: doc.data() })))
            // setFoods(data.docs.map(doc => ({name: doc.name, location: doc.location, price: doc.price, type: doc.type})))
            // setFoods(data.docs.map(doc => ({id: doc.id, data: doc.data() })))
            data.docs.map(item => {
                // console.log(item);
                if(item.id == props.match.params.foodid){
                    // console.log(item.data());
                    setFood({id: item.id, data: item.data() });
                }
            })
        })
    }, [])

    // console.log(food);
    // console.log(food.data);
    
    return (
        <>
        <div>{food?.data.name}</div>
        <div>{food?.data.type}</div>
        <div>{food?.data.price}</div>
        <div>{food?.data.location}</div>
        <div>신청하기 버튼</div>
        <br/>
        <div>DetailPage</div>
        <div>데이터베이스에 등록된 음식들 가져와서 뿌려준다</div>
        <div>음식 종류별로 카테고리 만들어서 클릭하면 해당 음식들만 쭉 나오게 하면 좋을듯</div>
        <div>지도에 뿌려주는 방법은 조금 나중에 생각해보자</div>
        </>
    )
}

export default DetailPage;
import { useEffect, useState } from "react";
import db from "../../firebase";
import firebase from 'firebase';
import { List, ListItem, ListItemText } from "@material-ui/core";

function ListPage(){
    const [foods, setFoods] = useState([]);
    useEffect(() => {
        db.collection('food')
        .orderBy('name', 'desc')
        .onSnapshot(data => {
            // setMessages(data.docs.map(doc => ({id: doc.id, message: doc.data() })))
            // setFoods(data.docs.map(doc => ({name: doc.name, location: doc.location, price: doc.price, type: doc.type})))
            setFoods(data.docs.map(doc => ({id: doc.id, data: doc.data() })))
        })
    }, [])
    const [type, setType] = useState("전체");
    const types = ["전체", "한식", "중식", "일식"];
    console.log(foods);
    return(
        <>
        <div>test</div>
        <a href="/upload"><button>만들기</button></a>
        <a href="/detail"><button>목록</button></a>
        <List>
        {types.map(item => {
            return(
                <>
                <ListItem button onClick={() => setType(item)}>
                    <ListItemText primary={item} />
                    {/* <a onClick={() => setType(item)}> {item} </a> */}
                </ListItem>
                </>
            )
        })}
        </List>
        {
            type=="전체" ? 
            foods?.map(item => {
                return(
                    <>
                    <a href={`/detail/${item.id}`}>
                        <div>{item.data.name} {item.data.location} {item.data.price} {item.data.type}</div>
                    </a>
                    </>
                )
            })
            : 
            foods?.map(item => {
                if(item.data.type == type){
                    return(
                        <>
                        <div>{item.data.name} {item.data.location} {item.data.price} {item.data.type}</div>
                        </>
                    )
                }
            })
        }
        계획 <br/>
        1. <br/>
        2. <br/>
        </>
    )
}

export default ListPage;
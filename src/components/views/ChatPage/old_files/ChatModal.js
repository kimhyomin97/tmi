
import React, { Button, List, ListItem, ListItemAvatar, ListItemText, Modal} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import db from '../../firebase';
import {makeStyles} from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absoulte',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function ChatModal(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    // const updateTodo = () => {
    //     db.collection('messages').doc(props.message.id).set({
    //         message: input
    //     }, {merge: true})
    //     setOpen(false);
    // }
    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})
        setOpen(false);
    }
    return(
        <>
        <Modal open={open} onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <h1>I am a modal</h1>
                <input placeholder={props.todo.todo} value={input} onChange={e => setInput(e.target.value)} />
                <Button onClick={updateTodo}>Update Todo</Button>
            </div>
        </Modal>
        <List className="todo__list">
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Dummy deadline" />
            </ListItem>
            <Button onClick={e => setOpen(true)}>Edit</Button>
            <DeleteForeverIcon onClick={e => db.collection('todos').doc(props.todo.id).delete()} />
        </List>
        </>
        // 이부분 지우고 실시간 채팅으로 바꿔주는 작업부터 하면 된다
    )
}
export default ChatModal;
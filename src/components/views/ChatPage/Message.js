import { forwardRef, useEffect, useState } from 'react';
import { FormControl, Button, Input, InputLabel, Card, CardContent, Typography} from '@material-ui/core';

const Message = forwardRef(({ message, username }, ref) => {
    const isUser = username === message.username;

    return (
        <div ref={ref} className={`message ${isUser && 'msg_user'}`}>
            <Card className = {isUser ? "msg_user_card" : "msg_guest_card"}>
                <CardContent>
                    <Typography color="white" variant="h5" component="h2" >
                        {!isUser && `${message.username || 'Unknown User'}: `} {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message
import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

// Mock data for threads
const threads = [
    { id: 1, title: 'First Thread', content: 'This is the first thread', tags: 'Intro,Start', comments: [{ author: 'JaneDoe', content: 'Nice thread!' }] },
    { id: 2, title: 'Second Thread', content: 'This is the second thread', tags: 'Second,More', comments: [] }
];

function CommentingPage() {
    const [open, setOpen] = useState(false);
    const [selectedThread, setSelectedThread] = useState(null);
    const [comment, setComment] = useState('');

    const handleClickOpen = (thread) => {
        setSelectedThread(thread);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const postComment = () => {
        if (comment) {
            const updatedThread = {
                ...selectedThread,
                comments: [...selectedThread.comments, { author: 'CurrentUser', content: comment }]
            };
            // Update the state with the new comment
            setSelectedThread(updatedThread);
            // Ideally, update this to your backend
            setComment('');
            handleClose();
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4">Threads</Typography>
            <List>
                {threads.map((thread) => (
                    <ListItem button onClick={() => handleClickOpen(thread)} key={thread.id}>
                        <ListItemAvatar>
                            <Avatar>{thread.title[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={thread.title} secondary={thread.tags} />
                    </ListItem>
                ))}
            </List>
            {selectedThread && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{selectedThread.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{selectedThread.content}</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Your Comment"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={comment}
                            onChange={handleCommentChange}
                        />
                        <List>
                            {selectedThread.comments.map((c, index) => (
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar>{c.author[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={c.author} secondary={c.content} />
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={postComment}>Post Comment</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
}

export default CommentingPage;

import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {Form, Button} from 'react-bootstrap'

import { Context } from '..';
import { createNote } from '../http/noteAPI';

const Forma = observer ( () => {

    const {pathname} = useLocation()

    const {user} = useContext(Context)
    const {note} = useContext(Context)
    const {alert} = useContext(Context)

    const click = event => {
        event.preventDefault()

        if (note.title.trim()) {
            try {
                const newNote = {
                    title: note.title,
                    author: user.user.username,
                    type: pathname.slice(1) === "" ? "todo" : pathname.slice(1)
                }
                createNote(newNote).then(res => {
                    note.addNote(res.data)
                }).then(() => {
                    alert.showAlert("Заметка успешно создана", "success")
                })
            } catch(e) {
                alert.showAlert(e.message, "danger")
            }
            note.setTitle("")
        } else {
            alert.showAlert('Введите название заметки', "warning")
        }
    }

    return (
        <>
            <Form className="mt-2" onSubmit={click}>
                <Form.Group 
                    className="mb-3" 
                    value={note.title} 
                    onChange={e => note.setTitle(e.target.value)}
                >
                    <Form.Control placeholder="Add new note" />
                </Form.Group>
                <Button onClick={() => console.log(pathname)}>
                    XX
                </Button>
            </Form>
        </>
    );
});

export default Forma;
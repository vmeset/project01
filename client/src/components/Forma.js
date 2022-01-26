import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import {Form} from 'react-bootstrap'

import { Context } from '..';
import { createNote } from '../http/noteAPI';

const Forma = observer ( () => {

    const {user} = useContext(Context)
    const {note} = useContext(Context)
    const {pathname} = useLocation()

    const [value, setValue] = useState('')

    const click = event => {
        event.preventDefault()

        // useEffect(() => {
        //     fetchNotes(user.user.username, 1, 9).then(data => {
        //         note.setNotes(data)
        //     })
        // }, [])

        if (value.trim()) {
            try {
                const newNote = {
                    title: value,
                    author: user.user.username,
                    type: pathname.slice(1)
                }
                createNote(newNote).then(res => {
                    note.addNote(res.data)
                })
                setValue('')
            } catch (e) {
                alert(e.message)
            }
            // const newNote = {
            //     title: noteTitle,
            //     author: user.user.username
            // }
            // const response = createNote(newNote)
            // note.addNote(response)
            
            // console.log(response)
        } else {
            alert('Введите название заметки')
        }
        // setValue('')
    }

    return (
        // <Form className="mt-2" onSubmit={click}>
        //     <Form.Group 
        //         className="mb-3" 
        //         value={noteTitle} 
        //         onChange={e => setNoteTitle(e.target.value)}
        //     >
        //         <Form.Control placeholder="Add new note" />
        //     </Form.Group>
        // </Form>
        <form onSubmit={click}>
            <div>
                <input
                    type="text"
                    placeholder="Введите название заметки"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        </form>
    );
});

export default Forma;
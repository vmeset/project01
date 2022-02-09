import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import { Context } from '..';
import { deleteNote, updateNote } from '../http/noteAPI';
import { NOTE_ROUTE } from '../utils/consts';

const Note = observer( ({notka}) => {

    const navigate = useNavigate()
    const {note} = useContext(Context)

    const onRemove = async () => {
        await deleteNote(notka._id)
        note.removeNote(notka._id)
    }

    const onComplete = async () => {
        notka.isCompleted = !notka.isCompleted
        await updateNote(notka)
        // note.toggleNote(notka._id)
        console.log(notka.isCompleted)
    }

    return (
        <Row 
            style={{cursor: "pointer"}}
        >
            <Col md={8}
                onClick={() => navigate(NOTE_ROUTE + '/' + notka._id)}
            >
                {notka.title}
            </Col>
            <Col md={2}>
                05.01.1986
            </Col>
            <Col md={2}
                className='spa'
            >
                <Button
                    variant="outline-success"
                    onClick={() => onComplete(notka._id)}
                >
                    {notka.isCompleted ? `↩` : '✓'}
                </Button>
                <Button
                    variant="outline-danger"
                    onClick={onRemove}
                >
                    &times;
                </Button>
            </Col>
        </Row>
    );
});

export default Note;
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import { deleteNote } from '../http/noteAPI';
import { NOTE_ROUTE } from '../utils/consts';

const Note = ({note}) => {

    const navigate = useNavigate()

    const onRemove = async () => {
        await deleteNote(note._id)
    }

    const onComplete = async () => {
        // await 
    }

    return (
        <Row 
            style={{cursor: "pointer"}}
        >
            <Col md={8}
                onClick={() => navigate(NOTE_ROUTE + '/' + note._id)}
            >
                {note.title}
            </Col>
            <Col md={2}>
                04:20 05.01
            </Col>
            <Col md={2}
                className='spa'
            >
                <Button
                    variant="outline-success"
                    onClick={() => onComplete(note.id)}
                >
                    ✓
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
};

export default Note;
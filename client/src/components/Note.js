import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import * as moment from "moment";

import { Context } from '..';
import { updateNote } from '../http/noteAPI';
import { NOTE_ROUTE } from '../utils/consts';

const Note = observer( ({notka}) => {

    const navigate = useNavigate()
    const {alert} = useContext(Context)

    const showModal = () => {
        alert.setModalVisible(true)
        alert.setModalNoteId(notka._id)
    }

    const onComplete = async () => {
        notka.isCompleted = !notka.isCompleted
        await updateNote(notka)
    }

    const formatDate = (date) => {
        return (
            moment(date).format("h:mm, DD.MM.YYYY")
        )
    }

    return (
        <ListGroup.Item 
            style={{cursor: "pointer"}}
            className="notka"
        >
            <Row>
                <Col md={8}
                    onClick={() => navigate(NOTE_ROUTE + '/' + notka._id)}
                >
                    {notka.title}
                </Col>
                <Col md={2}>
                    <small>{formatDate(notka.date)}</small>
                </Col>
                <Col md={2}
                >
                    <Button
                        variant="outline-success"
                        onClick={() => onComplete(notka._id)}
                        className="ms-5"
                    >
                        {notka.isCompleted ? `↩` : '✓'}
                    </Button>
                    <Button
                        variant="outline-danger"
                        onClick={showModal}
                        className="ms-4"
                    >
                        &times;
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    );
});

export default Note;
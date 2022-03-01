import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { Modal, Button } from 'react-bootstrap';

import { Context } from '..';
import { deleteNote } from '../http/noteAPI';

const ModalBlock = observer ( () => {

    const {alert} = useContext(Context)
    const {note} = useContext(Context)
  
    const handleClose = () => alert.setModalVisible(false);

    const onRemove = async () => {
        await deleteNote(alert.modalNoteId)
        note.removeNote(alert.modalNoteId)
        alert.setModalVisible(false)
    }

    return (
        <>
            <Modal show={alert.modalVisible} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удаляем, да?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Еще подумаю
                    </Button>
                    <Button variant="primary" onClick={onRemove}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default ModalBlock;
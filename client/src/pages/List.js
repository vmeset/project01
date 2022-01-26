import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { Context } from '..';
import Note from '../components/Note';
import { fetchNotes } from '../http/noteAPI';
import Forma from '../components/Forma'

const List = observer ( () => {

    const {note} = useContext(Context)
    const {user} = useContext(Context)

    useEffect(() => {
        fetchNotes(user.user.username, 1, 9).then(data => {
            note.setNotes(data)
        })
    }, [])

    // useEffect(() => {
    //     fetchDevices(null, null, 1, 2).then(data => {
    //         device.setDevices(data.rows)
    //         device.setTotalCount(data.count)
    //     })
    // }, [])

    // useEffect(() => {
    //     fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
    //         device.setDevices(data.rows)
    //         device.setTotalCount(data.count)
    //     })
    // }, [device.page, device.selectedType, device.selectedBrand,])

    // useEffect(() => {
    //     check().then(data => {
    //       if(data) {
    //         user.setIsAuth(true)
    //         user.setUser(data)
    //       }
    //     }).finally(() => setIsLoading(false))
    //   }, [])

    return (
        <Container>
            <Forma />
            <ListGroup>
                {note.notes.map(note => <Note key={note._id} note={note} />)}
            </ListGroup>
        </Container>
    );
});

export default List;
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import { observer } from 'mobx-react-lite';

import { Container, ListGroup } from 'react-bootstrap';

import { Context } from '..';
import { fetchNotes } from '../http/noteAPI';
import Forma from '../components/Forma'
import Note from '../components/Note';

const List = observer ( () => {

    const {note} = useContext(Context)
    const {user} = useContext(Context)
    const {pathname} = useLocation()

    useEffect(() => {
        fetchNotes(user.user.username, 1, 9).then(data => {
            note.setNotes(data)
        })
    }, [])

    const filterNotes = note.notes.filter(note => note.type === pathname.slice(1))

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
                {filterNotes.map(note => <Note key={note._id} notka={note} />)}
            </ListGroup>
        </Container>
    );
});

export default List;
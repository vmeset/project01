import { observer } from 'mobx-react-lite';
import React, {useState, useEffect} from 'react';
import { Button, ListGroup, Form, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import Note from '../components/Note';

const SortBlock = observer( ({notes}) => {

    const [searchVal, setSearchVal] = useState("")
    const [sort, setSort] = useState('asc')
    const [usNotes, setUsNotes] = useState([])

    useEffect(() => {
        setUsNotes(notes)
        // eslint-disable-next-line
    }, [notes])

    const onSort = (type) => {
        const copyNotes = notes.concat()
        const sortType = sort === 'asc' ? 'desc' : 'asc'
        const orderedNotes = _.orderBy(copyNotes, type, sortType)
        setSort(sortType)
        setUsNotes(orderedNotes)
    }

    return (
        <ListGroup>
            <Row className="justify-content-md-start mb-3">
                <Col xs lg="4">
                    Сортировка
                    <Button variant={'outline-dark'}
                        className='ms-2'
                        onClick={() => {
                            onSort("title")
                        }}
                    >
                        по имени
                    </Button>
                    <Button variant={'outline-dark'}
                        className='ms-2'
                        onClick={() => {
                            onSort("date")
                        }}
                    >
                        по дате
                    </Button>
                </Col>
                <Col md="8">
                    <Form.Control placeholder="поиск"
                        onChange={(e) => (setSearchVal(e.target.value))} 
                    />
                </Col>
            </Row>
            {usNotes.filter(val => {
                if (searchVal === "") {
                    return val
                } else if (val.title.toLowerCase().includes(searchVal.toLowerCase())) {
                    return val
                }
            }).map(note => <Note key={note._id} notka={note} />)}
        </ListGroup>
    );
});

export default SortBlock;
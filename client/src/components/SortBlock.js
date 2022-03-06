import { observer } from 'mobx-react-lite';
import React, {useState, useEffect} from 'react';
import { ListGroup } from 'react-bootstrap';
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
            <div>
                <button className="btn btn-light btn-sm"
                        onClick={() => {
                            onSort("title")
                        }}
                >
                    сортировка по имени
                </button>
                <input type="text" placeholder={"найди нужную заметку"} className="form-control-sm border light col-sm-8"
                       onChange={(e) => (setSearchVal(e.target.value))}/>
                <button className="btn btn-light btn-sm"
                        onClick={() => {
                            onSort("date")
                        }}
                >
                    сортировка по дате
                </button>

            </div>
            {usNotes.filter((val) => {
                if (searchVal == "") {
                    return val
                } else if (val.title.toLowerCase().includes(searchVal.toLowerCase())) {
                    return val
                }
            }).map(note => <Note key={note._id} notka={note} />)}
        </ListGroup>
    );
});

export default SortBlock;
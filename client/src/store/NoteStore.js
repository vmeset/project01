import { makeAutoObservable } from "mobx";

export default class NoteStore {
    constructor() {
        this._types = [
            {id: 1, cat: 'todo'},
            {id: 2, cat: 'buy'}
        ]
        this._notes = []
        makeAutoObservable(this)
    }
    setTypes(types) {
        this._types = types
    }
    setNotes(notes) {
        this._notes = notes
    }
    get types() {
        return this._types
    }
    get notes() {
        return this._notes
    }
    addNote(note) {
        this._notes.push(note)
    }
    removeNote(id) {
        this._notes = this._notes.filter(note => note._id !== id)
    }
    toggleNote(id) {
        this._notes = this.notes.map(note => note._id === id ? note.isCompleted = !note.isCompleted : note)
    }
}
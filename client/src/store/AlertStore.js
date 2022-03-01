import { makeAutoObservable } from "mobx";

export default class AlertStore {
    constructor() {
        this._alertVisible = false
        this._type = ""
        this._text = ""
        this._modalVisible = false
        this._modalNoteId = ""
        makeAutoObservable(this)
    }
    // setType(type) {
    //     this._type = type
    // }
    // setText(text) {
    //     this._text = text
    // }
    setAlertVisible(value) {
        this._alertVisible = value
    }
    setModalVisible(value) {
        this._modalVisible = value
    }
    setModalNoteId(id) {
        this._modalNoteId = id
    }
    showAlert(text, type) {
        this._type = type
        this._text = text
        this._alertVisible = true
    }
    hideAlert() {
        this._alertVisible = false
    }
    get modalNoteId () {
        return this._modalNoteId
    }
    get modalVisible () {
        return this._modalVisible
    }
    get type() {
        return this._type
    }
    get text() {
        return this._text
    }
    get alertVisible() {
        return this._alertVisible
    }
}
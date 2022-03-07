import { warningText } from "../styles/_InfoModal.module.scss"

function InfoModal({ text }) {
    return (
        <h1 className={warningText}>{text}</h1>
    )
}

export default InfoModal

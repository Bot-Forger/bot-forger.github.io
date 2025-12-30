import ReactModal from 'react-modal';
import './modal.css';

function Modal (props) {
    return (
        <ReactModal
            isOpen={props.isOpen}
            onRequestClose={props.onClose}
            contentLabel={props.name}
            style={{
                overlay: {
                    zIndex: 80,
                    backgroundColor: 'color-mix(in srgb, var(--tertiary-color) 75%, transparent)'
                },
                content: {
                    zIndex: 80,
                    width: props.width || 500,
                    height: props.height || 400,
                    margin: 'auto',
                    backgroundColor: 'var(--primary-color)',
                    color: 'var(--secondary-color)',
                    // textAlign: 'center',
                    borderRadius: 5
                }
            }}
        >
            <div className='modal'>
                <h1>{props.name}</h1>
                {props.description &&
                    <p>{props.description}</p>
                }
                <hr />
                <div className='modal-contents'>
                    {props.children}
                </div>
                <div className='modal-close-options'>
                    {props.onSaveClose ? <>
                        <button onClick={props.onClose} className='modal-close'>Cancel</button>
                        <button onClick={props.onSaveClose} className='modal-save'>Save</button>
                    </> : 
                        <button onClick={props.onClose} className='modal-close'>Close</button>
                    }
                </div>
            </div>
        </ReactModal>
    )
}

export default Modal;
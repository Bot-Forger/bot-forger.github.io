import { useRef } from 'react';
import Modal from '../modal/modal';

import AccountStore from '../../lib/stores/account';

function CreateBotModal (props) {
    const inputRef = useRef(null);

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSaveClose={() => {
                AccountStore.createBot(inputRef.current.value)
                    .then(newId => location.href = `/editor/${newId}`)
                    .catch(error => {
                        props.onClose();
                        alert(`Failed to create bot: ${error}`)
                    });
            }}
            saveLabel='Create'
            name='Create Bot'
            height='15rem'
            style={{ margin: 10 }}
        >
            <span>Name</span>
            <input
                ref={inputRef}
                placeholder='Pick a cool name'
                style={{
                    margin: 10
                }}
            />
        </Modal>
    )
}

export default CreateBotModal;
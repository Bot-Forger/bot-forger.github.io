import { useState } from 'react';
import Modal from '../modal/modal';
import CommandsItem from './commands-item';

import BotStore from '../../lib/stores/bot';

import './commands-modal.css';

function CommandsModal (props) {
    const [modified, setIsModified] = useState(false);
    const [commands, setCommands] = useState(BotStore.getCommands());

    const handleAdd = () => {
        setCommands(prev => [
            ...prev,
            {
                name: '',
                NSFW: false,
                options: []
            }
        ]);
        setIsModified(true);
    };
 
    const handleDelete = index => {
        setCommands(prev => prev.filter((_, i) => i !== index));
        setIsModified(true);
    };

    const handleChange = (i, attr, value) => {
        setCommands(prev => {
            const c = [...prev];
            c[i][attr] = value;
            return c;
        });
        setIsModified(true);
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={() => {
                setIsModified(false);
                props.onClose();
            }}
            onSaveClose={() => {
                if (modified) {
                    BotStore.updateCommands(commands);
                }
                setIsModified(false);
                props.onClose();
            }}
            name="Commands"
            height={500}
        >
            {
                commands.map((command, i) => 
                    <CommandsItem
                        key={i}
                        name={command.name}
                        description={command.description}
                        NSFW={command.NSFW}
                        options={command.options || []}
                        onUpdate={(a, v) => handleChange(i, a, v)}
                        onDelete={() => handleDelete(i)}
                    />
                )
            }
            <button
                className='commands-add'
                onClick={handleAdd}
            >
                Add command
            </button>
        </Modal>
    );
}

export default CommandsModal;
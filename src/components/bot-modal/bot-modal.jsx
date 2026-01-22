import { useState } from 'react';
import Modal from '../modal/modal';
import BotStore from '../../lib/stores/bot';
import Setting from './setting';

import './bot-modal.css';

function BotModal (props) {
    const [settings, setSettings] = useState(BotStore.getBotSettings());
    const [modifiedSettings, setModifiedSettings] = useState([]);

    const handleSettingChange = (name, newValue) => {
        setSettings({...settings, [name]: newValue});
        if (!modifiedSettings.includes(name)) {
            setModifiedSettings([...modifiedSettings, name]);
        }
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={() => {
                setSettings(BotStore.getBotSettings());
                props.onClose();
            }}
            onSaveClose={() => {
                setModifiedSettings([]);
                BotStore.updateBotSettings(
                    Object.fromEntries(
                        Object.entries(settings)
                        .filter(([name, _]) => modifiedSettings.includes(name))
                    )
                );
                props.onClose();
            }}
            name="Bot Settings"
        >
            <Setting
                name="Name"
                value={settings['name'] || ''}
                placeholder="Pick a cool name"
                onChange={v => handleSettingChange('name', v.target.value)} 
            />
            <Setting
                name="Discord bot token"
                value={settings['token'] || '●'.repeat(settings['tokenLen']) || ''}
                desc="Your bot's token is used to deploy and run the bot."
                placeholder="Enter your bot token here"
                onChange={v => handleSettingChange('token', v.target.value)}
            />
            <Setting
                name="Discord bot ID"
                type="number"
                value={settings['app_id'] || ''}
                placeholder="Enter your bot ID here"
                onChange={v => handleSettingChange('app_id', v.target.value)}
            />
        </Modal>
    );
}

export default BotModal;
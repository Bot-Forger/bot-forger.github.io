import { useState, useEffect } from 'react';
import Button from '../button/button.jsx';
import Loader from '../loader/loader.jsx';

import BotStore from '../../lib/stores/bot';
import workspaceManager from '../../lib/workspace-manager.js';

function SaveButton () {
    const [saveDirty, setSaveDirty] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!saveDirty || saving) return;
        setSaving(true);
        await BotStore.save();
        await new Promise(res => setTimeout(res, 1000));
        setSaving(false);
        setSaveDirty(false);
    };

    useEffect(() => {
        const onSaveDirty = () => setSaveDirty(true);
        const onSave = () => setSaveDirty(false);
        workspaceManager.on('saveDirty', onSaveDirty);
        workspaceManager.on('save', onSave);
        return () => {
            workspaceManager.off('saveDirty', onSaveDirty);
            workspaceManager.off('save', onSave);
        };
    }, []);

    if (!saveDirty || !BotStore.botLoaded) return null;

    return (
        <Button
            id='save'
            onClick={handleSave}
            style={{
                marginTop: '0.2rem'
            }}
        >
            {saving &&
                <Loader
                    style={{
                        width: 15,
                        height: 15,
                        border: '3px solid white',
                        borderBottomColor: 'transparent'
                    }}
                />
            }
           <span className='save-text'>{saving ? 'Saving..' : 'Save Now'}</span>
        </Button>
    );
}

export default SaveButton;
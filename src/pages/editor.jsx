import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import Blocks from '../components/blocks/blocks.jsx';
import MenuBar from '../components/menu-bar/menu-bar.jsx';
import Button from '../components/button/button.jsx';
import Loader from '../components/loader/loader.jsx';
import DropdownMenu from '../components/menu-bar/dropdown.jsx';

import workspaceManager from '../lib/workspace-manager.js';
import ThemeStore from '../lib/stores/theme.js';
import BotStore from '../lib/stores/bot.js';

import SecretsModal from '../components/secrets-modal/secrets-modal.jsx';
import BotModal from '../components/bot-modal/bot-modal.jsx';
import CommandsModal from '../components/commands-modal/commands-modal.jsx';
import ControlPanel from '../components/control-panel/control-panel.jsx';

export default function Editor () {
    const [modalOpen, setModalOpen] = useState(null);
    const [workspaceAttached, setWorkspaceAttached] = useState(false);
    const handleModalClose = () => setModalOpen(null);
    const { id } = useParams();

    const { isPending, error } = useQuery({
        queryKey: ['botData'],
        queryFn: () => BotStore.loadFromID(id)
    });

    useEffect(() => {
        const handleWorkspaceAttached = () => setWorkspaceAttached(true);
        workspaceManager.on('attached', handleWorkspaceAttached);
        return () => workspaceManager.off('attached', handleWorkspaceAttached);
    }, []);

    useEffect(() => {
        if (workspaceAttached && !isPending && BotStore.botLoaded && workspaceManager.workspace) {
            workspaceManager.loadWorkspaceFromJSON(BotStore.bot.data);
        }
    }, [workspaceAttached, isPending]);

    if (error && !isPending) {
        console.error(error);
        history.replaceState(null, "", "/editor");
    }

    if (isPending) {
        return <Loader />;
    }

    return (
        <div className='page-wrapper'>
            <MenuBar>
                <DropdownMenu label="File">
                    <Button onClick={() => BotStore.loadFromFile()}>Load from file</Button>
                    <Button onClick={() => BotStore.saveAs()}>Save as</Button>
                </DropdownMenu>
                <DropdownMenu label="Edit">
                    <Button onClick={() => ThemeStore.toggleTheme()}>Change Theme</Button>
                    <Button disabled={!BotStore.botLoaded} onClick={() => setModalOpen('commands')}>Commands</Button>
                    <Button disabled={!BotStore.botLoaded} onClick={() => setModalOpen('secrets')}>Secrets</Button>
                    <Button disabled={!BotStore.botLoaded} onClick={() => setModalOpen('botSettings')}>Bot Settings</Button>
                </DropdownMenu>
                {BotStore.botLoaded && BotStore.loadedFromId &&
                    <Button onClick={() => setModalOpen('controlPanel')}>Control Panel</Button>
                }
                <Button onClick={() => window.open('https://scratch.mit.edu/users/lordcat__/#comments', '_blank')}>Feedback</Button>
            </MenuBar>
            <Blocks />
            <BotModal
                isOpen={modalOpen === 'botSettings'}
                onClose={handleModalClose}
            />
            <CommandsModal
                isOpen={modalOpen === 'commands'}
                onClose={handleModalClose}
            />
            <SecretsModal
                isOpen={modalOpen === 'secrets'}
                onClose={handleModalClose}
            />
            <ControlPanel
                isOpen={modalOpen === 'controlPanel'}
                onClose={handleModalClose}
            />
        </div>
    );
}
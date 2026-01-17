import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import BlocklyWorkspace from '../components/blocks/blocks.jsx';
import MenuBar from '../components/menu-bar/menu-bar.jsx';
import Button from '../components/button/button.jsx';
import DropdownMenu from '../components/menu-bar/dropdown.jsx';

import workspaceManager from '../lib/workspace-manager.js';
import ThemeStore from '../lib/stores/theme.js';
import AccountStore from '../lib/stores/account.js';

import SecretsModal from '../components/secrets-modal/secrets-modal.jsx';
import BotModal from '../components/bot-modal/bot-modal.jsx';
import CommandsModal from '../components/commands-modal/commands-modal.jsx';

export default function Editor () {
    const [modalOpen, setModalOpen] = useState(null);

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
                refetchIntervalInBackground: false,
            }
        }
    });

    const handleModalClose = () => setModalOpen(null);

    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <div className='page-wrapper'>
                <MenuBar>
                    <DropdownMenu label="File">
                        <Button onClick={() => workspaceManager.loadWorkspaceFromFile()}>Load from file</Button>
                        <Button onClick={() => workspaceManager.saveWorkspaceToFile('hi.botf')}>Save as</Button>
                    </DropdownMenu>
                    <DropdownMenu label="Edit">
                        <Button onClick={() => ThemeStore.toggleTheme()}>Change Theme</Button>
                        <Button disabled={!AccountStore.hasSession} onClick={() => setModalOpen('commands')}>Commands</Button>
                        <Button disabled={!AccountStore.hasSession} onClick={() => setModalOpen('secrets')}>Secrets</Button>
                        <Button disabled={!AccountStore.hasSession} onClick={() => setModalpen('botSettings')}>Bot Settings</Button>
                    </DropdownMenu>
                </MenuBar>
                <BlocklyWorkspace />
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
            </div>
        </QueryClientProvider>
    )
}
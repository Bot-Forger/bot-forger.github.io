import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import BlocklyWorkspace from '../components/blocks/blocks.jsx';
import EditorMenuBar from '../components/editor-bar/editor-bar.jsx';

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
            <div className='editor-container'>
                <EditorMenuBar
                    onMenuOpen={menu => setModalOpen(menu)}
                />
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
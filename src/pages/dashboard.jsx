import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import NavBar from '../components/nav-bar/nav-bar.jsx';
import SideBar from '../components/side-bar/side-bar.jsx';

import Bots from '../components/bots/bots.jsx';
import Preferences from '../components/preferences/preferences.jsx';

import CreateBotModal from '../components/create-bot-modal/create-bot-modal.jsx';

import AccountStore from '../lib/stores/account.js';

export default function Dashboard () {
    const [page, setPage] = useState('bots');
    const [modalOpen, setModalOpen] = useState(null);

    const handleModalClose = () => setModalOpen(null);

    if (!AccountStore.hasSession) {
        location.href = '/';
    }

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
                refetchIntervalInBackground: false,
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <div className='page-wrapper'>
                <NavBar />
                <div className='dashboard-container'>
                    <SideBar onPageSelect={setPage} />
                    {page === 'bots' && <Bots onModalOpen={setModalOpen} />}
                    {page === 'preferences' && <Preferences />}
                </div>
                <CreateBotModal
                    isOpen={modalOpen === 'createBot'}
                    onClose={handleModalClose}
                />
            </div>
        </QueryClientProvider>
    )
}

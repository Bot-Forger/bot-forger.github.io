import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import AccountManagement from './account.jsx';
import SaveButton from './save.jsx';
import AccountStore from '../../lib/stores/account.js';
import BotStore from '../../lib/stores/bot.js';

import Button from '../button/button.jsx';

import './menu-bar.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function EditorMenuBar (props) {
    const { isPending, error, data: accountData } = useQuery({
        queryKey: ['accountData'],
        queryFn: () => AccountStore.fetchAccountData()
    });
    const queryClient = useQueryClient();

    const handleSignIn = () => {
        window.open(`${BACKEND_URL}/login`);
    };

    const handleSignOut = () => {
        AccountStore.clearSession();
        queryClient.invalidateQueries({
            queryKey: ['accountData']
        });
        location.href = location.origin;
    };

    useEffect(() => {
        const handleWindowMessage = event => {
            console.log(typeof event.data === 'object', event.data.type === 'login_success');
            if (typeof event.data === 'object' && event.data.type === 'login_success') {
                AccountStore.addSession(event.data.sessionID);
                location.reload();
            }
        };
        
        window.addEventListener('message', handleWindowMessage);
        return () => window.removeEventListener('message', handleWindowMessage);
    }, []);

    return (
        <div className='menu-bar'>
            <div className='menu-bar-main'>
                {props.children}
            </div>
            <div className='menu-bar-side'>
                {location.pathname.startsWith('/editor') &&
                    <SaveButton />
                }
                {accountData ?
                    <AccountManagement
                        username={accountData.username}
                        avatarURL={`https://cdn.discordapp.com/avatars/${accountData.id}/${accountData.avatar}.png`}
                        onSignOut={handleSignOut}
                    /> : (!isPending && !error && 
                        <Button onClick={handleSignIn}>Sign in</Button>
                    )
                }
            </div>
        </div>
    );
}
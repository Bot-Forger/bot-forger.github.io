import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import Button from './button.jsx';
import DropdownMenu from './dropdown.jsx';
import AccountManagement from './account.jsx';

import workspaceManager from '../../lib/workspace-manager.js';
import ThemeStore from '../../lib/stores/theme.js';
import AccountStore from '../../lib/stores/account.js';

import './editor-bar.css';

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
        <div className='editor-bar'>
            <div className='editor-bar-main'>
                <DropdownMenu label="File">
                    <Button onClick={() => workspaceManager.loadWorkspaceFromFile()}>Load from file</Button>
                    <Button onClick={() => workspaceManager.saveWorkspaceToFile('hi.botf')}>Save as</Button>
                </DropdownMenu>
                <DropdownMenu label="Edit">
                    <Button onClick={() => ThemeStore.toggleTheme()}>Change Theme</Button>
                    <Button disabled={!AccountStore.hasSession} onClick={() => props.onMenuOpen('secrets')}>Secrets</Button>
                    <Button disabled={!AccountStore.hasSession} onClick={() => props.onMenuOpen('botSettings')}>Bot Settings</Button>
                </DropdownMenu>
            </div>
            <div className='editor-bar-side'>
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
    )
}
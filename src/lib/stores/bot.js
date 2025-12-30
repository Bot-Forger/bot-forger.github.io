import { EventEmitter } from 'events';
import notify from '../notify';

import AccountStore from './account';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

class BotStore extends EventEmitter {
    constructor () {
        super();

        this.bot = {};
    }
    getCommands () {
        return this.bot.commands ?? [];
    }
    updateCommands (commands) {
        fetch(`${BACKEND_URL}/applications/${this.bot.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ commands }),
            headers: { 'x-session-token': AccountStore.session.token }
        }).then(response => {
            if (!response.ok) {
                notify('error', `Failed to update commands: ${response.statusText} ${response.status}`);
            }
        });
    }
    getBotSettings () {
        return this.bot.meta ?? {};
    }
    updateBotSettings (updatedSettings) {
        if (Object.keys(updatedSettings).length < 1) return;
        fetch(`${BACKEND_URL}/applications/${this.bot.id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedSettings),
            headers: { 'x-session-token': AccountStore.session.token }
        }).then(response => {
            if (!response.ok) {
                notify('error', `Failed to update bot settings: ${response.statusText} ${response.status}`);
            }
        });
    }
    async fetchSecrets () {
        const response = await fetch(`${BACKEND_URL}/applications/${this.bot.id}/secrets`, {
            headers: { 'x-session-token': AccountStore.session.token }
        });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return await response.json();
    }
    postSecrets (secrets) {
        fetch(`${BACKEND_URL}/applications/${this.bot.id}/secrets`, {
            method: 'POST',
            body: JSON.stringify(secrets),
            headers: { 'x-session-token': AccountStore.session.token }
        }).then(response => {
            if (!response.ok) {
                notify('error', `Failed to update bot secrets: ${response.status} ${response.statusText}`);
            }
        });
    }
}

export default new BotStore;
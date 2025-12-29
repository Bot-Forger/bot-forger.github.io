import { EventEmitter } from 'events';
import notify from '../notify';
import Cookie from 'js-cookie';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

class BotStore extends EventEmitter {
    constructor () {
        super();

        this.bot = {};
    }
    getBotSettings () {
        return this.bot.meta ?? {};
    }
    updateBotSettings (updatedSettings) {
        if (Object.keys(updatedSettings).length < 1) return;
        fetch(`${BACKEND_URL}/applications/${this.bot.id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedSettings),
            headers: { 'x-session-token': this.sessionToken }
        }).then(response => {
            if (!response.ok) {
                notify('error', `Failed to update bot settings: ${response.statusText} ${response.status}`);
            }
        });
    }
    async fetchSecrets () {
        return {
            ok: 'who',
            thosr: 'ddede'
        }
        /*
        const response = await fetch(`${BACKEND_URL}/applications/${this.bot.id}/secrets`, {
            headers: { 'x-session-token': this.sessionToken }
        });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return await response.json();
        */
    }
    postSecrets (secrets) {
        fetch(`${BACKEND_URL}/applications/${this.bot.id}/secrets`, {
            method: 'POST',
            body: JSON.stringify(secrets),
            headers: { 'x-session-token': this.sessionToken }
        }).then(response => {
            if (!response.ok) {
                notify('error', `Failed to update bot secrets: ${response.status} ${response.statusText}`);
            }
        });
    }
}

export default new BotStore;
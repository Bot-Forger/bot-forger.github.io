import { EventEmitter } from 'events';
import notify from '../notify';

import AccountStore from './account';
import workspaceManager from '../workspace-manager';
import fileManager from '../file-manager';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

class BotStore extends EventEmitter {
    constructor () {
        super();

        this.bot = {};
        this.botLoaded = false;
        this.loadedFromId = false;
    }
    clear () {
        this.bot = {};
        this.botLoaded = false;
        this.loadedFromId = false;
    }
    async loadFromID (id) {
        if (!id || !AccountStore.hasSession) return null;
        console.log('ok')
        const response = await fetch(`${BACKEND_URL}/applications/${id}`, {
            headers: { 'x-session-token': AccountStore.session.token }
        });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        this.bot = await response.json();
        this.botLoaded = true;
        
        this.bot.commands = JSON.parse(this.bot.commands);
        this.bot.blocks = JSON.parse(this.bot.blocks);
        this.loadedFromId = true;

        return null;
    }
    async loadFromFile () {
        const file = await fileManager.loadFile('*.botf');
        try {
            const json = JSON.parse(await file.text());
            this.bot = json;
            await workspaceManager.loadWorkspaceFromJSON(json);
            this.botLoaded = true;
        } catch (e) {
            this.clear();
            alert(`Failed to load file: ${e.message}`);
        }
    }
    async saveAs () {
        const serializedWorkspace = workspaceManager.saveWorkspaceToJSON();
        this.bot.blocks = serializedWorkspace.blocks;
        await fileManager.saveFileAs('MyBot.botf', JSON.stringify(this.bot));
        this.botLoaded = true;
        workspaceManager.saveDirty = false;
    }
    async save () {
        if (!this.botLoaded) return;
        const serializedWorkspace = workspaceManager.saveWorkspaceToJSON();
        this.bot.blocks = serializedWorkspace.blocks;
        if (this.loadedFromId) {
            const response = await fetch(`${BACKEND_URL}/applications/${this.bot.id}`, {
                method: 'PATCH',
                body: JSON.stringify(serializedWorkspace),
                headers: {
                    'Content-Type': 'application/json',
                    'x-session-token': AccountStore.session.token
                }
            });
            if (!response.ok) {
                throw new Error('Failed to update blocks');
            }
        } else {
            fileManager.saveFile(this.bot.name + '.botf', JSON.stringify(this.bot));
        }
        workspaceManager.saveDirty = false;
    }
    getCommands () {
        return this.bot.commands ?? [];
    }
    updateCommands (commands) {
        fetch(`${BACKEND_URL}/applications/${this.bot.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ commands }),
            headers: {
                'Content-Type': 'application/json',
                'x-session-token': AccountStore.session.token
            }
        }).then(response => {
            if (!response.ok) {
                notify('error', `Failed to update commands: ${response.statusText} ${response.status}`);
            }
        });
    }
    getBotSettings () {
        return this.bot ?? {};
    }
    updateBotSettings (updatedSettings) {
        if (Object.keys(updatedSettings).length < 1) return;
        fetch(`${BACKEND_URL}/applications/${this.bot.id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedSettings),
            headers: {
                'Content-Type': 'application/json',
                'x-session-token': AccountStore.session.token
            }
        }).then(response => {
            if (!response.ok) {
                notify('error', `Failed to update bot settings: ${response.statusText} ${response.status}`);
                return;
            }
            for (const [key, value] of Object.entries(updatedSettings)) {
                this.bot[key] = value;
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
            headers: {
                'Content-Type': 'application/json',
                'x-session-token': AccountStore.session.token
            }
        }).then(response => {
            if (!response.ok) {
                notify('error', `Failed to update bot secrets: ${response.status} ${response.statusText}`);
            }
        });
    }
    async startBot () {
        const response = await fetch(`${BACKEND_URL}/applications/${this.bot.id}/start`, {
            method: 'POST',
            headers: { 'x-session-token': AccountStore.session.token }
        });
        if (!response.ok) {
            notify('error', `Failed to start bot: ${response.status} ${response.statusText}`);
            return;
        }
    }
    async stopBot () {
        const response = await fetch(`${BACKEND_URL}/applications/${this.bot.id}/stop`, {
            method: 'POST',
            headers: { 'x-session-token': AccountStore.session.token }
        });
        if (!response.ok) {
            notify('error', `Failed to stop bot: ${response.status} ${response.statusText}`);
            return;
        }
    }
}
const b = new BotStore;
window.BotStore = b;
export default b;
import { EventEmitter } from 'events';
import notify from '../notify';
import Cookie from 'js-cookie';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

class AccountStore extends EventEmitter {
    constructor (sessionToken) {
        super();

        this.session = {
            token: sessionToken ?? null
        };
        this.hasSession = !!sessionToken;
    }
    clearSession () {
        if (!this.session.token) return;
        Cookie.remove('session-token');
    }
    addSession (sessionToken) {
        if (this.session.token) return;
        Cookie.set('session-token', sessionToken, {
            expires: 7
        });
    }
    async fetchAccountData () {
        if (!this.session.token) return null;
        if (this.session.user) return this.session.user;
    
        const response = await fetch(`${BACKEND_URL}/me`, {
            headers: { 'x-session-token': this.session.token }
        });
        if (!response.ok) {
            return null;
        }
        const json = await response.json();
        this.session.user = json;
        return json;
    }
    
    async fetchBots () {
        if (!this.session) throw new Error('No session');
        const response = await fetch(`${BACKEND_URL}/me/applications`, {
            headers: { 'x-session-token': this.session.token }
        });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return await response.json();
    }
    
   /*
   fetchBots () {
    return new Promise(resolve => setTimeout(
        () => resolve([{
            app_id: 28374,
            name: 'honk'
        }, {
            app_id: 28374,
            name: 'honk'
        }]),
        2000
    ));
   }
    */
    async createBot (name) {
        if (!this.session) throw new Error('No session');
        const response = await fetch(`${BACKEND_URL}/applications/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-session-token': this.session.token
            },
            body: JSON.stringify({ name })
        });

        const responseJSON = await response.json();

        if (!response.ok) {
            throw new Error(responseJSON.error)
        }

        return responseJSON.id;
    }
    async deleteBot (id) {
        if (!this.session) throw new Error('No session');
        const response = await fetch(`${BACKEND_URL}/applications/${id}`, {
            method: 'DELETE',
            headers: { 'x-session-token': this.session.token }
        });
        if (!response.ok) {
            notify('error', `Failed to delete bot: ${response.status}`);
            throw new Error(response.status);
        }

        
    }
}

export default new AccountStore(Cookie.get('session-token'));
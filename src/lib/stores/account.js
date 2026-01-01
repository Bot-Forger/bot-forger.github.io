import { EventEmitter } from 'events';
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
}

export default new AccountStore(Cookie.get('session-token'));
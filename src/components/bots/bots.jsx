import { useQuery } from '@tanstack/react-query';

import Loader from '../loader/loader.jsx';
import Error from '../error/error.jsx';
import BotItem from './bot-item.jsx';

import AccountStore from '../../lib/stores/account.js';

import './bots.css';

function DashboardBots (props) {
    const { isPending, error, data } = useQuery({
        queryKey: ['accountBots'],
        queryFn: () => AccountStore.fetchBots()
    });

    const handleNew = () => props.onModalOpen('createBot');
    const handleDelete = id => 
        AccountStore.deleteBot(id)
        .then(() => location.reload());
    

    if (isPending) {
        return <Loader />;
    }

    if (error) {
        return <Error message={`Failed to fetch bots: ${error.message}`} />;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button className='bots-new' onClick={handleNew}>New</button>
            <div className='bots-container'>
                {
                    data.map((bot, i) => 
                        <BotItem
                            key={i}
                            id={bot.id}
                            name={bot.name}
                            description={bot.description}
                            lastUpdated={new Date(bot.last_updated)}
                            onDelete={handleDelete}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default DashboardBots;
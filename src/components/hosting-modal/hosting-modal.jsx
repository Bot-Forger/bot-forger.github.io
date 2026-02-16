import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import Modal from '../modal/modal';
import Console from '../console/console';

import BotStore from '../../lib/stores/bot';

import './hosting-modal.css';

const RUNNER_URL = import.meta.env.VITE_RUNNER_URL;

function relativeElapsed(startTime) {
  const diffMs = Date.now() - startTime;
  let duration = diffMs / 1000;

  const divisions = [
    { amount: 60, unit: 'second' },
    { amount: 60, unit: 'minute' },
    { amount: 24, unit: 'hour' },
    { amount: 7, unit: 'day' },
    { amount: 4.34524, unit: 'week' },
    { amount: 12, unit: 'month' },
    { amount: Infinity, unit: 'year' }
  ];

  for (const { amount, unit } of divisions) {
    if (duration < amount) {
      const value = Math.round(duration);
      return `${value} ${unit}${value === 1 ? '' : 's'}`;
    }
    duration /= amount;
  }
}

function ControlPanel (props) {
    const [logs, setLogs] = useState([]);
    const [connected, setConnected] = useState(false);
    const [status, setStatus] = useState('Loading..');
    const [uptime, setUptime] = useState(null);
    const uptimeRef = useRef(null);
    const { id } = useParams();

    const botSettings = BotStore.getBotSettings();
    const canStart = botSettings.app_id && botSettings.tokenLen;

    const handleLog = log => setLogs(prevLogs => [...prevLogs, log]);

    const handleStart = () => {
        handleLog({ message: 'Starting bot..' });
        BotStore.startBot();
    }

    const handleStop = () => {
        handleLog({ message: 'Stopping bot..' });
        BotStore.stopBot();
    };

    useEffect(() => {
        if (status !== 'Started' || !uptime || !props.isOpen) return;
        const interval = setInterval(() => {
            if (uptimeRef.current) {
                uptimeRef.current.textContent = 'Uptime: ' + relativeElapsed(uptime);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [status, uptime, props.isOpen]);

    useEffect(() => {
        if (!props.isOpen || !canStart) return;
        const ws = new WebSocket(RUNNER_URL);
        ws.onopen = () => {
            ws.send(JSON.stringify({type: 'listen', id}));
            setConnected(true);
        };
        ws.onclose = () => setConnected(false);
        ws.onmessage = message => {
            const json = JSON.parse(message.data);
            if (json.logs){
                setLogs(json.logs);
                setStatus(json.running ? 'Started': 'Stopped');
                setUptime(json.startTime);
            } else if (json.type === 'console') {
                handleLog(json.log);
            } else if (json.type === 'status') {
                setStatus(json.status);
                if (json.status === 'Started') {
                    setUptime(Date.now());
                }
            }
        };

        return () => {
            if (
                ws.readyState === WebSocket.OPEN ||
                ws.readyState === WebSocket.CONNECTING
            ) {
                ws.close();
            }
            setConnected(false);
            setStatus('Loading..');
            setLogs([]);
        }
    }, [props.isOpen]);


    return (
        <Modal
            isOpen={props.isOpen}
            onClose={props.onClose}
            name="Hosting"
            height='33rem'
            className='hosting-modal'
            isLoading={!connected && canStart}
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div className='button-container'>
                <button onClick={handleStart} disabled={!connected || !canStart}>Start</button>
                <button onClick={handleStop} disabled={!connected || !canStart}>Stop</button>
            </div>
            {canStart ? 
                <p className='bot-status'>Bot Status: {status}</p> :
                <i>You must set the bots token and app ID in settings before running it.</i>
            }
            {status === 'Started' &&
                <p className='bot-uptime' ref={uptimeRef}>Uptime: {relativeElapsed(uptime)}</p>
            }
            <p>Console</p>
            <Console logs={logs} style={{ flex: 1 }} />
        </Modal>
    );
}

export default ControlPanel;
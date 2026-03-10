import React, { useState } from 'react';
import type { ChatConfig, Message, Sender } from '../types';

interface Props {
    config: ChatConfig;
    setConfig: React.Dispatch<React.SetStateAction<ChatConfig>>;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const ControlPanel: React.FC<Props> = ({ config, setConfig, messages, setMessages }) => {
    const [currentSender, setCurrentSender] = useState<Sender>('person1');
    const [msgTime, setMsgTime] = useState('1:27 PM');
    const [currentText, setCurrentText] = useState('');

    const addMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentText.trim()) return;

        const newMsg: Message = {
            id: Date.now().toString(),
            sender: currentSender,
            type: 'text',
            content: currentText,
            timestamp: msgTime,
            isRead: true, // simplified for now
        };

        setMessages([...messages, newMsg]);
        setCurrentText('');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (typeof ev.target?.result === 'string') {
                    const newMsg: Message = {
                        id: Date.now().toString(),
                        sender: currentSender,
                        type: 'image',
                        content: ev.target.result,
                        timestamp: msgTime,
                        isRead: true,
                    };
                    setMessages([...messages, newMsg]);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const addDateDivider = () => {
        const newMsg: Message = {
            id: Date.now().toString(),
            sender: 'system',
            type: 'date',
            content: '今天',
        };
        setMessages([...messages, newMsg]);
    };

    return (
        <div className="control-panel">
            {/* General Settings */}
            <div className="control-row">
                <div className="control-col checkbox-group">
                    <label>Parts :</label>
                    <label>
                        <input type="checkbox" checked={config.hideHeader} onChange={e => setConfig({ ...config, hideHeader: e.target.checked })} />
                        Hide Header
                    </label>
                    <label>
                        <input type="checkbox" checked={config.hideFooter} onChange={e => setConfig({ ...config, hideFooter: e.target.checked })} />
                        Hide Footer
                    </label>
                </div>
                <div className="control-col radio-group">
                    <label>Layout :</label>
                    <label>
                        <input type="radio" value="android" checked={config.layout === 'android'} onChange={() => setConfig({ ...config, layout: 'android' })} />
                        android
                    </label>
                    <label>
                        <input type="radio" value="iphone" checked={config.layout === 'iphone'} onChange={() => setConfig({ ...config, layout: 'iphone' })} />
                        iphone
                    </label>
                </div>
            </div>

            <div className="control-row" style={{ marginTop: '1rem' }}>
                <div className="control-col">
                    <label>Clock</label>
                    <input type="text" value={config.clock} onChange={e => setConfig({ ...config, clock: e.target.value })} />
                </div>
                <div className="control-col">
                    <label>Battery percent</label>
                    <input type="number" value={config.batteryPercent} min={0} max={100} onChange={e => setConfig({ ...config, batteryPercent: Number(e.target.value) })} />
                </div>
            </div>

            <div className="control-group" style={{ marginTop: '1rem' }}>
                <label>Direct message with</label>
                <input type="text" value={config.chatName} onChange={e => setConfig({ ...config, chatName: e.target.value })} />
            </div>

            {/* Message Adder */}
            <div className="person-controls">
                <div className="tabs">
                    <button type="button" className={`tab ${currentSender === 'person1' ? 'active' : ''}`} onClick={() => setCurrentSender('person1')}>Person 1</button>
                    <button type="button" className={`tab ${currentSender === 'person2' ? 'active' : ''}`} onClick={() => setCurrentSender('person2')}>Person 2</button>
                </div>

                <form onSubmit={addMessage}>
                    <div className="control-group">
                        <label>Time</label>
                        <input type="text" value={msgTime} onChange={e => setMsgTime(e.target.value)} />
                    </div>

                    <div className="control-group">
                        <label>Message</label>
                        <textarea rows={3} value={currentText} onChange={e => setCurrentText(e.target.value)}></textarea>
                    </div>

                    <div className="control-row">
                        <button type="submit" className="btn">Add Message 💬</button>
                        <label className="btn" style={{ cursor: 'pointer', backgroundColor: '#666' }}>
                            Add Image 📷
                            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                        </label>
                    </div>
                </form>
                <button type="button" className="btn" style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center', backgroundColor: '#aaa' }} onClick={addDateDivider}>
                    Add Date Divider
                </button>
            </div>

        </div>
    );
};

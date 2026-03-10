import { forwardRef } from 'react';
import { ChevronLeft, Search, Phone, Menu, Plus, Smile, Mic, Image as ImageIcon, Camera } from 'lucide-react';
import type { ChatConfig, Message } from '../types';

interface Props {
    config: ChatConfig;
    messages: Message[];
}

export const PhonePreview = forwardRef<HTMLDivElement, Props>(({ config, messages }, ref) => {
    const isIos = config.layout === 'iphone';

    return (
        <div className="phone-mockup" ref={ref} style={{ backgroundColor: isIos ? '#a1b8d2' : '#8096AE' }}>
            {/* Status Bar */}
            <div className="status-bar">
                <span>{config.clock}</span>
                <div className="icons">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 18V6a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2z"></path><path d="M23 18H3"></path></svg>
                    {config.batteryPercent}%
                    <div style={{ width: '16px', height: '8px', border: '1px solid white', borderRadius: '2px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '1px', left: '1px', bottom: '1px', backgroundColor: 'white', width: `${config.batteryPercent}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Header */}
            {!config.hideHeader && (
                <div className="line-header">
                    <ChevronLeft size={24} />
                    <div className="title">{config.chatName}</div>
                    <div className="actions">
                        <Search size={20} />
                        <Phone size={20} />
                        <Menu size={20} />
                    </div>
                </div>
            )}

            {/* Chat Area */}
            <div className="chat-area">
                {messages.map((msg, idx) => {
                    if (msg.type === 'date') {
                        return (
                            <div key={idx} className="chat-date">
                                <span>{msg.content}</span>
                            </div>
                        );
                    }

                    const isLeft = msg.sender === 'person1'; // person1 is left (other), person2 is right (me)

                    return (
                        <div key={idx} className={`message ${isLeft ? 'left' : 'right'}`}>
                            <div className="avatar">LINE</div>
                            <div className="bubble-wrap">
                                <div className="message-wrap">
                                    {msg.type === 'image' ? (
                                        <img src={msg.content} alt="uploaded" style={{ maxWidth: '180px', borderRadius: '14px' }} />
                                    ) : (
                                        <div className="bubble">{msg.content}</div>
                                    )}
                                    <div className="message-meta">
                                        {!isLeft && msg.isRead && <span className="read-status">Read</span>}
                                        <span>{msg.timestamp}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            {!config.hideFooter && (
                <div className="line-footer">
                    <Plus size={24} color="#888" strokeWidth={1.5} />
                    <Camera size={24} color="#888" strokeWidth={1.5} />
                    <ImageIcon size={24} color="#888" strokeWidth={1.5} />
                    <div className="input-box">
                        <span className="input-placeholder">Aa</span>
                        <Smile size={20} color="#888" strokeWidth={1.5} />
                    </div>
                    <Mic size={24} color="#888" strokeWidth={1.5} />
                </div>
            )}
        </div>
    );
});

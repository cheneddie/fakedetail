export type DeviceOS = 'android' | 'iphone';
export type Sender = 'person1' | 'person2';
export type MessageType = 'text' | 'image' | 'date';

export interface Message {
    id: string;
    sender: Sender | 'system';
    type: MessageType;
    content: string; // text content or image URL
    timestamp?: string;
    isRead?: boolean;
}

export interface ChatConfig {
    hideHeader: boolean;
    hideFooter: boolean;
    layout: DeviceOS;
    clock: string;
    batteryPercent: number;
    chatName: string;
    person1Avatar?: string;
}

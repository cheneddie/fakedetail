import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import { Download } from 'lucide-react'
import type { ChatConfig, Message } from './types'
import { ControlPanel } from './components/ControlPanel'
import { PhonePreview } from './components/PhonePreview'
import './index.css'

function App() {
  const [config, setConfig] = useState<ChatConfig>({
    hideHeader: false,
    hideFooter: false,
    layout: 'android',
    clock: '10:04',
    batteryPercent: 50,
    chatName: 'John Doe',
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'system',
      type: 'date',
      content: '今天'
    },
    // {
    //   id: '2',
    //   sender: 'person1',
    //   type: 'text',
    //   content: 'Hello',
    //   timestamp: '1:55 PM'
    // },
    // {
    //   id: '3',
    //   sender: 'person2',
    //   type: 'text',
    //   content: 'Hii',
    //   timestamp: '1:20 PM',
    //   isRead: true
    // },
    // {
    //   id: '4',
    //   sender: 'person2',
    //   type: 'text',
    //   content: 'How are you?',
    //   timestamp: '1:20 PM',
    //   isRead: true
    // },
    // {
    //   id: '5',
    //   sender: 'person1',
    //   type: 'text',
    //   content: "I'm fine!",
    //   timestamp: '1:55 PM'
    // },
    // {
    //   id: '6',
    //   sender: 'person2',
    //   type: 'text',
    //   content: 'Ohh!',
    //   timestamp: '1:20 PM',
    //   isRead: true
    // }
  ]);

  const phoneRef = useRef<HTMLDivElement>(null);

  const downloadImage = () => {
    if (phoneRef.current === null) return;

    html2canvas(phoneRef.current, { backgroundColor: null, useCORS: true, scale: 2 })
      .then((canvas) => {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `fake-chat-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error capturing image:', err);
      });
  };

  return (
    <>
      <h1 className="header">Fake Line Chat Generator</h1>

      <div className="app-container">
        <ControlPanel
          config={config}
          setConfig={setConfig}
          messages={messages}
          setMessages={setMessages}
        />

        <div className="preview-container">
          <div className="live-preview-badge" style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#f9f1e1', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            Live preview
          </div>

          <PhonePreview
            ref={phoneRef}
            config={config}
            messages={messages}
          />

          <button className="btn download-btn" onClick={downloadImage}>
            Download As Image <Download size={18} />
          </button>
        </div>
      </div>
    </>
  )
}

export default App


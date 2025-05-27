import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftPane from './LeftPane';
import Carousel from './Carousel';
import App from '../App';
import dynamicData from '../data/dynamicData.json';
import { DynamicDataProvider } from '../context/DynamicDataContext';
import { FaFileAlt, FaGithub, FaArrowDown, FaArrowUp, FaChrome, FaExclamationTriangle } from 'react-icons/fa'; // Added arrow icons
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import demoChat   from './pics/demo_chat.png';
import demoMemory from './pics/demo_memory.png';
import demoPopup   from './pics/demo_popup.png';
import demoSuggestions from './pics/demo_suggestions.png';



const DemoPage = () => {
  const [selectedHour, setSelectedHour] = useState(1); // Default to 1 PM
  const [abstractExpanded, setAbstractExpanded] = useState(false); // State for abstract toggle
  const [activeChats, setActiveChats] = useState([]);
  const navigate = useNavigate();
  const screenshots = [
    { src: demoSuggestions, caption: 'The GUMBO App is a working desktop app, displaying suggestions to users live as they use their computer.' },
    { src: demoMemory, caption: 'The Memory page allows users to view the raw propositions in their GUM, and edit, delete, or add propositions.' },
    { src: demoPopup,   caption: 'GUMBO suggestions can be accessed easily from anywhere through a popup that can be opened at the bottom left of the screen' },
    { src: demoChat,   caption: 'Hitting "Start Chat" on a suggestion gives the user more detail into the suggestion and a view of what GUMBO has already completed for the user. Users can continue the conversation with GUMBO in the chat.' },
  ];
  const [shotIdx, setShotIdx] = useState(0);
  

  // Ensure we match the key type in dynamicData (keys as strings)
  const currentData = dynamicData[selectedHour.toString()] || { carousel: [], suggestions: [], activity: "" };

  const handleTimeChange = (newHour) => {
    setSelectedHour(newHour);
    setActiveChats([]);
    navigate('/');
  };

  const toggleAbstract = () => {
    setAbstractExpanded(!abstractExpanded);
  };

  const codeString = `from dotenv import load_dotenv
load_dotenv()

import asyncio
from gum import gum
from gum.observers import Screen

async def main():
    async with gum("Omar Shaikh", Screen()):
        await asyncio.Future() # run forever (Ctrl-C to stop)

if __name__ == "__main__":
    asyncio.run(main())
`;

  return (

    <div style={{margin: '0 auto', paddingLeft: '5%', paddingRight: '5%', paddingTop: '20px', paddingBottom: '20px' }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center', fontSize:'2.5em' }}>Knoll: Creating a Knowledge Ecosystem for Large Language Models</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 15px'}}>
          <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>Dora Zhao</div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 15px' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: '500', }}>Diyi Yang</div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 15px'}}>
          <div style={{ fontSize: '1.1rem', fontWeight: '500'}}>Michael S. Bernstein</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px' }}>
        <div style={{  fontWeight: '300' }}>Stanford University</div>

      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
        <a href="https://arxiv.org/abs/2505.19335" target="_blank" rel="noopener noreferrer" className="start-chat-button" style={{ padding: '12px 12px', fontSize: '16px', display: 'flex', alignItems: 'center', borderRadius: '18px' }}>
          <FaFileAlt style={{ marginRight: '0.5rem', fontSize: '18px' }} /> Paper
        </a>
        
        <a href="https://github.com/dorazhao99/community-lm-extension" target="_blank" rel="noopener noreferrer" className="start-chat-button" style={{ padding: '12px 12px', fontSize: '16px', display: 'flex', alignItems: 'center', borderRadius: '18px' }}>
          <FaGithub style={{ marginRight: '0.5rem', fontSize: '18px' }} /> GitHub
        </a>

        <a href="https://chromewebstore.google.com/detail/knoll/fmboebkmcojlljnachnegpbikpnbanfc" target="_blank" rel="noopener noreferrer" className="start-chat-button" style={{ padding: '12px 12px', fontSize: '16px', display: 'flex', alignItems: 'center', borderRadius: '18px' }}>
          <FaChrome style={{ marginRight: '0.5rem', fontSize: '18px' }} /> Chrome Extension
        </a>
      </div>

      <div style={{
        padding: '25px 30px', 
        borderLeft: '4px solid var(--chat-button-bg)',
        borderRadius: '6px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
      }}>
        <p style={{ 
          lineHeight: '1.6',
          margin: '0',
          fontSize: '15px'
        }}>
          Large language models are designed to encode general purpose knowledge about the world from Internet data.
          Yet, a wealth of information falls outside this scope --- ranging from personal preferences to organizational policies,
          from community-specific advice to up-to-date news --- that users want models to access but remains unavailable. In this paper,
          we propose a knowledge ecosystem in which end-users can create, curate, and configure custom knowledge modules that are
          utilized by language models, such as ChatGPT and Claude.
         </p>
        {!abstractExpanded && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            <button 
              onClick={toggleAbstract}
              className="start-chat-button"
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '24px'
              }}
            >
              <FaArrowDown style={{ fontSize: '12px' }} /> Expand abstract
            </button>
          </div>
        )}
        {abstractExpanded && (
          <>
            <p style={{ 
              lineHeight: '1.6',
              margin: '15px 0 0 0',
              fontSize: '15px'
            }}>
          To support this vision, we introduce Knoll, a software infrastructure that
          allows users to make modules by clipping content from the web or authoring shared documents on Google Docs and GitHub,
          add modules that others have made, and rely on the system to insert relevant knowledge when interacting with an LLM.
          We conduct a public deployment of Knoll reaching over 200 users who employed the system for a diverse set of tasks including
          personalized recommendations, advice-seeking, and writing assistance. In our evaluation, we validate that using Knoll improves the quality of generated responses.
                   </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
              <button 
                onClick={toggleAbstract}
                className="start-chat-button"
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <FaArrowUp style={{ fontSize: '12px' }} /> Collapse abstract
              </button>
            </div>
          </>
        )}
      </div>
      {/* Add Demo Here */}
      <div>
        <h2>
        Knoll allows users to connect an LLM to localized knowledge repositories (or "modules") that are then used to customize the model's responses. 
        </h2>
        {/* Add Demo Here */}
      </div>
      <div style={{ 
        margin: '14px 0px 0px 0px', 
        padding: '25px 30px', 
        borderLeft: '4px solid var(--chat-button-bg)',
        borderRadius: '6px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
      }}>
        <h2 style={{ 
          color: 'var(--color-main-text)', 
          margin: '0 0 15px 0',
          fontSize: '2em',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center'
        }}>
          Getting Started with Knoll
        </h2>
        <FaExclamationTriangle style={{ marginRight: '0.5rem', fontSize: '18px' }} /> Work In Progress
        {/* <p style={{ 
          lineHeight: '1.6',
          margin: '0',
          fontSize: '15px'
        }}>
          Any application that might rely on unstructured user context could benefit from a GUM. We create a new class of proactive assistants (GUMBOs) that discover and execute useful suggestions on a user's behalf based on the their GUM. GUMBO discovers helpful suggestions, determines if a suggestion is worth showing to a user and executing, and then executes the (sandboxed) suggestion to the best of its ability---sharing preliminary results with the user.
        </p> */}
        
        {/* <h3>
          How do I create a knowledge module?
        </h3>
        <h3>
          What type of knowledge goes into a module?
        </h3>
        Knoll supports users adding any type of text content that can be 
        <h3>
          How do I use my modules when interacting with LLMs?
        </h3>
        Knoll 
        <p>
          We currently support integrations with ChatGPT and Claude. If you are interested in using Knoll with other LLMs, please submit a pull request on our Github repo.
        </p> */}
      </div>
      

      <div>
        <h3 style={{ 
          color: 'var(--color-main-text)', 
          margin: '20px 0 15px 0',
          fontSize: '1.5em',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center'
        }}>
          Citation
        </h3>
        <div style={{ 
            position: 'relative',
            backgroundColor: 'rgba(0, 0, 0, 0.05)', 
            borderRadius: '6px',
            padding: '15px',
            fontFamily: 'monospace',
            fontSize: '14px',
            whiteSpace: 'pre-wrap',
            overflowX: 'auto'
          }}>
            <pre id="bibtex-content" style={{ margin: '0' }}>
          {`@article{zhao2025knoll,
            title={Knoll: Creating a Knowledge Ecosystem for Large Language Models},
            author={Zhao, Dora and Yang, Diyi and Bernstein, Michael S.},
            journal={arXiv preprint},
            year={2025}
          }`}
            </pre>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(document.getElementById('bibtex-content').textContent);
                document.getElementById('copy-btn').textContent = 'Copied!';
                setTimeout(() => {
                  document.getElementById('copy-btn').textContent = 'Copy';
                }, 2000);
              }}
              id="copy-btn"
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'var(--chat-button-bg)',
                color: 'white',
                border: 'none',
                borderRadius: '18px',
                padding: '6px 12px',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
  );
};

export default DemoPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Demo1 from './gifs/Demo1.gif'
import InHouse from './gifs/InHouse.gif'
import RAG from './pics/RAG.jpg'
import Actions from './Actions';
import App from '../App';
import Carousel from './Carousel';
import { FaFileAlt, FaGithub, FaArrowDown, FaArrowUp, FaChrome, FaExclamationTriangle } from 'react-icons/fa'; // Added arrow icons
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';



const DemoPage = () => {
  const [selected, setSelected] = useState('create'); // Default to 1 PM
  const [abstractExpanded, setAbstractExpanded] = useState(false); // State for abstract toggle
  const navigate = useNavigate();
  const [shotIdx, setShotIdx] = useState(0);
  


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
      <h1 style={{ marginBottom: '20px', textAlign: 'center', fontSize:'36px' }}>Knoll: Creating a Knowledge Ecosystem for Large Language Models</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 15px'}}>
          <div style={{ fontSize: '18px', fontWeight: '500' }}>Dora Zhao</div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 15px' }}>
          <div style={{ fontSize: '18px', fontWeight: '500', }}>Diyi Yang</div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 15px'}}>
          <div style={{ fontSize: '18px', fontWeight: '500'}}>Michael S. Bernstein</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px' }}>
        <div style={{  fontSize: '18px', fontWeight: '400' }}>Stanford University</div>

      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
        <a href="https://arxiv.org/abs/2505.19335" target="_blank" rel="noopener noreferrer" className="start-chat-button" style={{ padding: '12px 12px', fontSize: '18px', display: 'flex', alignItems: 'center', borderRadius: '18px' }}>
          <FaFileAlt style={{ marginRight: '0.5rem', fontSize: '18px' }} /> Paper
        </a>
        
        <a href="https://github.com/dorazhao99/community-lm-extension" target="_blank" rel="noopener noreferrer" className="start-chat-button" style={{ padding: '12px 12px', fontSize: '18px', display: 'flex', alignItems: 'center', borderRadius: '18px' }}>
          <FaGithub style={{ marginRight: '0.5rem', fontSize: '18px' }} /> GitHub
        </a>

        <a href="https://chromewebstore.google.com/detail/knoll/fmboebkmcojlljnachnegpbikpnbanfc" target="_blank" rel="noopener noreferrer" className="start-chat-button" style={{ padding: '12px 12px', fontSize: '18px', display: 'flex', alignItems: 'center', borderRadius: '18px' }}>
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
          fontSize: '20px'
        }}>
          Large language models are designed to encode general purpose knowledge about the world from Internet data.
          Yet, a wealth of information falls outside this scope — ranging from personal preferences to organizational policies,
          from community-specific advice to up-to-date news — that users want models to access but remains unavailable. In this paper,
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
                borderRadius: '18px'
              }}
            >
              <FaArrowDown style={{ fontSize: '16px' }} /> Expand abstract
            </button>
          </div>
        )}
        {abstractExpanded && (
          <>
            <p style={{ 
              lineHeight: '1.6',
              margin: '15px 0 0 0',
              fontSize: '20px'
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
        <h2 style={{fontSize: "28px"}}>
        Knoll allows users to connect an LLM to localized knowledge repositories that then customize the model's responses. 
        </h2>
        <div>
          <img
            src={Demo1}
            alt="Demonstration of the Knoll browser extension"
            style={{
              width: '50%',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto',
              borderRadius: '8px'
            }}
          />  
          <p style={{fontSize: "16px", textAlign: "center"}}>
            Overview of Knoll's functionalities, including importing and creating modules, and demonstration<br/>
            of how relevant knowledge is automatically incorporated when interacting with models.
          </p>
        </div>
      </div>
      <div style={{ 
        margin: '14px 0px 4em 0px', 
        padding: '25px 30px', 
        borderLeft: '4px solid var(--chat-button-bg)',
        borderRadius: '6px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        width: '90%'
      }}>
        <h3 style={{ 
          margin: '0',
          fontSize: '24px'
        }}>
          Building an Ecosystem of Knowledge Modules
        </h3>
        <p 
          style={{ 
            fontSize: '20px'
          }}
        >
          We define three key functionalities that help build our ecosystem of knowledge modules.
        </p>
        <Actions selected={selected} setSelected={setSelected}/>
      </div>
      <div style={{marginBottom: '4em'}}>
        <h2 style={{fontSize: "28px"}}>
          Modules can contain <u>any</u> text information that users may want their language model to know.
        </h2>
        <div>
          <Carousel/>
          <p style={{fontSize: "16px", textAlign: "center"}}>
            Examples of modules that are publicly available on Knoll.
          </p>
        </div>
      </div>
      <div>
        <h2 style={{fontSize: "28px"}}>
          Relevant modules are automatically provided to the model and integrated directly into existing commercial services.
        </h2>
        <div>
          <img
            src={InHouse}
            alt="Knoll works directly in commercial chatbot services, such as ChatGPT."
            style={{
              width: '50%',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto',
              borderRadius: '8px'
            }}
          />  
          <p style={{fontSize: "16px", textAlign: "center"}}>
            With Knoll, users interact with LLMs on existing web platforms just as they normally would.<br/>
            Relevant knowledge modules are automatically selected and incorporated into the model's
            context without additional work from the user.
          </p>
        </div>
         <div style={{ 
          margin: '14px 0px 4em 0px', 
          padding: '25px 30px', 
          borderLeft: '4px solid var(--chat-button-bg)',
          borderRadius: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          width: '90%'
        }}>
          <h3 style={{ 
            margin: '0',
            fontSize: '24px'
          }}>
            Behind the Scenes
          </h3>
          <img
            src={RAG}
            style={{
              borderRadius: '8px',
              margin: '1em 0',
              objectFit: 'contain',
              display: 'block',
              width: '80%'
            }}
          />
          <p style={{ fontSize: '20px', width: "80%"}}>
            We develop a module router, consisting of a retrieve and rerank step. As input, we use the last two messages the user sent in the
            conversation and any activated modules. First, we retrieve the top 5 most similar modules
            based on sentence embeddings. Then, we rerank the retrieved modules and clippings, filtering for the top 5 documents that
            have a relevance score 𝑠 > 0.3. The relevant modules are directly inserted into the user's query to the request sent to the model's server, 
            and then removed from the returned message so it does not appear in the chat interface. 
          </p>
        </div>
      </div>
    <div>
{/* 
        <h3 style={{ 
          margin: '0',
          fontSize: '32px'
        }}>
          What type of knowledge goes into a module?
        </h3>
          Knoll supports users adding any type of text content 
        <div style={{margin: '1em 0'}}>
            <h3 style={{ 
              margin: '0',
              fontSize: '32px'
            }}>
              How do I use my modules when interacting with LLMs?
            </h3>
            <div style={{ 
              marginTop: '0.5em',
              fontSize: '22px'
            }}>
              You can add any module to Knoll that you are interested in and turned modules on-or-off using our browser extension.
              When you send a message to an LLM, such as ChatGPT, Knoll will then select from the modules that you have turned on and 
              automatically provide the relevant information as context to the model. 
              <br/><br/>
              We currently support integrations with ChatGPT and Claude. If you are interested in using Knoll with other LLMs,
              please submit a pull request on our Github <a style={{color: 'white'}} href="https://github.com/dorazhao99/community-lm-extension" target="_blank" rel="noopener noreferrer" >repo</a>.
            </div>
        </div> */}
      </div>
      

      <div style={{marginBottom: '4em'}}>
        <h3 style={{ 
          color: 'var(--color-main-text)', 
          margin: '20px 0 15px 0',
          fontSize: '32px',
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
            overflowX: 'auto',
            width: '75%'
          }}>
            <pre id="bibtex-content" style={{ margin: '0' }}>
        {`@article{zhao2025knoll, 
         title={Knoll: Creating a Knowledge Ecosystem for Large Language Models},
         author={Zhao, Dora and Yang, Diyi and Bernstein, Michael S.},
         journal={arXiv preprint},
         year={2025}
}`
         }
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
                top: '14px',
                right: '14px',
                backgroundColor: 'var(--chat-button-bg)',
                color: 'white',
                border: 'none',
                borderRadius: '18px',
                padding: '6px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Copy
            </button>
          </div>
        </div>
        <div>
          <p style={{fontSize: "11px"}}>
            Project Page Template from <a href="https://generalusermodels.github.io/" target="_blank" rel="noopener noreferrer" style={{color: "white"}}>GUM</a>.
          </p>
        </div>
      </div>
  );
};

export default DemoPage;

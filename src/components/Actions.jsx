import React, { useEffect, useRef, useState } from 'react'; 
import { FaPen, FaShare, FaDownload, FaCodeBranch } from 'react-icons/fa';

{/* <button className="start-chat-button" style={{fontSize: '18px'}}>
                    <FaPen/> CREATE
                </button>
                <button className="start-chat-button" style={{fontSize: '18px'}}>
                    <FaDownload/> IMPORT
                </button>
                <button className="start-chat-button" style={{fontSize: '18px'}}>
                    <FaShare/> COLLABORATE
                </button>
                <button className="start-chat-button" style={{fontSize: '18px'}}>
                    <FaCodeBranch/> SHARE
                </button> */}
const Actions = (props) => {
    const actionOptions = {
        'create': {
            'icon': <FaPen/>,
            'name': 'CREATE',
            'description': "Users can create their own knowledge modules by adding documents or clipping content from the web.\
            Knoll integrates with Google Docs or GitHub Markdown files, turning documents automatically into modules, \
            once users provide the document's URL. Knoll also includes a lightweight clipping feature that lets users add any online text \
            to a module by highlighting it and selecting 'Clip Selected Text' from the pop-up menu."
        }, 
        'import': {
            'icon': <FaDownload/>,
            'name': 'IMPORT',
            'description': "Users can import modules that others have created and shared with the community. On the Explore Page, users\
            browse our gallery or search for specific keywords to find modules to add to their extension. By adding the module, users \
            import and activate the module, enabling the LLM to incorporate its knowledge in responses."
        }, 
        'share': {
            'icon': <FaShare/>,
            'name': 'SHARE',
            'description': " Users can choose to contribute their module to the gallery on the Explore Page. \
            Alternatively, they can directly share modules via a link that we generate. To retain data privacy \
            only users who have permissions to view the source document (e.g., Google Docs or GitHub repo permissions) \
            are able to access shared modules."
        }, 
        


    }
    return (
        <div>
            <div style={{'display': 'flex', gap: '30px',}}>
                { console.log(props) }
                {
                    Object.keys(actionOptions).map(action => {
                        let name = props.selected === action ? 'selected' : 'start-chat-button'
                        let values = actionOptions[action]
                        return (
                            <button className={name} style={{fontSize: "13px"}} onClick={() => props.setSelected(action)}>
                                {values.icon} {values.name}
                            </button>
                        )
                    })
                }
            </div>
            <div>
                {
                    Object.keys(actionOptions).map(action => {
                        if (props.selected === action) {
                            return (
                                <div style={{'margin': '1em 0', fontSize: '16px', borderRadius: '8px', padding: '1.5em', width: '70%', background: '#414141'}}>
                                    {actionOptions[action].description}
                                </div> 
                            )
                        }
                    })
                }
            </div>

            {/* <div style={{'margin': '1em 0', fontSize: '22px', borderRadius: '8px', padding: '1.5em', width: '80%', background: '#414141', lineHeight: '1.2em'}}>
                Users can create their own knowledge modules by adding documents or clipping content from the web.
                Knoll integrates with Google Docs or GitHub Markdown files, turning these documents automatically into modules, 
                once users provide the document's URL. The content of modules can be refreshed whenever the user clicks the "Refresh" button
                on the browser extension. Knoll also includes a lightweight clipping feature that lets users add any online text to a module by highlighting it and selecting “Clip Selected Text”
                from the pop-up menu.
            </div> */}
        </div>
    )
}

export default Actions
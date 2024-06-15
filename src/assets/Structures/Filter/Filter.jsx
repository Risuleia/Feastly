import React from 'react'

import './Filter.styles.css'

function Filter({ content }) {
    return (
        <>
            <div className={`filter${content.primary ? ' primary' : ''}`} select="false">
                <div className="filter-name">{content.name}</div>
                <div className="filter-icon">
                    <span className="material-symbols-rounded">arrow_right</span>
                </div>
            </div>
            {content.primary && <div className="separator"></div>}
        </>
    )
}

export default Filter
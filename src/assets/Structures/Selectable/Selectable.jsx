import React, { useEffect, useRef, useState } from 'react'

import './Selectable.styles.css'

function Selectable({ limit, dataset }) {

    const [active, setActive] = useState(false)
    const [selected, setSelected] = useState([])
    const [tempSelected, setTempSelected] = useState([])

    const dialog = useRef();

    function filter(arr1, arr2) {
        let filtered = []
        for (let item of arr1) {
            if (arr2.some(e => e === item)) continue
            else filtered.push(item)
        }
        return filtered
    }

    useEffect(() => {
        if (active) dialog.current.showModal()
        else dialog.current.close()
    }, [active])

    return (
        <>
            <div className={`select-box${selected.length > 0 ? ' selected' : ''}`} data-type="text" select="false" onClick={() => setActive(true)}>
                <div className="select-box-name">{dataset.type}</div>
                <div className="select-box-icon">
                    <span className="material-symbols-rounded">arrow_right</span>
                </div>
                {selected.length > 0 && <div className="select-box-indicator">{selected.length}</div>}
            </div>
            <dialog
                ref={dialog}
                className="selection-menu"
                data-type="text"
                onClose={() => setActive(false)}
            >
                <div className="options">
                    {filter(dataset.options, tempSelected).map(option => (
                        <div
                            className={`option${tempSelected.length == limit ? ' disabled' : ''}`}
                            select="false"
                            onClick={() => {
                                if (tempSelected.length != limit) setTempSelected(prev => [...prev, option])
                            }}
                        >
                            <span className="option-name">{option}</span>
                        </div>
                    ))}
                </div>
                {
                    tempSelected.length > 0
                        &&
                    <div className="selected-options">
                        <span className="selected-title" select="false">Selected:</span>
                        <div className="options selected">
                            {tempSelected.map(option => (
                                <div
                                    className="option selected"
                                    select="false"
                                    onClick={() => setTempSelected(prev => prev.filter(_ => _ != option))}
                                >
                                    <span className="option-name">{option}</span>
                                    <span className="remove-btn material-symbols-rounded">close</span>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                <div className="selected-footer">
                    <div
                        id="close-btn"
                        className="btn"
                        onClick={() => setActive(false)}
                        select="false"
                    >
                        Cancel
                    </div>
                    <div
                        id="apply-btn"
                        className="btn"
                        onClick={() => {
                            setSelected(tempSelected)
                            setActive(false)
                        }}
                        select="false"
                    >
                        Apply
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Selectable
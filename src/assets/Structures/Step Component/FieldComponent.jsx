import React, { useState } from 'react'

import './FieldComponent.styles.css'

function FieldComponent({ data }) {

    const [records, setRecords] = useState([])
    const [editing, setEditing] = useState(null)

    function handleClick(e) {
        let elem = e.currentTarget.parentElement
        if (!elem) return
        const fields = [...elem.querySelectorAll('.input')]
        if (!fields) return
        if (
            fields.some(field => (['step', 'amount', 'name'].some(_ => _ == field.parentElement.dataset.type))
                &&
            (!field.value || field.value == ''))
        ) return
        let obj = {}
        for (const field of fields) {
            obj[field.parentElement.dataset.type] = field.value
            if (field.parentElement.dataset.type == 'step') obj['number'] = records.length + 1
            field.value = ''
        }
        setRecords([...records, obj])
    }

    function handleEdit(e, record) {
        let arr = records
        let index = arr.indexOf(record)
        let elem = e.currentTarget
        if (!elem) return
        arr[index].step = elem.parentElement.parentElement.querySelector('.instruction-step').textContent
        setRecords(arr)
        setEditing(null)
    }

    console.log(records)

    return (
        <div className="field-component">
            <div className="fields">
                {data.fields.map((field, index) => (
                    <div key={index} className="field input-container" data-type={field.toLowerCase()}>
                        {
                            field == 'Step'
                                ?
                            <textarea
                                className="input"
                                id={field}
                                placeholder={field}
                                required
                            />
                                :
                            <input
                                className="input"
                                type={'text'}
                                id={field}
                                placeholder={field}
                                min={field == "Amount" ? 1 : null}
                                required={['Amount', 'Name'].some(_ => _ == field)}
                            />
                        }
                    </div>
                ))}
                <div
                    className="field-add-btn"
                    select="false"
                    onClick={handleClick}
                >
                    <span className="material-symbols-rounded">add</span>
                </div>
            </div>
            {
                records.length > 0
                    &&
                (<div className="fields-preview" data-type={data.type}>
                    {records.map((record, index) => (
                        <div key={index} className="field-record">
                            {
                                data.type == 'ingredients'
                                    ?
                                (<>
                                    <div className="ingredient-amount">{record.amount}</div>
                                    {record.unit && <div className="ingredient-unit">{record.unit}</div>}
                                    <div className="ingredient-name">{record.name}</div>
                                    <div
                                        className="remove-btn"
                                        select="false"
                                        onClick={() => setRecords(prev => prev.filter(_ => _ != record))}
                                    >
                                        <span className="material-symbols-rounded">close</span>
                                    </div>
                                </>)
                                    :
                                (<>
                                    <div
                                        className={`instruction-step${editing == record ? ' editing' : ''}`}
                                        contentEditable={editing == record}
                                    >
                                        {record.step}
                                    </div>
                                    <div className="instruction-number" select="false">{record.number}</div>
                                    <div className="field-record-buttons">
                                        <div
                                            className="remove-btn btn"
                                            select="false"
                                            onClick={() => setRecords(prev => prev.filter(_ => _ != record))}
                                        >
                                            <span className="material-symbols-rounded">close</span>
                                        </div>
                                        <div
                                            className="edit-btn btn"
                                            select="false"
                                            onClick={(e) => {
                                                if (editing != record) setEditing(record)
                                                else handleEdit(e, record)
                                            }}
                                        >
                                            <span className="material-symbols-rounded">{editing != record ? 'edit' : 'done'}</span>
                                        </div>
                                    </div>
                                </>)
                            }
                        </div>
                    ))}
                </div>)
            }
        </div>
    )
}

export default FieldComponent
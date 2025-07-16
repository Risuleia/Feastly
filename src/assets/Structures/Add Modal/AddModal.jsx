import React from 'react'
import { Link } from 'react-router-dom'

import Selectable from '../Selectable/Selectable'
import FieldComponent from '../Step Component/FieldComponent'

import datasets from '../../../datasets.json'

import './AddModal.styles.css'

function AddModal() {

    const data = {
        ingredients: { type: "ingredients", fields: ["Amount", "Unit", "Name"] },
        steps: { type: "instructions", fields: ["Step"] }
    }

    return (
        <dialog id="add-modal">
            <div className="add-modal-form-container">
                <div className="add-modal-heading-container" select="false">
                    <h2 className="add-modal-heading">Add a Recipe!</h2>
                    <span className="add-modal-heading-line"></span>
                </div>
                {/* {error && <div id="error" select="false">{error}</div>} */}
                <form className='add-modal-form' >
                    <div className="add-modal-fields">
                        <div className="field-row">
                            <div className="field-column">
                                <div className="label-container">
                                    <span className="label" select="false">Title</span>
                                    <div className="input-container">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            placeholder="What's your recipe called?"
                                            required
                                            className='input'
                                            minLength='40'
                                            // onChange={handleEmailChange}
                                            // ref={email}
                                        />
                                    </div>
                                </div>
                                <div className="label-container" data-type="textarea">
                                    <span className="label" select="false">Summary</span>
                                    <div className="input-container">
                                        <textarea
                                            name="summary"
                                            id="summary"
                                            placeholder='Briefly enlighten about your recipe'
                                            required
                                            className='input'
                                            minLength='200'
                                            // onChange={handleEmailChange}
                                            // ref={email}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="label-container" data-type="picture">
                                <span className="label" select="false">Photo</span>
                                <div className="input-container">
                                    <input
                                        type="file"
                                        name="photo"
                                        id="photo"
                                        required
                                        className='input'
                                        accept='png, jpeg, jpg, avif, svg, webp'
                                        // onChange={handleEmailChange}
                                        // ref={email}
                                    />
                                    <div className="input-overlay">
                                        <span className="material-symbols-rounded">add_a_photo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field-row">
                            <div className="label-container">
                                <span className="label" select="false">Servings</span>
                                <div className="input-container">
                                    <input
                                        type="number"
                                        name="email"
                                        id="email"
                                        placeholder='(nos.)'
                                        required
                                        className='input'
                                        min='1'
                                        max='20'
                                        defaultValue='1'
                                        // onChange={handleEmailChange}
                                        // ref={email}
                                    />
                                </div>
                            </div>
                            <div className="label-container">
                                <span className="label" select="false">Ready Time</span>
                                <div className="input-container">
                                    <input
                                        type="number"
                                        name="email"
                                        id="email"
                                        placeholder='(minutes)'
                                        required
                                        className='input'
                                        min='5'
                                        step='5'
                                        max='180'
                                        defaultValue='5'
                                        // onChange={handleEmailChange}
                                        // ref={email}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="field-row">
                            <Selectable limit={1} dataset={datasets.diets} />
                            <Selectable limit={8} dataset={datasets.cuisines} />
                            <Selectable limit={10} dataset={datasets.meal_types} />
                        </div>
                        <div className="label-container" data-type="fields">
                            <span className="label" select="false">Ingredients</span>
                            <FieldComponent data={data.ingredients} />
                        </div>
                        <div className="label-container" data-type="fields">
                            <span className="label" select="false">Instructions</span>
                            <FieldComponent data={data.steps} />
                        </div>
                    </div>
                    <div className="add-modal-btn-container" select="false">
                        <button className="add-modal-btn" id='close' type='submit'>
                            <span>Cancel</span>
                        </button>
                        <button className="add-modal-btn" id='submit' type='submit'>
                            <span>Create</span>
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default AddModal
import React from 'react'

function Button (props) {
    return (
        <div>
            <button onClick={props.onOpen} className={props.btnClass} type="button">{props.buttonText}</button>
        </div>
    )
}

export default Button
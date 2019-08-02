import React from 'react'

function Input (props) {

    return(
        <div>
            <input className={props.className} name={props.name} onChange={props.onChange} type={props.inputType} placeholder={props.inputPlaceholder}/>
        </div>
    )
}

export default Input
import'./Button.css'

import React from 'react';

interface ButtonProps {
    style?: React.CSSProperties;
    textContent: string;
}

function Button(props: ButtonProps) {
    return (
        <div>
            <button className='btn-component' style={props.style}>{props.textContent}</button>
        </div>
    )
}

export default Button

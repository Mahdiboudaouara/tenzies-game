import React from "react"

export default function Die(props) {
    let color = props.isHeld===true ? "#59E391" : ""
    return (
        <div style={{backgroundColor:color}} onClick={props.holdDice} className="die-face">
            <h2>{props.value}</h2>
        </div>
    )
}
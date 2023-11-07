"use client"
import ToolTip from "./ToolTip";

interface DisplayColorElementProps {
    isDay: number,
    color: string
}

export default function DisplayColorElement({isDay, color}: DisplayColorElementProps) {
    const dayFlag = !!isDay  
   
    if (dayFlag) {
    return <h3>The sky is pretty close to hex color <ToolTip skyColor={color}><span className="underline" style={{color: color}}>{color}</span></ToolTip>.</h3>
    }
    return <h3>It&apos;s night right now. If you come back during the day you&apos;ll see the color of the sky here in NY as an approximate hex value.</h3>
}
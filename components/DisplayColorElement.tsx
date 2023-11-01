export default function DisplayColorElement({isDay, color}: {isDay: number; color: string}) {
    const dayFlag = !!isDay  
   
    if (dayFlag) {
    return <h3>The sky is pretty close to hex color <span style={{color: color}}>{color}</span>.</h3>
    }
    return <h3>It&apos;s night right now. If you come back during the day you&apos;ll see an the color of the sky here in NY as an approximate hex value.</h3>
}
export default function cloudCover(cover: number) {
    let skyCondition;
    if(cover <= 12.5 ) {
        skyCondition = 'clear'
    } else if(cover > 12.5 && cover <=37.5) {
        skyCondition = 'mostly clear'
    } else if (cover > 37.5 && cover <= 62.5) {
        skyCondition = 'partly cloudy'
    } else if (cover > 62.5 && cover < 87.5) {
        skyCondition = 'mostly cloudy'
    } else {
        skyCondition = 'cloudy'
    }
    return skyCondition;
}
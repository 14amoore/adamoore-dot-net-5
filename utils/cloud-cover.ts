type Cover = number

type CloudCoverTerms = 'clear' | 'mostly clear' | 'partly cloudy' | 'mostly cloudy' | 'cloudy';
// Mapping cloud cover terms to their color codes
const cloudCoverColors: Record<CloudCoverTerms, string> = {
    'clear': '#87CEEB',
    'mostly clear': '#76D7C4',
    'partly cloudy': '#D1C4E9',
    'mostly cloudy': '#778899',
    'cloudy': '#708090'
};
type CloudCoverValues = [CloudCoverTerms, string];

export default function cloudCover(cover: Cover): CloudCoverValues {
    let skyCondition: CloudCoverTerms;
    if(cover <= 12.5 ) {
        skyCondition = 'clear';
    } else if(cover <=37.5) {
        skyCondition = 'mostly clear';
    } else if (cover <= 62.5) {
        skyCondition = 'partly cloudy'
    } else if (cover < 87.5) {
        skyCondition = 'mostly cloudy'
    } else {
        skyCondition = 'cloudy'
    }
    const textColor = cloudCoverColors[skyCondition]
    return [skyCondition, textColor];
}
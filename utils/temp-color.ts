type Temp = number;

type HexColors = '#00BFFF' | '#1E90FF' | '#32CD32' | '#FFB07C' | '#FF8C00' | '#FF4500';

const temperatureColorMap: { range: [number, number]; color: HexColors }[] = [
    { range: [-Infinity, 32], color: '#00BFFF' }, // Very Cold
    { range: [32, 50], color: '#1E90FF' },        // Cold
    { range: [50, 68], color: '#32CD32' },        // Mild
    { range: [68, 86], color: '#FFB07C' },        // Warm
    { range: [86, 104], color: '#FF8C00' },       // Hot
    { range: [104, Infinity], color: '#FF4500' }  // Very Hot
];

export default function tempColors(temp: Temp): HexColors {
    // Find the color for the range that includes the input temperature
    const color = temperatureColorMap.find(({ range }) => temp >= range[0] && temp <= range[1])?.color;
    return color as HexColors; // Type assertion since we know temp will match one of these ranges
}

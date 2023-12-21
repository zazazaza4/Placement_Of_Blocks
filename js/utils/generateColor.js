export function getRandomColorBy2Values(value1, value2) {
    return `rgb(${value1 % 256}, ${value2 % 256}, ${(value1 + value2) % 256})`;
}

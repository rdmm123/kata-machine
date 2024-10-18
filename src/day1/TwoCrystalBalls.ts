export default function two_crystal_balls(breaks: boolean[]): number {
    for (let i = 0; i < breaks.length; i++) {
        if (breaks[i]) {
            return i;
        }
    }
    return -1;
}
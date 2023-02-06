export const getYears = (minYear: number) => {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - minYear)).fill('').map((v, i) => now - i) as Array<number>;
}
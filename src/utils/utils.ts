export const getYears = (minYear: number) => {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - minYear)).fill('').map((v, i) => now - i) as Array<number>;
}

export const changeColorText = (vote: number) => {
    if (vote >= 8) {
        return 'rating-color-green'
    }else if (vote >= 6) {
        return 'rating-color-yellow'
    }else {
        return 'rating-color-red'
    }
}
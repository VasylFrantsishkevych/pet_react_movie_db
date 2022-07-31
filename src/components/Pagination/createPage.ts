export const createPages  = (pages: Array<number>, totalPages: number, currentPage: number) => {
    if(totalPages > 7) {
        if(currentPage > 3) {
            for (let i = currentPage-3; i <= currentPage+3; i++) {
                pages.push(i)
                if(i === totalPages) break
            }
        }
        else {
            for (let i = 1; i <= 7; i++) {
                pages.push(i)
                if(i === totalPages) break
            }
        }
    }  else {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
    }
}

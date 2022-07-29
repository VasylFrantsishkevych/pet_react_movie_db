
export interface IMovieList {
    page: number;
    results: [
        {
            id: number;
            original_title: string;
            poster_path: string;
            release_date: string;
            vote_average: number;
        }
    ];
    total_pages: number;
    total_results: number;
}

import {IMediaResults} from "./mediaResults.interface";

export interface IMediaResponse {
    page: number;
    results: IMediaResults[];
    total_pages: number;
    total_results: number;
}

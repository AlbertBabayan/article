import { IArticle } from "./article.interface";

export interface IArticleResponse {
    success: boolean;
    message: string;
    result: IArticle[];
    errors: any[];
    status: number;
}

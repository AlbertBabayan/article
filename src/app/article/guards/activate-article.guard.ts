import { inject } from "@angular/core";
import { AuthService } from "src/app/services";


export const activateArticle = (): boolean => inject(AuthService).isSingedIn;

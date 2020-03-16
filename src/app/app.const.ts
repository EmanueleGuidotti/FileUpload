import { InjectionToken } from "@angular/core";
import { environment } from "../environments/environment";

export const baseUrl: string = environment.serverUrl;
export const defaultRetryAttempts: number = 3;
export const defaultRetryDelay: number = 1000;
export const httpTimeout: number = 60000;

export const DEFAULT_HTTP_TIMEOUT: InjectionToken<number> = new InjectionToken<
  number
>("DEFAULT_HTTP_TIMEOUT");

export const dateFormatMomentMask = "DD.MM.YYYY";
export const dateFormatPipeMask = "dd.MM.yyyy";
export const timeFormatPipeMask = "HH:mm";
export const dateTimeFormatPipeMask = "dd.MM.yyyy HH:mm";
export const dateFormatApiMomentMask = "YYYY-MM-DD";
export const dateTimeFormatApiMomentMask = "YYYY-MM-DDTHH:mm";
export const dateFormatGetApiMomentMask = "DDMMYYYY";

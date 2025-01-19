import { Injectable } from '@angular/core';

export type FormMessage = {
	type: 'danger' | 'success' | 'warning';
	message: string,
}

@Injectable({providedIn: 'root'})
export class FormUtil {}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'cmsImage',
	standalone: true
})
export class CmsImagePipe implements PipeTransform {

	transform(value: string): string {
		return `https://raw.githubusercontent.com/ProjectEdenGG/CMS/refs/heads/master/images/${value}`
	}

}

import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SemanticVersionUtil {

	private compareVersions(versionA: string, versionB: string): number {
		const partsA = versionA.split('.').map(Number);
		const partsB = versionB.split('.').map(Number);

		for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
			const valueA = partsA[i] || 0;
			const valueB = partsB[i] || 0;

			if (valueA > valueB)
				return 1;

			if (valueA < valueB)
				return -1;
		}

		return 0;
	}

	gte(versionA: string, versionB: string): boolean {
		return this.compareVersions(versionA, versionB) >= 0;
	}

	gt(versionA: string, versionB: string): boolean {
		return this.compareVersions(versionA, versionB) > 0;
	}

	lte(versionA: string, versionB: string): boolean {
		return this.compareVersions(versionA, versionB) <= 0;
	}

	lt(versionA: string, versionB: string): boolean {
		return this.compareVersions(versionA, versionB) < 0;
	}

	eq(versionA: string, versionB: string): boolean {
		return this.compareVersions(versionA, versionB) === 0;
	}

	sortAscending(versions: string[]): string[] {
		return versions.sort((a, b) => this.compareVersions(a, b))
	}

	sortDescending(versions: string[]): string[] {
		return versions.sort((a, b) => this.compareVersions(b, a))
	}
}

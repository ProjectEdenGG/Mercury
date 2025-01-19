import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Utils } from '../../utils/utils';
import { MercuryComponent } from '../../lifecycle/MercuryComponent';
import { combineLatest } from 'rxjs';
import { SemanticVersionUtil } from '../../utils/semantic-version-util';

@Component({
	selector: 'app-titan',
	templateUrl: './titan.component.html',
	styleUrl: './titan.component.scss',
	standalone: false,
})
export class TitanComponent extends MercuryComponent {
	serverVersion: string
	supportedVersions: string[]
	loading: boolean

	constructor(
		public apiService: ApiService,
		public versionUtil: SemanticVersionUtil,
	) {
		super()
	}

	override ngOnInit() {
		this.loading = true
		combineLatest([this.apiService.getMinecraftServerStatus(), this.apiService.getModrinthVersions('titan')]).subscribe({
			next: (result: any) => {
				this.serverVersion = result[0].version
				this.supportedVersions = result[1].map((version: any) => version.game_versions).flat()
				this.supportedVersions = [...new Set<string>(this.supportedVersions)]
				this.supportedVersions = this.supportedVersions.filter(version => this.versionUtil.gte(version, this.serverVersion))
				this.supportedVersions = this.versionUtil.sortAscending(this.supportedVersions)
				this.loading = false
			},
			error: error => {
				console.error(error)
				this.loading = false
			}
		})
	}

}

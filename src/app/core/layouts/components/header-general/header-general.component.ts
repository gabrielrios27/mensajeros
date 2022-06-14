import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header-general',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './header-general.component.html',
    styleUrls: ['header-general.component.scss'],
})
export class HeaderGeneralComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}

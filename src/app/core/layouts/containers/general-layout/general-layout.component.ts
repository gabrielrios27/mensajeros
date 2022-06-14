import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-general-layout',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './general-layout.component.html',
    styleUrls: ['general-layout.component.scss'],
})
export class GeneralLayoutComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}

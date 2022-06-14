import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer-general',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './footer-general.component.html',
    styleUrls: ['footer-general.component.scss'],
})
export class FooterGeneralComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}

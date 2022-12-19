import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'monorepo-tools-shared-stats-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-stats-ui.component.html',
})
export class SharedStatsUiComponent {
  @Input() firstText = '';
  @Input() secondText = '';
}

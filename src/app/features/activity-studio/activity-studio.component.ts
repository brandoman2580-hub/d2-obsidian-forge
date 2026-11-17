import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-activity-studio',
  standalone: true,
  templateUrl: './activity-studio.component.html',
  styleUrl: './activity-studio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityStudioComponent {}

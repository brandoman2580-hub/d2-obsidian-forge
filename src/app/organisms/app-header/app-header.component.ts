import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  SandboxStatus,
  SandboxStatusBadgeComponent,
} from '../../molecules/sandbox-status-badge/sandbox-status-badge.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SandboxStatusBadgeComponent],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {
  readonly sandboxStatus = input.required<SandboxStatus>();
  readonly modeLabel = input('Guest / Read-Only');
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type VerificationFlag = 'VERIFIED' | 'PROVISIONAL';

export interface SandboxStatus {
  season: string;
  patch: string;
  manifestSyncedAt: string;
  compendium: VerificationFlag;
}

@Component({
  selector: 'app-sandbox-status-badge',
  standalone: true,
  templateUrl: './sandbox-status-badge.component.html',
  styleUrl: './sandbox-status-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxStatusBadgeComponent {
  readonly status = input.required<SandboxStatus>();
}

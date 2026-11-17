import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SandboxStatus } from './molecules/sandbox-status-badge/sandbox-status-badge.component';
import { AppHeaderComponent } from './organisms/app-header/app-header.component';
import { ActivityStudioComponent } from './features/activity-studio/activity-studio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppHeaderComponent, ActivityStudioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /** Stub sandbox metadata — no live Bungie/Supabase calls in the scaffold. */
  readonly sandboxStatus = signal<SandboxStatus>({
    season: 'Episode: Placeholder',
    patch: 'X.Y.Z (stub)',
    manifestSyncedAt: 'Not synced',
    compendium: 'PROVISIONAL',
  });
}

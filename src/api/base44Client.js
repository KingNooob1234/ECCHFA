import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// Public, auth-free client — talks straight to base44's hosted API (no
// backend proxy / base44 CLI required). This app has no login; it only
// reads public entity data (Player, Team), so requiresAuth stays false.
export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  requiresAuth: false,
  appBaseUrl
});

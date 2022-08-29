import { listen } from '@tauri-apps/api/event';
import { useAppStore } from './store';

listen<string>('session', (e) => {
  const session = JSON.parse(e.payload);
  if (session !== useAppStore.getState().session) {
    useAppStore.setState({ session, campaign: undefined });
  }
});

listen<string>('characters', (e) => {
  const characters = JSON.parse(e.payload);
  useAppStore.setState({ characters });
});

listen<string>('ownership', (e) => {
  const ownership = JSON.parse(e.payload);
  useAppStore.setState({ ownership });
});

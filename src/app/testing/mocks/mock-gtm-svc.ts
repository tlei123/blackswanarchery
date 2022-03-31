export class MockGoogleTagManagerService {
  pushTag = (triggerName: string) => {
    console.log(`[MockGoogleTagManagerService] triggerName: ${triggerName}`);
  };
}

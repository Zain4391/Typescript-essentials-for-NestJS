export interface WelcomeMessage {
  message: string;
  timestamp: Date;
  isReady: Boolean;
}

export function Greetings(message: string): WelcomeMessage {
  return {
    message,
    timestamp: new Date(),
    isReady: true,
  };
}

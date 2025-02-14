declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_ORIGIN: string;
      NEXT_PUBLIC_APP_ORIGIN: string;
    }
  }

  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export {};

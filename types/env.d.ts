declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_ORIGIN: string;
      NEXT_PUBLIC_SITE_TITLE: string;
    }
  }
}

export {};

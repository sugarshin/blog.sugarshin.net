declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ORIGIN: string;
      SITE_TITLE: string;
    }
  }
}

export {};

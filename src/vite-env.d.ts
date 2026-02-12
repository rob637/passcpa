/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  // Course availability flags (all default to 'true' when unset)
  readonly VITE_ENABLE_CPA_COURSE?: string;
  readonly VITE_ENABLE_EA_COURSE?: string;
  readonly VITE_ENABLE_CMA_COURSE?: string;
  readonly VITE_ENABLE_CIA_COURSE?: string;
  readonly VITE_ENABLE_CFP_COURSE?: string;
  readonly VITE_ENABLE_CISA_COURSE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  gtag: (command: string, ...args: any[]) => void;
  dataLayer: any[];
}

declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void;
    onRegisterError?: (error: any) => void;
  }

  export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>;
}

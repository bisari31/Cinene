declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
  interface ProcessEnv {
    PORT: string;
    DB_URI: string;
    PRIVATE_KEY: string;
  }
}

declare namespace NodeJS {
  interface Process {
    env: {
      PORT: string;
      DB_URL: string;
      PRIVATE_KEY: string;
      KAKAO_API_KEY: string;
    };
  }
}

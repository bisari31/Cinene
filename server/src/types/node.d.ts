declare namespace NodeJS {
  interface Process {
    env: {
      PORT: string;
      DB_URL: string;
      PRIVATE_KEY: string;
      KAKAO_REST_API_KEY: string;
      KAKAO_ADMIN_KEY: string;
    };
  }
}

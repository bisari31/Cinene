declare namespace NodeJS {
  interface Process {
    env: {
      PORT: string;
      DB_URL: string;
      CLIENT_URL: string;
      PRIVATE_KEY: string;
      KAKAO_REST_API_KEY: string;
      KAKAO_ADMIN_KEY: string;
      S3_ACCESS_KEY: string;
      S3_SECRET_KEY: string;
      S3_BUCKET_NAME: string;
    };
  }
}

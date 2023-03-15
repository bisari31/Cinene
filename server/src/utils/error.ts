class NotFoundError extends Error {
  statusCode = 404;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

class UnauthorizedError extends Error {
  statusCode = 401;

  constructor(message = '아이디 또는 비밀번호가 올바르지 않습니다.') {
    super(message);
    this.statusCode = 401;
  }
}

export { NotFoundError, UnauthorizedError };

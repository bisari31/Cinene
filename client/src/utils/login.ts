export const checkEmptyValue = (obj: IObject[]) => {
  const message = '필수 입력 항목입니다.';
  obj.forEach((prop) => {
    if (!prop.value) prop.setError(message);
  });
};

export const getFocus = (obj: IObject[]) => {
  const index = obj.findIndex((prop) => prop.error);
  obj[index]?.ref.current?.focus();
  return index !== -1;
};

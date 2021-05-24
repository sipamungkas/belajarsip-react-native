export const errorFormatter = err => {
  const msg =
    err?.response?.err ||
    err?.response?.message ||
    err?.message ||
    'Something went wrong';
  return msg;
};

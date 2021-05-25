export const errorFormatter = err => {
  const msg =
    err?.response?.err ||
    err?.response?.data?.err ||
    err?.response?.data?.message ||
    err?.response?.message ||
    err?.message ||
    'Something went wrong';
  return msg;
};

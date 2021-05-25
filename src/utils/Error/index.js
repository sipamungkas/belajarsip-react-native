export const errorFormatter = err => {
  const msg =
    err?.response?.error ||
    err?.response?.data?.error ||
    err?.response?.data?.message ||
    err?.response?.message ||
    err?.message ||
    'Something went wrong';
  return msg;
};

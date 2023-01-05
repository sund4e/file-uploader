export const uploadImage = (file: File) => {
  if (!process.env.REACT_APP_BACKEND_URL) {
    throw Error('REACT_APP_BACKEND_URL missing from env');
  }

  const formData = new FormData();
  formData.append('file', file, file.name);

  return fetch(`${process.env.REACT_APP_BACKEND_URL}files`, {
    method: 'POST',
    body: formData,
  });
};

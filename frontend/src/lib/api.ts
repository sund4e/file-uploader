//Mock jwt token, should be set as httpOnly cookie by main app login
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlN1dmkiLCJpYXQiOjE1MTYyMzkwMjJ9.RbUIocMvXHt3t1b2EPMgOG3qE4QkUgtwlNRgeP4X4Mg';
const token2 =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTg3NjU0MzIxIiwibmFtZSI6IlNhbXUiLCJpYXQiOjE1MTYyMzkwMjJ9.q-QG_SqU6RBFEcs438OO7ytGtDAasuat9rSJf7JAcsc';
document.cookie = `access_token=${token}; SameSite=Strict; Secure`;

export const uploadImage = (file: File) => {
  if (!process.env.REACT_APP_BACKEND_URL) {
    throw Error('REACT_APP_BACKEND_URL missing from env');
  }

  const formData = new FormData();
  formData.append('file', file, file.name);

  return fetch(`${process.env.REACT_APP_BACKEND_URL}files`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
};

export type FileData = {
  id: string;
  name: string;
  extension: string;
  createdAt: string;
};
export const getFiles = (afterId?: string): Promise<FileData[]> => {
  return fetch(
    `${process.env.REACT_APP_BACKEND_URL}files${
      afterId ? `?after_id=${afterId}` : ''
    }`,
    { credentials: 'include' }
  ).then((response) => {
    return response.json();
  });
};

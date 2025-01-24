export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000',
  appName: 'TFG',
};

export const endpoints = {
  utils: {
    files: {
      upload: '/utils/files/upload',
      list: '/utils/files/list',
      selectFilesProcesDB: '/utils/files/select-files-proces-db',
      uploadYEjecutarLinearRegresion:
        '/linear_regression/upload-and-linear-regression',
    },
  },
};

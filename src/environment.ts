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
    },
  },
  linear_regresion: {
    uploadYEjecutarLinearRegresion:
      '/linear_regression/upload-and-linear-regression',
    upload_pixels_background_wavelength:
      '/linear_regression/upload-pixels-background-wavelength',
  },
};

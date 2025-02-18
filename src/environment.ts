export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000',
  appName: 'TFG',
};

export const endpoints = {
  regression: { regression: '/regression/regression' },
  utils: {
    files: {
      upload: '/utils/files/upload',
      list: '/utils/files/list',
      selectFilesProcesDB: '/utils/files/select_files_proces_db',
    },
  },
  linear_regresion: {
    uploadYEjecutarLinearRegresion:
      '/linear_regression/upload_and_linear_regression',
    upload_pixels_background_wavelength:
      '/linear_regression/upload_pixels_background_wavelength',
  },
  non_negative_linear_regression: {
    non_negative_linear_regression:
      '/non_negative_linear_regression/non_negative_linear_regression',
  },
};

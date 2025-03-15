export interface DatosDirectos {
  variables_independientes: {
    variables_independientes?: number[][];
    file_variables_independientes?: FormData;
  };
  variables_dependientes: {
    variables_dependientes?: number[];
    file_variables_dependientes?: FormData;
  };
  method: 'NNLS' | 'OLS' | 'CLS' | string;
  test_size?: number | null;
  random_state?: number | null;
}
export interface DatosDirectosResult {
  coefficients?: number[];
  intercept?: number[];
  r_squared?: number;
  r2?: number | null;
  predictions?: unknown[];
  method?: string;
  file_path?: string | null;
  plot?: string;
}

export interface RespuestaRegresionConcatenadaPlot {
  imagen_ploteada: string;
  matriz_concatenada: number[];
}

export interface FicheroSubido {
	id: number;
	nombre_fichero: string;
	ruta_fichero: string;
	tipo_fichero: string;
	fecha_subida: string;
	usuario_subida: string;
}

export interface Fichero extends File {
	id?: number;
	extension: string;
}

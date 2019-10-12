export const URL_SERVICE:string = "http://localhost:3000";
/**
 * Rutas para servicio de usuario
 */
export const GET_USUARIO:string = `${URL_SERVICE}/usuario`;
export const POST_ALTA_USUARIO:string = `${URL_SERVICE}/usuario`;
export const PUT_ACTUALIZA_USUARIO:string = `${URL_SERVICE}/usuario`;
export const DELETE_BORRAR_USUARIO:string = `${URL_SERVICE}/usuario`;


/**
 * Rutas para servicio de login
 */
export const POST_LOGIN:string = `${URL_SERVICE}/login`;
export const POST_LOGIN_GOOGLE:string = `${URL_SERVICE}/login/google`;


/**
 * Rutas para servicio de imagen
 */
export const GET_IMAGEN:string = `${URL_SERVICE}/img`;
export const PUT_SUBIR_IMAGEN:string = `${URL_SERVICE}/upload`;

/**
 * Rutas para servicio de busqueda (todo, collecion)
 */
export const GET_BUSQUEDA_USUARIO:string = `${URL_SERVICE}/busqueda/coleccion`;
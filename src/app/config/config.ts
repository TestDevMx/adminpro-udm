export const URL_SERVICE:string = "http://localhost:3000";
/**
 * Rutas para servicio de usuario
 */
export const GET_USUARIO:string = `${URL_SERVICE}/usuario`;
export const POST_ALTA_USUARIO:string = `${URL_SERVICE}/usuario`;
export const PUT_ACTUALIZA_USUARIO:string = `${URL_SERVICE}/usuario`;
export const DELETE_BORRAR_USUARIO:string = `${URL_SERVICE}/usuario`;


/**
 * Rutas para servicio de hospital
 */
export const GET_HOSPITAL:string = `${URL_SERVICE}/hospital`;
export const POST_ALTA_HOSPITAL:string = `${URL_SERVICE}/hospital`;
export const PUT_ACTUALIZA_HOSPITAL:string = `${URL_SERVICE}/hospital`;
export const DELETE_BORRAR_HOSPITAL:string = `${URL_SERVICE}/hospital`;


/**
 * Rutas para servicio de médicos
 */
export const GET_MEDICO:string = `${URL_SERVICE}/medico`;
export const POST_ALTA_MEDICO:string = `${URL_SERVICE}/medico`;
export const PUT_ACTUALIZA_MEDICO:string = `${URL_SERVICE}/medico`;
export const DELETE_BORRAR_MEDICO:string = `${URL_SERVICE}/medico`;




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
export const GET_BUSQUEDA_COLLECCION:string = `${URL_SERVICE}/busqueda/coleccion`;
export const GET_BUSQUEDA_TODO:string = `${URL_SERVICE}/busqueda/todo`;

/**
 * Renovar token
 */
export const GET_RENOVAR_TOKEN:string = `${URL_SERVICE}/login/renuevatoken`;


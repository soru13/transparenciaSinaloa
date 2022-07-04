import {
  LETRAS_Y_ACENTOS,
  NUMEROS_DECIMALES,
  NO_SPACE,
  ENTER,
} from '../store/constants/constans';
export function validateEmail(email) {
  const patron = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (!patron.test(email)) {
    return false;
  }
  return true;
}
export function isValidEvent(event, patron) {
  const tecla = event.key;
  if (!patron.test(tecla) && tecla !== ENTER) {
    event.preventDefault();
    return false;
  }
  return true;
}
export default function validate(event, type) {
  let patron = null;
  switch (type) {
    case NO_SPACE:
      patron = /^[^' ']+$/;
      break;
    case NUMEROS_DECIMALES:
      patron = /^[0-9]+([.]{0,1}[0-9]{0,2})?$/igm;
      break;
    case LETRAS_Y_ACENTOS:
      patron = /^([A-Za-zñÑÀ-ÿ\s])+$/;
      break;
    default:
      event.preventDefault();
      return false;
  }
  return isValidEvent(event, patron);
}
export function capitalize(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export function insertSpaceBeforeCapitalLetters(string) 
{
    return  string.replace(/([a-z])([A-Z])/g, '$1 $2');

}

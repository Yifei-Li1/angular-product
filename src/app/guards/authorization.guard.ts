import { CanActivateFn } from '@angular/router';

export const authorizationGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('token') == undefined){
    console.log("denied by guard")
    return false;
  }
  return true;
};

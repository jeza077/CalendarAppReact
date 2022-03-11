import { fetchSinToken } from '../helper/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json(); 

        if( body.ok ){
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() ); 

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            // console.log(body)
            Swal.fire('Error', body.mgs, 'error');
        }
    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json(); 

        if( body.ok ){
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() ); 

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            // console.log(body)
            Swal.fire('Error', body.mgs, 'error');
        }

    }
}


const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})
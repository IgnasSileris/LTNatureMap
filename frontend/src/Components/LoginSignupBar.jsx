import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLocationStateStore } from '../stores/locationStateStore';

function LoginBar() {
    const location = useLocation();
    const setLocationState = useLocationStateStore((state) => state.setLocationState);

    return (
        <div className="flex-initial">
            <Link
                to="/login" 
                style={{ textDecoration: 'inherit', color: 'inherit' }}
                state={{ background: location }}> 

                <button title="Log into an existing account"
                className="border-solid border-2 border-slate-50 font-medium bg-slate-50 text-sky-600 hover:bg-gray-200 hover:border-blue-500 rounded-md shadow-md p-2"
                onClick={() => setLocationState(location)}>
                Log in</button>

            </Link>
        </div>
    );
}

function SignUpBar() {
    const location = useLocation();
    const setLocationState = useLocationStateStore((state) => state.setLocationState);

    return (
        <div className="flex-initial">
            <Link
                to="/signup" 
                style={{ textDecoration: 'inherit', color: 'inherit' }} 
                state={{ background: location }}>

                <button title="Create a new account"
                className="border-solid border-2 border-blue-600 font-medium bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-800 rounded-md shadow-md p-2"
                onClick={() => setLocationState(location)}>
                Sign up</button>
            </Link>
        </div>
    );
}

function LoginSignupBar (){
    return (
        <div className="flex flex-row justify-between gap-3">
            <LoginBar/>
            <SignUpBar/>
        </div>
    )
}
export default LoginSignupBar;
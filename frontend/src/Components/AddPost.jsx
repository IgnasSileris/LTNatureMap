import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

function AddPost() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const getUsers = async () => {
        const response = await fetch(`http://localhost:3000/api/users/signup/get_users`);
        const data = await response.json();
        console.log(data);
    };

    const deleteUser = async (uValue) => {
        const response = await fetch(`http://localhost:3000/api/users/signup/delete_user?username=${uValue}`, {
            method: 'DELETE',
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            }
            });
        const data = await response.json();
        console.log(data);
    };

    return (
        <>
        <div className="flex-initial">
            <button title="Add post" className="border-solid border bg-rose-400 hover:bg-rose-500 p-3 rounded-lg h-24 w-24">
                <FontAwesomeIcon icon={faCamera} className="w-16 h-16" />
            </button>
        </div>
        <div className='flex flex-col'> 
            <button onClick={()=>{getUsers()}}>Get users</button>
            <div className='flex'>
                <form><input value={inputValue} onChange={handleChange}></input></form>
                <button onClick={()=>{deleteUser(inputValue)}} >Delete users</button>
            </div>
        </div>
        </>
    );
}

export default AddPost;
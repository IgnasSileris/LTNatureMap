import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

function AddPost() {
    return (
        <div className="flex-initial">
            <button title="Add post" className="border-solid border bg-rose-400 hover:bg-rose-500 p-3 rounded-lg h-24 w-24">
                <FontAwesomeIcon icon={faCamera} className="w-16 h-16" />
            </button>
        </div>
    );
}

export default AddPost;
import React from 'react';

const imgURL = 'https://e0.pxfuel.com/wallpapers/150/430/desktop-wallpaper-landscapes-nature-lithuania-baltic-states-unseen.jpg'
function BackgroundImage() {
    return (
        <div
            className="bg-cover bg-center h-full w-full blur-sm"
            style = {{backgroundImage: `url(${imgURL})`
            }}>
        </div>
    );
}

export default BackgroundImage;
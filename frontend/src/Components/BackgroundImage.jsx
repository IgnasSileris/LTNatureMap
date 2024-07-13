import React from 'react';
import { Outlet } from 'react-router-dom';

const imgURL = 'https://e0.pxfuel.com/wallpapers/150/430/desktop-wallpaper-landscapes-nature-lithuania-baltic-states-unseen.jpg'
function BackgroundImage() {
    return (
       <React.Fragment>
         <div
            className="bg-cover bg-center h-full w-full blur-sm"
            style = {{backgroundImage: `url(${imgURL})`
            }}>

              
        </div>
        <Outlet />
       </React.Fragment>
    );
}

export default BackgroundImage;
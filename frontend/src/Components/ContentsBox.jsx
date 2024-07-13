import React, { useState } from 'react';
import DisplaySelection from './DisplaySelection'
import TimeframeSelection from './TimeframeSelection';
import AddPost from './AddPost';
import LoginSignupBar from './LoginSignupBar';
import { Outlet } from 'react-router-dom';
import { useDisplayModeStore } from '../stores/displayModeStore';
import { useLoginStatusStore } from '../stores/loginStatusStore';

function ContentsBox() {
    const displayMode = useDisplayModeStore((state) => state.displayMode);
    const loginStatus = useLoginStatusStore((state) => state.loginStatus);

    return (
        <div className="absolute w-4/6 h-5/6 bg-slate-100 bg-opacity-90 rounded-xl shadow-lg p-10">
            <div className="flex flex-row w-full h-full p-2 gap-2">
                <div className="flex flex-col gap-0.5" style={{width: '70%', height: '100%'}}>
                    <div className="flex flex-wrap justify-between items-end" style={{width: '100%', height: '10%'}}>
                        <DisplaySelection/>
                        {displayMode != 'Search' && ( <TimeframeSelection/> )}
                    </div>
                    <div className="flex border bg-white justify-center items-center" style={{width: '100%', height: '90%'}}>
                        <Outlet />
                    </div>
                </div>
                <div className="flex flex-col" style={{width: '30%', height: '100%'}}>
                    <div className="flex flex-wrap justify-end items-start" style={{width: '100%', height: '10%'}}>
                        {loginStatus != true && <LoginSignupBar/>}
                    </div>
                    <div className="flex flex-wrap justify-center items-center" style={{width: '100%', height: '90%'}}>
                        <AddPost/>
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default ContentsBox;
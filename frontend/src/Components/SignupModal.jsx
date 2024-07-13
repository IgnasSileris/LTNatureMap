import React, { useState, useEffect } from 'react';
import ModalDialog from "react-basic-modal-dialog";
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import '../ExtraCSS/custom.css';
import { useNavigate } from 'react-router-dom';
import { useLocationStateStore } from '../stores/locationStateStore';

function SignupModal() {
    const navigate = useNavigate();
    const locationState = useLocationStateStore((state) => state.locationState);
    const setLocationState = useLocationStateStore((state) => state.setLocationState);

    const closingSignup = () => {
        try {
            navigate(locationState.pathname);
        } catch {
            navigate('/')
        }
        setLocationState(null);
    }

    //#region Input value manager
    //#region Email
    const [emailValue, setEmailValue] = useState('');
    const [emailStatus, setEmailStatus] = useState('Passive') //options: 'Passive' - no text, 'Invalid" - incorrect format, 'Valid' - valid and free, 'Taken' - already in use
    
    const handleEmailChange = (e) => {
        setEmailValue(e.target.value);
    }
    const checkEmailValidity = (eValue) => {
        eValue = eValue.toLowerCase();
        const takenEmails = ["alice@gm.com", "bob@gm.com", "charlie@gm.com", "david@gm.com", "eve@gm.com"];
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //simple Regex (does not contain all the possible email rules, email confirmation in backend)

        if (emailRegex.test(eValue)){
            setEmailStatus('Valid');
        }
        if (emailRegex.test(eValue) === false){
            setEmailStatus('Invalid');
        }
        if (takenEmails.includes(eValue)){
            setEmailStatus('Taken');
        }
        if (eValue.length === 0) {
            setEmailStatus('Passive');
        }
    }
        
    useEffect(()=> {
        checkEmailValidity(emailValue);
    }, [emailValue])

    const [emailStyleClass, setEmailStyleClass] = useState({styleClass: 'custom-inputs', text: '', textColor: 'black'});
    const handleEClassChange = (eStatus) => {
        switch (eStatus){
            case 'Passive':
                setEmailStyleClass({styleClass: 'custom-inputs', text: '', textColor: 'black'});
                break;

            case 'Valid':
                setEmailStyleClass({styleClass: 'custom-inputs-valid', text: 'Email is available', textColor: '#36a307'});
                break;

            case 'Invalid':
                setEmailStyleClass({styleClass: 'custom-inputs-invalid', text: 'Invalid email', textColor: '#f50505'});
                break;

            case 'Taken':
                setEmailStyleClass({styleClass: 'custom-inputs-taken', text: 'Email is taken', textColor: '#d4ac18'});
                break;
        }
    }

    useEffect(()=> {
        handleEClassChange(emailStatus);
    }, [emailStatus])
    //#endregion
    //#region Username
    const [usernameValue, setUsernameValue] = useState('');
    const [usernameStatus, setUsernameStatus] = useState('Passive') //options: 'Passive' - no text, 'Invalid" - incorrect format, 'Valid' - valid and free, 'Taken' - already in use
    
    const handleUsernameChange = (e) => {
        setUsernameValue(e.target.value);
    }
    
    const isChar = (cCode) => {
        if (('a'.charCodeAt(0) <= cCode && cCode <= 'z'.charCodeAt(0)) || ('A'.charCodeAt(0) <= cCode && cCode <= 'Z'.charCodeAt(0))) {
            return true
        }
        else {
            return false
        }
    }
    
    const checkUsernameValidity = (uValue) => {
        const takenUsernames = ["Alice", "Bob", "Charlie", "David", "Eve"];
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        if (uValue.length === 0){
            setUsernameStatus('Passive');
        }
        if (uValue.length >= 2 && isChar(uValue.charCodeAt(0)) && alphanumericRegex.test(uValue)){
            setUsernameStatus('Valid');
            if (takenUsernames.includes(uValue)) { // Replace with req and res to and from server
                setUsernameStatus('Taken');
            }
        }
        if ((0 < uValue.length && uValue.length < 2) || ((uValue.length > 2) && (isChar(uValue.charCodeAt(0))===false || alphanumericRegex.test(uValue) === false))){
            setUsernameStatus('Invalid');
        }
    }

    useEffect(()=> {
        checkUsernameValidity(usernameValue);
    }, [usernameValue])

    const [usernameStyleClass, setUsernameStyleClass] = useState({styleClass: 'custom-inputs', text: '', textColor: 'black'});
    const handleUClassChange = (uStatus) => {
        switch (uStatus){
            case 'Passive':
                setUsernameStyleClass({styleClass: 'custom-inputs', text: '', textColor: 'black'});
                break;

            case 'Valid':
                setUsernameStyleClass({styleClass: 'custom-inputs-valid', text: 'Username is available', textColor: '#36a307'});
                break;

            case 'Invalid':
                setUsernameStyleClass({styleClass: 'custom-inputs-invalid', text: 'Must be 2-25 characters long and start with a letter', textColor: '#f50505'});
                break;

            case 'Taken':
                setUsernameStyleClass({styleClass: 'custom-inputs-taken', text: 'Username is taken', textColor: '#d4ac18'});
                break;
        }
    }

    useEffect(()=> {
        handleUClassChange(usernameStatus);
    }, [usernameStatus])
    //#endregion
    //#region Password
    // Password 1
    const [password1Value, setPassword1Value] = useState('');
    const [passwordReqs, setPasswordReqs] = useState({length: false, upper_lower: false, contains_number: false}); //is each requirement met
    const [showReqs, setShowReqs] = useState(false);
    const [passwordReqStyles, setPasswordReqStyles] = useState({length: '#4b5563', upper_lower: '#4b5563', contains_number: '#4b5563'}); //defines text color for each requirement
    const [password1Status, setPassword1Status] = useState('Passive'); //options: 'Passive' - no text, 'Invalid" - incorrect format, 'Valid' - valid
    const [password1Style, setPassword1Style] = useState({style: 'custom-inputs', text: '', color: 'black'}); //defines the border color of the whole input box

    const handlePassword1Change = (e) => {
        setPassword1Value(e.target.value);
    }

    const checkPasswordReqValidity = (p1Value) => {
        const upperLowerRegex = /^(?=.*[a-z])(?=.*[A-Z])/; //Regex to check if uppercase and lowercase letter in string
        const numberRegex = /\d/; //Regex to check if at least one numeric value in string
        setPasswordReqs({length: (p1Value.length >= 6), upper_lower: upperLowerRegex.test(p1Value), contains_number: numberRegex.test(p1Value)});
    }

    const checkStyle = (statement) => {
        if (statement) {
            return "#36a307";
        }
        else {
            return '#f50505';
        }
    }

    const handleP1StyleChange = (p1Status) => {
        switch (p1Status){
            case 'Passive':
                setPassword1Style({style: 'custom-inputs', text: '', color: 'black'});
                break;

            case 'Valid':
                setPassword1Style({style: 'custom-inputs-valid', text: 'Password is valid', color: '#36a307'});
                break;

            case 'Invalid':
                setPassword1Style({style: 'custom-inputs-invalid', text: 'Password is invalid', color: '#f50505'});
                break;;
        }
    }

    useEffect(()=> {
        if (password1Value.length === 0) {
            setPassword1Status('Passive');
        }
        else if (passwordReqs.length && passwordReqs.upper_lower && passwordReqs.contains_number){
            setPassword1Status('Valid');
        }
        else {
            setPassword1Status('Invalid');
        }
    }, [passwordReqs])
    
    useEffect(()=> {
        if (password1Status == 'Passive') {
            setPasswordReqStyles({length: '#4b5563', upper_lower: '#4b5563', contains_number: '#4b5563'});
        }
        else {
            setPasswordReqStyles({length: checkStyle(passwordReqs.length), upper_lower: checkStyle(passwordReqs.upper_lower), contains_number: checkStyle(passwordReqs.contains_number)});
        }
        handleP1StyleChange(password1Status);
    }, [passwordReqs, password1Status])

    useEffect(()=> {
        checkPasswordReqValidity(password1Value);
    },[password1Value])

    // Password 2
    const [password2Value, setPassword2Value] = useState('');
    const [password2Status, setPassword2Status] = useState('Passive'); //options: 'Passive' - no text, 'Invalid" - does not match with password 1, 'Valid' - matches with password 1
    const [password2Style, setPassword2Style] = useState({style: 'custom-inputs', text: '', color: 'black'}); //defines the border color of the whole input box

    const handlePassword2Change = (e) => {
        setPassword2Value(e.target.value);
    }
   
    useEffect(()=> {
        if (password2Value.length === 0) {
            setPassword2Status('Passive');
        }
        else if (password2Value === password1Value) {
            setPassword2Status('Valid');
        }
        else {
            setPassword2Status('Invalid');
        }
    }, [password1Value, password2Value])

    const handleP2StyleChange = (p2Status) => {
        switch (p2Status){
            case 'Passive':
                setPassword2Style({style: 'custom-inputs', text: '', color: 'black'});
                break;

            case 'Valid':
                setPassword2Style({style: 'custom-inputs-valid', text: 'Passwords match', color: '#36a307'});
                break;

            case 'Invalid':
                setPassword2Style({style: 'custom-inputs-invalid', text: 'Passwords do not match', color: '#f50505'});
                break;;
        }
    }

    useEffect(()=> {
        handleP2StyleChange(password2Status);
    }, [password2Status])

    //#endregion
    //#endregion
    return (
        <ModalDialog isDialogVisible={true} closeDialog={() => {}}
        dialogClassName="bg-gray-200 w-1/4 h-3/4 rounded-lg backdrop:bg-black/40"
        divClassName="flex flex-col w-full h-full justify-center items-center">     
            <div className="w-full flex items-center justify-end p-5 pb-1 pt-1">
                <button title="Close" className="font-normal text-3xl font-sans text-gray-500 hover:text-black" onClick={()=> closingSignup()}> x</button>
            </div>
            <div className="flex w-full h-full p-12 pt-0">
                <div className="flex flex-col w-full h-full">
                    <div className="flex items-center justify-center text-2xl font-bold" style={{width: '100%', height: '15%'}}>
                        Create an account
                    </div>
                    <div className="flex flex-col items-start" style={{width:'100%', height:'15%'}}>
                        <span className="p-float-label w-full">
                            <InputText type="text" className={emailStyleClass.styleClass} maxLength={80} value={emailValue} onChange={handleEmailChange}/>
                            <label htmlFor="username">Enter your email</label>
                        </span>
                        <div className="flex justify-between w-full">
                            <span className="flex-grow"></span>
                            <span className="text-sm" style={{color: emailStyleClass.textColor}}> {emailStyleClass.text}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start" style={{width:'100%', height:'15%'}}>
                        <span className="p-float-label w-full">
                            <InputText type="text" className={usernameStyleClass.styleClass} maxLength={25} value={usernameValue} onChange={handleUsernameChange}/>
                            <label htmlFor="username">Choose a username</label>
                        </span>
                        <div className="flex justify-between w-full">
                            <span className="flex-grow"></span>
                            <span className="text-sm" style={{color: usernameStyleClass.textColor}}> {usernameStyleClass.text}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start" style={{width:'100%', height:'40%'}}>
                        <span className="p-float-label w-full">
                            <Password style={{width: '100%'}} inputClassName={password1Style.style} inputId="password" value={password1Value}
                            maxLength={25} toggleMask feedback={false} onChange={handlePassword1Change} onFocus={() => setShowReqs(true)} onBlur={() => setShowReqs(false)}/>
                            <label htmlFor="password">Create a password</label>
                        </span>
                        <div className="flex flex-col justify-between w-full text-sm text-gray-600 gap-1">
                            {showReqs === false && <div className="flex justify-between w-full">
                                <span className="flex-grow"></span>
                                <span className="text-sm" style={{color: password1Style.color}}> {password1Style.text}</span>
                            </div>}
                            {showReqs && <div className="flex flex-col gap-1">
                                <span style={{color: passwordReqStyles.length}}>• Password must be 6-25 characters long</span>
                                <span style={{color: passwordReqStyles.upper_lower}}>• Password must contain both uppercase and lowercase characters</span>
                                <span style={{color: passwordReqStyles.contains_number}}>• Password must contain a number</span>
                            </div>}    
                        </div>
                        <div style={{width: '100%', height: '15%'}}></div>
                        <div className="flex flex-col justify-center" style={{width:'100%'}}>
                                <span className="p-float-label w-full">
                                    <Password style={{width: '100%'}} inputClassName={password2Style.style} inputId="password" value={password2Value}
                                    maxLength={25} toggleMask feedback={false} onChange={handlePassword2Change}/>
                                    <label className="text-base" htmlFor="password">Confirm your password</label>
                                </span>
                                <div className="flex justify-between w-full">
                                    <span className="flex-grow"></span>
                                    <span className="text-sm" style={{color: password2Style.color}}> {password2Style.text}</span>
                                </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center" style={{width:'100%', height:'15%'}}>
                        <button className="border-solid border bg-rose-400 hover:bg-rose-500 px-4 py-2 rounded-md">Sign up</button>
                    </div>
                    <div className="flex items-center justify-center" style={{width:'100%', height:'5%'}}>
                        <span>Already have an account? <button className="text-sky-800 hover:text-indigo-500"
                        onClick={()=> navigate('/login')}> Log in.</button></span>
                    </div>
                </div>
            </div>      
        </ModalDialog>
    );
}

export default SignupModal;
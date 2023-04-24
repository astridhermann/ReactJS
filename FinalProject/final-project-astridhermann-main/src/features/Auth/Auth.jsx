import { useState } from 'react';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRightOnRectangleIcon, CheckCircleIcon, ExclamationTriangleIcon, UserPlusIcon } from '@heroicons/react/24/outline'; 

import { configureApi, ApiError } from '../../helpers/api.helper'
import { Button } from '../../components/Button/Button';

import styles from './Auth.module.css';
import { useAuth } from './Auth.context';


const {add: apiRegister} = configureApi('register'); //am redenumit metoda add -> register 
const {add: apiLogin} = configureApi('login');  

const emailReggex = 
/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

function checkFormValidity(input, isRegister) {

  let isValid = true;
  const errors = {};

  if (input.email === '' || !emailReggex.test(input.email))
  {
    errors.email = 'The email address needs to be valid.';
    isValid = false;
  }

  if (input.password === '')
  {
    errors.password = 'The password may not be empty.';
    isValid = false;
  }

  if (isRegister)
  {
      if (input.password !== input.retype_password)
      {
        errors.retype_password = 'The passwords do not match.';
        isValid = false;
      }
      if (input.firstName === '')
      {
        errors.firstName = 'Please specify a first name.';
        isValid = false;
      }
      if (input.lastName === '')
      {
        errors.lastName = 'Please specify a last name.';
        isValid = false;
      }
  }
  
  return { isValid, errors };
}

const initialErrors =
{ 
    email: '',
    password: '',
    retype_password: '',
    firstName: '',
    lastName: '',
};

export function Auth() {

const [apiError, setApiError] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const [errors, setErrors] = useState(initialErrors);


//redirectionare pe alta pagina:
const navigate = useNavigate();

const { login } = useAuth(); //ne luam ce avem nevoie

//determinare daca este pagina de register 
const { pathname: path } = useLocation();
const isRegister = path === "/register";

async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);
    const user = Object.fromEntries(data.entries()); //echivalent cu for-ul de mai jos

    const {isValid, errors} = checkFormValidity(user, isRegister); //extragem un obj boolean si un obj de errori
    
    if (!isValid)
    {
      setErrors(errors);
      return;
    }

    // curatam formularul la submit daca nu avem erori
    setApiError('');
    setErrors(initialErrors);
    setSuccessMessage('');

    delete user.retype_password;

    // parcurgem toate elementele de pe UI
    // for (const [key, value] of data.entries()){
    //     user[key] = value;
    // }
    try {
      let auth;
      if (isRegister)
      {
        auth = await apiRegister(user);
        setSuccessMessage('You have registered successfully!');
      }
      else
      {
        auth = await apiLogin(user);
        setSuccessMessage('You have logged in successfully!');
      }
      
      login(auth);
      console.log(auth);
      navigate('/'); //navigheaza la homepage

    }
    catch (e)
    {
      if (e instanceof ApiError) //daca 'e' este o eroare de a noastra
      {
         //o afisam utilizatorului
         setApiError(e.message);
         return;
      }

      throw e;
    }
}

function wipeErrors(e)
{
  setErrors({...errors, [e.target.name]: ''});
}

    return (
        <>
          <h1>{ isRegister ? 'Register' : 'Login'}</h1>
          { successMessage &&  <div className={styles.sucessMessage}> 
            <CheckCircleIcon width={24} />
            {successMessage} 
          </div> }

          { apiError &&  <div className={styles.formError}> 
            <ExclamationTriangleIcon width={24} />
            {apiError} 
          </div> }

          <form className={styles.authForm} onSubmit={handleSubmit}>  
            <label htmlFor="email">Email</label>
            <input 
            name="email" 
            id="email" 
            type="email" 
            className={clsx({[styles.hasError] : errors.email})} 
            onChange={wipeErrors}
            />
            {errors.email &&  <p className={styles.inputError}>{errors.email} </p>}

            <label htmlFor="password">Password</label>
            <input 
            name="password" 
            id="password" 
            type="password"  
            className={clsx({[styles.hasError] : errors.password})} 
            onChange={wipeErrors}
            />
            {errors.password &&  <p className={styles.inputError}>{errors.password} </p>}
          
        {isRegister && 
          (
            <>
            <label htmlFor="retype_password">Retype Password</label>
            <input 
            name="retype_password" 
            id="retype_password" 
            type="password"  
            className={clsx({[styles.hasError] : errors.retype_password})} 
            onChange={wipeErrors}
            />
            {errors.retype_password &&  <p className={styles.inputError}>{errors.retype_password} </p>}
          
            <label htmlFor="firstName">First Name</label>
            <input 
            name="firstName" 
            id="firstName" 
            type="text" 
            className={clsx({[styles.hasError] : errors.firstName})} 
            onChange={wipeErrors}
            />
            {errors.firstName &&  <p className={styles.inputError}>{errors.firstName} </p>}

            <label htmlFor="lastName">Last Name</label>
            <input 
            name="lastName" 
            id="lastName" 
            type="text" 
            className={clsx({[styles.hasError] : errors.lastName})}
            onChange={wipeErrors}
             />
            {errors.lastName &&  <p className={styles.inputError}>{errors.lastName} </p>}
            </>
            )}

            <div className={styles.sub}>
                <Button variant="primary">
                   { isRegister ? 'Register' : 'Login'}
                   { isRegister && <UserPlusIcon width={20}/>}
                   { !isRegister && <ArrowRightOnRectangleIcon width={20}/>}
                </Button>
            </div>
          </form>
        </>
    );
}
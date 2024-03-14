//import { useEffect } from 'react';
//import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';

const Authentication = () => {
  // useEffect(() => {
  //   const asyncFn = async () => {
  //     const response = await getRedirectResult(auth);

  //     if(response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   };
  //   asyncFn();
  // }, []);
  //<button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
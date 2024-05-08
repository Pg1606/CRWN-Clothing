import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// import {
//   createAuthUserWithEmailAndPassword,
//   createUserDocumentFromAuth
// } from "../../utils/firebase/firebase.utils";

import {SignupContainer} from './sign-up-form.styles';
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(formFields => (defaultFormFields));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // const { user } = await createAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );

      // await createUserDocumentFromAuth(user, { displayName });
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch(error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('cannot create user, email already in use');
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields(formFields => ({ ...formFields, [name]: value }))
  };//this is to check the prev state of the fields u can imagine formfeilds as prevState

  return (
    <SignupContainer>
      <h2>Don't have an Account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          autoComplete="true"
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          autoComplete="true"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignupContainer>
  );
};

export default SignUpForm;
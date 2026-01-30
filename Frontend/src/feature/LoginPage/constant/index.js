
const LOGIN_IN = [
  {
    name: 'email',
    label: 'Email ',
    type: 'input',
    placeholder: 'Enter your email here ',
    rules: { required: 'Email is required!' }
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Password',
    rules: { 
      required: 'Password is required!',
      minLength: { value: 3, message: 'Password must be at least 3 characters' }
    }
  }
];

export default LOGIN_IN;
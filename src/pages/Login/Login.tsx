import * as React from 'react';
import AuthWrapper from '../../shared/AuthWrapper';
import LoginForm from './LoginForm';

const Login = () => (
  <AuthWrapper>
    <LoginForm />
  </AuthWrapper>
);

export default Login;

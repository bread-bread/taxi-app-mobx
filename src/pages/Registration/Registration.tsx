import * as React from 'react';
import RegistrationForm from './RegistrationForm';
import AuthWrapper from '../../shared/AuthWrapper';

const Registration = () => (
  <AuthWrapper>
    <RegistrationForm />
  </AuthWrapper>
);

export default Registration;
import Login from './Login';
import React from 'react';
import { auth } from '../../../firebase/firebaseUtils';
import { signInWithEmailAndPassword } from 'firebase/auth';
import 'regenerator-runtime/runtime';

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// afterEach(cleanup);

describe('App component', () => {
  test('it renders', async () => {
    const wrapper = render(<Login />);

    // const onSubmit = jest.fn();
    // const signInWithEmailAndPassword = jest.fn();

    const email = 'test@test.com';
    const password = 'password';
    userEvent.type(screen.getByLabelText(/email/i), email);
    userEvent.type(screen.getByLabelText(/password/i), password);

    // form.simulate('submit', { preventDefault: () => {} });
    await userEvent.click(screen.getByRole('button', { name: /Login/i }));

    // expect(mockHistoryPush).toHaveBeenCalledWith('/');

    // await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));

    // await waitFor(() =>
    //   expect(signInWithEmailAndPassword).toHaveBeenCalledWith({
    //     email: email,
    //     password: password,
    //   })
    // );

    // expect(signInWithEmailAndPassword).toBeCalledWith(email, password);

    console.debug(wrapper.debug());
  });
});

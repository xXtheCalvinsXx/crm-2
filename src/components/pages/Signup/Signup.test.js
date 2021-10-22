import Signup from './Signup';
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
    const wrapper = render(<Signup />);
    console.debug(wrapper.debug());

    // const onSubmit = jest.fn();
    // const signInWithEmailAndPassword = jest.fn();

    const email = 'test@test.com';
    const password = 'password';
    const fname = 'fname';
    const lname = 'lname';
    userEvent.type(wrapper.container.querySelector('#email'), email);
    userEvent.type(wrapper.container.querySelector('#password'), password);
    userEvent.type(wrapper.container.querySelector('#password2'), password);
    userEvent.type(wrapper.container.querySelector('#firstName'), fname);
    userEvent.type(wrapper.container.querySelector('#lastName'), lname);
    // await userEvent.click();

    // form.simulate('submit', { preventDefault: () => {} });
    await userEvent.click(wrapper.container.querySelector('#SubmitButton'));

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

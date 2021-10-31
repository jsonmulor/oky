import { auth } from '@/services/firebaseConfig';
import { AUTH_ERROR } from 'constants';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { api } from '../api';
import {
  signinInitialValues,
  validationSchemaSignin,
} from '../constants/formik';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [errorAuth, setAuthError] = useState({});
  const {
    push,
  } = useRouter();

  const handleSubmitSignin = async ({ email, password }) => {
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);
      const {
        data: { sessionKey },
      } = await api.getUserSessionKey({ email });
      localStorage.setItem('sessionKey', sessionKey);
      setTimeout(() => {
        setLoading(false);
        push('/');
      }, 1500);
    } catch (error) {
      setLoading(false);
      setAuthError({
        errEmail: 'Email đã tồn tại! Vui lòng nhập email khác',
        errPassword: '',
      });
      setTimeout(() => {
        setAuthError({});
      }, 3000);
    }
  };

  const { errEmail, errPassword } = errorAuth;

  useEffect(() => {
    document.title = 'Đăng ký';
  }, []);

  useEffect(() => {
    document.querySelector('body').style =
      'background: url("https://i.imgur.com/lVGjzrS.png") 50% fixed; background-size: cover;';
    return () => {
      document.querySelector('body').style = 'background: none';
    };
  }, []);

  return (
    <div className="wrapper">
      <Formik
        initialValues={signinInitialValues}
        onSubmit={handleSubmitSignin}
        validationSchema={validationSchemaSignin}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form
            className={`login ${loading ? 'loading' : ''}`}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <p className="title">
              Đăng ký miễn phí
            </p>
            <Field name="email">
              {({ field }) => (
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Nhập Email"
                  {...field}
                />
              )}
            </Field>
            <span className="form-bar" />
            {((errors.email && touched.email) || errEmail) && (
              <span className="auth-error-msg">{errors.email || errEmail}</span>
            )}
            <i className="fa fa-user" />
            <Field name="password">
              {({ field }) => (
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Tạo mật khẩu gồm 8 ký tự"
                  {...field}
                />
              )}
            </Field>
            {((errors.password && touched.password) || errPassword) && (
              <span className="auth-error-msg">
                {errors.password || errPassword}
              </span>
            )}
            <p>
              <span>
                Đã có tài khoản?{' '}
                <Link href="/dang-nhap" as="/dang-nhap">
                  <a
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    Đăng nhập
                  </a>
                </Link>
              </span>
            </p>
            <button type="submit">
              <i className="spinner" />
              <span className="state">Đăng ký</span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

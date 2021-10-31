import { auth } from '@/services/firebaseConfig';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { api } from '../api';
import {
  signinInitialValues,
  validationSchemaSignin,
} from '../constants/formik';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorAuth, setAuthError] = useState({});
  const {
    push,
    query: { code },
  } = useRouter();

  const handleSubmitSignin = async ({ email, password }) => {
    try {
      setLoading(true);
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      if (user) {
        const {
          data: { sessionKey },
        } = await api.getUserSessionKey({ email });
        localStorage.setItem('sessionKey', sessionKey);
        setTimeout(() => {
          setLoading(false);
          push('/');
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      if (error.code.includes('user')) {
        setAuthError({
          errEmail: 'Email không tồn tại, thử lại',
          errPassword: '',
        });
      } else if (error.code.includes('password')) {
        setAuthError({
          errEmail: '',
          errPassword: 'Mật khẩu không chính xác, thử lại',
        });
      } else if (error.code.includes('too-many-requests')) {
        setAuthError({
          errEmail: '',
          errPassword: 'Quá nhiều yêu cầu, thử lại sau vài phút',
        });
      }
      setTimeout(() => {
        setAuthError({});
      }, 3000);
    }
  };

  const { errEmail, errPassword } = errorAuth;

  function renderMessage() {
    if (parseInt(code) === 401) {
      return 'Để ngăn chặn việc kẻ xấu lợi dụng, vì vậy hệ thống chỉ cho phép đăng nhập một thiết bị hoặc trình duyệt trên cùng một tài khoản đăng ký.';
    }
  }

  useEffect(() => {
    document.title = 'Đăng nhập';
  }, []);

  useEffect(() => {
    document.querySelector('body').style =
      'background: url("https://i.imgur.com/KPGpfym.jpg") 50% fixed; background-size: cover;';
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
            <span className="auth-error-msg">{renderMessage()}</span>
            <p className="title">
              Đăng nhập {parseInt(code) === 401 ? 'lại' : ''}
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
                  placeholder="Nhập mật khẩu"
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
                Bạn cần trợ giúp?{' '}
                <a
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                  target="_blank"
                  href="https://www.facebook.com/groups/933883197356348/announcements"
                  rel="noreferrer"
                >
                  Tại đây
                </a>
              </span>
            </p>
            <button type="submit">
              <i className="spinner" />
              <span className="state">Đăng nhập</span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

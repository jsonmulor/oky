import * as Yup from 'yup';

export const validationSchemaSignin = Yup.object().shape({
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Phải nhập địa chỉ email'),
  password: Yup.string()
    .min(8, 'Mật khẩu cần ít nhất 8 ký tự')
    .required('Phải nhập mật khẩu'),
});

export const signinInitialValues = {
  email: '',
  password: '',
};

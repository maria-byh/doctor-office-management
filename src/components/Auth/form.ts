import * as yup from 'yup'

export const authFromSchema = yup.object().shape({
    fullName: yup
    .string()
    .required('you should enter your full name'),
    email: yup
    .string()
    .email('please provide a valid email address')
    .required('email address is required'),
    password: yup
    .string()
    .min(6, 'password should be a minimum length of 6')
    .max(12, 'password should have a maximum length of 12')
    .required('password is required')
})

export interface AuthForm {
    fullName: string;
    email: string;
    password: string;
}
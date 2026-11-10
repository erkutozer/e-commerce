import * as yup from "yup";

const email = yup.string().trim().required("Email alanı zorunludur.").email("Geçerli bir email giriniz.");

export const loginSchema = yup.object({
    email,
    password: yup.string().required("Parola alanı zorunludur.")
})

export const registerSchema = yup.object({
    fullName: yup.string().required("Bu alan zorunludur.").min(3, "En az 3 karakter girin"),
    password: yup.string().required("Parola alanı zorunludur").min(8, "En az 8 karakter giriniz").max(20, "En fazla 20 karakter girebilirsiniz."),
    confirmPassword: yup.string().required("Parola tekrarı zorunludur").oneOf([yup.ref("password")], "Parolalar eşleşmiyor")
})
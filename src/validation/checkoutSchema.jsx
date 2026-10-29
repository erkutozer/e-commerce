import * as yup from "yup";

export const checkoutSchema = yup.object({
    fullname: yup.string().required('Ad soyad alanları zorunludur.').min(3, 'En az 3 karakter giriniz'),
    email: yup.string().required('Email alanı zorunludur').email('Lütfen geçerli bir e-posta giriniz.'),
    phone: yup.string().required('Telefon alanı zorunludur.').matches(/^05\d{9}$/, '05 ile başlayan 11 haneli numara girin'),
    city: yup.string().required('Şehir zorunludur.'),
    address: yup.string().required('Adres zorunludur.').min(10, 'Lütfen adresi daha detaylı yazınız.')
});
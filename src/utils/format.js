export const formatPrice = (value) => `${Number(value).toFixed(2)}`;

export const formatDate = (value) => new Date(value).toLocaleString('tr-TR', { dateStyle: "medium", timeStyle: "short" });
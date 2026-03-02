export const getStorageData = () => {
    return JSON.parse(sessionStorage.getItem('products')) || [];
};
export const setStorageData = (data) => {
    sessionStorage.setItem('products', JSON.stringify(data));
};

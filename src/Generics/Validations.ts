export const isValidEmailAddress = (email: string): boolean => {
    // validating email addresses
    email = removeSpace(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
export const isValidPassword = (password: string): boolean => {
    // validating password
    password = removeSpace(password);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return passwordRegex.test(password);
};

export const isValidContactNumber = (contactNumber: string): boolean => {
    // validating Contact Number
    contactNumber = removeSpace(contactNumber);
    if (contactNumber.length == 10) {
        var contactNumberRegex = /[6789][0-9]{9}/;
        return contactNumberRegex.test(contactNumber);
    }
    else if (contactNumber.length == 13) {
        var contactNumberRegex = /^\+91(7\d|8\d|9\d)\d{9}$/;
        return contactNumberRegex.test(contactNumber);
    }
    return false;
};

export const isValidName = (name: string): boolean => {
    // validating name => firstname, lastname

    const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
    return nameRegex.test(name);
};

export const removeSpace = (str: string) => {
    return str.replace(/\s/g, '');
}
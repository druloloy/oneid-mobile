import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);

// validate login data
const loginValidation = data => {
  const rules = {
    mobileNumber: 'required|regex:/^([9]\\d{9})$/',
    password: 'required|string',
  };

  const message = {
    'regex.mobileNumber':
      'Dapat na 10 digits lang at nagsisimula sa 9, halimbawa: 9123456789',
    'required.mobileNumber': 'Ang mobile number ay kailangan.',
    'required.password': 'Ang password ay kailangan.',
  };

  const validation = new Validator(data, rules, message);
  validation.setAttributeNames({
    mobileNumber: 'mobile number',
  });
  return validation;
};

// validate signup data
const signupValidation = data => {
  const rules = {
    mobileNumber: 'required|numeric|regex:/^([9]\\d{9})$/',
    password: 'required|string|min:8',
    confirmPassword: 'required|string|same:password',
  };

  const message = {
    'regex.mobileNumber':
      'Dapat na 10 digits lang at nagsisimula sa 9, halimbawa: 9123456789',
    'required.mobileNumber': 'Ang mobile number ay kailangan.',
    'required.password': 'Ang password ay kailangan.',
    'required.confirmPassword': 'Ang confirm password ay kailangan.',
    'min.password': 'Ang password ay dapat na 8 characters o higit pa.',
    'same.confirmPassword':
      'Ang confirm password ay dapat na katulad ng password.',
  };

  const validation = new Validator(data, rules, message);

  return validation;
};

// validate personal details data
const nameValidation = data => {
  const rules = {
    firstName: 'required|string|min:2|max:50|regex:/^[a-zA-Z]+$/',
    middleName: 'string|regex:/^[a-zA-Z]*$/',
    lastName: 'required|string|min:2|max:50|regex:/^[a-zA-Z]+$/',
    suffix: 'string|in:Jr.,Sr.,III',
  };

  const message = {
    'required.firstName': 'Ang first name ay kailangan.',
    'min.firstName': 'Ang first name ay dapat na 2 characters o higit pa.',
    'required.lastName': 'Ang last name ay kailangan.',
    'min.lastName': 'Ang last name ay dapat na 2 characters o higit pa.',
    'in.suffix': 'Ang suffix ay dapat na Jr., Sr., III.',
    'regex.firstName': 'Ang first name ay dapat na letters lamang.',
    'regex.middleName': 'Ang middle name ay dapat na letters lamang.',
    'regex.lastName': 'Ang last name ay dapat na letters lamang.',
  };

  const validation = new Validator(data, rules, message);

  return validation;
};

// validate address data
const personalDetailsValidation = data => {
  const rules = {
    // birthdate must be between 1900 and now
    birthDate: 'required|date',
    sex: 'required|string|in:male,female',
    houseNumber: 'required|string',
    street: 'required|string',
    barangay: 'required|string',
    city: 'required|string',
  };

  const message = {
    'required.birthDate': 'Ang birth date ay kailangan.',
    'date.birthDate': 'Ang birth date ay dapat na date.',
    'required.sex': 'Ang kasarian ay kailangan.',
    'required.sex': 'Ang kasarian ay dapat na lalaki o babae.',
    'required.houseNumber': 'Ang house number ay kailangan.',
    'required.street': 'Ang street ay kailangan.',
    'required.barangay': 'Ang barangay ay kailangan.',
    'required.city': 'Ang city ay kailangan.',
  };

  const validation = new Validator(data, rules, message);

  return validation;
};

// validate medical details data
const medicalDetailsValidation = data => {
  const rules = {
    bloodType: 'required|string|in:A+,A-,B+,B-,AB+,AB-,O+,O-,Unknown',
    height: [`regex:/^([2-8]'[0-9]|[2-8]'1[0-1])$/`],
    weight: 'numeric|max:500',
    allergies: 'array',
  };

  const message = {
    'required.bloodType': 'Ang blood type ay kailangan.',
    'regex.height':
      "Ang height ay dapat na 2-8 feet at 0-11 inches. Halimbawa: 5'10",
    'numeric.weight': 'Ang weight ay dapat na number.',
    'max.weight': 'Ang weight ay dapat na 500 kg o mas mababa.',
  };
  const validation = new Validator(data, rules, message);

  return validation;
};

export default {
  loginValidation,
  signupValidation,
  nameValidation,
  personalDetailsValidation,
  medicalDetailsValidation,
};

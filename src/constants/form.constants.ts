import { FormFieldRegex } from "@/src/types/form.types";

export const RegexType = {
  ANAGRAPHIC_STRING: new RegExp(/^[a-zA-Zàéèìòù\ \-\']{2,30}$/g),
  ANAGRAPHIC_USERNAME: new RegExp(/^[a-zA-Z0-9\_\-]{4,30}$/g),
  EMAIL: new RegExp(/^([\w-\.]{2,30})+@(([\w-]{2,20})+\.)+[\w-]{2,10}$/g),
  PASSWORD: new RegExp(
    /(?!^[0-9]*$)(?!^[a-zA-Z!@#$%^&*()_+=<>?]*$)^([a-zA-Z!@#$%^&*()_+=<>?0-9]{6,48})$/g
  ),
  PASSWORD_STRONG: new RegExp(
    /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g
  ),
  WEBSITE: new RegExp(
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
  ),
};

const FormAnagraphicBase: FormFieldRegex[string] = {
  minLength: 2,
  maxLength: 30,
  pattern: RegexType.ANAGRAPHIC_STRING,
};

export const FormFieldType: FormFieldRegex = {
  NAME: FormAnagraphicBase,
  SURNAME: FormAnagraphicBase,
  USERNAME: {
    minLength: 4,
    maxLength: 30,
    pattern: RegexType.ANAGRAPHIC_USERNAME,
  },
  EMAIL: {
    minLength: 8,
    maxLength: 60,
    pattern: RegexType.EMAIL,
  },
  PASSWORD: {
    minLength: 6,
    maxLength: 48,
    pattern: RegexType.PASSWORD,
  },
};

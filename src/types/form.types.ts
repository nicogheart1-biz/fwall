export type FormFieldRegex = {
  [fieldName: string]: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
};

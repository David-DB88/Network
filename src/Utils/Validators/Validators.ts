export type FieldValidatorType =(value: string) => string | undefined


export const required: FieldValidatorType = (value)=> {
  if (value) return undefined;
  return "Field is a required";
};
export const maxLengthCreator = (max: number): FieldValidatorType => (value) => {
  if (value && value.length > max) return `Max Length is ${max} `;
  return undefined;
};

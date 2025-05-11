/**
 * Validation utility for form inputs
 * Supports various validation types like required, min/max value, email, alphanumeric, min/max length
 */

// Define interfaces for validation
interface ValidationRule {
  required?: boolean;
  email?: boolean;
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  alphanumeric?: boolean;
  match?: RegExp;
  custom?: (value: any) => boolean;
  errorMessage?: string;
}

interface FormField {
  value: any;
  rules: ValidationRule;
}

interface FormValues {
  [key: string]: FormField;
}

interface ValidatedField {
  value: any;
  isValid: boolean;
  errorMessage: string;
  validationClass: string;
}

interface ValidatedForm {
  isFormValid: boolean;
  formValues: {
    [key: string]: ValidatedField;
  };
}

/**
 * Validates if a string is a valid email format
 * @param email - Email string to validate
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates if a string contains only alphanumeric characters
 * @param value - String to validate
 */
function isAlphanumeric(value: string): boolean {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(value);
}

/**
 * Get validation message based on the failed validation rule
 * @param value - Value being validated
 * @param rule - Validation rule that was applied
 * @param fieldName - Name of the field being validated
 */
function getValidationMessage(value: any, rule: ValidationRule, fieldName: string): string {
  // If custom error message is provided in the rule, use that
  if (rule.errorMessage) {
    return rule.errorMessage;
  }

  // Generate default error messages based on validation type
  if (rule.required && (value === undefined || value === null || value === '')) {
    return `${fieldName} is required`;
  }

  if (rule.email && !isValidEmail(value)) {
    return `Please enter a valid email address`;
  }

  if (rule.minValue !== undefined && parseFloat(value) < rule.minValue) {
    return `${fieldName} must be at least ${rule.minValue}`;
  }

  if (rule.maxValue !== undefined && parseFloat(value) > rule.maxValue) {
    return `${fieldName} must not exceed ${rule.maxValue}`;
  }

  if (rule.minLength !== undefined && value.length < rule.minLength) {
    return `${fieldName} must be at least ${rule.minLength} characters`;
  }

  if (rule.maxLength !== undefined && value.length > rule.maxLength) {
    return `${fieldName} must not exceed ${rule.maxLength} characters`;
  }

  if (rule.alphanumeric && !isAlphanumeric(value)) {
    return `${fieldName} must contain only letters and numbers`;
  }

  if (rule.match && !rule.match.test(value)) {
    return `${fieldName} is not in the correct format`;
  }

  return '';
}

/**
 * Validates a single field based on its value and rules
 * @param value - Field value to validate
 * @param rules - Validation rules to apply
 * @param fieldName - Name of the field being validated
 */
function validateField(value: any, rules: ValidationRule, fieldName: string): ValidatedField {
  let isValid = true;
  let errorMessage = '';

  // Skip validation if field is empty and not required
  if ((value === undefined || value === null || value === '') && !rules.required) {
    return {
      value,
      isValid: true,
      errorMessage: '',
      validationClass: 'valid'
    };
  }

  // Required validation
  if (rules.required && (value === undefined || value === null || value === '')) {
    isValid = false;
    errorMessage = getValidationMessage(value, rules, fieldName);
  }

  // Email validation
  if (isValid && rules.email && value && !isValidEmail(value)) {
    isValid = false;
    errorMessage = getValidationMessage(value, rules, fieldName);
  }

  // Min value validation
  if (isValid && rules.minValue !== undefined && value !== '' && parseFloat(value) < rules.minValue) {
    isValid = false;
    errorMessage = getValidationMessage(value, rules, fieldName);
  }

  // Max value validation
  if (isValid && rules.maxValue !== undefined && value !== '' && parseFloat(value) > rules.maxValue) {
    isValid = false;
    errorMessage = getValidationMessage(value, rules, fieldName);
  }

  // Min length validation
  if (isValid && rules.minLength !== undefined && value && value.length < rules.minLength) {
    isValid = false;
    errorMessage = getValidationMessage(value, rules, fieldName);
  }

  // Max length validation
  if (isValid && rules.maxLength !== undefined && value && value.length > rules.maxLength) {
    isValid = false;
    errorMessage = getValidationMessage(value, rules, fieldName);
  }

  // Alphanumeric validation
  if (isValid && rules.alphanumeric && value && !isAlphanumeric(value)) {
    isValid = false;
    errorMessage = getValidationMessage(value, rules, fieldName);
  }

  // Regular expression validation
  if (isValid && rules.match && value && !rules.match.test(value)) {
    isValid = false;
    errorMessage = getValidationMessage(value, rules, fieldName);
  }

  // Custom validation
  if (isValid && rules.custom && !rules.custom(value)) {
    isValid = false;
    errorMessage = rules.errorMessage || `${fieldName} is invalid`;
  }

  return {
    value,
    isValid,
    errorMessage,
    validationClass: isValid ? 'valid' : 'error'
  };
}

/**
 * Validates an entire form object containing multiple fields
 * @param formData - Object containing field values and validation rules
 */
export function validateFormValues(formData: FormValues): ValidatedForm {
  const result: ValidatedForm = {
    isFormValid: true,
    formValues: {}
  };

  // Validate each field in the form
  Object.keys(formData).forEach((fieldName) => {
    const { value, rules } = formData[fieldName];
    const validatedField = validateField(value, rules, fieldName);
    
    result.formValues[fieldName] = validatedField;
    
    // If any field is invalid, the form is invalid
    if (!validatedField.isValid) {
      result.isFormValid = false;
    }
  });

  return result;
}

/**
 * Validates a single field and returns validation result
 * @param value - Field value to validate
 * @param rules - Validation rules to apply
 * @param fieldName - Name of the field
 */
export function validateSingleField(
  value: any,
  rules: ValidationRule, 
  fieldName: string
): ValidatedField {
  return validateField(value, rules, fieldName);
}

/**
 * Creates an empty validation result with default values
 * @param value - Initial value of the field
 */
export function createEmptyValidation(value: any): ValidatedField {
  return {
    value,
    isValid: true,
    errorMessage: '',
    validationClass: ''
  };
}

/**
 * Resets all validation states in a form to their default values
 * @param formData - Current form data with validation results
 */
export function resetValidation(formData: Record<string, ValidatedField>): Record<string, ValidatedField> {
  const resetForm: Record<string, ValidatedField> = {};
  
  Object.keys(formData).forEach((fieldName) => {
    resetForm[fieldName] = {
      ...formData[fieldName],
      isValid: true,
      errorMessage: '',
      validationClass: ''
    };
  });
  
  return resetForm;
}
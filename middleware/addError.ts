import { ValidationError } from "@interfaces/v1/ValidationError";
import { Validation } from "@interfaces/v1/Validation";

export const addError = (errors: ValidationError, validation: Validation) => {
    let errorKeys = Object.keys(validation.errors.errors);

    for (let i = 0; i < errorKeys.length; i++) {
        let key = errorKeys[i];
        errors.push({
            param: key,
            message: validation.errors.errors[key],
            code: "INVALID_INPUT"
        });
    }
}

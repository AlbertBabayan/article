import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function comparisonValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const password = group.get('password').value;
        const confirmPassword = group.get('confirmPassword').value;
        
        if(confirmPassword === "") {
            return null;
        }
        const isPasswordsMatch = password === confirmPassword;
        return isPasswordsMatch ? null : { message: 'Passwords doesn\'t match' };
    };
}

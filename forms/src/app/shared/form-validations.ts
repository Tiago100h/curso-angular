import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { config } from 'rxjs';

export class FormValidations {

    static requiredMinCheckbox(min = 1) {
        const validator = (formArray: FormArray) => {
            const totalChecked = formArray.controls
                .map(v => v.value)
                .reduce((total, current) => current ? total + current : total, 0);
            return totalChecked >= min ? null : { required: true };
        };
        return validator
    }

    static cepValidator(control: FormControl) {

        const cep = control.value;
        if (cep) {
            const validacep = /^[0-9]{8}$/;
            return validacep.test(cep) ? null : { cepInvalido: true };
        }

        return null;
    }

    static equalsTo(otherField: string) {
        const validator = (formControl: FormControl) => {
            if (!otherField) {
                throw new Error('É necessário informar um campo.');
            }

            if (!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }
            
            const field = (<FormGroup>formControl.root).get(otherField);
            
            if (!field) {
                throw new Error('É necessário informar um campo válido.');
            }

            if (field.value !== formControl.value) {
                return { equalsTo: otherField }
            }

            return null;
        };
        return validator
    }

    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `${fieldName} é obrigatório.`,
            'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
            'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
            'cepInvalido': 'CEP inválido.'
        };
        return config[validatorName];
    }

}
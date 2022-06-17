
import { isObjEmpty, deepClone, mapValuesToState, mapStateToKeys } from '../../../utils/converter'
import {useState} from "react";

const useTimeZone = ({ init, validate }) => {
    const [state, setState] = useState(mapValuesToState(init));

    const handleChange = (e) => {
        const { name: key, value, type, checked } = e.target;

        const oldState = deepClone(state);
        if (type === 'checkbox') {
            oldState[key].value = checked;
        } else {
            oldState[key].value = value;
        }

        const { errors } = getErrors();

        if (oldState[key].touched && errors[key]) {
            oldState[key].error = errors[key];
        } else {
            oldState[key].error = '';
        }

        setState(oldState);
    };

    const handleFocus = (e) => {
        const { name } = e.target;
        const oldState = deepClone(state);
        oldState[name].focused = true;

        if (!oldState[name].touched) {
            oldState[name].touched = true;
        }

        setState(oldState);
    };

    const handleBlur = (e) => {
        const key = e.target.name;

        const { errors } = getErrors();
        const oldState = deepClone(state);

        if (oldState[key].touched && errors[key]) {
            oldState[key].error = errors[key];
        } else {
            oldState[key].error = '';
        }

        oldState[key].focused = false;
        setState(oldState);
    };

    const handleSubmit = (e, cb) => {
        e.preventDefault();
        const { hasError, errors, values } = getErrors();

        let oldState = deepClone(state);
        oldState = Object.keys(oldState).reduce((acc, cur)=>{
            acc[cur] = {
                value: oldState[cur].value,
                error: errors[cur],
                focused: oldState[cur].focused,
                touched: oldState[cur].touched,
            };
            return acc;
        }, {})
        setState(oldState);
        cb({
            hasError,
            errors,
            values,
            touched: mapStateToKeys(state, 'touched'),
            focused: mapStateToKeys(state, 'focused'),
        });
    };

    const clear = () => {
        const newState = mapValuesToState(init, true);
        setState(newState);
    };

    const getErrors = () => {
        let hasError = null,
            errors = null;

        const values = mapStateToKeys(state, 'value');

        if (typeof validate === 'boolean') {
            hasError = validate;
            errors = mapStateToKeys(state, 'error');
        } else if (typeof validate === 'function') {
            const errorsFromCB = validate(values);
            hasError = !isObjEmpty(errorsFromCB);
            errors = errorsFromCB;
        } else {
            throw new Error('validate property must be boolean or function');
        }

        return {
            values,
            errors,
            hasError,
        };
    };

    return {
        formState: state,
        handleChange,
        handleFocus,
        handleBlur,
        handleSubmit,
        clear,
    };
};

export default useTimeZone;
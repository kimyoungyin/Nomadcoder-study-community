import { useState } from 'react';

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let isValid = true;
    if (typeof validator === 'function') {
      isValid = validator(value);
    }
    if (isValid) {
      setValue(value);
    }
  };
  return { value, onChange, setValue };
};

export default useInput;

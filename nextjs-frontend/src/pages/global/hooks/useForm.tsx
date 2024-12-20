import { useEffect, useState } from 'react';
import {formProps} from "../../types/form";

export const useForm = (initial: formProps) => {
  // create a state object for our inputs
  const [inputs, setInputs] = useState<formProps>(initial);
  const initialValues = null
  if (typeof initial === "object" && Object.keys(initial).length>0) {
    const initialValues = Object.values(initial).join('');
  }

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {//Event & { target: HTMLInputElement }) {
    let { value, name } = e.target;

    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    setInputs({'test':'val'})
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}

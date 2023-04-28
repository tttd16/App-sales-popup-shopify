import React from 'react';
import {useState} from 'react';
export default function useInput(defaultInput = {}) {
  const [input, setInput] = useState(defaultInput);

  const handleChangeInput = (key, value) => {
    return setInput(prev => ({...prev, [key]: value}));
  };

  return {input, setInput, handleChangeInput};
}

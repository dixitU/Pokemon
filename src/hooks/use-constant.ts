import constate from 'constate';
import {useState} from 'react';

export function useConstant() {
  const [searchText, setSearchText] = useState('');

  return {
    searchText,
    setSearchText,
  };
}

export const [ConstantProvider, useConstantContext] = constate(useConstant);

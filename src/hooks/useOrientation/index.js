// useOrientation.tsx
import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export function useOrientation() {
  const [orientation, setOrientation] = useState(
    Dimensions.get('screen').height >= Dimensions.get('screen').width
      ? 'PORTRAIT'
      : 'LANDSCAPE',
  );

  useEffect(() => {
    const callback = () =>
      setOrientation(
        Dimensions.get('window').height > Dimensions.get('window').width
          ? 'PORTRAIT'
          : 'LANDSCAPE',
      );

    Dimensions.addEventListener('change', callback);

    return () => {
      Dimensions.removeEventListener('change', callback);
    };
  }, []);

  return orientation;
}

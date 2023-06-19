import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const CurrencyConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [convertedValue, setConvertedValue] = useState(0);

  const convertCurrency = () => {

    const converted = +inputValue * 0.85; //Я не использовал API, а просто записал значение так
    setConvertedValue(converted.toFixed(2));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ borderWidth: 1, padding: 10, width: '80%' }}
        placeholder="Введите сумму"
        value={inputValue}
        onChangeText={text => setInputValue(text)}
        keyboardType="numeric"
      />
      <Button title="Конвертировать" onPress={convertCurrency} />
      {convertedValue !== '' && (
        <Text style={{ fontSize: 20, marginTop: 20 }}>
          Конвертированное значение: {convertedValue}
        </Text>
      )}
    </View>
  );
};

export default CurrencyConverter;
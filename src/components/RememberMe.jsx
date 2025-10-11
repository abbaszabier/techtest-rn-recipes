import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const RememberMeForgotPassword = ({ onForgotPassword, onRememberChange }) => {
  const [isRemembered, setIsRemembered] = useState(false);

  const handleToggleRemember = value => {
    setIsRemembered(value);
    if (onRememberChange) onRememberChange(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rememberContainer}>
        <CheckBox
          value={isRemembered}
          tintColor="#ccc"
          onCheckColor="#fff"
          onFillColor="#007bff"
          onTintColor="#007bff"
          boxType="square"
          style={{ width: 18, height: 18, marginRight: 4 }}
          onChange={e => setIsRemembered(e.nativeEvent.value)}
          onValueChange={newValue => setIsRemembered(newValue)}
          tintColors={{ true: '#007bff', false: '#ccc' }}
        />
        <Text style={styles.rememberText}>Remember me</Text>
      </View>

      <TouchableOpacity onPress={onForgotPassword}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RememberMeForgotPassword;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 2,
    color: '#333',
    fontSize: 14,
  },
  forgotText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '400',
  },
});

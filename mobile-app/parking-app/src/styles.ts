import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    width: '65%',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 130,
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
});

export const inputStyles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorInput: {
    borderColor: '#f00',
  },
  errorText: {
    color: '#f00',
    fontSize: 12,
    marginBottom: 5,
  },
});

export const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#ff3c15',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export const forgotPasswordStyles = StyleSheet.create({
  forgotPasswordText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

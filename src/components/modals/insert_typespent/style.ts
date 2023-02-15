import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    marginTop: 50,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#027368'
  },
  containerArrow: {
    paddingLeft: 18,
    paddingTop: 18
  },
  containerBody: {
    padding: 24
  },
  fontMain: {
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  input: {
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 8,
    width: '80%',
    height: 80,
    backgroundColor: '#92E3A9',
    marginTop: 24,
    marginBottom: 24
  },
  typeOfSpent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#dfd880'
  },
  containerList: {
    margin: 24,
    marginTop: 20,
    height: 50,
  }
});

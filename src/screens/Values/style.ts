import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#01403A',
    justifyContent: 'center'
  },
  containerOne: {
    marginHorizontal: 25,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    alignItems: 'center'
  },
  containerButtons: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '30%'
  },
  containerForms: {
    marginHorizontal: 15,
    marginTop: 25
  },
  typeOfSpent: {
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#dfd880'
  },
  input: {
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 8,
    width: '100%',
    height: 50,
    backgroundColor: '#92E3A9',
    marginTop: 24,
    marginBottom: 15
  },
  containerSave: {
    marginHorizontal: 15,
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
});

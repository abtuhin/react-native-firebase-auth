import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
import { Header, Spinner, Button, Card, CardSection } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component{

    constructor(props){
      super(props);
      this.state = {
        loggedIn: null
      }
    }

    componentWillMount(){
      firebase.initializeApp({
        apiKey: "AIzaSyCe2-N9aUgCVHCV_98G5jY1lCu55O_IAW0",
        authDomain: "auth-308af.firebaseapp.com",
        databaseURL: "https://auth-308af.firebaseio.com",
        projectId: "auth-308af",
        storageBucket: "auth-308af.appspot.com",
        messagingSenderId: "429943786701"
      });

      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.setState({loggedIn: true});
        }else {
          this.setState({loggedIn: false});
        }
      });

    }

    renderContent = () => {
      switch (this.state.loggedIn){
        case true:
          return (
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()} text="Logout" />
            </CardSection>
          );
        case false:
          return <LoginForm />
        default:
          return (
            <CardSection>
              <Spinner size="large" />
            </CardSection>
          );
      }
    }

    render(){
      return (
        <View>
          <Header title={"Native Auth"}/>
          {this.renderContent()}


        </View>
      );
    }
}

// const styles = {
//   contentStyle: {
//     paddingTop: 10,
//     justifyContent: 'center'
//   }
// }

export default App;

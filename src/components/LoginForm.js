import React,{Component} from 'react';
import {View, Text} from 'react-native';
import { Button, Card, CardSection, Input, Spinner} from './common';
import firebase from 'firebase';

class LoginForm extends Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    }
  }

  onButtonPress = () => {
    const {email, password} = this.state;

    this.setState({
      error:'',
      loading: true
    });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess())
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess())
          .catch(this.onLoginFail());
      });
  }

  onLoginFail = () => {
    this.setState({
      error: 'Authentication Failed. ',
      loading: false
    })
  }

  onLoginSuccess = () => {
    this.setState({
      email: '',
      password:'',
      loading: false,
      error:''
    })
  }

  renderButton = () => {
    if(this.state.loading){
      return <Spinner size="small"/>;
    }

    return (
      <Button
        onPress={this.onButtonPress}
        text={"Login Form"}
      />
    );

  }

  render(){
    return (
      <Card>
        <CardSection>
          <Input
            placeholder = "user@gmail.com"
            label= "Email"
            value = {this.state.email}
            onChangeText = { email => this.setState({email}) }
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder = "password"
            label= "Password"
            secureTextEntry={true}
            value = {this.state.password}
            onChangeText = { password => this.setState({password}) }
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

      </Card>
    );
  }
}

const styles = {
  errorTextStyle:{
    fontSize:20,
    alignSelf:'center',
    color: 'red'
  }
}

export default LoginForm;

import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { StyleSheet, Text, View,SafeAreaView,FlatList,TextInput, Button,
  TouchableOpacity,
  AsyncStorage, } from 'react-native';

  import {Item} from './components/Item';

export default class App extends Component {

  state = {
    NewTask: '',
    
    message: '',
  }

  listData = []

  render() {

  //this will return the main app container
    return (
     
      <SafeAreaView style={{flex:1, position: 'relative'}}>
        <View style = {styles.header}>
          <Text style = {styles.title} >Tasks To Do </Text>
        </View>
          
          <View style = {styles.main}>    
               {/*this is container for user to enter their tasks.
               includes placeholder, which awaits users input and accepts users input.activates the next function*/}
             <TextInput
                style={styles.input}
                placeholder=""
                onChangeText={ text => this.setState({taskName: text},
                () => {this.validate()}
                )}
                ref={(input) => (this._textInput = input)}
            />
        </View>

        
        <View>
            <TouchableOpacity 
            // button is not active until there is text
            style={this.state.validInput ? styles.button : styles.buttonDisabled} 
            onPress={this.addItem}
            disabled = {!this.state.validInput ? true : false}
            >
            <Text style={styles.buttonText}>SAVE TASK</Text>
            </TouchableOpacity>
        </View>
       
        <View style={[{
          display: this.state.showToast ? 'flex' : 'none'
        }, styles.toast ]}>
          <Text style={styles.toastMessage}>{this.state.message}</Text>
        </View>
        <View style={{flex:1}}>
        {/* User input item display in a list */}
        
        <FlatList
          
          data={this.listData}
          renderItem={this.renderList}
          keyExtractor={ item => item.id} 
          extraData={this.state.taskName}
          />
          </View>
        
        
      </SafeAreaView>
      
    )
  }

  componentDidMount() {
    this.loadList()
  }

  renderList = ({item}) => (
    <Item task={item.task} 
    id={item.id}
    delete={this.deleteItemById}
    buttonPressed={this.checkItemOff}
    status = {item.status}
    />
  )

  checkItemOff = ( itemId ) =>{
      this.listData.forEach( (item) => {
        if( item.id == itemId ) {
          item.status = true
        }
      } )
      this.savedTask()
      this.setState({taskName: null})
  }

  //add input task to list clicking add button using this function
  addItem = () => {
   //validates if there is text added
    if(this.state.taskName == '') {
        return;
      }
      let itemId = new Date().getTime().toString()
      let listItem = {
        id: itemId,
        task: this.state.taskName,
        status: false,
      }
      this.listData.push(listItem)
      //sort list in descending order
      this.DecList() 
      this.savedTask()
      this.setState({taskName: null, validInput: false})
      this._textInput.clear()
      this._textInput.focus()
      this.showToast('New Task Added', 500)
    }

    //validate the input to activate the disabled button function
    validate = () => {
      if( this.state.taskName ){
        this.setState({validInput:true})
      }
    }

    //when input task it gets sorted to the top of list
    DecList = () => {
      //sort list by comparing two item in array to know which one is more recent
      this.listData.sort( (item1,item2)=> {
        return item2.id - item1.id
      })
    }

    
    deleteItemById = (itemId) => {
      
        this.listData.forEach((item, index) => {
            if (item.id == itemId) {
                this.listData.splice(index, 1)
            }

        })

        this.showToast('Removed', 500)
        this.savedTask()
        this.setState({
            refresh: !this.state.refresh
        })
      
    }

   savedTask = async () => {
        try {
          await AsyncStorage.setItem(
            'data',
            JSON.stringify(this.listData)
          )
        }
        catch( error ) {
          console.log(error)
        }
      }
    
      loadList = async () => {
        try{
          let items = await AsyncStorage.getItem('data')
          if( JSON.parse(items) ) {
            this.listData = JSON.parse( items )
          }
        this.setState({expenseAmount:0})
        }
        catch(error) {
          console.log(error)
        }
      }

      showToast = ( message, duration ) => {
        this.setState({message: message }, 
          () => { this.setState({showToast: true}) }
        )
        const timer = setTimeout( 
          () => { this.setState({showToast: false }) },
          duration 
        )
      }

  }

const colors = {
      primary : 'lightblue',
      primaryDisabled: 'lightblue'
    }

const styles = StyleSheet.create({

    title: {
    color: 'white',
    fontSize: 20,
    textAlign: "center"
  },
  main: {
    paddingHorizontal: 10,
    backgroundColor: 'grey'
  },

   header:{
    backgroundColor: 'grey',
    paddingTop: 20
  },
 
 button:{
     padding:15,
     backgroundColor:colors.primary
 },

 input:{
     marginVertical:15,
     backgroundColor:'white',

 },

 buttonText:{
     color:'black',
     textAlign:'center'},

     buttonDisabled:{
      padding:15,
      backgroundColor:colors.primaryDisabled},
      
  toastMessage: {
    color: 'white',
    textAlign: 'center'
  },

   toast: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    right: 30,
    zIndex: 999,
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
  },
  })
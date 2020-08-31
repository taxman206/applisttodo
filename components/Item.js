
import React from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Image,
    TouchableHighlight} from 'react-native';

export const Item = (props) => {
    return(
        //render each item on the list
    <TouchableHighlight 
    activeOpacity={0.6} 
    underlayColor="#DDDDDD">
        <View style = { props.status ? itemStyles.itemButtonOptions : itemStyles.item }> 
            <View style = {itemStyles.row}>
            <Text style={ props.status ? itemStyles.textCompleted : itemStyles.text }>{props.task}</Text>
            </View>
            
            <TouchableOpacity onPress={ () => {props.delete( props.id ) } } style={{marginRight:20}}>
                <Image style ={itemStyles.Images} source={require('../assets/delete.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => {props.buttonPressed( props.id ) } } >
               <Image style={itemStyles.Images} source={require('../assets/complete.png')} />
            </TouchableOpacity>
        </View>
    </TouchableHighlight>
    )
}

const itemStyles = StyleSheet.create({
    
    //This is for when user clicks button options such as delete or complete task. if the task is still active the color
    //the task will remain blue otherwise if it is completed it will be greyed out
	itemButtonOptions: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderBottomWidth: 15,
        borderColor: '#878484',
         flexDirection: 'row',
        opacity: 0.5,
    }, 

    //this is for when the user has entered an item and saved it. This is going to have a green border so that the user knows it is still active
    item: {
        display: 'flex',
        borderStyle: 'solid',
        borderBottomWidth: 15,
        padding: 8,
        borderColor: 'green',
	    flexDirection: 'row',
	    padding: 8,
        
     },
     //tasks which has been completed
     textCompleted: {
        fontSize: 20,
        color: 'grey',
        textDecorationLine: 'line-through',
    },
    
    //text size and color
    text: {
        fontSize:20,
        color: 'black',
    },
    
     //sizing of buttons
    Images: { 
        height: 15,
	    width :15,
    }

})
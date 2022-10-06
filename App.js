import { StyleSheet, View, FlatList } from 'react-native';
import {useState} from 'react'
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {  
  const [courseGoals,setCourseGoals] = useState([])  

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals,
      {text:enteredGoalText, id:Math.random().toString()},
    ]);
  };

  return (
    <View style={styles.appContainer}>
      <GoalInput       
      addGoalHandler={addGoalHandler}
      />
      <View style={styles.goalsContainer}>  
        <FlatList 
          alwaysBounceVertical={false}
          renderItem={(itemData)=>{
            return (<GoalItem text={itemData.item.text}/>)  
          }}
          data={courseGoals}
          keyExtractor={(item,index)=> {
            return item.id;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer:{
    flex:1,    
    paddingTop:50,
    paddingHorizontal:16,
  },  
  goalsContainer:{
    flex:5
  }  
});

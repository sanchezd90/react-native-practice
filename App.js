import { StyleSheet, View, FlatList,Button } from 'react-native';
import {useState} from 'react'
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [modalIsVisible,setModalIsVisible] = useState(false)  
  const [courseGoals,setCourseGoals] = useState([])  

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals,
      {text:enteredGoalText, id:Math.random().toString()},
    ]);
    endAddGoalHandler()
  };

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal)=>goal.id !== id);
    })
  }

  function startAddGoalHandler() {
    setModalIsVisible(true)
  }

  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.appContainer}>
        <Button 
          title='Add New Goal' 
          color='#a065ec' 
          onPress={startAddGoalHandler}
        />
        <GoalInput       
          addGoalHandler={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>  
          <FlatList 
            alwaysBounceVertical={false}
            renderItem={(itemData)=>{
              return (<GoalItem 
                text={itemData.item.text} 
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}

                />)  
            }}
            data={courseGoals}
            keyExtractor={(item,index)=> {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
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

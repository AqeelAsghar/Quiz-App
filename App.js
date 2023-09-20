import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TranslationScreen from './screens/TranslationScreen';
import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator();

const App = () => {
  const [questions, setQuestions] = useState(null);
  const [isChecked, setIsCheked] = useState(true);

  async function getQuestions() {
    const response = await firestore().collection('quiz_questions').get();
    const questionsData = response.docs.map(doc => doc.data());
    setQuestions(() => questionsData);
    setIsCheked(() => false);
  }

  useEffect(() => {
    getQuestions();
  }, []);

  if (isChecked) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Translation"
        screenOptions={{
          headerShown: false,
        }}>
        {questions.map(translation => (
          <Stack.Screen
            key={translation.id}
            name={`Translation${translation.id}`}
            component={TranslationScreen}
            initialParams={{translation, questions}}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

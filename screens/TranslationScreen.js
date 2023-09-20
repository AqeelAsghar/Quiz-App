import React, {useCallback, useState, memo} from 'react';
import {View, Text, StyleSheet, Button, Dimensions, Modal} from 'react-native';
import Draggable from 'react-native-draggable';
const {height} = Dimensions.get('window');

const TranslationScreen = ({route, navigation}) => {
  const {translation} = route.params;
  const translationData = route.params.questions;
  const {englishSentence, germanSentence, options, correctOption} = translation;
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOptionDrop = useCallback(
    option => {
      setSelectedOption(() => option);
    },
    [selectedOption],
  );

  const handleCheckAnswer = useCallback(() => {
    if (selectedOption === correctOption) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowModal(true);
  }, [selectedOption]);

  const handleContinue = () => {
    setShowModal(() => false);
    const currentIndex = translationData.findIndex(
      item => item.id === translation.id,
    );
    if (currentIndex < translationData.length - 1) {
      navigation.replace(`Translation${currentIndex + 1}`, {
        translation: translationData[currentIndex + 1],
      });
    } else {
      alert('No more questions.');
    }
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.innerConatiner}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          {/* Header */}
          <Text style={styles.missingFilling}>Fill in the missing word</Text>
          <Text style={styles.englishSentence}>{englishSentence}</Text>
          <View style={styles.germanSentenceContainer}>
            <Text style={styles.germanSentenceInnerContainer}>
              {germanSentence.split('__')[0]}
              <Text style={styles.blankSpace}>{' ___________ '}</Text>
              {germanSentence.split('__')[1]}
            </Text>
          </View>
          {/* Options */}
          <View style={styles.optionsContainer}>
            {options.map(option => (
              <View key={option} style={styles.option}>
                <Draggable
                  key={option}
                  x={0}
                  y={0}
                  renderShape="square"
                  onRelease={() => handleOptionDrop(option)} // Trigger onRelease
                >
                  <View
                    style={{
                      padding: 30,
                      backgroundColor:
                        option == selectedOption && showModal
                          ? selectedOption == correctOption
                            ? '#75D9FE'
                            : '#FE7C88'
                          : 'white',
                      borderRadius: 20,
                    }}>
                    <Text
                      style={{
                        color:
                          option == selectedOption && showModal
                            ? 'white'
                            : '#75D9FE',
                        fontSize: 16,
                        fontWeight: '700',
                      }}>
                      {option}
                    </Text>
                  </View>
                </Draggable>
              </View>
            ))}
          </View>
        </View>
        {/* Continue Button */}
        <View
          style={{
            ...styles.continueButton,
            backgroundColor: selectedOption !== null ? '#75D9FE' : 'white',
          }}>
          <Button
            color={selectedOption == null ? '#75D9FE' : 'white'}
            title={selectedOption !== null ? 'Check Answer' : 'Continue'}
            onPress={() => handleCheckAnswer()}
          />
        </View>
        {/* Modal */}
        <Modal
          visible={showModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowModal(false)}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: height * 0.25,
              backgroundColor:
                selectedOption == correctOption ? '#75D9FE' : '#FE7C88',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View style={{flex: 1, paddingHorizontal: 20, paddingVertical: 20}}>
              <Text style={styles.englishSentence}>
                {isCorrect
                  ? 'Correct! Good job!'
                  : `Answer is: ${correctOption} `}
              </Text>
              <View style={[{marginTop: 30}, styles.continueButton]}>
                <Button
                  color={
                    selectedOption == correctOption ? '#75D9FE' : '#FE7C88'
                  }
                  title={'Continue'}
                  onPress={() => handleContinue()}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#75D9FE',
  },
  innerConatiner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#3B6C81',
  },
  missingFilling: {
    color: 'white',
    marginVertical: 22,
    fontSize: 16,
  },
  englishSentence: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  option: {
    marginHorizontal: 10,
    padding: 20,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  germanSentenceContainer: {
    marginTop: 50,
  },
  germanSentenceInnerContainer: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  blankSpace: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'white',
  },
  continueButton: {
    marginBottom: 30,
    marginHorizontal: 22,
    height: 55,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
  },
});

export default memo(TranslationScreen);

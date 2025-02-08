import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import '../../../global.css';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import FeedbackComponent from '../../components/FeedbackComponent';

const FeedbackPage = () => {
  const [page, setPage] = useState(1);
  const [commentsLength, setCommentsLength] = useState(0);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      className="bg-black flex flex-col h-full"
    >
      <View className='bg-black flex flex-col h-full'>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="bg-black flex flex-col"
        >
          <View className='flex flex-col justify-between mt-10'>
            <FeedbackComponent page={page} setCommentsLength={setCommentsLength} />
          </View>
        </ScrollView>

        <View className="flex flex-row justify-center mt-4">
          {Array.from({ length: Math.ceil(commentsLength / 5) }, (_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setPage(index + 1)}
              className={`mx-3 px-4 py-2 rounded-lg ${page === index + 1 ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              <Text className={`text-white text-lg ${page === index + 1 ? 'font-bold' : ''}`}>
                {index + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className='h-1/6 flex flex-row items-center justify-center'>
          <View className="flex flex-row items-center bg-white px-3 mx-3 rounded-lg p-1">
            <TextInput
              placeholderTextColor="gray"
              placeholder="send feedback"
              className="flex-1 text-black"
            />
            <Ionicons name="send" size={20} color="blue" />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FeedbackPage;
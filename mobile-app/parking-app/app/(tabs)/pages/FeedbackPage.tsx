import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import '../../../global.css';
import { Ionicons } from '@expo/vector-icons';
import FeedbackComponent from '../../components/FeedbackComponent';
import { useMyContext } from '../../../Context/MyContext';
import { createCommentDto } from '../../../Apis/DataParam/dataParam';
import apiService from '../../../Apis/Services/apisService';

const FeedbackPage = () => {
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState<string>('');
  const [refreshComments, setRefreshComments] = useState<boolean>(false);
  const { user, commentsLength, setCommentsLength, getAllComments, comments } = useMyContext();
  // console.warn("commentLength:", commentsLength)

  const handleSendFeedback = async () => {
    try {
      if (feedback.length === 0) {
        console.warn("Feedback shouldn't be empty");
        return;
      }

      if (!user || !user.token || !user.id) {
        console.warn("User shouldn't be null");
        return;
      }

      const createCommentDto: createCommentDto = {
        userId: user.id,
        comment: feedback,
      };

      const res = await apiService.createComment(createCommentDto, user.token);
      // console.log(res);
      getAllComments();
      setFeedback('');
      setRefreshComments((prev) => !prev);
    } catch (error: any) {
      console.warn(error);
    }
  };
  const sortedComments = [...comments].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const startIndex = (page - 1) * 5;
  const endIndex = startIndex + 5;
  const commentsToShow = sortedComments.slice(startIndex, endIndex);
  useEffect(() => {
    getAllComments();
  }, []);
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
            {commentsToShow.map((comment, index) => (
              <FeedbackComponent
                key={comment.id}
                comment={comment}
                page={page}
                // setCommentsLength={setCommentsLength}
                refreshComments={refreshComments}
                index={index}
                totalComments={commentsToShow.length} 
              />
            ))}
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
          <View className="flex flex-row items-center bg-gray-900 px-3 mx-3 rounded-lg p-2">
            <TextInput
              placeholderTextColor="gray"
              placeholder="Send feedback"
              className="flex-1 text-white"
              value={feedback} 
              onChange={(e) => setFeedback(e.nativeEvent.text)}
              
            />
            <Ionicons name="send" size={20} color="blue" onPress={handleSendFeedback} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FeedbackPage;
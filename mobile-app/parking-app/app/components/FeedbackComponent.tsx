import { View, Text, Image, Modal, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useMyContext } from '../../Context/MyContext';
import apiService from '../../Apis/Services/apisService';
import { getAllCommentsResponse, getUserInformationResponse } from '../../Apis/DataResponse/dataResponse';

const FeedbackComponent = ({ page, setCommentsLength, refreshComments }: { page: number, setCommentsLength: (length: number) => void, refreshComments: boolean }) => {
  const { user } = useMyContext();
  const [img, setImage] = useState<string>("");
  const [comments, setComments] = useState<getAllCommentsResponse[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  const getAllComments = async () => {
    try {
      if (!user || !user.id || !user.token) return;
      const response = await apiService.getAllComments(user.token);
      setComments(response);
      setCommentsLength(response.length);
    } catch (error: any) {
      console.warn(error);
    }
  };

  const userCarInformation = async () => {
    try {
      if (!user || !user.id || !user.token) return;
      const res: getUserInformationResponse = await apiService.getUserCarInformation(user.token, user.id);
      setImage(res.imageUri);
    } catch (error: any) {
      console.warn(error);
    }
  };

  useEffect(() => {
    userCarInformation();
    getAllComments();
  }, [user, refreshComments]); 

  const startIndex = (page - 1) * 5;
  const endIndex = startIndex + 5;

  const commentsToShow = comments.slice(startIndex, endIndex);

  return (
    <View>
      {commentsToShow.map((comment, index) => (
        <React.Fragment key={index}>
          <Pressable onLongPress={() => setModalVisible(true)}>
            <View className='flex flex-row mx-3 mt-5'>
              <View className='flex flex-row justify-center items-center w-1/5 rounded-full'>
                <Image source={{ uri: comment.imageUri }} className='w-20 h-20 rounded-full' />
              </View>
              <View className='flex flex-col justify-start items-start w-4/5'>
                <View className='flex flex-row justify-between w-full p-2'>
                  <Text className='text-white ml-3 font-bold text-lg'>
                    {comment.firstName} {comment.lastName}
                  </Text>
                  <View>
                    <Text className='text-white mr-3 text-sm'>
                      {formatDate(comment.date).split(",")[0]}
                    </Text>
                    <Text className='text-white mr-3 text-sm'>
                      {formatDate(comment.date).split("at")[1]}
                    </Text>
                  </View>
                </View>
                <View className='flex flex-row p-2'>
                  <Text className='text-white ml-3'>{comment.comment}</Text>
                </View>
              </View>
            </View>

            {index < commentsToShow.length - 1 && (
              <View className='mx-3 mt-2' style={{ height: 1, backgroundColor: 'white', marginTop: 10 }}></View>
            )}
          </Pressable>
        </React.Fragment>
      ))}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className='flex flex-col bg-black h-full w-full'>
          <View className='flex flex-row justify-center items-center mt-20'>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text className='text-white mr-3'>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FeedbackComponent;
import { View, Text, Image, Modal, TouchableOpacity, Pressable, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useMyContext } from '../../Context/MyContext';
import apiService from '../../Apis/Services/apisService';
import { getAllCommentsResponse, getUserInformationResponse } from '../../Apis/DataResponse/dataResponse';
import { updateCommentByIdDto } from '../../Apis/DataParam/dataParam';

const FeedbackComponent = ({ page, refreshComments, comment, index, totalComments }: {
  page: number,
  refreshComments: boolean,
  comment: getAllCommentsResponse,
  index: number,
  totalComments: number
}) => {
  const { user, getAllComments } = useMyContext();
  const [img, setImage] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);

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

  const userCarInformation = async () => {
    try {
      if (!user || !user.id || !user.token) return;
      const res: getUserInformationResponse = await apiService.getUserCarInformation(user.token, user.id);
      setImage(res.imageUri);
    } catch (error: any) {
      console.warn(error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (!user || !user.id || !user.token) {
        Alert.alert("Error", "No user connected");
        return;
      }
      if (editedComment.length === 0) {
        Alert.alert("Error", "The comment shouldn't be empty");
      }
      
      const updatedComment: updateCommentByIdDto = {
        comment: editedComment
      }
      const res = await apiService.updateComment(updatedComment, user.token, comment.id);
      console.warn("res:", res);
      getAllComments();
      Alert.alert("Success", "Comment updated successfully");
      setEditedComment(comment.comment);
      setModalVisible(false);

    } catch (error: any) {
      console.warn(error);
      if (error.response && error.response.status === 403) {
        setEditedComment(comment.comment);
        Alert.alert("Unauthorized", "You are not authorized to update this comment.");
      } else {
        setEditedComment(comment.comment);
        Alert.alert("Error", "An error occurred while updating the comment You are not authorized to update this comment.");

      }
     
    }

  };
   
  const handleDeleteComment = async() => {
    try {
      if (!user || !user.id || !user.token) {
        Alert.alert("Error", "No user connected");
        return;
      } 
        
       await apiService.deleteComment(user.token,comment.id)
      getAllComments();
      Alert.alert("Success", "Comment deleted successfully");
    } catch (error:any) {
      console.warn(error);
      if (error.response && error.response.status === 403) {
        Alert.alert("Unauthorized", "You are not authorized to delete this comment.");
      } else {
        Alert.alert("Error", "An error occurred while deleting the comment You are not authorized to delete this comment.");
      }
      
    }
  }
  useEffect(() => {
    userCarInformation();
    getAllComments();
  }, [user, refreshComments]);

  return (
    <View>
      <React.Fragment key={comment.id}>
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

          {index < totalComments - 1 && (
            <View className='mx-3 mt-2' style={{ height: 1, backgroundColor: 'white', marginTop: 10 }}></View>
          )}
        </Pressable>
      </React.Fragment>

      <Modal visible={modalVisible} animationType='slide' transparent>
        <View className='flex-1 justify-center items-center bg-black/70'>
          <View className='w-11/12 bg-gray-800 rounded-lg p-5'>
            <View className='border-b border-gray-600 pb-2 mb-4'>
              <Text className='text-xl font-bold text-white text-center'>Edit Your Comment</Text>
            </View>
            <View className='flex-row items-center mb-5'>
              <Image source={{ uri: comment.imageUri }} className='w-12 h-12 rounded-full mr-3' />
              <View className='flex-1'>
                <Text className='text-white font-bold text-lg'>{comment.firstName} {comment.lastName}</Text>
                <Text className='text-gray-400 text-sm'>
                  {formatDate(comment.date).split(",")[0]} at {formatDate(comment.date).split("at")[1]}
                </Text>
              </View>
            </View>

            <TextInput
              className='bg-gray-700 rounded-lg p-3 text-white min-h-[100px] text-lg'
              placeholder='Edit your comment'
              placeholderTextColor='gray'
              value={editedComment}
              onChangeText={setEditedComment}
              multiline
            />

            <View className='flex-row justify-between mt-5'>
              <TouchableOpacity className='bg-gray-600 p-3 rounded-lg flex-1 mr-3 items-center' onPress={() => setModalVisible(false)}>
                <Text className='text-white font-bold'>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity className='bg-blue-600 p-3 rounded-lg flex-1 items-center' onPress={handleSaveChanges}>
                <Text className='text-white font-bold'>Save Changes</Text>
              </TouchableOpacity>
            </View>
            <View className='flex flex-row items-center justify-center mt-5 rounded-full'>
              <TouchableOpacity className='bg-red-600 p-3 rounded-lg flex-1 items-center' onPress={handleDeleteComment}>
                <Text className='text-white font-bold'>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default FeedbackComponent;
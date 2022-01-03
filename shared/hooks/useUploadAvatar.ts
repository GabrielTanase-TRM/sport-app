import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
  UploadTaskSnapshot,
} from "firebase/storage";
import { firebaseApp } from "../../firebaseApp";
import { useDispatch } from "react-redux";
import { setBadgeNotification } from "../../redux/slices/badgeNotification.slice";
import { BadgeNotificationDuration } from "../shared.enum";

const useUploadAvatar = () => {
  const [progressValue, setProgressValue] = useState<number>(0);
  const storage = getStorage(firebaseApp);
  const dispatch = useDispatch();

  const setErrorMessage = (error: string) => {
    dispatch(
      setBadgeNotification({
        message: error,
        secondDuration: BadgeNotificationDuration.FAST,
        isError: true,
      })
    );
  };

  const onUploadError = (error: StorageError) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case "storage/unauthorized":
        // User doesn't have permission to access the object
        return setErrorMessage("Error1");
      case "storage/canceled":
        // User canceled the upload
        return setErrorMessage("Error1");

      case "storage/unknown":
        // Unknown error occurred, inspect error.serverResponse
        return setErrorMessage("Error1");
    }
  };

  const onUploadProgress = (snapshot: UploadTaskSnapshot) => {
    // Handle progress by percent
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setProgressValue(Math.round(progress));
  };

  const startUploadAvatar = async (userId: string, uploadedImage: any) => {
    // Create metadata
    const metadata = {
      contentType: uploadedImage.type,
    };

    // Create storage reference with the storage path structure
    const storageRef = ref(
      storage,
      `images/${userId}/avatar/${uploadedImage.name}`
    );

    // Start uploading
    const uploadTask = uploadBytesResumable(
      storageRef,
      uploadedImage,
      metadata
    );

    // Handle uploading process
    return new Promise(function (resolve, reject) {
      uploadTask.on(
        "state_changed",
        // Handle in progress
        onUploadProgress,
        // Handle errors
        (error) => (onUploadError(error), reject(null)),
        // Upload was successfully and get the image URL
        () => {
          getDownloadURL(storageRef).then((avatarURL) => {
            resolve(avatarURL);
          });
        }
      );
    });
  };
  return {
    startUploadAvatar,
    uploadProgress: progressValue,
  };
};

export default useUploadAvatar;

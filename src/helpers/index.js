import { Alert } from "react-native";
import RNFetchBlob from "rn-fetch-blob";

export const getFileExtension = Url => {
  return Url.split(/[#?]/)[0].split('.').pop().trim();
};
export const downloadFile = async url => {
  let date = new Date();

  // ..............File URl which we want to download ................ ///

  let Url = url;
  console.log('Url', Url);
  let ext = getFileExtension(Url);
  try {
    // Step 1: Create a path where the file will be saved
    const {dirs} = RNFetchBlob.fs;
    let nameOfFile = `${Math.floor(
      date.getTime() + date.getSeconds() / 2,
    )}.${ext}`;
    const filePath = `${dirs.DownloadDir}/${nameOfFile}`;

    // Step 2: Perform the file download
    const response = await RNFetchBlob.config({
      fileCache: true,
      path: filePath,
    }).fetch('GET', Url);

    // Step 3: Check the HTTP response status
    if (response.info().status === 200) {
      console.log(`File downloaded to: ${filePath}`);
      Alert.alert('Congrats!Download Successfully');
      return filePath;
    } else {
      Alert.alert('Download failed. HTTP Status:', response.info().status);
      console.error('Download failed. HTTP Status:', response.info().status);
      return null;
    }
  } catch (error) {
    Alert.alert('Error downloading file:', error);
    console.error('Error downloading file:', error);
    return null;
  }
 

  
};

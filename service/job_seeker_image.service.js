require('dotenv').config();
const fs = require('fs'); // Import the fs (file system) module to interact with the file system
const path = require('path');
const cloudinary = require("cloudinary").v2;
// Function to delete a sub-folder and its contents
// function delete_sub_folder(folder_name) {
//     const sub_folder_path = `./uploads/jobseeker/${folder_name}`; // Construct the path to the sub-folder using the folder name

//     // Read the contents of the sub-folder
//     fs.readdir(sub_folder_path, (err, files) => {
//         if (err) { // Handle errors during reading the directory
//             // console.log(err)
//             throw new Error(err);
//              // Log the error to the console
//         } else {
//             // Iterate through each file in the folder
//             files.forEach((file) => {
//                 const filePath = `${sub_folder_path}/${file}`; // Construct the full path to the file
//                 // console.log(filePath); // Log the file path for debugging

//                 // Delete the file
//                 fs.unlink(filePath, (err) => {
//                     if (err) { // Handle errors during file deletion
//                         console.error(err); // Log the error to the console
//                     }
//                 });
//             });

//             // Remove the sub-folder after all files are deleted
//             fs.rmdir(sub_folder_path, (err) => {
//                 if (err) { // Handle errors during folder removal
//                     throw new Error(err);
//                      // Log the error to the console
//                 } else {
//                     // console.log('Folder removed successfully'); // Log success message if folder is removed
//                     return
//                 }
//             });
//         }
//     });
// }



// function delete_sub_folder(dirPath) {
//   dirPath = `./uploads/${dirPath}`;
//   fs.readdir(dirPath, {
//     withFileTypes: true
//   }, (err, files) => {
//     if (err) {
//       console.error(`Error reading directory: ${dirPath}`, err);
//       return;
//     }

//     files.forEach((file) => {
//       const filePath = path.join(dirPath, file.name);

//       if (file.isDirectory()) {
//         delete_sub_folder(filePath); // Recursively remove subdirectories
//       } else {
//         fs.unlink(filePath, (err) => {
//           if (err) {
//             console.error(`Error deleting file: ${filePath}`, err);
//           }
//         });
//       }
//     });

//     fs.rmdir(dirPath, (err) => {
//       if (err) {
//         console.error(`Error removing directory: ${dirPath}`, err);
//       } else {
//         console.log(`Directory removed: ${dirPath}`);
//       }
//     });
//   });
// }





cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const Cloudnary_image_service = (file) => {
  // return new Promise((resolve, reject) => {
  //   cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
  //     if (err) {
  //       return reject(err);
  //     }
  //     // console.log(result.secure_url)
  //     resolve(result.secure_url);
  //   });
  // });

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.secure_url);
      }
    ).end(file.data); // Send the file buffer to Cloudinary
  });
}



module.exports = {
  // delete_sub_folder, // Export the delete_sub_folder function for use in other parts of the application
  Cloudnary_image_service
};
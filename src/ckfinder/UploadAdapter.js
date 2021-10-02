import firebase, { storageService } from "../fb";

export default class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  upload() {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
          let storage = storageService.ref();
          let uploadTask = storage
            .child(`images/${file.name}`)
            .put(file);
          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            function(snapshot) {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: 
                  console.log("Upload is paused");
                  break;
                case firebase.storage.TaskState.RUNNING: 
                  console.log("Upload is running");
                  break;
              }
            },
            function(error) {
              switch (error.code) {
                case "storage/unauthorized":
                  reject(" User doesn't have permission to access the object");
                  break;

                case "storage/canceled":
                  reject("User canceled the upload");
                  break;

                case "storage/unknown":
                  reject(
                    "Unknown error occurred, inspect error.serverResponse"
                  );
                  break;
              }
            },
            function() {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function(downloadURL) {
                  resolve({
                    default: downloadURL
                  });
                });
            }
          );
        })
    );
  }
}
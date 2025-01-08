
// Load Google API client
export const loadGapiClient = async () => {
  return new Promise((resolve, reject) => {
    window.gapi.load("client", async () => {
      try {
        await window.gapi.client.init({
          apiKey: "AIzaSyBlOw9Uu5u_Ti19v_jTpPRRgX_0tVFWWnY", // Replace with your API Key
          clientId:
            "1041547302675-fl2jnmfolgr6htmsap6qveltnj98mpp7.apps.googleusercontent.com", // Replace with your Client ID
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
          ],
          scope: "https://www.googleapis.com/auth/drive.file",
        });
        resolve();
      } catch (error) {
        console.error("Error loading GAPI client:", error);
        reject(error);
      }
    });
  });
};

let tokenClient;

export const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id:
          "1041547302675-fl2jnmfolgr6htmsap6qveltnj98mpp7.apps.googleusercontent.com", // Replace with your Client ID
        scope: "https://www.googleapis.com/auth/drive.file",
        callback: (tokenResponse) => {
          if (tokenResponse && tokenResponse.access_token) {
            resolve(tokenResponse.access_token);
          } else {
            reject("Failed to get access token");
          }
        },
      });
    }

    tokenClient.requestAccessToken();
  });
};


export const uploadFileToDrive = async (file) => {
    try {
      await loadGapiClient();

      // if (!window.gapi.client.drive) {
      //   console.error("Google API client not initialized");
      //   throw new Error("Google API client not initialized");
      // }

      const accessToken = await getAccessToken();

      window.gapi.client.setToken({access_token: accessToken});

    const metadata = {
      name: file.name,
      mimeType: file.type,
    };

    const fileData = new Blob([file, {type: file.type}]);


   const res = await window.gapi.client.drive.files.create({
      resource: metadata,
      media: {
        mimeType: file.type,
        body: fileData,
      },
      fields: "id",
    });
    const fileId = res.result.id;

    // Set permissions to make the file publicly accessible
    await window.gapi.client.drive.permissions.create({
      fileId,
      resource: {
        role: "reader",
        type: "anyone",
      },
    });

   const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
    console.log("Uploaded file URL:", fileUrl);

    return fileUrl;
}
 catch (error) {
    console.error("Error uploading to drive:", error)
    throw error;
 }
}


// import {google} from 'googleapis';

// //Initialize the Google Drive API
// const auth = new google.auth.GoogleAuth({
//     keyFile: 'credentials.json',
//     scopes: 'https://www.googleapis.com/auth/drive.file'
// });

// const drive = google.drive({ version: 'v3', auth });

// //Upload file to Google Drive
// export const uploadFileToDrive = async (file) => {
//     try {
//       const fileMetadata = {
//         name: file.name,
//         parents: ["1bseDhHlJQX7N4V7ntDhUEQqhMKS53cgQ"], // Replace with your folder ID
//       };

//       const media = {
//         mimeType: file.type,
//         body: file,
//       };

//       const res = await drive.files.create({
//         resource: fileMetadata,
//         media: media,
//         fields: "id, webViewLink",
//       });

//       const fileId = res.data.id;

//       //Set permissions to make the file publicly accessible
//       await drive.permissions.create({
//         fileId: fileId,
//         requestBody: {
//           role: "reader",
//           type: "anyone",
//         },
//       });

//       // Get the file's web view link
//       const fileUrl = res.data.webViewLink;
//       console.log("Uploaded file URL:", fileUrl);

//       return fileUrl || "";

//       // const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
//     } catch (error) {
//         console.error('Error uploading to drive:', error.message);
//         throw error;
//     }
// }

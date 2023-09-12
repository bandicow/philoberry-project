import axios from "axios";
import DragAndDropUploader from "../../src/components/ImageUploader/DragAndDrop";

function MyApp() {
  async function handleUpload(file: File) {
    try {
      const response = await axios.post("/api/s3Upload", {
        file: { name: file.name, type: file.type },
      });
      const url = response.data.url;

      // Create a new FormData instance
      const formData = new FormData();

      // Append the file to the 'file' field
      formData.append("file", file);

      // Use the presigned URL to upload the file to S3
      await axios.put(url, formData);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleMultipleUploads(files: File[]) {
    for (const file of files) {
      await handleUpload(file);
    }
  }

  //만약 한번에 올리고 싶을 때
  // async function handleMultipleUploads(files: File[]) {
  //   const uploadPromises = files.map(handleUpload);

  //   await Promise.all(uploadPromises);
  // }

  return (
    <div className="flex justify-center w-full item-center">
      <div>
        <DragAndDropUploader onImagesUpload={handleMultipleUploads} />
      </div>
    </div>
  );
}

export default MyApp;

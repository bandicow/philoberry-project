import axios from "axios";
import DragAndDropUploader from "../../src/components/ImageUploader/DragAndDrop";
import Image from "next/image";

interface imageFile {
  name: string;
  type: string;
}

function MyApp() {
  async function handleUpload(file: imageFile) {
    // try catch로 오류 잡기
    try {
      // Get the presigned URL
      const response = await axios.post("/api/s3Upload", {
        file: { name: file.name, type: file.type },
      });

      const url = response.data.url;

      // Use the presigned URL to upload the file to S3
      await axios.put(url, file);
    } catch (error) {
      // Handle error here
    }
  }

  return (
    <div>
      <DragAndDropUploader onImageUpload={handleUpload} />
    </div>
  );
}

export default MyApp;

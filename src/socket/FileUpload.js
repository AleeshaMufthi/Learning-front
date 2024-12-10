export const handlefileUpload = async (formData) => {
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/df509zm70/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
  
      const data = await response.json();
      return data; // This will include the URL and other details about the uploaded file
    } catch (error) {
      console.error("File upload error:", error);
      throw error;
    }
  };

  export default {
    handlefileUpload
  }
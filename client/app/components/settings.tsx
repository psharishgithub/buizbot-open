import { useState } from "react";

export default function SettingsPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Construct form data for file upload
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      // Fetch userId
      const userResponse = await fetch('/api/getUser', {
        method: 'GET',
      });
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user ID');
      }
      const userData = await userResponse.json();
      const userId = userData.userId;
      setUserId(userId); // Store userId in state

      // Construct URL for upload endpoint
      const uploadUrl = `http://127.0.0.1:8000/upload_documents/${userId}`;

      // Submit form data to upload endpoint
      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload documents');
      }

      // Update business name and website link
      
      
      // Update state to hide form and show success message
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>
        <p>Manage your account settings and preferences.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Reupload Files</h2>
          <p className="text-gray-600 mb-8">Update your documents here.</p>

          

          

          <div>
            <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Documents
            </label>
            <input
              type="file"
              id="documents"
              multiple
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
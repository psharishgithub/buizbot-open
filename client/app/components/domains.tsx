import { useState } from 'react';

export default function Domains() {
  const [websiteLink, setWebsiteLink] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const userResponse = await fetch('/api/getUser', {
        method: 'GET',
      });
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user ID');
      }
      const userData = await userResponse.json();
      const userId = userData.userId;
      setUserId(userId);

      const uploadUrl = `http://127.0.0.1:8000/upload_documents/${userId}`;

      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload documents');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      {isSubmitted ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Submission Successful!</h2>
          <p className="mb-4 text-gray-700">You can now use the following script:</p>
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="text-sm overflow-x-auto">
              <code className="language-html text-blue-600">
                {`<script src="http://localhost:8000/chatbot_script/${userId}"></script>`}
              </code>
            </pre>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Add Domain</h2>
          <p className="text-gray-600 mb-8">Manage your account settings and preferences.</p>
          
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
            disabled={isLoading}
            className={`w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
}
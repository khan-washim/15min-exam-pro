import React, { useState } from 'react';
import api from '../../services/api';

const DataUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.stopPropagation();
    if (!file) return alert('Please select a JSON file');

    setUploading(true);
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);

        // লুপ ছাড়াই সরাসরি বাল্ক আপলোড রাউটে ডাটা পাঠানো
        const response = await api.post('/admin/bulk-questions', jsonData);

        alert(response.data.message);
        setFile(null);
        document.getElementById('fileInput').value = ""; // রিসেট ইনপুট
      } catch (error) {
        console.error("Upload Error:", error);
        alert('Upload failed: ' + (error.response?.data?.message || 'Check Server Console'));
      } finally {
        setUploading(false);
      }
    };

    reader.onerror = () => {
      alert('Error reading file');
      setUploading(false);
    };

    reader.readAsText(file);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4 text-center fw-bold">Bulk Question Upload</h2>
          <div 
            className="card p-5 text-center shadow-sm" 
            style={{ border: '2px dashed #0d6efd', cursor: 'pointer', backgroundColor: '#f8faff' }} 
            onClick={() => document.getElementById('fileInput').click()}
          >
            <input type="file" id="fileInput" className="d-none" accept=".json" onChange={handleFileChange} />
            <i className="fas fa-cloud-upload-alt fa-4x text-primary mb-3"></i>
            <h4>Click to Select JSON File</h4>
            {file && (
              <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                <p className="text-success fw-bold">Selected: {file.name}</p>
                <button className="btn btn-primary btn-lg px-5" onClick={handleUpload} disabled={uploading}>
                  {uploading ? 'Processing Bulk Upload...' : 'Upload All Now'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;
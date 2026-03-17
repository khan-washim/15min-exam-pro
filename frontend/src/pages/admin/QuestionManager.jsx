import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Save, Upload, PlusCircle, FileJson, AlertCircle } from 'lucide-react';
import Loader from '../../components/ui/Loader';

const QuestionManager = () => {
  const [activeTab, setActiveTab] = useState('manual');
  const [uploading, setUploading] = useState(false);
  const [dbSubjects, setDbSubjects] = useState([]); 
  
  const [formData, setFormData] = useState({
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    subject: '', // ObjectId stored here
    explanation: '',
    setNumber: 1
  });

  // Database theke subjects load kora
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await api.get('/subjects'); 
        setDbSubjects(data);
      } catch (err) {
        toast.error("Could not load subjects from database");
      }
    };
    fetchSubjects();
  }, []);

  // --- Manual Question Submit ---
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.correctAnswer) return toast.warn("Please fill all required fields");
    
    try {
      setUploading(true);
      await api.post('/questions', formData);
      toast.success("Question added successfully!");
      // Reset Form
      setFormData({ 
        questionText: '', 
        options: ['', '', '', ''], 
        correctAnswer: '', 
        subject: '', 
        explanation: '', 
        setNumber: 1 
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save question");
    } finally {
      setUploading(false);
    }
  };

  // --- Bulk JSON Upload Logic ---
  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ১. আপলোড করার আগে কনফার্মেশন অ্যালার্ট
    const confirmUpload = window.confirm(`Are you sure you want to upload "${file.name}"? This will add multiple questions to the database.`);
    
    if (!confirmUpload) {
      e.target.value = null; // Reset input
      return;
    }

    // ২. FormData তৈরি (Multer expects this)
    const data = new FormData();
    data.append('file', file); // 'file' name must match backend upload.single('file')

    try {
      setUploading(true);
      const response = await api.post('/questions/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success(response.data.message || "Bulk questions uploaded successfully!");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error(err.response?.data?.message || "Bulk upload failed. Check JSON format.");
    } finally {
      setUploading(false);
      e.target.value = null; // Clear file input
    }
  };

  return (
    <div className="container py-4 position-relative">
      {/* Uploading Status Loader */}
      {uploading && <Loader fullPage text="Processing questions... Please wait." />}

      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div className="card-header bg-dark text-white p-4 d-flex justify-content-between align-items-center">
           <div>
             <h4 className="mb-0 fw-bold d-flex align-items-center">
               <PlusCircle className="me-2" size={24} /> Question Manager
             </h4>
             <p className="small text-light text-opacity-75 mb-0">Add new questions to your database</p>
           </div>
           <div className="btn-group bg-white bg-opacity-10 p-1 rounded-3">
              <button 
                className={`btn btn-sm px-4 rounded-2 transition ${activeTab === 'manual' ? 'btn-primary shadow' : 'btn-link text-white text-decoration-none'}`} 
                onClick={() => setActiveTab('manual')}
              >
                Manual Entry
              </button>
              <button 
                className={`btn btn-sm px-4 rounded-2 transition ${activeTab === 'bulk' ? 'btn-primary shadow' : 'btn-link text-white text-decoration-none'}`} 
                onClick={() => setActiveTab('bulk')}
              >
                Bulk Upload
              </button>
           </div>
        </div>

        <div className="card-body p-4 p-lg-5">
          {activeTab === 'manual' ? (
            <form onSubmit={handleManualSubmit}>
              <div className="mb-4">
                <label className="form-label fw-bold text-secondary">Question Description</label>
                <textarea 
                  className="form-control form-control-lg border-2 shadow-none" 
                  rows="3" 
                  required 
                  placeholder="Type your question here..."
                  value={formData.questionText} 
                  onChange={e => setFormData({...formData, questionText: e.target.value})} 
                />
              </div>
              
              <div className="row g-3 mb-4">
                {formData.options.map((opt, i) => (
                  <div className="col-md-6" key={i}>
                    <label className="form-label small fw-bold text-muted">Option {i+1}</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-2">{String.fromCharCode(65 + i)}</span>
                      <input 
                        className="form-control border-2 shadow-none" 
                        placeholder={`Enter option ${i+1}`} 
                        required 
                        value={opt} 
                        onChange={e => {
                          const newOpts = [...formData.options];
                          newOpts[i] = e.target.value;
                          setFormData({...formData, options: newOpts});
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="row g-4 mb-5">
                <div className="col-md-6">
                  <label className="form-label fw-bold text-secondary">Subject</label>
                  <select 
                    className="form-select form-select-lg border-2" 
                    required 
                    value={formData.subject} 
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                  >
                    <option value="">-- Choose Subject --</option>
                    {dbSubjects.map(s => (
                      <option key={s._id} value={s._id}>{s.nameEn} ({s.nameBn})</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-secondary">Correct Answer</label>
                  <select 
                    className="form-select form-select-lg border-2 border-primary border-opacity-25" 
                    required 
                    value={formData.correctAnswer} 
                    onChange={e => setFormData({...formData, correctAnswer: e.target.value})}
                  >
                    <option value="">-- Select Answer --</option>
                    {formData.options.map((opt, i) => opt && (
                      <option key={i} value={opt}>Option {String.fromCharCode(65 + i)}: {opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="btn btn-dark btn-lg w-100 py-3 fw-bold rounded-3 shadow-sm hover-lift" disabled={uploading}>
                {uploading ? (
                  <><span className="spinner-border spinner-border-sm me-2"></span> Saving...</>
                ) : (
                  <><Save className="me-2" size={20} /> Save Question</>
                )}
              </button>
            </form>
          ) : (
             <div className="text-center py-5 px-4 bg-light border border-2 border-dashed rounded-4">
                <div className="mb-4 d-inline-flex p-4 rounded-circle bg-primary bg-opacity-10 text-primary">
                    <FileJson size={64} />
                </div>
                <h4 className="fw-bold mb-2">Upload Bulk Questions</h4>
                <p className="text-muted mx-auto mb-4" style={{ maxWidth: '500px' }}>
                    Select a JSON file containing an array of questions. Ensure that the <code>subject</code> field in your JSON matches the <b>nameEn</b> of a subject in your database.
                </p>
                
                <div className="col-md-7 mx-auto">
                    <div className="input-group shadow-sm">
                      <label className="input-group-text bg-primary text-white border-primary cursor-pointer" htmlFor="bulkInput">
                        <Upload size={18} className="me-2" /> Browse File
                      </label>
                      <input 
                          id="bulkInput"
                          type="file" 
                          className="form-control border-2" 
                          accept=".json" 
                          onChange={handleBulkUpload} 
                          disabled={uploading}
                      />
                    </div>
                    
                    <div className="mt-4 p-3 bg-white border rounded-3 text-start">
                      <div className="d-flex align-items-center text-info mb-2">
                        <AlertCircle size={16} className="me-2" />
                        <span className="small fw-bold">Required JSON Structure:</span>
                      </div>
                      <pre className="bg-light p-2 rounded small mb-0 overflow-auto" style={{ maxHeight: '100px' }}>
{`[
  {
    "text": "Your Question?",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "B",
    "subject": "Bangla"
  }
]`}
                      </pre>
                    </div>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionManager;
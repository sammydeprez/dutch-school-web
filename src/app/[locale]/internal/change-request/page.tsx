'use client';

import { useState, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Paperclip, X } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per file
const MAX_FILES = 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];

export default function ChangeRequestPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    page: '',
    type: 'content',
    submittedBy: '',
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [issueUrl, setIssueUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('page', formData.page);
      submitData.append('type', formData.type);
      submitData.append('submittedBy', formData.submittedBy);

      attachments.forEach((file) => {
        submitData.append('attachments', file);
      });

      const response = await fetch('/api/create-issue', {
        method: 'POST',
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create issue');
      }

      setStatus('success');
      setIssueUrl(data.issueUrl);
      setFormData({
        title: '',
        description: '',
        page: '',
        type: 'content',
        submittedBy: '',
      });
      setAttachments([]);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type. Allowed: JPG, PNG, GIF, WebP, PDF`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: File too large. Maximum size is 5MB`);
        return;
      }
      if (attachments.length + validFiles.length >= MAX_FILES) {
        errors.push(`Maximum ${MAX_FILES} files allowed`);
        return;
      }
      validFiles.push(file);
    });

    if (errors.length > 0) {
      setErrorMessage(errors.join('\n'));
      setStatus('error');
    }

    if (validFiles.length > 0) {
      setAttachments((prev) => [...prev, ...validFiles]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm p-8 lg:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Change Request
            </h1>
            <p className="text-muted">
              Submit a request for website changes, content updates, or report issues.
            </p>
          </div>

          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Request Submitted!
              </h2>
              <p className="text-muted mb-4">
                Your change request has been created successfully.
              </p>
              {issueUrl && (
                <a
                  href={issueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View issue on GitHub →
                </a>
              )}
              <button
                onClick={() => setStatus('idle')}
                className="block mx-auto mt-6 px-6 py-2 bg-surface text-foreground rounded-full hover:bg-border transition-colors"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="p-4 bg-red/10 border border-red/20 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red">Error submitting request</p>
                    <p className="text-sm text-red/80">{errorMessage}</p>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-foreground mb-2">
                  Request Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                >
                  <option value="content">Content Update</option>
                  <option value="feature">New Feature</option>
                  <option value="bug">Bug / Issue</option>
                  <option value="design">Design Change</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                  Title <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Brief summary of the change"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="page" className="block text-sm font-medium text-foreground mb-2">
                  Page / Section
                </label>
                <input
                  type="text"
                  id="page"
                  name="page"
                  value={formData.page}
                  onChange={handleChange}
                  placeholder="e.g., Homepage, About page, Contact form"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  Description <span className="text-red">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Describe the change you'd like to make. Be as specific as possible."
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label htmlFor="submittedBy" className="block text-sm font-medium text-foreground mb-2">
                  Your Name (optional)
                </label>
                <input
                  type="text"
                  id="submittedBy"
                  name="submittedBy"
                  value={formData.submittedBy}
                  onChange={handleChange}
                  placeholder="So we know who to follow up with"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Attachments (optional)
                </label>
                <div className="space-y-3">
                  <div
                    className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="w-8 h-8 mx-auto text-muted mb-2" />
                    <p className="text-sm text-muted">
                      Click to upload files or drag and drop
                    </p>
                    <p className="text-xs text-muted mt-1">
                      JPG, PNG, GIF, WebP, PDF up to 5MB (max {MAX_FILES} files)
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept={ALLOWED_TYPES.join(',')}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {attachments.length > 0 && (
                    <ul className="space-y-2">
                      {attachments.map((file, index) => (
                        <li
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between p-3 bg-surface rounded-lg"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Paperclip className="w-4 h-4 text-muted flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-muted">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="p-1 hover:bg-border rounded-full transition-colors flex-shrink-0"
                          >
                            <X className="w-4 h-4 text-muted" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Request
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-muted mt-6">
          This page is for internal use only.
        </p>
      </div>
    </div>
  );
}

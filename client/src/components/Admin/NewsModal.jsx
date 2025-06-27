// /Users/rajputdhiraj/Desktop/shree-sports-academy/client/src/components/Admin/NewsModal.jsx
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const NewsModal = ({ newsItem, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    tags: '',
    author: 'Admin',
    status: 'draft',
    isFeatured: false
  });

  useEffect(() => {
    if (newsItem) {
      setFormData({
        title: newsItem.title,
        content: newsItem.content,
        imageUrl: newsItem.imageUrl || '',
        tags: newsItem.tags ? newsItem.tags.join(', ') : '',
        author: newsItem.author || 'Admin',
        status: newsItem.status || 'draft',
        isFeatured: newsItem.isFeatured || false
      });
    }
  }, [newsItem]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags 
      ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      : [];
    
    const dataToSubmit = {
      ...formData,
      tags: tagsArray,
      publishedAt: formData.status === 'published' ? new Date() : null
    };
    
    onSubmit(dataToSubmit);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold">
            {newsItem ? 'Edit News' : 'Add New News'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md min-h-[200px]"
              required
              placeholder="Enter news content here..."
            />
            <p className="text-xs text-gray-500 mt-1">
              You can use basic HTML tags like &lt;b&gt;, &lt;i&gt;, &lt;u&gt;, &lt;br&gt;, etc. for formatting
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="sports, academy, event"
            />
          </div>
          
          <div className="flex flex-wrap gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700">
                Featured News
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {newsItem ? 'Update News' : 'Add News'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsModal;
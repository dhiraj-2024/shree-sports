import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const NewsModal = ({ newsItem, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    tags: "",
    author: "Admin",
    status: "draft",
    isFeatured: false,
  });

  useEffect(() => {
    if (newsItem) {
      setFormData({
        title: newsItem.title || "",
        content: newsItem.content || "",
        imageUrl: newsItem.imageUrl || "",
        tags: newsItem.tags?.join(", ") || "",
        author: newsItem.author || "Admin",
        status: newsItem.status || "draft",
        isFeatured: newsItem.isFeatured || false,
      });
    }
  }, [newsItem]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags
      ? formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];

    const finalData = {
      ...formData,
      tags: tagsArray,
      publishedAt: formData.status === "published" ? new Date() : null,
    };

    onSubmit(finalData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black">
            {newsItem ? "Edit News" : "Add News"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-800 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-800 rounded-md h-40 resize-none focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              You can use HTML tags like &lt;b&gt;, &lt;i&gt;, &lt;br&gt;, etc.
            </p>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-800 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-800 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="sports, academy, update"
            />
          </div>

          {/* Status & Featured */}
          <div className="flex flex-wrap gap-6 items-center">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-800 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="h-4 w-4 text-orange-500 border-gray-800 focus:ring-orange-500 rounded"
              />
              <label htmlFor="isFeatured" className="ml-2 text-sm text-black">
                Mark as Featured
              </label>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-black border border-gray-800 rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            >
              {newsItem ? "Update News" : "Submit News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsModal;

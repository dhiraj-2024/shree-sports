import React, { useState, useEffect } from "react";
import {
    FaTimes,
    FaBold,
    FaItalic,
    FaUnderline,
    FaListUl,
    FaListOl,
} from "react-icons/fa";

const NewsModal = ({ newsItem, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        imageUrl: "",
        isFeatured: false,
        tags: [],
        status: "published",
    });
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        if (newsItem) {
            setFormData({
                title: newsItem.title || "",
                content: newsItem.content || "",
                imageUrl: newsItem.imageUrl || "",
                isFeatured: newsItem.isFeatured || false,
                tags: newsItem.tags || [],
                status: newsItem.status || "published",
            });
        }
    }, [newsItem]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleTagInput = (e) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData({
                    ...formData,
                    tags: [...formData.tags, tagInput.trim()],
                });
            }
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((tag) => tag !== tagToRemove),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const applyFormat = (format) => {
        const textarea = document.getElementById("contentTextarea");
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = formData.content.substring(start, end);
        let newText = formData.content;

        switch (format) {
            case "bold":
                newText =
                    formData.content.substring(0, start) +
                    `**${selectedText}**` +
                    formData.content.substring(end);
                break;
            case "italic":
                newText =
                    formData.content.substring(0, start) +
                    `*${selectedText}*` +
                    formData.content.substring(end);
                break;
            case "underline":
                newText =
                    formData.content.substring(0, start) +
                    `_${selectedText}_` +
                    formData.content.substring(end);
                break;
            case "ul":
                newText =
                    formData.content.substring(0, start) +
                    `\n- ${selectedText.replace(/\n/g, "\n- ")}` +
                    formData.content.substring(end);
                break;
            case "ol":
                newText =
                    formData.content.substring(0, start) +
                    `\n1. ${selectedText.replace(/\n/g, "\n1. ")}` +
                    formData.content.substring(end);
                break;
            default:
                break;
        }

        setFormData({
            ...formData,
            content: newText,
        });

        // Set cursor position after the inserted text
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + 2, end + 2);
        }, 0);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-xl font-semibold">
                        {newsItem ? "Edit News" : "Add New News"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
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
                        <div className="flex space-x-2 mb-2">
                            <button
                                type="button"
                                onClick={() => applyFormat("bold")}
                                className="p-2 text-gray-700 hover:bg-gray-100 rounded"
                                title="Bold"
                            >
                                <FaBold />
                            </button>
                            <button
                                type="button"
                                onClick={() => applyFormat("italic")}
                                className="p-2 text-gray-700 hover:bg-gray-100 rounded"
                                title="Italic"
                            >
                                <FaItalic />
                            </button>
                            <button
                                type="button"
                                onClick={() => applyFormat("underline")}
                                className="p-2 text-gray-700 hover:bg-gray-100 rounded"
                                title="Underline"
                            >
                                <FaUnderline />
                            </button>
                            <button
                                type="button"
                                onClick={() => applyFormat("ul")}
                                className="p-2 text-gray-700 hover:bg-gray-100 rounded"
                                title="Bullet List"
                            >
                                <FaListUl />
                            </button>
                            <button
                                type="button"
                                onClick={() => applyFormat("ol")}
                                className="p-2 text-gray-700 hover:bg-gray-100 rounded"
                                title="Numbered List"
                            >
                                <FaListOl />
                            </button>
                        </div>
                        <textarea
                            id="contentTextarea"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md h-64"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Use **bold**, *italic*, _underline_, - for bullet points, 1. for
                            numbered lists
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

                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="isFeatured"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="isFeatured"
                                className="ml-2 block text-sm text-gray-700"
                            >
                                Featured News
                            </label>
                        </div>

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
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tags
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {formData.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagInput}
                            placeholder="Type tag and press Enter"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            {newsItem ? "Update News" : "Add News"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewsModal;

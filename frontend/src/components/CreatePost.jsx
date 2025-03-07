import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const modules = {
    toolbar: {
        container: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
             {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
        ],
        handlers: {
            image: imageHandler // اضافه کردن هندلر سفارشی برای عکس‌ها
        }
    },
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

// هندلر سفارشی برای آپلود عکس‌ها
function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);

        // آپلود عکس به سرور
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            const url = data.url; // URL عکس آپلود شده
            const quill = this.quill;
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', url); // قرار دادن URL عکس در محتوا
        } else {
            console.error('Image upload failed');
        }
    };
}

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    const MAX_WORDS = 40; // حداکثر تعداد کلمات مجاز

    function handleSummaryChange(ev) {
        const inputValue = ev.target.value;
        const words = inputValue.trim().split(/\s+/); // جدا کردن کلمات با فاصله

        if (words.length > MAX_WORDS) {
            const trimmedSummary = words.slice(0, MAX_WORDS).join(' '); // نگه داشتن فقط ۴۰ کلمه
            setSummary(trimmedSummary);
        } else {
            setSummary(inputValue);
        }
    }

    async function createNewPost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        const response = await fetch('/api/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={createNewPost}>
            <input type="text" placeholder='title' value={title} onChange={ev => setTitle(ev.target.value)} />
            <input type="text" placeholder='summary' value={summary} onChange={handleSummaryChange} />
            <input type="file" onChange={ev => setFiles(ev.target.files)} />
            <ReactQuill value={content} onChange={newValue => setContent(newValue)} modules={modules} formats={formats} />
            <button style={{ marginTop: '5px', backgroundColor: 'green' }}>Create post</button>
        </form>
    );
}

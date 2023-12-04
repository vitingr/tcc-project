"use client"

import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = ({value, setValue}) => {
	const editorRef = useRef(null);
	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
		}
	};
	return (
		<>
			<Editor
				apiKey='6espmx3caysbp4lgeuk7j57elnl47badfrzwxrnl2f71hirk'
				onInit={(evt, editor) => editorRef.current = editor}
				value={value}
				onEditorChange={(newValue) => setValue(newValue)}
				init={{
					height: 500,
					menubar: false,
					plugins: [
						'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
						'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
						'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
					],
					toolbar: 'undo redo | blocks | ' +
						'bold italic forecolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help',
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
				}}
			/>
			{/* <button onClick={log}>Log editor content</button> */}
		</>
	)
}

export default TextEditor
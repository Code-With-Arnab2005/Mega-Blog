import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from '../conf/conf';

function RTE({ name, control, label, defaultValue = "" }) {

    // console.log(import.meta.env.VITE_TINYMCE_API_KEY)
    // console.log(conf.tynimceApiKey)
    return (
        <div className='w-full'>
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={conf.tynimceApiKey}
                        initialValue={defaultValue}
                        init={
                            {
                                height: 500,
                                menubar: true,
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
                            }
                        }
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default RTE

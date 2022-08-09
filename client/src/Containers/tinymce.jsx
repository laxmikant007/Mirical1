import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import PageTitle from '../Components/UI/PageTitle'
import { api } from '../urlConfig';
const axios = require('axios');

/**
* @author
* @function TinyMce
**/

const TinyMce = (props) => {
    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };

    // ToDo: Upload Images in User Id And Show Them in a Modal So user can see and delete past uploaded Images just like wordpress

    const imagesUploadHandler = (blobInfo, success, failure) => {
        const uploadLink = `${api}/blog/images/60a4d44f1b25d52b44ab483d`;
        let formData = new FormData();
        formData.append('image', blobInfo.blob(), blobInfo.filename());
        
        return axios.post( uploadLink, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGE0ZDQ0ZjFiMjVkNTJiNDRhYjQ4M2QiLCJpYXQiOjE2MjE5MzY0MjMsImV4cCI6MTYyMjAyMjgyM30.3nOxw7WO-Q-Wf_uaz54u_AO5OiweHOPq7qwHpwCe_WM"
            }
        })
        .then((response) => {
            return response;
        })
        .then((res) => {
            success(res.data.location)
        })
        .catch((err) => failure(err.response.data.error))
    }

    return (
      <>
      <PageTitle title="Testimonials" para="This is where you can see what our clients has to say about our services." />
        <div className="section-padding">
        <Editor
          apiKey={process.env.REACT_APP_TINYMCE_API}
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            images_upload_handler: imagesUploadHandler,
            height: 500,
            // menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'insertfile undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | link image | ' +
            'removeformat',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            setup: function (editor) {
              editor.on('NodeChange', function (e) {
                if (e.element.tagName === "IMG") { 
                    // Set an alt attribute. We will insert the value when the image was successfully uploaded and the imageId was returned from the server. We saved the alt tag that we want into the imageId hidden input field (imageId) when the server returned data. Here, we are taking that value and inserting the new alt tag.
                    console.log(e)
                    console.log('Content changed to:  ' + editor.getContent());
                    return; 
                }
                return;
            });
              // editor.on('change', function (e) {
              //   console.log('change event fired');
              //   console.log(e);
              //   console.log('Content changed to:  ' + editor.getContent());
              // });
            }
          }}
        />
        <button onClick={log}>Log editor content</button>
        </div>
      </>
    );
  }


export default TinyMce
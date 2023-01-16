
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'

function TestForm () {
  const maxSize = 1048576;

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

  const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, rejectedFiles } = useDropzone({
    onDrop,
    accept: {
              'image/*': ['.jpeg', '.png']
            },
    minSize: 0,
    maxSize,
  });

  const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
  
  return (
    <div className="container text-center mt-5">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {!isDragActive && 'Click here or drop a file to upload!'}
        {isDragActive && !isDragReject && "Drop it like it's hot!"}
        {isDragReject && "File type not accepted, sorry!"}
        {isFileTooLarge && (
          <div className="text-danger mt-2">
            File is too large.
          </div>
        )}
      </div>
    </div>
  );
};

export default TestForm;
// export default function TestForm(props) {
//   const {
//     getRootProps,
//     getInputProps,
//     isDragActive,
//     isDragAccept,
//     isDragReject
//   } = useDropzone({
//     accept: {
//       'image/*': ['.jpeg', '.png']
//     }
//   });

//   return (
//     <div className="container">
//       <div {...getRootProps({className: "dropzone"})}>
//         <input {...getInputProps()} />
//         {isDragAccept && (<p>All files will be accepted</p>)}
//           {isDragReject && (<p>Only jpeg, and png files are allowed</p>)}
//           {!isDragActive && (<p>Drop some files here ...</p>)}
//       </div>
//     </div>
//   );
// }

// import React, { useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';

// function TestForm(props) {
//   const onDrop = useCallback(acceptedFiles => {
//     props.setFilename(acceptedFiles[0].name);
//     props.callback(acceptedFiles);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div className="upload" {...getRootProps()}>
//       <input {...getInputProps()} />
//       {isDragActive ? <p>upload or drag STL files</p> : <p>upload STL files</p>}
//       {props.filename ? <p>Filename: {props.filename}</p> : null}
//     </div>
//   );
// }

// export default TestForm;

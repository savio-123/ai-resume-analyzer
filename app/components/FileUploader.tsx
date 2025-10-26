import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  // ✅ Define max file size (20 MB in bytes)
  const maxFileSize = 20 * 1024 * 1024

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null
      onFileSelect?.(file)
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxSize: maxFileSize,
  })

  const file = acceptedFiles[0] || null

  return (
    <div className='w-full gradient-border'>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className='space-y-4 cursor-pointer'>
          {file ? (
            <div className='uploader-selected-file' onClick={(e) => e.stopPropagation()}>
              <img src='/images/pdf.png' alt='pdf' className='size-10' />
              <div className='flex items-center space-x-3'>
                <div>
                  <p className='text-sm text-gray-700 max-w-xs font-medium truncate'>
                    {file.name}
                  </p>
                  <p className='text-sm text-gray-500'>{formatSize(file.size)}</p>
                </div>
              </div>
              <button
                className='p-2 cursor-pointer'
                type='button'
                onClick={(e) => onFileSelect?.(null)}
              >
                <img src='/icons/cross.svg' alt='close' className='size-4' />
              </button>
            </div>
          ) : (
            <div>
              <div className='flex items-center justify-center mx-auto size-16 mb-2'>
                <img src='/icons/info.svg' alt='upload' className='size-20' />
              </div>
              <p className='text-lg text-gray-500'>
                <span className='font-semibold'>Click to upload</span> or drag and drop
              </p>
              <p className='text-lg text-gray-500'>
                PDF (max {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUploader


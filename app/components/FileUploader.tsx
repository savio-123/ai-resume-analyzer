import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const maxFileSize = 20 * 1024 * 1024 // 20 MB

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
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: maxFileSize,
  })

  const file = acceptedFiles[0] || null

  return (
    <div className="w-full max-w-2xl mx-auto gradient-border p-4 sm:p-6 md:p-8 rounded-2xl">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div className="uploader-selected-file flex items-center justify-between flex-wrap gap-4 bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <img src="/images/pdf.png" alt="pdf" className="w-8 h-8 sm:w-10 sm:h-10" />
                <div className="min-w-0">
                  <p className="text-sm sm:text-base text-gray-700 font-medium truncate max-w-[180px] sm:max-w-[250px]">
                    {file.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">{formatSize(file.size)}</p>
                </div>
              </div>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition"
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onFileSelect?.(null)
                }}
              >
                <img src="/icons/cross.svg" alt="close" className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex items-center justify-center mx-auto w-12 h-12 sm:w-16 sm:h-16 mb-3">
                <img src="/icons/info.svg" alt="upload" className="w-12 h-12 sm:w-16 sm:h-16 opacity-80" />
              </div>
              <p className="text-gray-600 text-base sm:text-lg">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-sm sm:text-base text-gray-500">
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

'use client'

import { ImagePlus } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/utils/clsx'
import { Button } from '../../button'
import { useUpload } from './useUpload'

interface ImageUploadProps {
  isDisabled: boolean
  onChange: (value: string[]) => void
  value: string[]
}

export function ImageUpload({ isDisabled, onChange, value }: ImageUploadProps) {
  const { handleButtonClick, isUploading, fileInputRef, handleFileChange } =
    useUpload(onChange)

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
        {value.map(url => (
          <div 
            key={url} 
            className="relative size-50 rounded-md overflow-hidden border"
          >
            <Image 
              src={url} 
              alt="Превью товара" 
              fill 
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <Button
        type="button"
        disabled={isDisabled || isUploading}
        variant="secondary"
        onClick={handleButtonClick}
        className={cn(
          "mt-0 flex items-center transition-all",
          value.length > 0 && "mt-4"
        )}
      >
        <ImagePlus className="size-4 mr-2" />
        {isUploading ? 'Загрузка...' : 'Загрузить картинки'}
      </Button>

      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isDisabled}
        accept="image/*"
      />
    </div>
  )
}
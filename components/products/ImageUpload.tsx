"use client"
import { getImagePath } from '@/src/types'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'
export default function ImageUpload({ image }: { image: string | undefined }) {

    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget
            uploadPreset='ml_default'
            options={{
                maxFiles: 1
            }}
            onSuccess={(result, { widget }) => {
                if (result.event === 'success') {
                    widget.close()
                    //@ts-ignore
                    setImageUrl(result.info?.secure_url)
                }
            }}
        >
            {({ open }) => (
                <>
                    <div className="space-y-2">
                        <div
                            className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 textn600 bg-slate-100"
                            onClick={() => open()}
                        >
                            <label className='text-slate-800'>Imagen Producto</label>
                            <TbPhotoPlus
                                size={50}
                            />
                            <p className='text-lg font-semibold'>Agregar Imagen</p>
                            {imageUrl && (
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        fill
                                        alt='Img de Producto'
                                        src={imageUrl}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {image && !imageUrl && (

                        <div className="space-y-2 ">
                            <label>Imagen Actual:</label>
                            <div className='relative w-64 h-64'>
                                <Image
                                    fill
                                    src={getImagePath(image)}
                                    alt='Imagen producto'
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    )}
                    <input
                        type="hidden"
                        name='image'
                        defaultValue={imageUrl ? imageUrl : image}
                    />
                </>
            )}
        </CldUploadWidget>
    )
}
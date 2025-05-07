import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Gallery = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, backendUrl, user } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token || !user) {
      toast.error('Please login to view your gallery')
      navigate('/')
      return
    }

    const fetchImages = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get('/api/image/history', {
          headers: { token }
        })

        if (data.success) {
          setImages(data.images)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [token, backendUrl, user, navigate])

  const handleGenerateNew = () => {
    navigate('/result')
  }

  return (
    <motion.div
      className='min-h-[90vh] py-10'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className='text-3xl font-bold text-center mb-8'>Your Image Gallery</h1>
      
      {loading ? (
        <div className='flex justify-center items-center h-40'>
          <p className='text-lg'>Loading your images...</p>
        </div>
      ) : images.length === 0 ? (
        <div className='text-center'>
          <p className='text-lg mb-6'>You haven't generated any images yet.</p>
          <button 
            onClick={handleGenerateNew}
            className='bg-zinc-900 text-white px-8 py-3 rounded-full'
          >
            Generate Your First Image
          </button>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {images.map((image, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
                <img 
                  src={image.imageUrl} 
                  alt={image.prompt} 
                  className='w-full h-64 object-cover'
                />
                <div className='p-4'>
                  <p className='text-sm text-gray-500 mb-2'>
                    {new Date(image.createdAt).toLocaleDateString()}
                  </p>
                  <p className='font-medium'>{image.prompt}</p>
                  <a 
                    href={image.imageUrl} 
                    download 
                    className='block mt-4 text-center bg-zinc-800 text-white py-2 rounded-md'
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className='mt-10 text-center'>
            <button 
              onClick={handleGenerateNew}
              className='bg-zinc-900 text-white px-8 py-3 rounded-full'
            >
              Generate New Image
            </button>
          </div>
        </>
      )}
    </motion.div>
  )
}

export default Gallery
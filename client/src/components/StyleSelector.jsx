import React from 'react'

const styles = [
  { id: 'default', name: 'Default', description: 'Standard image generation' },
  { id: 'cartoon', name: 'Cartoon', description: 'Vibrant colors with stylized cartoon look' },
  { id: 'realistic', name: 'Realistic', description: 'Photorealistic with high detail' },
  { id: 'abstract', name: 'Abstract', description: 'Non-representational artistic style' },
  { id: 'sketch', name: 'Sketch', description: 'Hand-drawn pencil sketch look' },
  { id: 'watercolor', name: 'Watercolor', description: 'Soft watercolor painting style' }
]

const StyleSelector = ({ selectedStyle, setSelectedStyle }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Select Image Style</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {styles.map((style) => (
          <div
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            className={`p-3 rounded-lg cursor-pointer transition-all ${
              selectedStyle === style.id
                ? 'bg-zinc-800 text-white'
                : 'bg-white border border-gray-200 hover:border-zinc-400'
            }`}
          >
            <h4 className="font-medium">{style.name}</h4>
            <p className="text-sm mt-1 opacity-80">{style.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StyleSelector
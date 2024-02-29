import React, { useState } from 'react';

const ImageUploader = () => {
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);

                console.log('URL da imagem:', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='pt-20'>
            <input type="file" onChange={handleFileChange} />
            {imageUrl && <img src={imageUrl} alt="Imagem enviada" />}
        </div>
    );
};

export default ImageUploader;

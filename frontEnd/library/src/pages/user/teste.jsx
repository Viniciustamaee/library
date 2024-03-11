import { Image } from 'cloudinary-react';
import React, { useState } from 'react';
import axios from 'axios';

const CloudinaryUpload = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'bo5x3aet');
            formData.append('folder', 'library');
            formData.append('allowedFormats', ['jpg', 'png']);

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dtuxy5k7v/image/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Basic ' + btoa('631759363798366:j3AdG6dgyludTedwZB2zQKBws54'),
                    },
                }
            );

            const imageUrl = response.data.secure_url;
            console.log('URL da imagem:', imageUrl);
        } catch (error) {
            console.error('Erro ao enviar imagem para o Cloudinary:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            {image && (
                <div>
                    <Image cloudName="dtuxy5k7v" publicId={image.name} />
                </div>
            )}
            <button onClick={handleUpload}>Enviar para o Cloudinary</button>
        </div>
    );
};

export default CloudinaryUpload;

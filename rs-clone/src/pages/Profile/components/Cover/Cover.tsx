import classes from './Covers.module.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdAddAPhoto } from 'react-icons/md';
import { BiPaint } from 'react-icons/bi';
import { useUser } from '../../../../contexts';
import { colorLightGrey } from '../../../../theme/variables';

const CLOUDINARY_UPLOAD_PRESET = 'rk1dombm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/da63cq8g4/image/upload';

const Cover = () => {
  const { ...uData } = useUser();

  const [imageUrl, setImageUrl] = useState<string | (() => string | undefined) | null>('');
  const [color, setColor] = useState<string>('');

  const coverType = () => {
    if (
      uData.currentUser?.coverBlock?.length === 4 ||
      uData.currentUser?.coverBlock?.length === 7
    ) {
      setColor(uData.currentUser.coverBlock);
      setImageUrl('');
    } else {
      setColor('');
      setImageUrl(`${uData.currentUser?.coverBlock}`);
    }
  };
  useEffect(() => {
    coverType();
  }, [uData.currentUser]);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.secure_url;
    } catch (e) {
      console.log(e);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = await uploadToCloudinary(file);
      uData.updateProfileData(uData.currentUser?._id as string, { coverBlock: `${imageUrl}` });
      setImageUrl(imageUrl);
      setColor('');
    }
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setImageUrl('');
    setColor(color);
  };

  return (
    <div className={classes.cover_wrap}>
      {(imageUrl || color) && (
        <div
          className={classes.cover_image}
          style={{
            backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
            backgroundColor: color || undefined
          }}
        />
      )}
      <div className={classes.cover_darkner}></div>
      <div className={classes.cover_imageControl}>
        <label htmlFor="imgInp" className={classes.cover_imageInputLabel}>
          <MdAddAPhoto />
          <input
            id="imgInp"
            className={classes.cover_imageInput}
            type="file"
            accept="image/png, image/jpg, image/gif, image/jpeg"
            onChange={handleFileChange}
          />
        </label>
        <label htmlFor="colorInp" className={classes.cover_imageInputLabel}>
          <BiPaint />
          <input
            id="colorInp"
            className={classes.cover_colorInput}
            type="color"
            value={color}
            onChange={handleColorChange}
            onBlur={() =>
              uData.updateProfileData(uData.currentUser?._id as string, { coverBlock: `${color}` })
            }
          />
        </label>
      </div>
    </div>
  );
};

export default Cover;

'use client';

import ProfileAvatar from '@/app/(contents)/header/components/profile-avatar';
import EditImageButton from './edit-image-button';
import UploadImageForm from './upload-image-form';

const EditImage = ({
  userId,
  imageUrl,
}: {
  userId: string;
  imageUrl?: string;
}) => {
  const inputId = 'upload-image';

  return (
    <div>
      <div className="relative w-fit">
        <ProfileAvatar size="xl" userId={userId} imageUrl={imageUrl} />
        <EditImageButton inputId={inputId} />
      </div>
      <UploadImageForm userId={userId} inputId={inputId} />
    </div>
  );
};

export default EditImage;

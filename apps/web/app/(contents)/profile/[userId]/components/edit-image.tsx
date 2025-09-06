'use client';

import ProfileAvatar from '@/app/(contents)/header/components/profile-avatar';
import EditImageButton from './edit-image-button';
import UploadImageForm from './upload-image-form';

const EditImage = ({ userId }: { userId: string }) => {
  const inputId = 'upload-image';

  return (
    <div className="space-y-4">
      <div className="relative w-fit">
        <ProfileAvatar size="xl" userId={userId} />
        <EditImageButton inputId={inputId} />
      </div>
      <UploadImageForm userId={userId} inputId={inputId} />
    </div>
  );
};

export default EditImage;

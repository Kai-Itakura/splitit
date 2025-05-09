import BackButton from '@/app/components/back-button';
import { client } from '@/openapi.config';
import ProfileAvatar from '../../header/components/profile-avatar';
import { User } from '../../header/types/user.type';

const ProfilePage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = await params;
  const { data } = (await client.GET('/user')) as { data: User };

  return (
    <>
      <div className="flex">
        <ProfileAvatar userId={userId} size="xl" />
        <div>
          <h1>{data.name}</h1>
          <p>{data.id}</p>
          <p>{data.email}</p>
        </div>
      </div>
      <BackButton className="mt-6">戻る</BackButton>
    </>
  );
};

export default ProfilePage;

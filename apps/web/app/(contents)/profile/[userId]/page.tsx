import BackButton from '@/app/components/back-button';
import { client } from '@/openapi.config';
import { User } from '../../header/types/user.type';
import EditImage from './components/edit-image';

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const { data } = (await client.GET('/user/me')) as { data: User };

  return (
    <>
      <BackButton>戻る</BackButton>
      <div className="flex">
        <EditImage userId={userId} imageUrl={data.imageUrl} />
        <div>
          <h1>{data.name}</h1>
          <p>{data.id}</p>
          <p>{data.email}</p>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

import BackButton from '@/app/components/back-button';
import { client } from '@/openapi.config';
import { User } from '../../header/types/user.type';
import EditAccountDialog from './components/edit-account-dialog';
import EditImage from './components/edit-image';
import EditProfile from './components/edit-profile';
import ProfileCard from './components/profile-card';

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
      <div className="space-y-8">
        <div className="flex gap-6 items-end">
          <EditImage userId={userId} imageUrl={data.imageUrl} />
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{data.name}</h2>
            <EditAccountDialog />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            アカウント情報
          </h3>
          <div className="grid gap-4 grid-cols-2">
            <ProfileCard
              label="ユーザーID"
              value={data.id}
              iconVariants="hash"
            />
            <ProfileCard
              label="メールアドレス"
              value={data.email}
              iconVariants="mail"
            />
          </div>
        </div>
        <EditProfile name={data.name} id={data.id} email={data.email} />
      </div>
    </>
  );
};

export default ProfilePage;

import CreateExpenseDialog from '@/app/(contents)/event/[eventId]/components/create-expense-dialog';
import BackButton from '@/app/components/back-button';
import { formatNumber } from '@/app/lib/fomat-number';
import { getCurrencySymbol } from '@/app/lib/get-currency-symbol';
import { client } from '@/openapi.config';
import { components } from '@/openapi/schema';
import { CurrencyType } from '@repo/types';
import { Button } from '@repo/ui/components';
import { EditIcon, Plus, UserPlus2Icon } from '@repo/ui/components/icons';
import NoItems from '../../components/no-items';
import ProfileAvatar from '../../header/components/profile-avatar';
import AddUserDialog from './components/add-user-dialog';
import ExpenseList from './components/expense-list';
import SettlementsDrawer from './components/settlements-drawer';
import UpdateEventDialog from './components/update-event-dialog';

const EventDetail = async ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const { eventId } = await params;
  const { data } = (await client.GET('/event-group/{groupId}', {
    params: { path: { groupId: eventId } },
  })) as {
    data: components['schemas']['EventGroupDetailDto'];
  };

  const currencySymbol = getCurrencySymbol(data.currency as CurrencyType);
  return (
    <>
      <BackButton>一覧へ戻る</BackButton>
      <div className="space-y-2">
        <div className="flex gap-6 items-end">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <div className="shrink-0">
            <UpdateEventDialog
              id={data.id}
              title={data.title}
              currency={data.currency}
            >
              <EditIcon className="hover:text-blue-400" />
            </UpdateEventDialog>
          </div>
          <div className="shrink-0">
            <AddUserDialog eventId={eventId}>
              <UserPlus2Icon className="hover:text-blue-400" />
            </AddUserDialog>
          </div>
        </div>
        <ul className="flex gap-2">
          {data.member.map(({ id, name }, index) => {
            return (
              <li key={id}>
                <ProfileAvatar userId={id} size="sm" />
              </li>
            );
          })}
        </ul>
        <div className="flex items-end justify-between">
          <p>
            合計金額: {currencySymbol}
            {formatNumber(data.totalExpense)}
          </p>
          {data.expenses.length > 0 && (
            <SettlementsDrawer
              settlements={data.settlements}
              member={data.member}
            />
          )}
        </div>
      </div>
      <div className="my-6">
        {data.expenses.length > 0 ? (
          <>
            <ul className="space-y-4">
              {data.expenses.map((expense) => (
                <li key={expense.id}>
                  <ExpenseList
                    eventId={eventId}
                    member={data.member}
                    expense={expense}
                    currencySymbol={currencySymbol}
                  />
                </li>
              ))}
            </ul>
            <CreateExpenseDialog eventId={eventId} members={data.member}>
              <Plus className="fixed bottom-5 right-5 z-50 rounded-full shadow-xl p-1 w-10 h-10 bg-foreground hover:opacity-85 text-background cursor-pointer" />
            </CreateExpenseDialog>
          </>
        ) : (
          <NoItems
            alt="立て替え記録"
            src="/expense.jpg"
            message="立て替え記録がありません。"
          >
            <CreateExpenseDialog eventId={eventId} members={data.member}>
              <Button
                variant="outline"
                className="flex mx-auto mt-6 cursor-pointer"
              >
                立て替え記録作成
              </Button>
            </CreateExpenseDialog>
          </NoItems>
        )}
      </div>
    </>
  );
};

export default EventDetail;

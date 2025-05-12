import CreateExpenseDialog from '@/app/(contents)/event/[eventId]/components/create-expense-dialog';
import BackButton from '@/app/components/back-button';
import { formatNumber } from '@/app/lib/fomat-number';
import { getCurrencySymbol } from '@/app/lib/get-currency-symbol';
import { client } from '@/openapi.config';
import { components } from '@/openapi/schema';
import { CurrencyType } from '@repo/types';
import { Button } from '@repo/ui/components';
import ItemCard from '@repo/ui/components/custom/item-card';
import { Plus, User, WalletIcon } from '@repo/ui/components/icons';
import NoItems from '../../components/no-items';

type EventDetailProps = {
  params: {
    eventId: string;
  };
};

const EventDetail = async ({ params }: EventDetailProps) => {
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
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <p>
          {data.member.map(({ id, name }, index) => {
            const withSeparator = index === 0 ? name : ` | ${name}`;
            return <span key={id}>{withSeparator}</span>;
          })}
        </p>
        <p>
          合計金額: {currencySymbol}
          {data.totalExpense ? formatNumber(data.totalExpense) : 0}
        </p>
      </div>
      <div className="mt-6">
        {data.expenses.length > 0 ? (
          <>
            <ul className="space-y-4">
              {data.expenses.map((expense) => (
                <li key={expense.id}>
                  <ItemCard>
                    <h2 className="font-bold text-lg">{expense.title}</h2>
                    <div className="space-y-1">
                      <p className="text-xl font-bold text-right">
                        {currencySymbol}
                        {formatNumber(expense.amount)}
                      </p>
                      <div className="flex gap-3 text-sm text-slate-500">
                        <p className="flex items-center gap-1">
                          <WalletIcon size={14} />
                          {expense.payer.name}
                        </p>
                        <p className="flex items-center gap-1">
                          <User size={14} />
                          {expense.payees?.length}
                        </p>
                      </div>
                    </div>
                  </ItemCard>
                </li>
              ))}
            </ul>
            <CreateExpenseDialog members={data.member}>
              <Plus className="fixed bottom-5 right-5 z-50 rounded-full shadow-xl p-1 w-10 h-10 bg-foreground hover:opacity-85 text-background cursor-pointer" />
            </CreateExpenseDialog>
          </>
        ) : (
          <NoItems
            alt="立て替え記録"
            src="/expense.jpg"
            message="立て替え記録がありません。"
          >
            <CreateExpenseDialog members={data.member}>
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

import CreateExpenseDialog from '@/app/(contents)/event/[eventId]/components/create-expense-dialog';
import BackButton from '@/app/components/back-button';
import { formatNumber } from '@/app/lib/fomat-number';
import { getCurrencySymbol } from '@/app/lib/get-currency-symbol';
import { client } from '@/openapi.config';
import { components } from '@/openapi/schema';
import { CurrencyType } from '@repo/types';
import { Button } from '@repo/ui/components';
import ItemCard from '@repo/ui/components/custom/item-card';
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
      <div className="mt-6 space-y-2">
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
      <div className="space-y-4 mt-6">
        {data.expenses.length > 0 ? (
          data.expenses.map((expense) => (
            <ItemCard key={expense.id}>
              <h2>{expense.title}</h2>
              <p>
                {currencySymbol}
                {formatNumber(expense.amount)}
              </p>
            </ItemCard>
          ))
        ) : (
          <NoItems
            alt="立て替え記録"
            src="/payments.png"
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
      <div className="flex justify-center items-center mt-6">
        <BackButton>戻る</BackButton>
      </div>
    </>
  );
};

export default EventDetail;

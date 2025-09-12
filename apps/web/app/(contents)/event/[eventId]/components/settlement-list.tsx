import ProfileAvatar from '@/app/(contents)/header/components/profile-avatar';
import { formatNumber } from '@/app/lib/fomat-number';
import ItemCard from '@repo/ui/components/custom/item-card';
import { ArrowBigRightIcon } from '@repo/ui/components/icons';
import { SettlementInfo } from '../types/settlement-info.type';
import NoSettlements from './no-settlements';

const SettlementList = ({
  settlementInfos,
}: {
  settlementInfos: SettlementInfo[];
}) => {
  return (
    <>
      {settlementInfos.length > 0 ? (
        <ul className="space-y-4">
          {settlementInfos.map((settlementInfo) => (
            <li key={settlementInfo.id}>
              <ItemCard className="py-2 shadow-xs">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <ProfileAvatar
                      userId={settlementInfo.payer.id}
                      imageUrl={settlementInfo.payer.imageUrl}
                    />
                    {settlementInfo.payer.name}
                  </div>
                  <ArrowBigRightIcon />
                  <div className="flex flex-col items-center justify-center">
                    <ProfileAvatar
                      userId={settlementInfo.payee.id}
                      imageUrl={settlementInfo.payee.imageUrl}
                    />
                    {settlementInfo.payee.name}
                  </div>
                </div>
                <div className="font-bold text-lg">
                  ￥{formatNumber(settlementInfo.amount)}
                </div>
              </ItemCard>
            </li>
          ))}
        </ul>
      ) : (
        <NoSettlements />
      )}
    </>
  );
};

export default SettlementList;

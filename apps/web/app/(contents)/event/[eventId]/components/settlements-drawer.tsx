import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/components';
import { ReceiptText } from '@repo/ui/components/icons';
import { EventMember } from '../types/event-member';
import { SettlementInfo } from '../types/settlement-info.type';
import { Settlement } from '../types/settlement.type';
import SettlementList from './settlement-list';

const SettlementsDrawer = ({
  settlements,
  member,
}: {
  settlements: Settlement[];
  member: EventMember;
}) => {
  const settlementInfos: SettlementInfo[] = settlements.map((settlement) => {
    const payer = member.find((user) => user.id === settlement.payerId);
    const payee = member.find((user) => user.id === settlement.payeeId);

    return {
      id: settlement.id,
      amount: settlement.amount,
      payer: {
        id: settlement.payerId,
        name: payer?.name ?? '不明なユーザー',
        imageUrl: payer?.profileImage?.url,
      },
      payee: {
        id: settlement.payeeId,
        name: payee?.name ?? '不明なユーザー',
        imageUrl: payee?.profileImage?.url,
      },
    };
  });

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="flex gap-0.5 cursor-pointer hover:text-blue-400">
          <ReceiptText />
          精算
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>精算</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <SettlementList settlementInfos={settlementInfos} />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">閉じる</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SettlementsDrawer;

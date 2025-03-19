import { Balance } from '../model/balance.model';

type Settlement = {
  payerId: string;
  payeeId: string;
  amount: number;
};

export class SettlementCalculatorService {
  /**
   * メンバー毎の収支から精算額を算出
   */
  static calculate(balances: Balance[]): Settlement[] {
    const settlements: Settlement[] = [];

    // 全体の収支が１円以下になるまで計算する
    while (true) {
      // 返済額が大きい順にソート
      const sortedBalances = balances.sort((a, b) => b.amount - a.amount);

      // 最も負債がある人
      const payer = sortedBalances[0];
      // 最も資産がある人
      const payee = sortedBalances[sortedBalances.length - 1];

      const absolutePayerAmount = Math.abs(payer.amount);
      const absolutePayeeAmount = Math.abs(payee.amount);

      // 収支が1円以下になったら終了
      if (absolutePayeeAmount < 1 && absolutePayerAmount < 1) break;

      // 収支の絶対値が低い方の金額で精算
      const amount = Math.min(absolutePayerAmount, absolutePayeeAmount);

      if (amount > 0) {
        const existSettlement = settlements.find((settlement) => {
          return (
            settlement.payerId === payer.memberId &&
            settlement.payeeId === payee.memberId
          );
        });

        // 既存の精算に追加
        if (existSettlement) {
          existSettlement.amount += amount;
        } else {
          console.count('🔥');
          // 新規作成
          settlements.push({
            payerId: payer.memberId,
            payeeId: payee.memberId,
            amount: amount,
          });
        }
      }

      payer.add(-amount);
      payee.add(amount);
    }

    return settlements;
  }
}

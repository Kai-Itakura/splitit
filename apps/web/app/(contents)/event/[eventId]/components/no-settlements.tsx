import Image from 'next/image';

const NoSettlements = () => {
  return (
    <div>
      <Image
        src="/settlement.png"
        alt="精算"
        width={200}
        height={200}
        className="shadow-2xl rounded-full object-contain mx-auto mb-6 size-28 md:size-52"
      />
      <p className="text-center">支払いはありません。</p>
    </div>
  );
};

export default NoSettlements;

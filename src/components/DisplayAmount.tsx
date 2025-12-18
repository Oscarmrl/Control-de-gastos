import { formatCurrency } from "../helpers";

type DisplayAmountProps = {
  label?: string;
  amount: number;
};
export default function DisplayAmount({ label, amount }: DisplayAmountProps) {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      {label && `${label}: `}
      <span className=" font-black text-black">{formatCurrency(amount)}</span>
    </p>
  );
}

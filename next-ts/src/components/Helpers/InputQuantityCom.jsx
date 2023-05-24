import { useState } from 'react';
export default function InputQuantityCom({
  productId,
  incrementQty,
  decrementQty,
  qyt,
}) {
  const [quantity, setQuantity] = useState(qyt);
  const increment = () => {
    setQuantity((prev) => prev + 1);
    incrementQty(productId);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      decrementQty(productId);
    }
  };
  return (
    <div className='flex h-[40px] w-[120px] items-center border border-qgray-border px-[26px]'>
      <div className='flex w-full items-center justify-between'>
        <button
          onClick={decrement}
          type='button'
          className='text-base text-qgray'
        >
          -
        </button>
        <span className='text-qblack'>{quantity}</span>
        <button
          onClick={increment}
          type='button'
          className='text-base text-qgray'
        >
          +
        </button>
      </div>
    </div>
  );
}

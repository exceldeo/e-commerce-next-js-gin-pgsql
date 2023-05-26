import Image from 'next/image';
import DateFormat from '../../../utils/DateFormat';
import { formatCurrency } from '../../../utils/formatMoney.ts';

const OrderPrint = ({ order, handleOnLoad }) => {
  return (
    <div className='invoice mt-8' id='invoice-to-print'>
      <div className='invoice-print'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='items-center justify-between md:flex'>
              <div className='relative min-h-[150px] w-full'>
                <Image
                  src={order.order.kkks_company_logo}
                  alt='Logo KKKS'
                  layout='fill'
                  className='top-0 left-0 h-full w-full rounded-2xl object-contain object-left'
                />
              </div>
              <div>
                <div className='mt-4 text-sm font-light md:mt-0 md:text-right'>
                  Purchase Number
                </div>
                <div className='text-md -mt-1 font-bold lg:text-xl'>
                  {order.order.purchase_code}
                </div>
                <div className='mt-3 flex items-center gap-2 md:justify-end'>
                  <span>Status:</span>
                  <span>
                    <span className='badge badge-info uppercase'>
                      {order.order.status}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <hr className='my-8' />
            <div className='flex grid-cols-7 flex-col-reverse md:grid'>
              <div className='col-span-3'>
                <address>
                  <strong className='text-lg underline'>
                    Vendor Information:
                  </strong>
                  <br />
                  <span className='font-bold'>{order.vendor.shop_name}</span>
                  <br />
                  {order.vendor.address}
                  <br />
                  {order.vendor.zip_code}
                </address>
              </div>
              <div className='col-span-4'>
                <address>
                  <div className='grid h-1 grid-cols-8'>
                    <span className='col-span-3'>Date Issued</span>
                    <span className='col-span-5'>
                      : {DateFormat(order.order.created_at)}
                    </span>
                  </div>
                  <br />
                  <div className='grid h-1 grid-cols-8'>
                    <span className='col-span-3'>Delivery Time</span>
                    <span className='col-span-5'>
                      :{' '}
                      {order.order.delivery_time ? (
                        `${order.order.delivery_time} day(s)`
                      ) : (
                        <span className='italic'>-</span>
                      )}
                    </span>
                  </div>
                  <br />
                  <div className='grid h-1 grid-cols-8'>
                    <span className='col-span-3'>Terms of Sales</span>
                    <span className='col-span-5 uppercase'>
                      : {order.order.term_of_sales}
                    </span>
                  </div>
                  <br />

                  <div className='grid h-1 grid-cols-8'>
                    <span className='col-span-3'>Subject</span>
                    <span className='col-span-5'>: {order.order.subject}</span>
                  </div>
                  <br />
                </address>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <address>
                  <strong className='text-lg underline'>
                    Delivery Information:
                  </strong>
                  <br />
                  <span className='font-bold'>
                    {order.invoice_address.address.name}
                  </span>{' '}
                  <br />
                  {order.invoice_address.address.address_detail}
                  <br />
                  {`${order.invoice_address.village.name}, ${order.invoice_address.district.name}`}
                  <br />
                  {`${order.invoice_address.city.name}, ${order.invoice_address.province.name} ${order.invoice_address.address.zip_code}`}
                  <br />
                </address>
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-md-12'>
                <div className='section-title'>Order Summary</div>
                <div className='table-responsive'>
                  <table className='table-striped table-hover table-md table'>
                    <tr>
                      <th style={{ width: '5%' }}>#</th>
                      <th style={{ width: '45%' }}>Product / Note</th>
                      <th style={{ width: '10%' }} className='text-center'>
                        Unit Price
                      </th>
                      <th style={{ width: '10%' }} className='text-center'>
                        Quantity
                      </th>
                      <th style={{ width: '10%' }} className='text-right'>
                        Total
                      </th>
                    </tr>
                    {order.order_products.map((product, idx) => {
                      return (
                        <tr key={`product-${product.id}`}>
                          <td>{idx + 1}</td>
                          <td className='flex'>
                            <Image
                              src={product.thumbnail}
                              width={50}
                              height={50}
                              alt={product.title}
                              onLoad={() => {
                                if (handleOnLoad) {
                                  handleOnLoad(true);
                                }
                              }}
                            />
                            <div>
                              {/* TODO: Open modal when clicked on product */}
                              <a href=''>{product.title}</a>
                              <p className='text-xs'>{product.notes}</p>
                            </div>
                          </td>
                          <td className='text-center'>
                            Rp{formatCurrency(product.price)}
                          </td>
                          <td className='text-center'>{product.quantity}</td>
                          <td className='text-right'>
                            Rp{formatCurrency(product.price * product.quantity)}
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-lg-6 order-status'></div>
              <div className='col-lg-6 text-right'>
                <div className='invoice-detail-item flex items-baseline justify-end gap-2'>
                  <div className='invoice-detail-name text-xs uppercase'>
                    Subtotal
                  </div>
                  <div>
                    Rp
                    {formatCurrency(order.order.total_item_price)}
                  </div>
                </div>
                {order.order_added_prices.map((addition) => {
                  return (
                    <div
                      className='invoice-detail-item flex items-baseline justify-end gap-2'
                      key={`added-price-${addition.id}`}
                    >
                      <span className='invoice-detail-name text-xs uppercase'>
                        {addition.description}
                      </span>
                      <span>Rp{formatCurrency(addition.price)}</span>
                    </div>
                  );
                })}

                <hr className='mt-2 mb-2' />
                <div className='invoice-detail-item'>
                  <div className='invoice-detail-value invoice-detail-value-lg'>
                    Grand Total: Rp
                    {formatCurrency(
                      order.order.total_item_price +
                        order.order_added_prices.reduce(
                          (p, n) => p + n.price,
                          0
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPrint;

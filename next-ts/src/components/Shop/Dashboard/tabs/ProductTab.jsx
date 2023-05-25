import { useEffect, useState } from 'react';

import * as Yup from 'yup';
import {
  useAddProduct,
  useDeleteProduct,
  useGetAllProducts,
  useUpdateProduct,
} from '../../../../api/seller/product';
import { useFormik } from 'formik';
import InputCom from '../../../Helpers/InputCom';
import LoaderStyleOne from '../../../Helpers/Loaders/LoaderStyleOne';
import { toast } from 'react-toastify';

export default function ProductTab() {
  const [newProduct, setNewProduct] = useState(false);
  const [edit, setEdit] = useState(false);

  const getProduct = useGetAllProducts();

  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();

  const productForm = useFormik({
    initialValues: {
      id: '',
      category_id: '',
      title: '',
      description: '',
      price: '',
      stock: '',
      thumbnail: '',
      listing_status: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      category_id: Yup.string().required('Required'),
      title: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      price: Yup.string().required('Required'),
      stock: Yup.string().required('Required'),
      thumbnail: Yup.string().required('Required'),
      listing_status: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      edit ? updateProduct.mutate(values) : addProduct.mutate(values);
    },
  });

  useEffect(() => {
    if (addProduct.isSuccess) {
      productForm.resetForm();
      toast.success(`Product added successfully`);
      setNewProduct(!newProduct);
    }
  }, [addProduct.isSuccess, productForm, newProduct]);

  if (addProduct.isError) {
    toast.error(
      addProduct?.Product?.error?.response?.data?.message ||
        addProduct?.Product?.error?.message ||
        addProduct?.Product?.error?.response?.data?.message ||
        addProduct?.Product?.error?.message
    );
  }

  const handleEdit = (item) => {
    setEdit(true);
    setNewProduct(true);
    productForm.setValues({
      id: item.id,
      category_id: item.category_id,
      title: item.title,
      description: item.description,
      price: item.price,
      stock: item.stock,
      thumbnail: item.thumbnail,
      listing_status: item.listing_status,
    });
  };

  useEffect(() => {
    if (updateProduct.isSuccess) {
      productForm.resetForm();
      setNewProduct(!newProduct);
      setEdit(false);
      toast.success(`Product updated successfully`);
    }
  }, [updateProduct.isSuccess]);

  if (updateProduct.isError) {
    toast.error(
      updateProduct?.Product?.error?.response?.data?.message ||
        updateProduct?.Product?.error?.message ||
        updateProduct?.Product?.error?.response?.data?.message ||
        updateProduct?.Product?.error?.message
    );
  }

  const deleteProduct = useDeleteProduct();

  const handleDelete = (id) => {
    deleteProduct.mutate(id);
  };

  return (
    <>
      <div className='mt-4 mb-5 h-[50px] w-[180px]'>
        <button
          type='button'
          className='yellow-btn rounded'
          onClick={() => {
            setNewProduct(!newProduct);
            setEdit(false);
          }}
        >
          <div className='w-full text-sm font-semibold'>
            {newProduct ? 'Cancel' : 'Add New Product'}
          </div>
        </button>
      </div>
      {newProduct ? (
        <>
          <div data-aos='zoom-in' className='w-full'>
            <div className='flex items-center justify-between'>
              <h1 className='mb-5 text-xl font-medium text-qblack sm:text-2xl'>
                {edit ? 'Edit Product' : 'Add New Product'}
              </h1>
              <span className='cursor-pointer text-qyellow'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
            </div>
            <div className='form-area'>
              <form onSubmit={productForm.handleSubmit}>
                <div className='mb-6'>
                  <div className='items-center sm:flex sm:space-x-5'>
                    <div className='mb-5 w-full  sm:mb-0'>
                      <InputCom
                        label={'category_id *'}
                        placeholder={'category_id'}
                        inputClasses='w-full h-[50px]'
                        name='category_id'
                        value={productForm.values.category_id}
                        inputHandler={productForm.handleChange}
                        error={
                          productForm.values.category_id !== '' &&
                          productForm.errors.category_id !== undefined
                        }
                        required
                      />
                    </div>
                  </div>
                  {productForm.values.category_id !== '' &&
                  productForm.errors.category_id ? (
                    <span classcategory_id='mt-1 text-sm text-qred'>
                      {productForm.errors.category_id}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <div className='mb-6'>
                  <div className='items-center sm:flex sm:space-x-5'>
                    <div className='mb-5 w-full  sm:mb-0'>
                      <InputCom
                        label={'title *'}
                        placeholder={'title'}
                        inputClasses='w-full h-[50px]'
                        name='title'
                        value={productForm.values.title}
                        inputHandler={productForm.handleChange}
                        error={
                          productForm.values.title !== '' &&
                          productForm.errors.title !== undefined
                        }
                        required
                      />
                    </div>
                  </div>
                  {productForm.values.title !== '' &&
                  productForm.errors.title ? (
                    <span classcategory_id='mt-1 text-sm text-qred'>
                      {productForm.errors.title}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <div className='mb-6'>
                  <div className='items-center sm:flex sm:space-x-5'>
                    <div className='mb-5 w-full  sm:mb-0'>
                      <InputCom
                        label={'description *'}
                        placeholder={'description'}
                        inputClasses='w-full h-[50px]'
                        name='description'
                        value={productForm.values.description}
                        inputHandler={productForm.handleChange}
                        error={
                          productForm.values.description !== '' &&
                          productForm.errors.description !== undefined
                        }
                        required
                      />
                    </div>
                  </div>
                  {productForm.values.description !== '' &&
                  productForm.errors.description ? (
                    <span classcategory_id='mt-1 text-sm text-qred'>
                      {productForm.errors.description}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <div className='mb-6'>
                  <div className='items-center sm:flex sm:space-x-5'>
                    <div className='mb-5 w-full  sm:mb-0'>
                      <InputCom
                        label={'price *'}
                        placeholder={'price'}
                        inputClasses='w-full h-[50px]'
                        name='price'
                        value={productForm.values.price}
                        inputHandler={productForm.handleChange}
                        error={
                          productForm.values.price !== '' &&
                          productForm.errors.price !== undefined
                        }
                        required
                      />
                    </div>
                  </div>
                  {productForm.values.price !== '' &&
                  productForm.errors.price ? (
                    <span classcategory_id='mt-1 text-sm text-qred'>
                      {productForm.errors.price}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <div className='mb-6'>
                  <div className='items-center sm:flex sm:space-x-5'>
                    <div className='mb-5 w-full  sm:mb-0'>
                      <InputCom
                        label={'thumbnail url *'}
                        placeholder={'thumbnail url'}
                        inputClasses='w-full h-[50px]'
                        name='thumbnail'
                        value={productForm.values.thumbnail}
                        inputHandler={productForm.handleChange}
                        error={
                          productForm.values.thumbnail !== '' &&
                          productForm.errors.thumbnail !== undefined
                        }
                        required
                      />
                    </div>
                  </div>
                  {productForm.values.thumbnail !== '' &&
                  productForm.errors.thumbnail ? (
                    <span classcategory_id='mt-1 text-sm text-qred'>
                      {productForm.errors.thumbnail}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <div className='mb-6'>
                  <div className='items-center sm:flex sm:space-x-5'>
                    <div className='mb-5 w-full  sm:mb-0'>
                      <InputCom
                        label={'stock *'}
                        placeholder={'stock'}
                        inputClasses='w-full h-[50px]'
                        name='stock'
                        value={productForm.values.stock}
                        inputHandler={productForm.handleChange}
                        error={
                          productForm.values.stock !== '' &&
                          productForm.errors.stock !== undefined
                        }
                        required
                      />
                    </div>
                  </div>
                  {productForm.values.stock !== '' &&
                  productForm.errors.stock ? (
                    <span classcategory_id='mt-1 text-sm text-qred'>
                      {productForm.errors.stock}
                    </span>
                  ) : (
                    ''
                  )}
                </div>

                <button type='submit' className='h-[50px] w-full'>
                  <div className='yellow-btn'>
                    <span className='text-sm'>Save Product</span>
                    {addProduct.isLoading && (
                      <span
                        className='w-5 '
                        style={{ transform: 'scale(0.3)' }}
                      >
                        <LoaderStyleOne />
                      </span>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <table className='w-full'>
            <thead>
              <tr className='text-left'>
                <th className='px-4 py-2'>Product Name</th>
                <th className='px-4 py-2'>Price</th>
                <th className='px-4 py-2'>Stock</th>
                <th className='px-4 py-2'>Status</th>
                <th className='px-4 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {getProduct &&
                getProduct.data?.data?.map((item, index) => (
                  <tr key={index}>
                    {console.log(item)}
                    <td className='border px-4 py-2'>{item.title}</td>
                    <td className='border px-4 py-2'>{item.price}</td>
                    <td className='border px-4 py-2'>{item.stock}</td>
                    <td className='border px-4 py-2'>
                      {item.listing_status ? 'Ditampilkan' : 'Disembunyikan'}
                    </td>
                    <td className='border px-4 py-2'>
                      <button
                        type='button'
                        className='yellow-btn rounded'
                        onClick={() => handleEdit(item)}
                      >
                        <div className='w-full text-sm font-semibold'>Edit</div>
                      </button>
                      <button
                        type='button'
                        className='w-full rounded bg-red-600 text-white'
                        onClick={() => handleDelete(item.id)}
                      >
                        <div className='w-full text-sm font-semibold'>
                          Delete
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

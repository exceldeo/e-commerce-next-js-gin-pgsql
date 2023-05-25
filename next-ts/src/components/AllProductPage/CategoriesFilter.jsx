import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import ServeLangItem from '../Helpers/ServeLangItem';
export default function CategoryFilter({
  categories,
  filterCategory,
  setFilterCategory,
}) {
  const [showAllCategory, setShowAllCategory] = useState(false);
  //   const addSelectedCategory = (c) => {
  //     setFilterCategory(c);
  //   };

  //   const isSelected = (c) => filterCategory == c;

  const [selectedCategory, setSelectedCategory] = useState({
    category: '',
    subCategory: '',
  });

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <div className='filter-subject-item mt-10 border-b border-qgray-border pb-10'>
      <div className='subject-title mb-[30px]'>
        <h1 className='font-500 text-base text-black'>
          {ServeLangItem()?.Categories}
        </h1>
      </div>
      <div className='filter-items'>
        <Accordion.Root
          className='AccordionRoot'
          type='single'
          defaultValue=''
          collapsible
        >
          {categories &&
            categories.length > 0 &&
            categories.slice(0, showAllCategory ? 10 : 4).map((key) => {
              return (
                <Accordion.Item value={key} key={key}>
                  <AccordionTrigger className='my-1 flex cursor-pointer flex-col text-sm'>
                    <div className='flex flex-row justify-between rounded hover:bg-gray-200'>
                      <div
                        onClick={() => {
                          if (filterCategory === key.slug) {
                            setFilterCategory('');
                            return;
                          }
                          setFilterCategory(key.slug);
                        }}
                        className='bg:white w-full overflow-hidden text-ellipsis rounded-lg py-1 text-left'
                      >
                        <span
                          className={`
                    ${filterCategory === key.slug ? 'font-bold' : ''}
                    `}
                        >
                          {key.name}
                        </span>
                      </div>
                      {key.child_category.length > 0 ? (
                        <button
                          onClick={() => {
                            if (selectedCategory.category === key.slug) {
                              setSelectedCategory({
                                category: '',
                                subCategory: '',
                              });
                            } else {
                              setSelectedCategory({
                                category: key.slug,
                                subCategory: '',
                              });
                            }
                          }}
                          className='flex items-center justify-between  py-0 text-left text-sm font-medium text-purple-900 focus:outline-none focus-visible:ring '
                        >
                          {selectedCategory.category === key.slug ? (
                            <IoIosArrowUp className='text-xl' />
                          ) : (
                            <IoIosArrowDown className='text-xl' />
                          )}
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Accordion.Root
                      className='AccordionRoot'
                      type='single'
                      defaultValue=''
                      collapsible
                    >
                      {key.child_category.map((subKey) => {
                        return (
                          <Accordion.Item value={subKey} key={subKey}>
                            <AccordionTrigger className='my-1 flex cursor-pointer flex-col text-sm'>
                              <div className='flex flex-row justify-between rounded hover:bg-gray-200'>
                                <div
                                  onClick={() => {
                                    if (filterCategory === subKey.slug) {
                                      setFilterCategory('');
                                      return;
                                    }
                                    setFilterCategory(subKey.slug);
                                  }}
                                  className='w-full overflow-hidden  text-ellipsis rounded-lg py-1 pl-4 text-left'
                                >
                                  <span
                                    className={`text-primary
                    ${filterCategory === subKey.slug ? 'font-bold' : ''}
                    `}
                                  >
                                    {subKey.name}
                                  </span>
                                </div>
                              </div>
                            </AccordionTrigger>
                          </Accordion.Item>
                        );
                      })}
                    </Accordion.Root>
                  </AccordionContent>
                </Accordion.Item>
              );
            })}
        </Accordion.Root>
        {categories.length > 4 && (
          <div className='flex justify-center'>
            <button
              onClick={() => setShowAllCategory(!showAllCategory)}
              className='text-qgray-500 text-sm font-medium focus:outline-none focus-visible:ring'
            >
              {showAllCategory ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import * as Accordion from '@radix-ui/react-accordion';

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className={className}>
      <Accordion.Trigger {...props} ref={forwardedRef}>
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content {...props} ref={forwardedRef}>
      <div className='AccordionContentText'>{children}</div>
    </Accordion.Content>
  )
);

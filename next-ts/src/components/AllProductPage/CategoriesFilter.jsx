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
    childCategory: '',
  });

  useEffect(() => {
    Object.keys(categories).map((key) => {
      if (filterCategory === categories[key].id) {
        setSelectedCategory({
          category: categories[key].slug,
          subCategory: '',
          childCategory: '',
        });
      }
      Object.keys(categories[key].sub_categories).map((subKey) => {
        if (
          filterCategory === categories[key].sub_categories[subKey].id &&
          selectedCategory.category === categories[key].slug
        ) {
          setSelectedCategory({
            category: categories[key].slug,
            subCategory: categories[key].sub_categories[subKey].slug,
            childCategory: '',
          });
        }
        Object.keys(
          categories[key].sub_categories[subKey].child_categories
        ).map((childKey) => {
          if (
            filterCategory ===
              categories[key].sub_categories[subKey].child_categories[childKey]
                .id &&
            selectedCategory.subCategory ===
              categories[key].sub_categories[subKey].slug
          ) {
            setSelectedCategory({
              category: categories[key].slug,
              subCategory: categories[key].sub_categories[subKey].slug,
              childCategory:
                categories[key].sub_categories[subKey].child_categories[
                  childKey
                ].slug,
            });
          }
        });
      });
    });
  }, []);

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
          {Object.keys(categories)
            .slice(0, showAllCategory ? 10 : 4)
            .map((key) => {
              return (
                <Accordion.Item value={key} key={key}>
                  <AccordionTrigger className='my-1 flex cursor-pointer flex-col text-sm'>
                    <div className='flex flex-row justify-between rounded hover:bg-gray-200'>
                      <div
                        onClick={() => {
                          if (filterCategory === categories[key].id) {
                            setFilterCategory('');
                            return;
                          }
                          setFilterCategory(categories[key].id);
                        }}
                        className='bg:white w-full overflow-hidden text-ellipsis rounded-lg py-1 text-left'
                      >
                        <span
                          className={`
                    ${filterCategory === categories[key].id ? 'font-bold' : ''}
                    `}
                        >
                          {categories[key].name}
                        </span>
                      </div>
                      {Object.keys(categories[key].sub_categories).length >
                      0 ? (
                        <button
                          onClick={() => {
                            if (
                              selectedCategory.category === categories[key].slug
                            ) {
                              setSelectedCategory({
                                category: '',
                                subCategory: '',
                                childCategory: '',
                              });
                            } else {
                              setSelectedCategory({
                                category: categories[key].slug,
                                subCategory: '',
                                childCategory: '',
                              });
                            }
                          }}
                          className='flex items-center justify-between  py-0 text-left text-sm font-medium text-purple-900 focus:outline-none focus-visible:ring '
                        >
                          {selectedCategory.category ===
                          categories[key].slug ? (
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
                      {Object.keys(categories[key].sub_categories).map(
                        (subKey) => {
                          return (
                            <Accordion.Item value={subKey} key={subKey}>
                              <AccordionTrigger className='my-1 flex cursor-pointer flex-col text-sm'>
                                <div className='flex flex-row justify-between rounded hover:bg-gray-200'>
                                  <div
                                    onClick={() => {
                                      if (
                                        filterCategory ===
                                        categories[key].sub_categories[subKey]
                                          .id
                                      ) {
                                        setFilterCategory('');
                                        return;
                                      }
                                      setFilterCategory(
                                        categories[key].sub_categories[subKey]
                                          .id
                                      );
                                    }}
                                    className='w-full overflow-hidden  text-ellipsis rounded-lg py-1 pl-4 text-left'
                                  >
                                    <span
                                      className={`text-primary
                    ${
                      filterCategory ===
                      categories[key].sub_categories[subKey].id
                        ? 'font-bold'
                        : ''
                    }
                    `}
                                    >
                                      {
                                        categories[key].sub_categories[subKey]
                                          .name
                                      }
                                    </span>
                                  </div>
                                  {Object.keys(
                                    categories[key].sub_categories[subKey]
                                      .child_categories
                                  ).length > 0 ? (
                                    <button
                                      onClick={() => {
                                        if (
                                          selectedCategory.subCategory ===
                                          categories[key].sub_categories[subKey]
                                            .slug
                                        ) {
                                          setSelectedCategory({
                                            category: categories[key].slug,
                                            subCategory: '',
                                            childCategory: '',
                                          });
                                        } else {
                                          setSelectedCategory({
                                            category: categories[key].slug,
                                            subCategory:
                                              categories[key].sub_categories[
                                                subKey
                                              ].slug,
                                            childCategory: '',
                                          });
                                        }
                                      }}
                                      className='flex items-center justify-between  py-0 text-left text-sm font-medium text-purple-900 focus:outline-none focus-visible:ring '
                                    >
                                      {selectedCategory.subCategory ===
                                      categories[key].sub_categories[subKey]
                                        .slug ? (
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
                                  {Object.keys(
                                    categories[key].sub_categories[subKey]
                                      .child_categories
                                  ).map((childKey) => {
                                    return (
                                      <div
                                        onClick={() => {
                                          if (
                                            filterCategory ===
                                            categories[key].sub_categories[
                                              subKey
                                            ].child_categories[childKey].id
                                          ) {
                                            setFilterCategory('');
                                            return;
                                          }
                                          setFilterCategory(
                                            categories[key].sub_categories[
                                              subKey
                                            ].child_categories[childKey].id
                                          );
                                        }}
                                        className={`my-1 flex cursor-pointer flex-col overflow-hidden text-ellipsis pl-8 text-sm
                    ${
                      filterCategory ===
                      categories[key].sub_categories[subKey].child_categories[
                        childKey
                      ].id
                        ? 'font-bold'
                        : ''
                    }
                    `}
                                        key={childKey}
                                      >
                                        <div className='flex flex-row justify-between rounded hover:bg-gray-200'>
                                          <div className='w-full rounded-lg  py-1 '>
                                            <span
                                              className={`text-primary
                    ${
                      selectedCategory.childCategory ===
                      categories[key].sub_categories[subKey].child_categories[
                        childKey
                      ].slug
                        ? 'font-bold'
                        : ''
                    }
                    `}
                                            >
                                              {
                                                categories[key].sub_categories[
                                                  subKey
                                                ].child_categories[childKey]
                                                  .name
                                              }
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </Accordion.Root>
                              </AccordionContent>
                            </Accordion.Item>
                          );
                        }
                      )}
                    </Accordion.Root>
                  </AccordionContent>
                </Accordion.Item>
              );
            })}
        </Accordion.Root>
        {Object.keys(categories).length > 4 && (
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

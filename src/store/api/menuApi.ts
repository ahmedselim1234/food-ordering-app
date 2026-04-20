import { baseApi } from './baseApi'
import type { FoodItem, Category } from '@/types'
import { menuItems } from '@/data/menuData'
import { categories } from '@/data/categoriesData'

export const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      queryFn: () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve({ data: categories }), 300)
        })
      },
      providesTags: ['Menu'],
    }),
    getFoodItems: builder.query<FoodItem[], { category?: string; search?: string }>({
      queryFn: ({ category, search }) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            let items = [...menuItems]
            if (category && category !== 'all') {
              items = items.filter(item => item.category === category)
            }
            if (search) {
              const q = search.toLowerCase()
              items = items.filter(item =>
                item.name.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q)
              )
            }
            resolve({ data: items })
          }, 400)
        })
      },
      providesTags: ['Menu'],
    }),
  }),
})

export const { useGetCategoriesQuery, useGetFoodItemsQuery } = menuApi

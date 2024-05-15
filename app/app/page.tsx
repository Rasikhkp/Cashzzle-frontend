"use client"

import MonthNavigation from "./_components/month-navigation";
import TransactonList from "./_components/transaction-list";
import WebsiteName from "./_components/website-name";
import Overview from "./_components/overview";
import CreateTransaction from "./_components/create-transaction";
import Categories from "./_components/categories";
import UserProfile from "./_components/user-profile";
import Statistics from "./_components/statistics";
import axios from "axios";
import { useEffect } from "react";
import { getFromLS } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { fillTransactions } from "@/redux/features/transactions-slice";
import { fillCategories } from "@/redux/features/categories-slice";
import { fillSpendingLimits } from "@/redux/features/spending-limit-slice";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const getTransactionsCategoriesSpendingLimits = async (urls: string[]) => {
  try {
    const axiosPromises = urls.map(url => axios.get(url, { withCredentials: true }));

    const responses = await Promise.all(axiosPromises);

    return responses
  } catch (error) {
    console.error('Error occurred during parallel requests:', error);
  }
}

const fillTransactionsCategoriesSpendingLimits = async (urls: string[], data: object[]) => {
  try {
    const axiosPromises = urls.map((url, i) => axios.post(url, data[i], { withCredentials: true }));

    const responses = await Promise.all(axiosPromises);

    return responses
  } catch (error) {
    console.error('Error occurred during parallel requests:', error);
  }
}


const App = () => {
  const dispatch = useDispatch()
  const { user } = useKindeBrowserClient()

  useEffect(() => {
    const fetchData = async () => {

      if (!user) {
        const transactionsFromLS = getFromLS("transactions")
        const categoriesFromLS = getFromLS("categories")
        const spendingLimitsFromLS = getFromLS("spending-limits")

        dispatch(fillTransactions(transactionsFromLS))
        dispatch(fillCategories(categoriesFromLS))
        dispatch(fillSpendingLimits(spendingLimitsFromLS))

      } else {

        try {
          const urls = [
            '/api/transactions?userId=' + user.id,
            '/api/categories?userId=' + user.id,
            '/api/spendingLimit?userId=' + user.id
          ]

          const responses = await getTransactionsCategoriesSpendingLimits(urls) as any
          let transactionsData = responses[0].data.message
          let categoriesData = responses[1].data.message
          let spendingLimitsData = responses[2].data.message

          if (!transactionsData[0] && !categoriesData[0] && !spendingLimitsData[0]) {

            const urls = [
              '/api/transactions/fill',
              '/api/categories/fill',
              '/api/spendingLimit/fill',
            ]

            const transactions = getFromLS("transactions").map((t: any) => ({ ...t, userId: user.id }))
            const categories = getFromLS("categories").map((t: any) => ({ ...t, userId: user.id }))
            const spendingLimits = getFromLS("spending-limits").map((s: any) => ({ ...s, userId: user.id }))

            const data = [
              transactions,
              categories,
              spendingLimits
            ]
            const responses = await fillTransactionsCategoriesSpendingLimits(urls, data) as any

            transactionsData = responses[0].data.message
            categoriesData = responses[1].data.message
            spendingLimitsData = responses[2].data.message
          }

          dispatch(fillTransactions(transactionsData))
          dispatch(fillCategories(categoriesData))
          dispatch(fillSpendingLimits(spendingLimitsData))
        } catch (error: any) {
          console.log(error.response)
        }
      }
    };

    fetchData();
  }, [user])


  return (
    <div className="max-w-screen-xl overflow-y-scroll h-screen px-10 gap-10 grid grid-cols-3 mx-auto">
      <div className="relative">
        <WebsiteName />
        <Overview />
        <CreateTransaction />
        <Categories />
      </div>
      <div className="relative">
        <div className="fixed xl:w-[calc(378px)] w-[calc(33%-48px)]">
          <MonthNavigation />
          <TransactonList />
        </div>
      </div>
      <div className="relative">
        <div className="z-10 h-[68.5px] flex items-center justify-end font-bold text-3xl fixed xl:w-[calc(378px)] w-[calc(33%-48px)] fixed bg-white/30 backdrop-blur-sm pr-3">
          <UserProfile />
        </div>
        <Statistics />
      </div>
    </div>
  );
}

export default App;

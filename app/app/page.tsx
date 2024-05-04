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
import { getFromLS, setLS } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { fillTransactions } from "@/redux/features/transactions-slice";
import { fillCategories } from "@/redux/features/categories-slice";
import { setUser } from "@/redux/features/user-slice";
import { fillSpendingLimits } from "@/redux/features/spending-limit-slice";

const getUser = async () => {
  try {
    const response = await axios.get("http://localhost:1234/api/users/authenticated-user", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const refreshToken = async () => {
  try {
    const response = await axios.get("http://localhost:1234/api/refresh-token", {
      withCredentials: true,
    });

    return response.data.success;
  } catch (error) {
    throw error;
  }
};

const getUserOrRefreshToken = async () => {
  try {
    const userData = await getUser();
    return userData;
  } catch (error: any) {

    if (error.response && error.response.data.message === 'jwt expired') {
      const tokenRefreshed = await refreshToken();
      if (tokenRefreshed) {
        const refreshedUserData = await getUser();
        return refreshedUserData;
      }
    }
    throw error;
  }
};

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
  console.log("data", data)
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

  useEffect(() => {
    const fetchDataAndSetUser = async () => {
      let transactionsFromLS = getFromLS("transactions")
      let categoriesFromLS = getFromLS("categories")
      let spendingLimitsFromLS = getFromLS("spending-limits")

      try {
        const userData = await getUserOrRefreshToken();
        dispatch(setUser(userData.message))
        setLS("active-user", userData.message)
        console.log('userData', userData)

        const urls = [
          'http://localhost:1234/api/transactions?userId=' + userData.message.id,
          'http://localhost:1234/api/categories',
          'http://localhost:1234/api/spendingLimits'
        ]

        const responses = await getTransactionsCategoriesSpendingLimits(urls) as any
        let transactionsData = responses[0].data.message
        let categoriesData = responses[1].data.message
        let spendingLimitsData = responses[2].data.message

        if (!transactionsData[0] && !categoriesData[0]) {

          const urls = [
            'http://localhost:1234/api/transactions/fill',
            'http://localhost:1234/api/categories/fill',
            'http://localhost:1234/api/spendingLimits/fill',
          ]

          transactionsFromLS = transactionsFromLS.map((t: any) => ({ ...t, userId: userData.message.id }))
          spendingLimitsFromLS = spendingLimitsFromLS.map((s: any) => ({ ...s, userId: userData.message.id }))

          const data = [
            transactionsFromLS,
            categoriesFromLS,
            spendingLimitsFromLS
          ]

          const responses = await fillTransactionsCategoriesSpendingLimits(urls, data) as any
          console.log('filled responses', responses)

          transactionsData = responses[0].data.message
          categoriesData = responses[1].data.message
          spendingLimitsData = responses[2].data.message
        }

        dispatch(fillTransactions(transactionsData))
        dispatch(fillCategories(categoriesData))
        dispatch(fillSpendingLimits(spendingLimitsData))
      } catch (error: any) {
        dispatch(setUser(null))
        dispatch(fillTransactions(transactionsFromLS))
        dispatch(fillCategories(categoriesFromLS))
        dispatch(fillSpendingLimits(spendingLimitsFromLS))
      }
    };

    fetchDataAndSetUser();
  }, [])


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

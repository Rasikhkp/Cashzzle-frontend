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
import { useEffect, useState } from "react";
import { getFromLS } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { fillTransactions } from "@/redux/features/transactions-slice";
import { fillCategories } from "@/redux/features/categories-slice";
import { setUser } from "@/redux/features/user-slice";

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

const getTransactionsAndCategories = async (urls: string[]) => {
  try {
    const axiosPromises = urls.map(url => axios.get(url, { withCredentials: true }));

    const responses = await Promise.all(axiosPromises);

    return responses
  } catch (error) {
    console.error('Error occurred during parallel requests:', error);
  }
}

const fillTransactionsAndCategories = async (urls: string[], data: object[]) => {
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

      try {
        const userData = await getUserOrRefreshToken();
        dispatch(setUser(userData.message))
        console.log('userData', userData)

        const urls = [
          'http://localhost:1234/api/transactions?userId=' + userData.message.id,
          'http://localhost:1234/api/categories'
        ]

        const responses = await getTransactionsAndCategories(urls) as any
        let transactionsData = responses[0].data.message
        let categoriesData = responses[1].data.message

        if (!transactionsData[0] && !categoriesData[0]) {

          const urls = [
            'http://localhost:1234/api/transactions/fill',
            'http://localhost:1234/api/categories/fill',
          ]

          transactionsFromLS = transactionsFromLS.map((t: any) => ({ ...t, userId: userData.message.id }))

          const data = [
            transactionsFromLS,
            categoriesFromLS
          ]

          const responses = await fillTransactionsAndCategories(urls, data) as any
          console.log('filled responses', responses)

          transactionsData = responses[0].data.message
          categoriesData = responses[1].data.message
        }

        dispatch(fillTransactions(transactionsData))
        dispatch(fillCategories(categoriesData))
      } catch (error: any) {
        if (error.response.data === 'Unauthorized') {
          dispatch(fillTransactions(transactionsFromLS))
          dispatch(fillCategories(categoriesFromLS))
        }

        console.log('Error fetching user data:', error);
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
        <UserProfile />
        <Statistics />
      </div>
    </div>
  );
}

export default App;

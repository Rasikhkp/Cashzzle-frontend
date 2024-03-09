import MonthNavigation from "./_components/month-navigation";
import TransactonList from "./_components/transaction-list";
import WebsiteName from "./_components/website-name";
import Overview from "./_components/overview";
import CreateTransaction from "./_components/create-transaction";
import Categories from "./_components/categories";

export default function Home() {
    return (
        <div className="max-w-screen-xl h-screen px-10 gap-10 grid grid-cols-3 mx-auto">
            <div>
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
            <div>lalaal</div>
        </div>
    );
}

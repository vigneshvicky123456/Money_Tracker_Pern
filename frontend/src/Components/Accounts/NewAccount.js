import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { getSelectedCurrency } from "../../features/currenciesSlice";
import { addAccount } from "../../features/accountsSlice";

const NewAccount = ({ newModalOpen, onClose }) => {
  const dispatch = useDispatch();
  const currencyModel1 = useSelector((state) => state.currency.currencyModel1);

  const newAccountState = {
    name: "",
    group: "",
    balance: "",
    accountCurrency: "",
    accountCheck: true,
    accountCode: "",
    dashboard: true,
  }

  const [newAccounts, setNewAccounts] = useState(newAccountState);
  const [showError, setShowError] = useState(false);

  const groupOptions = [
    { id: 1, label: "Cash", value: "Cash" },
    { id: 2, label: "Bank Account", value: "Bank Account" },
    { id: 3, label: "Deposit", value: "Deposit" },
    { id: 4, label: "Credit", value: "Credit" },
    { id: 5, label: "Asset", value: "Asset" },
  ];

  useEffect(() => {
    dispatch(getSelectedCurrency());
    if (currencyModel1) {
      setNewAccounts({
        accountCurrency: currencyModel1.currencyModel?.currency_name || "",
        accountCode:  currencyModel1.currencyModel?.currency_code || "",
      });
    }
  }, [dispatch, currencyModel1?.currencyModel?.id]);

  if (!newModalOpen) return null;

  const closeNewModal = () => {
    onClose(false);
  };

  const handleAccountChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAccounts((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveAccount = (e) => {
    e.preventDefault();
    if (!newAccounts.name?.trim()) { 
      setShowError(true);
    } else {
      setShowError(false);
      dispatch(addAccount({
        account_name: newAccounts.name,
        account_type: newAccounts.group,
        account_balance: newAccounts.balance,
        account_currency_code: newAccounts.accountCode,
        account_currency_name: newAccounts.accountCurrency,
        account_currency_name_check: newAccounts.accountCheck,
        show_on_dashboard: newAccounts.dashboard,
      }));
      setNewAccounts(newAccountState);
      onClose(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-50">
      <div className="bg-white w-full max-w-[56%] h-[310px] rounded-[5px] shadow-lg">
        <div className="flex justify-between items-center px-5 py-[13px] border-b ">
          <h2 className="text-lg"><FontAwesomeIcon icon={faFile} className="text-3xl text-gray-600 pr-2" /> New Account</h2>
          <button
            onClick={closeNewModal}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="flex p-5">
          <div className="relative">
            <form>
              <label
                htmlFor="currency"
                className="text-sm font-medium text-black-400 mb-[13px]"
              >
                Name
              </label>
              <span className="text-red-500">*</span>
              <input
                type="text"
                name="name"
                onChange={handleAccountChange}
                value={newAccounts.name}
                placeholder="Account name"
                className="block border rounded-[5px] p-[9px] w-[375px] text-sm focus:border-blue-400 focus:outline-none"
                required
              />
              {showError && (
                <span className="absolute top-[-25px] left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md">
                  Name is required
                </span>
              )}
            </form>
          </div>
          <div className="mt-[0px] pl-[14px] relative inline-block">
            <label className="text-sm font-medium text-black-400">Group</label>
            <select
              className="block border rounded-[5px] p-[9px] w-[288px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
              id="dropdown"
              name="group"
              onChange={handleAccountChange}
              value={newAccounts.group}
            >
              {groupOptions.map((option) => (
                <option
                  key={option.id}
                  value={option.value}
                  className="hover:bg-red-500 focus:bg-green-500"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex px-3">
          <div className="block w-[385px] relative flex items-center">
            <form>
              <input
                type="checkbox"
                name="accountCheck"
                checked={newAccounts.accountCheck}
                onChange={handleAccountChange}
                className="p-10 w-7 focus:border-blue-400 hover:border-gray-300 focus:outline-none"
              />
              <label
                className=" text-sm"
                name="accountCurrency"
                onChange={handleAccountChange}
              >
                {newAccounts.accountCurrency}
              </label>
            </form>
          </div>
          <div className="pl-[14px] relative">
            <form>
              <input
                className="border rounded-l pl-40 p-[9px] w-[245px] text-sm focus:border-blue-400 focus:outline-none"
                type="number"
                name="balance"
                placeholder="Balance"
                onChange={handleAccountChange}
                value={newAccounts.balance}
              />
              <label
                className="text-sm bg-gray-200 rounded-r text-gray-600 p-[10px]"
                name="accountCode"
                onChange={handleAccountChange}
              >
                {newAccounts.accountCode}
              </label>
            </form>
          </div>
        </div>
        <div className="flex border-b p-3 pb-[23px]">
          <div className="block w-[385px] relative flex items-center">
            <form>
              <input
                type="checkbox"
                name="dashboard"
                onChange={handleAccountChange}
                checked={newAccounts.dashboard}
                className="p-10 w-7 focus:border-blue-400 hover:border-gray-400 focus:outline-none"
              />
              <label className=" text-sm">Show on Dashboard</label>
            </form>
          </div>
          <div className="mt-[2px] pl-[14px] relative">
            <button
              onClick={saveAccount}
              className="bg-blue-800 text-white text-sm rounded-[5px] p-[9px] w-[288px]"
            >
              Save Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAccount;

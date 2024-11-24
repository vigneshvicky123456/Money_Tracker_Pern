import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts } from "../../../features/accountsSlice";
//import { addNewTransaction } from "../../../features/newTransactionsSlice";


const EditIncome = () => {
    const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);

  const tagOptions = [
    { id: 1, label: "Salary", value: "Salary" },
    { id: 2, label: "Bonus", value: "Bonus" },
    { id: 3, label: "EU Consulting", value: "EU Consulting" },
  ];

  useEffect(() => {
    dispatch(allAccounts());
  }, [dispatch]);

  return (
    <div>
       <div className="flex">
        <div className="relative">
          <label className="text-sm font-medium text-black-400">To</label>
          <select
            className="block border flex rounded p-[7px] mt-[5px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            id="dropdown"
            name="toNameId"
            //onChange={accountIncomeChange}
            //value={newIncome.toNameId}
          >
            {accounts.map((accdata) => (
              <option
                key={accdata.id}
                value={accdata.id}
                className="hover:bg-red-500 text-sm focus:bg-green-500"
              >
                {accdata.account_name}
                {/* {accdata.account_type} */}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mt-[28px] ml-[14px] border rounded">
          <input
            className="w-[90px] p-[6px] rounded-l focus:border-blue-400 focus:outline-none"
            type="number"
            name="toAmount"
            //onChange={accountIncomeChange}
            //value={newIncome.toAmount}
          />
          <span className="p-[10px] pl-[28.5px] text-gray-700 text-sm bg-gray-300 rounded-r">
            {/* {newIncome.toCode} */}
          </span>
        </div>
      </div>
      <div className="mt-2 flex">
        <div className="relative">
          <label className="text-sm font-medium text-black-400">Tags</label>
          <select
            className="block border flex mt-[5px] rounded p-[7px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            id="dropdown"
            name="tag"
            placeholder="Choose existing tags or add new"
            //onChange={accountIncomeChange}
            //value={newIncome.tag}
          >
            <option className="text-sm text-gray-300">
              Choose existing tags
            </option>
            {tagOptions.map((option) => (
              <option
                key={option.id}
                value={option.value}
                className="hover:bg-red-500 text-sm focus:bg-green-500"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mt-[28px] ml-[14px] border focus:border-blue-400  rounded">
          <input
            className="w-[151px] p-[7px] text-sm rounded focus:outline-none"
            type="date"
            name="date"
            //value={newIncome.date}
            //onChange={accountIncomeChange}
          />
        </div>
      </div>
      <div className="mt-2 flex">
        <div className="relative">
          <input
            className="block border flex mt-[5px] rounded p-[7px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            type="text"
            placeholder="Note"
            name="note"
            //value={newIncome.note}
            //onChange={accountIncomeChange}
          />
        </div>
        <div className="relative mt-[5px] ml-[14px] border rounded">
          <button
            className="w-[151px] p-[7px] text-white bg-blue-800 text-sm rounded"
            type="button"
            //onClick={saveIncome}
          >
            Add Income
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditIncome;

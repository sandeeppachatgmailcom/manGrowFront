import React, { useState, useEffect } from 'react';

interface Item {
  id: string;
  name: string;
}

interface Props {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  items: Item[];
}

const TailwindBasicSelect: React.FC<Props> = ({ name, value, onChange, items }) => {
  const [options, setOptions] = useState<Item[]>();

  useEffect(() => {
    setOptions(items);
  }, [items]);

  return (
    <div className="min-w-min">
      <label htmlFor="basic-select" className="block text-sm font-medium text-gray-700">
        {name}
      </label>
      <select
        id="basic-select"
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {options?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TailwindBasicSelect;

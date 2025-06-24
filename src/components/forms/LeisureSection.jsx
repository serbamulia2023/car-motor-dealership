import React, { useState } from "react";
import Select from "react-select";
import { FiPlus, FiMinus } from "react-icons/fi";

const LeisureSection = ({ data, setData }) => {
  const [topics, setTopics] = useState(data.readingTopics || [""]);
  const [hobbies, setHobbies] = useState(data.hobby || [""]);

  const handleInputChange = (e, index, field) => {
    const newValue = e.target.value;
    if (field === "hobby") {
      const updated = [...hobbies];
      updated[index] = newValue;
      setHobbies(updated);
      setData((prev) => ({ ...prev, hobby: updated }));
    }
  };

  const addField = (field) => {
    if (field === "hobby" && hobbies.length < 3) {
      const updated = [...hobbies, ""];
      setHobbies(updated);
      setData((prev) => ({ ...prev, hobby: updated }));
    }
  };

  const removeField = (field, index) => {
    if (field === "hobby") {
      const updated = hobbies.filter((_, i) => i !== index);
      setHobbies(updated);
      setData((prev) => ({ ...prev, hobby: updated }));
    }
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setData((prevData) => ({
      ...prevData,
      [name]: selectedOption?.value || "",
    }));
  };

  const handleTopicChange = (index, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index] = value;
    setTopics(updatedTopics);
    setData((prevData) => ({
      ...prevData,
      readingTopics: updatedTopics,
    }));
  };

  const addTopicField = () => {
    if (topics.length < 3) {
      setTopics([...topics, ""]);
    }
  };

  const removeTopicField = (index) => {
    const updated = topics.filter((_, i) => i !== index);
    setTopics(updated);
    setData((prevData) => ({
      ...prevData,
      readingTopics: updated,
    }));
  };

  const readingFrequencyOptions = [
    { value: "Sering", label: "Sering" },
    { value: "Kadang-kadang", label: "Kadang-kadang" },
    { value: "Jarang", label: "Jarang" },
  ];

  const newspaperOptions = [
    { value: "Koran", label: "Koran" },
    { value: "Majalah", label: "Majalah" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '40px',
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
      fontSize: '0.875rem',
      paddingLeft: '0.5rem',
      cursor: 'pointer',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#2563eb'
        : 'white',
      color: state.isSelected ? 'white' : '#111827',
      fontSize: '0.875rem',
      padding: '0.5rem 0.75rem',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#93c5fd',
        color: '#111827',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '0.875rem',
      color: '#111827',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '0.875rem',
      color: '#9ca3af',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      backgroundColor: 'white',
      position: 'absolute',
      marginTop: 4,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  return (
    <div className="space-y-6 mt-2 relative z-[9999] overflow-visible">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Hobi & Kegiatan Waktu Luang
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hobi (optional)
        </label>
        {hobbies.map((hobby, index) => (
          <div key={index} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              value={hobby}
              onChange={(e) => handleInputChange(e, index, "hobby")}
              placeholder="Contoh: Membaca, olahraga"
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-gray-400 text-sm"
            />
            {index === hobbies.length - 1 && hobbies.length < 3 && (
              <button
                type="button"
                onClick={() => addField("hobby")}
                className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 border border-blue-300 rounded-md"
              >
                <FiPlus size={16} />
              </button>
            )}
            {hobbies.length > 1 && (
              <button
                type="button"
                onClick={() => removeField("hobby", index)}
                className="p-2 bg-red-100 hover:bg-red-200 text-red-600 border border-red-300 rounded-md"
              >
                <FiMinus size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Frekuensi Membaca (optional)
        </label>
        <div className="relative z-50">
          <Select
            name="readingFrequency"
            value={readingFrequencyOptions.find(
              (option) => option.value === data.readingFrequency
            )}
            onChange={handleSelectChange}
            options={readingFrequencyOptions}
            placeholder="Pilih"
            isClearable
            styles={customStyles}
            menuPortalTarget={document.body}
            menuPosition="absolute"
            menuShouldBlockScroll
            tabSelectsValue={false}
            openMenuOnFocus={false}
            blurInputOnSelect={false}
            defaultMenuIsOpen={false}
            menuIsOpen={undefined}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Topik yang dibaca (maks 3, optional)
        </label>
        {topics.map((topic, index) => (
          <div key={index} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => handleTopicChange(index, e.target.value)}
              placeholder={`Topik ${index + 1}`}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-gray-400 text-sm"
            />
            {index === topics.length - 1 && topics.length < 3 && (
              <button
                type="button"
                onClick={addTopicField}
                className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 border border-blue-300 rounded-md"
              >
                <FiPlus size={16} />
              </button>
            )}
            {topics.length > 1 && (
              <button
                type="button"
                onClick={() => removeTopicField(index)}
                className="p-2 bg-red-100 hover:bg-red-200 text-red-600 border border-red-300 rounded-md"
              >
                <FiMinus size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Koran atau Majalah yang dibaca (pilih satu, optional)
        </label>
        <div className="relative z-50">
          <Select
            name="newspaper"
            value={newspaperOptions.find(
              (option) => option.value === data.newspaper
            )}
            onChange={handleSelectChange}
            options={newspaperOptions}
            placeholder="Pilih"
            isClearable
            styles={customStyles}
            menuPortalTarget={document.body}
            menuPosition="absolute"
            menuShouldBlockScroll
            tabSelectsValue={false}
            openMenuOnFocus={false}
            blurInputOnSelect={false}
            defaultMenuIsOpen={false}
            menuIsOpen={undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default LeisureSection;

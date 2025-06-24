import React from "react";

const PdaAgreementSection = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setData((prev) => ({
      ...prev,
      pdaAccepted: {
        ...prev.pdaAccepted,
        [name]: checked,
      },
    }));
  };

  return (
    <div className="border p-4 rounded bg-white space-y-4">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="first"
          checked={data?.first || false}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <span className="text-sm">
          I agree to the collection and use of my personal data.
        </span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="second"
          checked={data?.second || false}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <span className="text-sm">
          I understand the information will be used for recruitment purposes.
        </span>
      </label>
    </div>
  );
};

export default PdaAgreementSection;

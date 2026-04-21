import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryCard = () => {
  const [countryName, setCountryName] = useState(""); 
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!countryName.trim()) {
      setData([]);
      setLoading(false);
      return;
    }

    const fetchCountry = async () => {
      setLoading(true);
      setData([]); 

      const timeoutId = setTimeout(async () => {
        try {
          const response = await axios.get(
            `https://restcountries.com/v3.1/name/${countryName}`
          );
          console.log("Details in Console:", response.data);
          setData(response.data);
        } catch (err) {
          console.log("Country not found");
        } finally {
          setLoading(false);
        }
      }, 5000);

      return () => clearTimeout(timeoutId);
    };

   
    const debounceId = setTimeout(() => {
      fetchCountry();
    }, 500);

    return () => clearTimeout(debounceId);
  }, [countryName]);

  return (
    <div className="flex flex-col items-center w-full max-w-md">

      <input
        type="text"
        placeholder="Search country..."
        className="w-full p-4 rounded-lg border shadow-sm text-black outline-none mb-10 focus:ring-2 focus:ring-blue-400"
        value={countryName}
        onChange={(e) => setCountryName(e.target.value)}
      />

      <div className="flex flex-wrap justify-center gap-6">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mb-2"></div>
            <p className="text-blue-500 font-bold italic">Wait 5 seconds...</p>
          </div>
        ) : (
          data.map((country, index) => (
            <div key={index} className="w-40 bg-white rounded-xl shadow-md p-4 flex flex-col items-center border border-gray-200">
            
              <div className="w-16 h-12 mb-3">
                <img 
                  src={country.flags.png} 
                  className="w-full h-full object-contain rounded-sm" 
                  alt="flag" 
                />
              </div>
              <h2 className="text-lg font-bold text-gray-800 text-center leading-tight">
                {country.name.common}
              </h2>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CountryCard;
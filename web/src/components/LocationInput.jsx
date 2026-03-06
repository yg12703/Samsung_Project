import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, X } from 'lucide-react';

const CITIES = [
  'Delhi, NCT (Connaught Place, India Gate, Chandni Chowk)',
  'Mumbai, Maharashtra (Marine Drive, Bandra, Worli)',
  'Bangalore, Karnataka (Whitefield, Koramangala, Indiranagar)',
  'Chennai, Tamil Nadu (T Nagar, Marina Beach, OMR)',
  'Kolkata, West Bengal (Park Street, Salt Lake, Howrah)',
  'Hyderabad, Telangana (HITEC City, Banjara Hills, Charminar)',
  'Pune, Maharashtra (Koregaon Park, Hinjewadi, Viman Nagar)',
  'Ahmedabad, Gujarat (SG Highway, Navrangpura, Ashram Road)',
  'Jaipur, Rajasthan (Malviya Nagar, Vaishali Nagar, C-Scheme)',
  'Lucknow, Uttar Pradesh (Gomti Nagar, Hazratganj, Aliganj)',
  'Chandigarh, Punjab/Haryana (Sector 17, Elante, IT Park)',
  'Indore, Madhya Pradesh (Vijay Nagar, Palasia, Rajwada)',
  'Surat, Gujarat (Vesu, Adajan, Piplod)',
  'Nagpur, Maharashtra (Dharampeth, Wardha Road, Sitabuldi)',
  'Bhopal, Madhya Pradesh (MP Nagar, Arera Colony, BHEL)',
  'Visakhapatnam, Andhra Pradesh (MVP Colony, Rushikonda, RK Beach)',
  'Kochi, Kerala (Edappally, MG Road, Fort Kochi)',
  'Coimbatore, Tamil Nadu (RS Puram, Peelamedu, Avinashi Road)',
  'Vadodara, Gujarat (Alkapuri, Akota, Fatehgunj)',
  'Gurgaon, Haryana (Cyber City, DLF Phase 3, Golf Course Road)'
];

const LocationInput = ({ label, value, onChange, placeholder }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (value) {
      const filtered = CITIES.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(CITIES);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectCity = (city) => {
    // Extract just the City, State part for cleaner input value
    const cleanCity = city.split(' (')[0];
    onChange(cleanCity);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <Label htmlFor={label} className="text-sm font-medium text-gray-700 mb-2 block">
        {label}
      </Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          ref={inputRef}
          id={label}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="pl-10 pr-10 h-12 text-gray-900 bg-white border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {showSuggestions && filteredCities.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredCities.map((city, index) => {
            const [mainPart, landmarks] = city.split(' (');
            return (
              <button
                key={index}
                onClick={() => handleSelectCity(city)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex flex-col gap-1 text-gray-900 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="font-medium">{mainPart}</span>
                </div>
                {landmarks && (
                  <span className="text-xs text-gray-500 pl-7">
                    {landmarks.replace(')', '')}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
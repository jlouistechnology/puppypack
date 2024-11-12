import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { DOG_BREEDS } from '../constants/breeds';
import { supabase } from '../lib/supabaseClient';
import Combobox from '../components/Combobox';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    gender: '',
    birthday: '',
    photo: null as File | null,
    photoUrl: '',
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        photo: e.target.files[0],
      });
    }
  };

  const handleSubmit = async () => {
    try {
      let photoUrl = '';
      
      if (formData.photo) {
        const fileExt = formData.photo.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('puppy-photos')
          .upload(filePath, formData.photo);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('puppy-photos')
          .getPublicUrl(filePath);

        photoUrl = publicUrl;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error: profileError } = await supabase
        .from('puppies')
        .insert([
          {
            user_id: user.id,
            name: formData.name,
            breed: formData.breed,
            gender: formData.gender,
            birthday: formData.birthday,
            photo_url: photoUrl,
          },
        ]);

      if (profileError) {
        throw profileError;
      }

      // Navigate to payment page
      navigate('/payment');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">What's your puppy's name?</h2>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter puppy's name"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyPress={(e) => e.key === 'Enter' && handleNext()}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">Hi {formData.name}! Let's get to know you!</h2>
            <Combobox
              options={[...DOG_BREEDS, "My breed isn't listed"]}
              value={formData.breed}
              onChange={(value) => setFormData({ ...formData, breed: value })}
              placeholder="Select or type your breed"
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">Almost there!</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  className={`p-3 border rounded-md ${
                    formData.gender === 'Male' ? 'bg-purple-100 border-purple-500' : ''
                  }`}
                  onClick={() => setFormData({ ...formData, gender: 'Male' })}
                >
                  Male
                </button>
                <button
                  className={`p-3 border rounded-md ${
                    formData.gender === 'Female' ? 'bg-purple-100 border-purple-500' : ''
                  }`}
                  onClick={() => setFormData({ ...formData, gender: 'Female' })}
                >
                  Female
                </button>
              </div>
              <input
                type="date"
                value={formData.birthday}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  const today = new Date();
                  if (selectedDate <= today) {
                    setFormData({ ...formData, birthday: e.target.value });
                  }
                }}
                max={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="border-2 border-dashed rounded-md p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer block text-center"
                >
                  <span className="text-purple-600">Upload a photo</span>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </label>
                {formData.photo && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {formData.photo.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        {renderStep()}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              onClick={handlePrevious}
              className="px-6 py-2 text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Complete Setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
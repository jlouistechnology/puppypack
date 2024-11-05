import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { DOG_BREEDS } from '../constants/breeds';
import { supabase } from '../lib/supabaseClient';
import { generateGuidanceForWeek } from '../lib/generateGuidance';
import Combobox from '../components/Combobox';
import { toast } from 'sonner';

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

      // Create puppy profile
      const { data: puppy, error: profileError } = await supabase
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
        ])
        .select()
        .single();

      if (profileError) {
        throw profileError;
      }

      // Generate first week's guidance
      if (puppy) {
        await generateGuidanceForWeek(puppy, 1);
      }

      // Navigate to dashboard instead of payment page
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to complete setup. Please try again.');
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
                  className

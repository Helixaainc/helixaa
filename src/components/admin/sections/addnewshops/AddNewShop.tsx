import SecondaryInputField from '@/components/common/SecondaryInputField';
import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaPhone, FaSearchLocation, FaShopify, FaUser, FaUserCheck, FaUserTag } from 'react-icons/fa';

// Define interfaces for TypeScript
interface FormData {
  shopName: string;
  location: string;
  email: string;
  phone: string;
  status: string;
}

interface FormErrors {
  shopName?: string;
  location?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const AddNewShop = () => {
  const [formData, setFormData] = useState<FormData>({
    shopName: '',
    location: '',
    email: '',
    phone: '',
    status: 'pending',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.shopName) newErrors.shopName = 'First name is required';
    if (!formData.location) newErrors.location = 'Last name is required';

   
    if(formData.email){
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    console.log("Done 1");



    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Here you would typically make an API call to create the user
      console.log('Form submitted:', formData);

      console.log("Done");

      const resp = await fetch('/api/shops/add-new-shop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })


      setSuccess(true);
      setErrors({});

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          shopName: '',
          location: '',
          email: '',
          phone: '',
          status: 'active',
        });
        setSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className='animate-fadeInUp'>
      <div className=" mx-auto p-6 bg-white rounded-xl shadow">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Shops</h1>
          <p className="text-gray-600">Create a new shop account for your platform</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
            <i className="fas fa-check-circle mr-3 text-xl"></i>
            <div>
              <p className="font-medium">Shop created successfully!</p>
              <p className="text-sm">The new shop account has been added to the system.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SecondaryInputField
              label="Shop Name"
              name="shopName"
              type="text"
              value={formData.shopName}
              onChange={handleChange}
              placeholder="Enter shop name"
              required
              icon={<FaShopify className="w-4 h-4" />}
              error={errors.shopName}
            />

            <SecondaryInputField
              label="Location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter Shop Location"
              required
              icon={<FaSearchLocation className="w-4 h-4" />}
              error={errors.location}
            />

            <SecondaryInputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              icon={<FaEnvelope className="w-4 h-4" />}
              error={errors.email}
            />

            <SecondaryInputField
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              icon={<FaPhone className="w-4 h-4" />}
              error={errors.phone}
            />


          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">


            <SecondaryInputField
              label="Account Status"
              name="status"
              type="select"
              value={formData.status}
              onChange={handleChange}
              icon={<FaUserCheck className="w-4 h-4" />}
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'suspended', label: 'Suspended' },
              ]}
            />

          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4 border-t border-gray-200 pt-6">
            <div>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Note:</span> Fields marked with * are required
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-helixaa-blue text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-helixaa-blue"
              >
                Create User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewShop;
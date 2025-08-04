import SecondaryInputField from '@/components/common/SecondaryInputField';
import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaPhone, FaUser, FaUserCheck, FaUserTag } from 'react-icons/fa';

// Define interfaces for TypeScript
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  status: string;
  kycVerified: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const AddNewUser = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    status: 'active',
    kycVerified: false,
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

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Here you would typically make an API call to create the user
      console.log('Form submitted:', formData);
      setSuccess(true);
      setErrors({});

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          role: 'user',
          status: 'active',
          kycVerified: false,
        });
        setSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className='animate-fadeInUp'>
      <div className=" mx-auto p-6 bg-white rounded-xl shadow">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New User</h1>
          <p className="text-gray-600">Create a new user account for your platform</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
            <i className="fas fa-check-circle mr-3 text-xl"></i>
            <div>
              <p className="font-medium">User created successfully!</p>
              <p className="text-sm">The new user account has been added to the system.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SecondaryInputField
              label="First Name"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              required
              icon={<FaUser className="w-4 h-4" />}
              error={errors.firstName}
            />

            <SecondaryInputField
              label="Last Name"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              required
              icon={<FaUser className="w-4 h-4" />}
              error={errors.lastName}
            />

            <SecondaryInputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
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

            <SecondaryInputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              required
              icon={<FaLock className="w-4 h-4" />}
              error={errors.password}
            />

            <SecondaryInputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              icon={<FaLock className="w-4 h-4" />}
              error={errors.confirmPassword}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <SecondaryInputField
              label="User Role"
              name="role"
              type="select"
              value={formData.role}
              onChange={handleChange}
              icon={<FaUserTag className="w-4 h-4" />}
              options={[
                { value: 'user', label: 'User' },
                // Add other roles as needed
              ]}
            />

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

export default AddNewUser;
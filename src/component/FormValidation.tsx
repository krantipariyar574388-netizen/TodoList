import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Phone, MapPin, ChevronDown } from 'lucide-react';

const shippingSchema = z.object({
  name: z.string().min(2, "Enter the name"),
  phone: z.string().min(10, "Number must be 10 digits"),
  phoneType: z.string().min(1, "Please select Phone Type"),
  address: z.string().min(5, "Enter valid address"),
  city: z.string().min(1, "Enter city"),
  state: z.string().min(1, "Please select state"),
  zip: z.string().min(5, "Does not match zip code"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

const FormValidation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { phoneType: "" }
  });

  const onSubmit = (data: ShippingFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212] p-4 font-sans selection:bg-blue-500/30">
      <div className="w-full max-w-[450px] space-y-10">
        <h2 className="text-3xl font-bold text-white px-2">Shipping</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Name Field */}
          <div className="flex items-start gap-6 group">
            <User className="text-gray-300 shrink-0 mt-2" size={28} strokeWidth={2.5} />
            <div className="w-full">
              <input
                {...register("name")}
                placeholder="Name"
                className="w-full bg-[#333333] border-none rounded-[14px] py-2 px-2 text-gray-200 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.name && <p className='text-red-500 text-xs mt-1 ml-2'>{errors.name.message}</p> }
            </div>
          </div>

          {/* Phone Field */}
          <div className="flex items-start gap-6">
            <Phone className="text-gray-300 shrink-0 mt-2" size={28} strokeWidth={2.5} />
            <div className="flex gap-4 w-full">
              {/* Phone Number Input Group */}
              <div className="flex-[1.8]">
                <input
                  {...register("phone")}
                  placeholder="Phone Number"
                  className="w-full bg-[#333333] border-none rounded-[14px] py-2 px-2 text-gray-200 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.phone && <p className='text-red-500 text-xs mt-1 ml-2'>{errors.phone.message}</p> }
              </div>
              
              {/* Phone Type Select Group */}
              <div className="relative flex-1">
                <select {...register("phoneType")} className="w-full appearance-none bg-[#333333] border-none rounded-[14px] py-2 px-2 pr-10 text-gray-400 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                  <option value="" disabled hidden>Phone Type</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Home">Telephone</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                {errors.phoneType && <p className='text-red-500 text-xs mt-1'>{errors.phoneType.message}</p> }
              </div>
            </div>
          </div>

          {/* Address Field */}
          <div className="flex items-start gap-6">
            <MapPin className="text-gray-300 shrink-0 mt-2" size={28} strokeWidth={2.5} />
            <div className="w-full">
              <input
                {...register("address")}
                placeholder="Address"
                className="w-full bg-[#333333] border-none rounded-[14px] py-2 px-2 text-gray-200 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.address && <p className='text-red-500 text-xs mt-1 ml-2'>{errors.address.message}</p> }
            </div>
          </div>

          {/* City, State, Zip Row */}
          <div className="flex gap-4 ml-[52px]">
            <div className="flex-1">
              <input
                {...register("city")}
                placeholder="City"
                className="w-full bg-[#333333] border-none rounded-[14px] py-2 px-2 text-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && <p className='text-red-500 text-xs mt-1'>{errors.city.message}</p>}
            </div>

            <div className="relative flex-1">
              <select {...register("state")} className="w-full appearance-none bg-[#333333] border-none rounded-[14px] py-2 px-2 pr-10 text-gray-400 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500">
                <option value="">State</option>
                <option value="Koshi">Koshi</option>
                <option value="Madhesh">Madhesh</option>
                <option value="Bagmati">Bagmati</option>
                <option value="Gandaki">Gandaki</option>
                <option value="Lumbini">Lumbini</option>
                <option value="Karnali">Karnali</option>
                <option value="Sudurpashchim">Sudurpashchim</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              {errors.state && <p className='text-red-500 text-xs mt-1'>{errors.state.message}</p>}
            </div>

            <div className="flex-1">
              <input
                {...register("zip")}
                placeholder="Zip"
                className="w-full bg-[#333333] border-none rounded-[14px] py-2 px-2 text-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.zip && <p className='text-red-500 text-xs mt-1'>{errors.zip.message}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-8 ml-[52px]">
            <button type="button" className="flex-1 py-1 px-2 border-[1.5px] border-blue-500 text-white rounded-full font-bold text-lg hover:bg-blue-500/10 transition-colors">
              Back to cart
            </button>
            <button type="submit" className="flex-1 py-1 px-2 bg-[#1D90FF] text-white rounded-full font-bold text-lg hover:bg-blue-600 transition-all shadow-lg active:scale-95">
              Proceed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormValidation;
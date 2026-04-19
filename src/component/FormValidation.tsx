
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Phone, MapPin, ChevronDown } from 'lucide-react';

const shippingSchema = z.object({
  name: z.string().min(2, "Name chaincha"),
  phone: z.string().min(10, "Phone number pugena"),
  phoneType: z.string(),
  address: z.string().min(5, "Address ali pugena"),
  city: z.string().min(1, "City lekhnu"),
  state: z.string().min(1, "State select garnu"),
  zip: z.string().min(5, "Zip code milena"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

const FormValidation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { phoneType: "Mobile" }
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
          <div className="flex items-center gap-6 group">
            <User className="text-gray-300 shrink-0" size={28} strokeWidth={2.5} />
            <div className="w-full">
              <input
                {...register("name")}
                placeholder="Name"
                className={`w-full bg-[#333333] border-none rounded-[14px] py-4 px-6 text-gray-200 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="flex items-center gap-6">
            <Phone className="text-gray-300 shrink-0" size={28} strokeWidth={2.5} />
            <div className="flex gap-4 w-full">
              <input
                {...register("phone")}
                placeholder="Phone Number"
                className="flex-[1.8] bg-[#333333] border-none rounded-[14px] py-4 px-6 text-gray-200 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <div className="relative flex-1">
                <select {...register("phoneType")} className="w-full appearance-none bg-[#333333] border-none rounded-[14px] py-4 px-6 pr-10 text-gray-400 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                  <option value="Mobile">Mobile</option>
                  <option value="Home">Home</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
          </div>

          {/* Address Field */}
          <div className="flex items-center gap-6">
            <MapPin className="text-gray-300 shrink-0" size={28} strokeWidth={2.5} />
            <input
              {...register("address")}
              placeholder="Address"
              className="w-full bg-[#333333] border-none rounded-[14px] py-4 px-6 text-gray-200 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* City, State, Zip Row */}
          <div className="flex gap-4 ml-[52px]">
            <input
              {...register("city")}
              placeholder="City"
              className="w-full bg-[#333333] border-none rounded-[14px] py-4 px-5 text-gray-200 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <div className="relative w-full">
              <select {...register("state")} className="w-full appearance-none bg-[#333333] border-none rounded-[14px] py-4 px-5 pr-10 text-gray-400 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 transition-all">
                <option value="">State</option>
                <option value="NY">NY</option>
                <option value="CA">CA</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
            <input
              {...register("zip")}
              placeholder="Zip"
              className="w-full bg-[#333333] border-none rounded-[14px] py-4 px-5 text-gray-200 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-8 ml-[52px]">
            <button 
              type="button" 
              className="flex-1 py-4.5 px-6 border-[1.5px] border-blue-500 text-white rounded-full font-bold text-lg hover:bg-blue-500/10 transition-colors"
            >
              Back to cart
            </button>
            <button 
              type="submit" 
              className="flex-1 py-4.5 px-6 bg-[#1D90FF] text-white rounded-full font-bold text-lg hover:bg-blue-600 transition-all shadow-lg active:scale-95"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormValidation;
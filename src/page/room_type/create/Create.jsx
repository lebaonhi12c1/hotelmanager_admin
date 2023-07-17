import React from 'react';

import { useForm } from 'react-hook-form';
function Create(props) {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
        
        console.log(data);
        // Thực hiện xử lý dữ liệu ở đây, ví dụ lưu vào cơ sở dữ liệu hoặc gọi API.
      };
    return (
        <div>
           <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        Thêm một loại phòng mới
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}
                        className='grid grid-cols-1 lg:grid-cols-2 gap-4'
                    >
      {/* Tên loại phòng */}
                    <div className="sm:col-span-2">
                        <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Tên loại phòng
                        </label>
                        <input
                        type="text"
                        {...register('name', { required: 'Tên loại phòng là bắt buộc' })}
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tên loại phòng"
                        required
                        />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>

                    {/* Mã phòng */}
                    <div className="w-full">
                        <label
                        htmlFor="brand"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Mã phòng
                        </label>
                        <input
                        type="text"
                        {...register('code', { required: 'Mã phòng là bắt buộc' })}
                        id="brand"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Mã phòng"
                        required
                        />
                        {errors.brand && <p>{errors.brand.message}</p>}
                    </div>

                    {/* Giá khởi điểm */}
                    <div className="w-full">
                        <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Giá khởi điểm
                        </label>
                        <input
                        type="number"
                        {...register('priceBegin', { required: 'Giá khởi điểm là bắt buộc' })}
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="VND"
                        required
                        />
                        {errors.price && <p>{errors.price.message}</p>}
                    </div>

                    {/* Số lượng khách */}
                    <div>
                        <label
                        htmlFor="capacity"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Số lượng khách
                        </label>
                        <select
                        id="capacity"
                        {...register('capacity', { required: 'Số lượng khách là bắt buộc' })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                        <option value={4}>Chọn</option>
                        {Array(4)
                            .fill()
                            .map((item, index) => {
                            return (
                                <option key={index} value={index + 1}>
                                {index + 1}
                                </option>
                            );
                            })}
                        </select>
                        {errors.category && <p>{errors.category.message}</p>}
                    </div>

                    {/* Trạng thái */}
                    <div>
                        <label
                        htmlFor="status"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Trạng thái
                        </label>
                        <select
                        id="status"
                        {...register('status', { required: 'Trạng thái là bắt buộc' })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                        <option value="draft">Bảng nháp</option>
                        <option value="published">Công khai</option>
                        </select>
                        {errors.status && <p>{errors.status.message}</p>}
                    </div>

                    {/* Rộng */}
                    <div>
                        <label
                        htmlFor="item-weight"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Rộng
                        </label>
                        <input
                        type="number"
                        {...register('area', { required: 'Rộng là bắt buộc' })}
                        id="area"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="m2"
                        required
                        />
                        {errors['item-weight'] && <p>{errors['item-weight'].message}</p>}
                    </div>
                    
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Upload multiple files</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple
                            {...register('image', { required: 'Tên loại phòng là bắt buộc' })}
                        />
                    </div>

                    {/* Mô tả */}
                    <div className="sm:col-span-2">
                        <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Mô tả
                        </label>
                        <textarea
                        id="description"
                        rows="8"
                        {...register('description')}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your description here"
                        />
                        {/* Không cần xác thực dữ liệu cho trường mô tả */}
                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 w-fit"
                    >
                        Thêm loại Phòng
                    </button>
                    </form>
                </div>
                </section>
        </div>
    );
}

export default Create;


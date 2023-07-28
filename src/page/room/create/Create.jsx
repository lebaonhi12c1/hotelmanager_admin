import React, { useEffect, useState } from "react";
import Toast from "../../../helpers/Toast";
import RoomTypeService from "../../../services/roomType.service";
import { uid } from "uid";
import { useForm, Controller } from 'react-hook-form';
import Fetch from "../../../helpers/fetch";
import LoadingItem from "../../../components/LoadingItem";
function CreateRoom(props) {

    const [ room_type, set_room_type ] = useState( null )
    const [ loading, set_loading ] = useState( false )
    
    const get_room_type = async() =>
    {
        const res = await RoomTypeService.getAllRoomType()
        if( !res.success )
        {
            Toast.getToastError( res.message )
            return
        }
        
        set_room_type( res.data )
    }

    useEffect(
        () =>
        {
            get_room_type()
        },
        []
    )
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    
    const formRules = {
        name: {
        required: 'Vui lòng nhập Tên phòng',
        },
        brand: {
        required: 'Vui lòng nhập Mã phòng',
        },
        price: {
        required: 'Vui lòng nhập Giá',
        min: {
            value: 0,
            message: 'Giá không hợp lệ',
        },
        },
        status: {
        required: 'Vui lòng chọn Trạng thái',
        },
        category: {
        required: 'Vui lòng chọn Loại phòng',
        },
        itemWeight: {
        required: 'Vui lòng nhập Sức chứa',
        min: {
            value: 1,
            message: 'Sức chứa không hợp lệ',
        },
        },
        image: {
        required: 'Vui lòng nhập Hình ảnh',
        },
        description: {
        required: 'Vui lòng nhập Mô tả',
        },
    };
    
    const onSubmit = async(data) => {
        // Xử lý dữ liệu khi submit form
        console.log(data);
        set_loading( true )
        const res = await Fetch.make().post(
            `${ import.meta.env.VITE_API_URL }/api/room`,
            {
                code: data?.brand,
                name: data?.name,
                description: data?.description,
                price: Number( data?.price ),
                capacity: Number( data?.itemWeight ),
                roomType: Number( data?.category ),
                image: [ { value: data?.image } ],
                employee: JSON.parse( localStorage.getItem( 'user' ) )?.id,
                status: data?.status
            }
        )
        if( !res.success )
        {
            Toast.getToastError(  res.message )
            set_loading( false )
            return
        }
        Toast.getToastSuccess( res.message )
        set_loading( false )
    };
    
    return (
        <div className="p-4">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Thêm một phòng mới
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên phòng
                </label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={formRules.name}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Tên phòng"
                      />
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mã phòng
                </label>
                <Controller
                  name="brand"
                  control={control}
                  defaultValue=""
                  rules={formRules.brand}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Mã phòng"
                      />
                      {errors.brand && (
                        <p className="text-red-500">{errors.brand.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Giá
                </label>
                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  rules={formRules.price}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="VND"
                      />
                      {errors.price && (
                        <p className="text-red-500">{errors.price.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sức chứa
                </label>
                <Controller
                  name="itemWeight"
                  control={control}
                  defaultValue=""
                  rules={formRules.itemWeight}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="2"
                      />
                      {errors.itemWeight && (
                        <p className="text-red-500">{errors.itemWeight.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Hình ảnh
                </label>
                <Controller
                  name="image"
                  control={control}
                  defaultValue=""
                  rules={formRules.image}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Link"
                      />
                      {errors.image && (
                        <p className="text-red-500">{errors.image.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Trạng thái
                </label>
                <Controller
                  name="status"
                  control={control}
                  defaultValue=""
                  rules={formRules.status}
                  render={({ field }) => (
                    <div>
                      <select
                        {...field}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value="">Chọn trạng thái</option>
                        <option value="draft">Bản thảo </option>
                        <option value="published">Công khai</option>
                      </select>
                      {errors.status && (
                        <p className="text-red-500">{errors.status.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Loại phòng
                </label>
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  rules={formRules.category}
                  render={({ field }) => (
                    <div>
                      <select
                        {...field}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value=""> Chọn loại phòng </option>
                        {
                            room_type?.map(
                                item =>
                                (
                                    <option 
                                        value={ item?.id }
                                        key={ uid( 10 ) }
                                    >
                                        {
                                            item?.name
                                        }
                                    </option>
                                )
                            )
                        }
                      </select>
                      {errors.category && (
                        <p className="text-red-500">{errors.category.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
              {/* Các trường input khác tương tự */}
            </div>
            
            <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả
                </label>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  rules={formRules.description}
                  render={({ field }) => (
                    <div>
                        <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mô tả..."
                            {...field}
                        >
        
                        </textarea>
                        {errors.description && (
                            <p className="text-red-500">{errors.description.message}</p>
                        )}
                    </div>
                  )}
                />

            </div>

            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              {
                loading && 
                (
                    <LoadingItem/>
                )
              }
              {
                !loading && 'Thêm phòng'
              }
            </button>
          </form>
        </div>
      </section>
    </div>
    );
}

export default CreateRoom;

import React from "react";
import { useForm } from "react-hook-form";
import Fetch from "../../helpers/fetch";
import Toast from "../../helpers/Toast";
import { convertToLowerCase } from "../../helpers/globalfunction";

function MyForm( { handle_submit } ) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();

    const onSubmit = async(data) => {

        console.log(data);
        const res = await Fetch.make().post(
            `${ import.meta.env.VITE_API_URL }/api/customer/register`,
            {
                username: convertToLowerCase( data.name ),
                password: 'password123',
                name: data.name,
                email: data.email,
                phone: data.phone,
                gender: data.gender,
                dateOfBirth: data.birthDate,
            }
        )
        
        if( !res.success )
        {
            Toast.getToastError( res.message )
            return
        }
        handle_submit( res.data )
        Toast.getToastSuccess( res.message )
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} 
            className="grid grid-cols-2 gap-4"
        >
            {/* Input field */}
            <div className="sm:col-span-2">
                <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Tên khách hàng
                </label>
                <input
                    type="text"
                    {...register("name", {
                        required: "Tên khách hàng là bắt buộc",
                    })}
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nhập tên"
                    required
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email field */}
            <div className="w-full">
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Email
                </label>
                <input
                    type="email"
                    {...register("email", { required: "Email là bắt buộc" })}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nhập email"
                    required
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            {/* Số điện thoại field */}
            <div className="w-full">
                <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Số điện thoại
                </label>
                <input
                    type="text"
                    {...register("phone", {
                        required: "Số điện thoại là bắt buộc",
                    })}
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nhập số điện thoại"
                    required
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>

            {/* Ngày sinh field */}
            <div>
                <label
                    htmlFor="birthDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Ngày sinh
                </label>
                <input
                    type="date"
                    {...register("birthDate", {
                        required: "Ngày sinh là bắt buộc",
                    })}
                    id="birthDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
                {errors.birthDate && <p className="text-red-500">{errors.birthDate.message}</p>}
            </div>

            {/* Giới tính field */}
            <div className="sm:col-span-2 flex items-center gap-2">
                <div className="block text-sm font-medium text-gray-900 dark:text-white">
                    Giới tính
                </div>
                <div className="flex items-center">
                    <input
                        id="male"
                        type="radio"
                        value="male"
                        {...register("gender", { required: "Chọn giới tính" })}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        defaultChecked
                    />
                    <label
                        htmlFor="male"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Nam
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id="female"
                        type="radio"
                        value="female"
                        {...register("gender", { required: "Chọn giới tính" })}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor="female"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Nữ
                    </label>
                </div>
            </div>

            <button
                type="submit"
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-fit"
            >
                Đăng ký
            </button>
        </form>
    );
}

export default MyForm;

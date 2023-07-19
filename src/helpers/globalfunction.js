import { isDate } from "lodash";

export const format_date = dateString =>
{

    // Bước 1: Chuyển đổi chuỗi thời gian thành đối tượng Date
    const date = new Date(dateString);

    // Bước 2: Lấy ngày, tháng và năm
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0 (0 - 11)
    const year = date.getFullYear();

    // Bước 3: Định dạng thành "dd/mm/yyyy"
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    return formattedDate

}


export const get_format_price = value =>
{
    if( isNaN( value ) )
    {
        return 0 + 'VND'
    }
    return Number( value )?.toLocaleString ( 'en-US' ) + ' VND'
}

export function formatDate(dateString) {
    
  const date = new Date(dateString);
    if(  !(date instanceof Date && !isNaN(date) ))
    {
        return 'Chưa có'
    }
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}
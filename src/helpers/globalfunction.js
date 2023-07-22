
import { format, parse } from 'date-fns';

export function formatDateToISO(inputDate) {
  console.log( inputDate)
  // Chuyển đổi ngày đầu vào sang đối tượng Date
  const dateObject = parse(inputDate, 'dd/MM/yyyy', new Date());

  // Chuyển đổi thành chuỗi ngày tháng có định dạng "yyyy-MM-dd"
  const formattedDate = format(dateObject, 'yyyy-MM-dd');

  return formattedDate;
}
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

export function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


export const  convertToLowerCase = (str) => 
{
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '')
    .toLowerCase();         
}


export const get_day_of_time = (d1, d2) => {
  const date2 = new Date(d2)
  const date1 = new Date(d1)
  let ms1 = date1.getTime();
  let ms2 = date2.getTime();
  return Math.ceil((ms2 - ms1) / (24*60*60*1000));
};

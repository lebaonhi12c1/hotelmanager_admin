
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
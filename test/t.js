// Viết một hàm JavaScript để viết hoa ký tự đầu tiên của mỗi từ
// VD: "k4 class - Automation test for beginner" ~> "K4 Class - Automation Test For Beginner"

function capitalizeFirstLetter2(str) {
    /* Giải thuật:
        - Tách chuỗi thành mảng, bởi các dấu cách
        - Khai báo mảng kết quả để lưu lại
        - Duyệt từng phần tử. Với mỗi phần tử, thực hiện:
            - Tách kí tự đầu và phần còn lại
            - Chuyển kí tự đầu thành in hoa
            - Nối phần đã chuyển in hoa với phần còn lại, 
            - Lưu vào mảng kết quả
        - Nối mảng lại bởi dấu cách, trả về
    */
    // Bước 1: Tách chuỗi thành mảng, bởi các dấu cách: 
    const originArray = str.split(" ");

    // Bước 2: Khai báo mảng kết quả để lưu lại
    const resultArray = [];

    // Bước 3: Duyệt từng phần tử. Với mỗi phần tử, thực hiện:
    for(let i = 0; i < originArray.length; i++) {
        const item = originArray[i];

        // Tách kí tự đầu và phần còn lại
        const firstCharacter = item.charAt(0);
        const theRest = item.slice(1);

        // Chuyển kí tự đầu thành in hoa
        const firstCharacterUpper = firstCharacter.toUpperCase();


        // Nối phần đã chuyển in hoa với phần còn lại
        const result = firstCharacterUpper + theRest;

        // Lưu vào mảng kết quả
        resultArray.push(result);
    }

    // Bước 4: Nối mảng lại bởi dấu cách
    const result = resultArray.join(" ");

    // Bước 5: Trả về
    return result;
}

console.log(capitalizeFirstLetter2("k4 class - Automation test for beginner"));

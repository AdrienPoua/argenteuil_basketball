import * as XLSX from 'xlsx';

const isExcelFile = (file: File): boolean => {
    const validExtensions = ['xlsx', 'xls', 'csv'];
    const validMimeTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv'
    ];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const fileType = file.type;
    if (!fileExtension || !validExtensions.includes(fileExtension) || !validMimeTypes.includes(fileType)) {
        return false;   
    }
    return true
};

export const parseExcelToJson = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        // Vérification de l'extension et du type MIME
        if (!isExcelFile(file)) {
            return reject(new Error('Invalid file type'));
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            if (!e.target) return reject(new Error('Error reading file'));
            const data = new Uint8Array(e.target.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            resolve(worksheet);
        };
        reader.onerror = (error) => {
            console.error('FileReader onerror event triggered', error);
            reject(error);
        };
        reader.readAsArrayBuffer(file);
    });
};


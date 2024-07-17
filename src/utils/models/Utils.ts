export default class Utils {
    static parseDate(dateString: string): Date {
      const [day, month, year] = dateString.split("/").map(Number);
      return new Date(year, month - 1, day); // Les mois sont 0-indexés en JavaScript
    }
    static formatPhoneNumber(number: string) {
      return number.replace(/(\d{2})(?=\d)/g, "$1.");
    }
  
    static formatDate(data: Date, options?: Intl.DateTimeFormatOptions): string {
      if (!(data instanceof Date) || isNaN(data.getTime())) {
        throw new Error("Invalid Date");
      }
  
      const defaultOptions: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      };
  
      const formatOptions = options ? { ...defaultOptions, ...options } : defaultOptions;
  
      return data.toLocaleDateString("fr-FR", formatOptions).toUpperCase();
    }
  }
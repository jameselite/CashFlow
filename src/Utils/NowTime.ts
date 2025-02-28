export class NowTime {
    private static year: number = new Date().getFullYear();
    private static month: number = new Date().getMonth() + 1;
    private static day: number = new Date().getDate();

    static justNow(): string {
        return `${this.year}-${this.month.toString().padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`;
    }

    static justYear(): number {
        return this.year;
    }

    static justMonth(): number {
        return this.month;
    }

    static justDay(): number {
        return this.day;
    }
}